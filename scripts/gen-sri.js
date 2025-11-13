#!/usr/bin/env node

/**
 * SRI (Subresource Integrity) Generator
 * Generates SHA-384 hashes for all CSS, JS, and WOFF2 files
 * Outputs to public/integrity.manifest.json
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { createHash } from 'crypto';
import { join, relative } from 'path';

const DIST_DIR = './dist';
const OUTPUT_FILE = './dist/integrity.manifest.json';
const EXTENSIONS = ['.css', '.js', '.woff2'];

/**
 * Generate SRI hash for a file
 */
function generateSRIHash(filePath) {
  const content = readFileSync(filePath);
  const hash = createHash('sha384').update(content).digest('base64');
  return `sha384-${hash}`;
}

/**
 * Recursively find all files with specified extensions
 */
function findFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else {
      const ext = file.substring(file.lastIndexOf('.'));
      if (EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Main execution
 */
try {
  console.log('🔐 Generating SRI hashes...\n');

  const files = findFiles(DIST_DIR);
  const manifest = {};

  files.forEach((filePath) => {
    const relativePath = '/' + relative(DIST_DIR, filePath).replace(/\\/g, '/');
    const hash = generateSRIHash(filePath);

    manifest[relativePath] = {
      integrity: hash,
      algorithm: 'sha384',
    };

    console.log(`✓ ${relativePath}`);
    console.log(`  ${hash}\n`);
  });

  writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

  console.log(`\n✅ SRI manifest generated: ${OUTPUT_FILE}`);
  console.log(`📊 Total files: ${Object.keys(manifest).length}`);
  console.log(`📁 Coverage: CSS, JS, WOFF2\n`);

  process.exit(0);
} catch (error) {
  console.error('❌ Error generating SRI hashes:', error.message);
  process.exit(1);
}
