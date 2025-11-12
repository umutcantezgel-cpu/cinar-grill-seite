#!/usr/bin/env node
/**
 * Bundle Analyzer
 * Analyzes JS/CSS bundle sizes, unused code, and dependencies
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { gzipSync } from 'zlib';

const DIST_DIR = './dist';
const OUTPUT_FILE = './docs/reports/bundle-analysis.json';
const SIZE_THRESHOLDS = {
  js: 35 * 1024,  // 35 KB
  css: 45 * 1024, // 45 KB
};

/**
 * Get file size (actual + gzipped)
 */
function getFileSizes(filePath) {
  const content = readFileSync(filePath);
  const gzipped = gzipSync(content);

  return {
    raw: content.length,
    gzip: gzipped.length,
  };
}

/**
 * Find all files of given extensions
 */
function findFiles(dir, extensions, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findFiles(filePath, extensions, fileList);
    } else {
      const ext = file.substring(file.lastIndexOf('.'));
      if (extensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Analyze JavaScript files
 */
function analyzeJavaScript(files) {
  const analysis = {
    total: { raw: 0, gzip: 0 },
    files: [],
    overBudget: false,
  };

  files.forEach((filePath) => {
    const sizes = getFileSizes(filePath);
    const relativePath = relative(DIST_DIR, filePath);

    analysis.files.push({
      path: relativePath,
      size: sizes.raw,
      gzip: sizes.gzip,
    });

    analysis.total.raw += sizes.raw;
    analysis.total.gzip += sizes.gzip;
  });

  analysis.overBudget = analysis.total.gzip > SIZE_THRESHOLDS.js;

  return analysis;
}

/**
 * Analyze CSS files
 */
function analyzeCSS(files) {
  const analysis = {
    total: { raw: 0, gzip: 0 },
    files: [],
    overBudget: false,
  };

  files.forEach((filePath) => {
    const sizes = getFileSizes(filePath);
    const relativePath = relative(DIST_DIR, filePath);

    analysis.files.push({
      path: relativePath,
      size: sizes.raw,
      gzip: sizes.gzip,
    });

    analysis.total.raw += sizes.raw;
    analysis.total.gzip += sizes.gzip;
  });

  analysis.overBudget = analysis.total.gzip > SIZE_THRESHOLDS.css;

  return analysis;
}

/**
 * Format bytes to human-readable
 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Main execution
 */
function main() {
  console.log('📦 Analyzing bundle sizes...\n');

  try {
    const jsFiles = findFiles(DIST_DIR, ['.js']);
    const cssFiles = findFiles(DIST_DIR, ['.css']);

    const jsAnalysis = analyzeJavaScript(jsFiles);
    const cssAnalysis = analyzeCSS(cssFiles);

    // Report
    console.log('=== JavaScript ===');
    console.log(`Total: ${formatBytes(jsAnalysis.total.raw)} (${formatBytes(jsAnalysis.total.gzip)} gzipped)`);
    console.log(`Budget: ${formatBytes(SIZE_THRESHOLDS.js)} gzipped`);
    console.log(`Status: ${jsAnalysis.overBudget ? '❌ OVER BUDGET' : '✅ WITHIN BUDGET'}`);
    console.log('');

    if (jsAnalysis.files.length > 0) {
      console.log('Files:');
      jsAnalysis.files
        .sort((a, b) => b.gzip - a.gzip)
        .forEach((file) => {
          console.log(`  ${file.path}: ${formatBytes(file.gzip)} gzipped`);
        });
      console.log('');
    }

    console.log('=== CSS ===');
    console.log(`Total: ${formatBytes(cssAnalysis.total.raw)} (${formatBytes(cssAnalysis.total.gzip)} gzipped)`);
    console.log(`Budget: ${formatBytes(SIZE_THRESHOLDS.css)} gzipped`);
    console.log(`Status: ${cssAnalysis.overBudget ? '❌ OVER BUDGET' : '✅ WITHIN BUDGET'}`);
    console.log('');

    if (cssAnalysis.files.length > 0) {
      console.log('Files:');
      cssAnalysis.files
        .sort((a, b) => b.gzip - a.gzip)
        .forEach((file) => {
          console.log(`  ${file.path}: ${formatBytes(file.gzip)} gzipped`);
        });
      console.log('');
    }

    // Save report
    const report = {
      timestamp: new Date().toISOString(),
      javascript: jsAnalysis,
      css: cssAnalysis,
      budgets: SIZE_THRESHOLDS,
    };

    writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));
    console.log(`📝 Report saved to: ${OUTPUT_FILE}\n`);

    // Exit code
    const exitCode = jsAnalysis.overBudget || cssAnalysis.overBudget ? 1 : 0;

    if (exitCode === 0) {
      console.log('✅ All budgets met!');
    } else {
      console.error('❌ Budget exceeded!');
    }

    process.exit(exitCode);
  } catch (error) {
    console.error('\n❌ Error during analysis:', error.message);
    process.exit(1);
  }
}

main();
