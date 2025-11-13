#!/usr/bin/env node

/**
 * No-Inline Checker
 * Scans HTML files for inline scripts and styles (CSP violation)
 * Exits with error if any inline code is found
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIST_DIR = './dist';
const ALLOWED_PATTERNS = [
  // Allow JSON-LD structured data
  /<script type="application\/ld\+json">/,
  // Allow specific trusted inline scripts (if absolutely necessary)
  // Add exceptions here carefully
];

let errorCount = 0;
let warningCount = 0;

/**
 * Check file for inline scripts/styles
 */
function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const fileName = filePath.replace(DIST_DIR, '');

  // Check for inline scripts
  const scriptMatches = content.match(/<script(?![^>]*\ssrc=)[^>]*>/g);
  if (scriptMatches) {
    scriptMatches.forEach((match) => {
      // Check if it's an allowed pattern
      const isAllowed = ALLOWED_PATTERNS.some((pattern) => pattern.test(match));

      if (!isAllowed) {
        console.error(`❌ INLINE SCRIPT found in ${fileName}:`);
        console.error(`   ${match.substring(0, 100)}...`);
        errorCount++;
      } else {
        console.log(`⚠️  Allowed inline script in ${fileName} (JSON-LD or whitelisted)`);
        warningCount++;
      }
    });
  }

  // Check for inline styles
  const styleMatches = content.match(/<style[^>]*>/g);
  if (styleMatches) {
    styleMatches.forEach((match) => {
      console.error(`❌ INLINE STYLE found in ${fileName}:`);
      console.error(`   ${match.substring(0, 100)}...`);
      errorCount++;
    });
  }

  // Check for style attributes
  const styleAttrMatches = content.match(/\sstyle="/g);
  if (styleAttrMatches) {
    console.warn(`⚠️  Inline style attributes found in ${fileName}: ${styleAttrMatches.length}`);
    warningCount++;
  }
}

/**
 * Recursively scan HTML files
 */
function scanDirectory(dir) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      scanDirectory(filePath);
    } else if (file.endsWith('.html')) {
      checkFile(filePath);
    }
  });
}

/**
 * Main execution
 */
try {
  console.log('🔍 Checking for inline scripts/styles (CSP compliance)...\n');

  scanDirectory(DIST_DIR);

  console.log('\n📊 Results:');
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Warnings: ${warningCount}\n`);

  if (errorCount > 0) {
    console.error('❌ CSP VIOLATION: Inline scripts or styles detected!');
    console.error('   All scripts must use external files with SRI.');
    console.error('   Remove inline code or add to ALLOWED_PATTERNS (with caution).\n');
    process.exit(1);
  }

  console.log('✅ No CSP violations detected.\n');
  process.exit(0);
} catch (error) {
  console.error('❌ Error during scan:', error.message);
  process.exit(1);
}
