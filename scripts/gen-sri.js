#!/usr/bin/env node
/**
 * SRI (Subresource Integrity) Hash Generator
 * Generates SHA-384 and SHA-512 hashes for CSS, JS, and WOFF2 files
 * Outputs integrity.manifest.json for reference
 */

import { createHash } from 'crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const DIST_DIR = './dist';
const OUTPUT_FILE = './dist/integrity.manifest.json';
const HASH_ALGORITHMS = ['sha384', 'sha512'];
const TARGET_EXTENSIONS = ['.css', '.js', '.woff2'];

/**
 * Generate SRI hash for a file
 */
function generateSRI(filePath, algorithms = ['sha384']) {
  try {
    const fileBuffer = readFileSync(filePath);
    const hashes = {};

    algorithms.forEach((alg) => {
      const hash = createHash(alg).update(fileBuffer).digest('base64');
      hashes[alg] = `${alg}-${hash}`;
    });

    return hashes;
  } catch (error) {
    console.error(`Error generating SRI for ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Recursively find all files with target extensions
 */
function findTargetFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
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
 * Main execution
 */
function main() {
  console.log('🔐 Generating SRI hashes...\n');

  try {
    const files = findTargetFiles(DIST_DIR);
    const manifest = {
      generated: new Date().toISOString(),
      algorithms: HASH_ALGORITHMS,
      files: {},
    };

    let successCount = 0;
    let failCount = 0;

    files.forEach((filePath) => {
      const relativePath = relative(DIST_DIR, filePath);
      const hashes = generateSRI(filePath, HASH_ALGORITHMS);

      if (hashes) {
        manifest.files[`/${relativePath.replace(/\\/g, '/')}`] = hashes;
        console.log(`✓ ${relativePath}`);
        successCount++;
      } else {
        console.error(`✗ ${relativePath}`);
        failCount++;
      }
    });

    // Write manifest
    writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

    console.log(`\n📝 Manifest written to: ${OUTPUT_FILE}`);
    console.log(`\n✅ Success: ${successCount} files`);
    if (failCount > 0) {
      console.error(`❌ Failed: ${failCount} files`);
      process.exit(1);
    }

    console.log('\n🎉 SRI generation complete!');
  } catch (error) {
    console.error('\n❌ Error during SRI generation:', error.message);
    process.exit(1);
  }
}

main();
