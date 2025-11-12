#!/usr/bin/env node
/**
 * No-Inline Scanner
 * Scans HTML files for inline scripts and styles (CSP violation check)
 * Ensures CSP-strict compliance
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const DIST_DIR = './dist';

/**
 * Find all HTML files
 */
function findHTMLFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findHTMLFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Scan file for inline scripts and styles
 */
function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const violations = [];

  // Check for inline scripts (except JSON-LD which is allowed)
  const inlineScriptRegex = /<script(?![^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi;
  const inlineScripts = content.match(inlineScriptRegex) || [];

  inlineScripts.forEach((script, index) => {
    // Skip if it's JSON-LD
    if (script.includes('application/ld+json')) {
      return;
    }

    const lineNumber = content.substring(0, content.indexOf(script)).split('\n').length;
    violations.push({
      type: 'inline-script',
      line: lineNumber,
      snippet: script.substring(0, 100) + (script.length > 100 ? '...' : ''),
    });
  });

  // Check for inline styles
  const inlineStyleRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
  const inlineStyles = content.match(inlineStyleRegex) || [];

  inlineStyles.forEach((style) => {
    const lineNumber = content.substring(0, content.indexOf(style)).split('\n').length;
    violations.push({
      type: 'inline-style',
      line: lineNumber,
      snippet: style.substring(0, 100) + (style.length > 100 ? '...' : ''),
    });
  });

  // Check for inline event handlers
  const inlineEventRegex = /\s(on\w+)=["'][^"']*["']/gi;
  const inlineEvents = content.match(inlineEventRegex) || [];

  inlineEvents.forEach((event) => {
    const lineNumber = content.substring(0, content.indexOf(event)).split('\n').length;
    violations.push({
      type: 'inline-event',
      line: lineNumber,
      snippet: event.trim(),
    });
  });

  // Check for style attributes
  const styleAttrRegex = /\sstyle=["'][^"']+["']/gi;
  const styleAttrs = content.match(styleAttrRegex) || [];

  styleAttrs.forEach((attr) => {
    const lineNumber = content.substring(0, content.indexOf(attr)).split('\n').length;
    violations.push({
      type: 'inline-style-attr',
      line: lineNumber,
      snippet: attr.trim().substring(0, 80) + (attr.length > 80 ? '...' : ''),
    });
  });

  return violations;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Scanning for inline scripts and styles...\n');

  try {
    const htmlFiles = findHTMLFiles(DIST_DIR);
    let totalViolations = 0;
    const violationsByFile = {};

    htmlFiles.forEach((filePath) => {
      const relativePath = relative(DIST_DIR, filePath);
      const violations = scanFile(filePath);

      if (violations.length > 0) {
        violationsByFile[relativePath] = violations;
        totalViolations += violations.length;
      }
    });

    // Report
    if (totalViolations === 0) {
      console.log('✅ No inline scripts or styles found!');
      console.log('CSP-strict compliance: PASS\n');
      process.exit(0);
    } else {
      console.error(`❌ Found ${totalViolations} violation(s) in ${Object.keys(violationsByFile).length} file(s):\n`);

      Object.entries(violationsByFile).forEach(([file, violations]) => {
        console.error(`\n📄 ${file} (${violations.length} violation(s)):`);

        violations.forEach((v) => {
          console.error(`  • Line ${v.line}: ${v.type}`);
          console.error(`    ${v.snippet}`);
        });
      });

      console.error('\n' + '='.repeat(50));
      console.error('❌ CSP-strict compliance: FAIL');
      console.error(`Total violations: ${totalViolations}`);
      console.error('\nPlease remove all inline scripts, styles, and event handlers.');
      console.error('Use external files and CSP-compliant patterns instead.\n');

      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error during scanning:', error.message);
    process.exit(1);
  }
}

main();
