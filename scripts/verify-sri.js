#!/usr/bin/env node
/**
 * SRI Verification Script
 * Verifies that all CSS/JS/WOFF2 files have SRI hashes in integrity.manifest.json
 * Checks HTML files for integrity attributes
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const DIST_DIR = './dist';
const MANIFEST_FILE = './dist/integrity.manifest.json';
const TARGET_EXTENSIONS = ['.css', '.js', '.woff2'];

/**
 * Find all target files
 */
function findTargetFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findTargetFiles(filePath, fileList);
    } else {
      const ext = file.substring(file.lastIndexOf('.'));
      if (TARGET_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Check HTML files for integrity attributes
 */
function checkHTMLIntegrity(dir) {
  const htmlFiles = [];
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      htmlFiles.push(...checkHTMLIntegrity(filePath));
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath);
    }
  });

  return htmlFiles;
}

/**
 * Main verification
 */
function main() {
  console.log('🔍 Verifying SRI coverage...\n');

  let exitCode = 0;

  try {
    // Check if manifest exists
    if (!existsSync(MANIFEST_FILE)) {
      console.error(`❌ Manifest not found: ${MANIFEST_FILE}`);
      console.error('Run "npm run sri:gen" first.');
      process.exit(1);
    }

    // Load manifest
    const manifest = JSON.parse(readFileSync(MANIFEST_FILE, 'utf-8'));
    const manifestFiles = Object.keys(manifest.files);

    // Find all target files
    const targetFiles = findTargetFiles(DIST_DIR);
    let missingCount = 0;

    console.log('📋 Checking manifest coverage:\n');

    targetFiles.forEach((filePath) => {
      const relativePath = `/${relative(DIST_DIR, filePath).replace(/\\/g, '/')}`;

      if (manifest.files[relativePath]) {
        console.log(`✓ ${relativePath}`);
      } else {
        console.error(`✗ Missing SRI: ${relativePath}`);
        missingCount++;
        exitCode = 1;
      }
    });

    // Check HTML files
    console.log('\n📄 Checking HTML files for integrity attributes:\n');
    const htmlFiles = checkHTMLIntegrity(DIST_DIR);
    let htmlWarnings = 0;

    htmlFiles.forEach((htmlPath) => {
      const content = readFileSync(htmlPath, 'utf-8');
      const hasLink = /<link[^>]+href=["'][^"']*\.(css)["'][^>]*>/gi.test(content);
      const hasScript = /<script[^>]+src=["'][^"']*\.js["'][^>]*>/gi.test(content);

      if (hasLink || hasScript) {
        const linkMatches = content.match(/<link[^>]+href=["'][^"']*\.css["'][^>]*>/gi) || [];
        const scriptMatches = content.match(/<script[^>]+src=["'][^"']*\.js["'][^>]*>/gi) || [];

        let allHaveIntegrity = true;

        [...linkMatches, ...scriptMatches].forEach((tag) => {
          if (!tag.includes('integrity=')) {
            allHaveIntegrity = false;
          }
        });

        if (allHaveIntegrity) {
          console.log(`✓ ${relative(DIST_DIR, htmlPath)}`);
        } else {
          console.warn(`⚠ Some resources missing integrity: ${relative(DIST_DIR, htmlPath)}`);
          htmlWarnings++;
        }
      }
    });

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 SRI Verification Summary:\n');
    console.log(`Total files in manifest: ${manifestFiles.length}`);
    console.log(`Target files found: ${targetFiles.length}`);
    console.log(`Missing SRI hashes: ${missingCount}`);
    console.log(`HTML warnings: ${htmlWarnings}`);

    if (missingCount === 0 && htmlWarnings === 0) {
      console.log('\n✅ SRI verification passed!');
      console.log('Coverage: 100%');
    } else {
      if (missingCount > 0) {
        console.error('\n❌ SRI verification failed!');
        console.error(`${missingCount} files missing SRI hashes.`);
      }
      if (htmlWarnings > 0) {
        console.warn(`\n⚠ ${htmlWarnings} HTML files have resources without integrity attributes.`);
      }
      exitCode = 1;
    }

    process.exit(exitCode);
  } catch (error) {
    console.error('\n❌ Error during SRI verification:', error.message);
    process.exit(1);
  }
}

main();
