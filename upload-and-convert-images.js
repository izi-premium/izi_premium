#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { put } from "@vercel/blob";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const IMAGES_FOLDER = path.join(__dirname, "images");
const OUTPUT_JSON = path.join(__dirname, "uploaded-images.json");
const QUALITY = 85; // AVIF quality (1-100) - adjust as needed
const SUPPORTED_FORMATS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".tiff",
  ".bmp",
  ".svg",
  ".avif",
];

/**
 * Get all image files from the images folder
 */
async function getImageFiles() {
  try {
    const files = await fs.readdir(IMAGES_FOLDER);
    return files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_FORMATS.includes(ext);
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Images folder not found: ${IMAGES_FOLDER}`);
    }
    throw error;
  }
}

/**
 * Convert image to AVIF format with optimizations
 */
async function convertToAvif(inputPath, quality = QUALITY) {
  const buffer = await sharp(inputPath)
    .avif({
      quality,
      effort: 6, // Faster encoding (0-9, lower = faster)
    })
    .toBuffer();

  return buffer;
}

/**
 * Upload buffer to Vercel Blob
 */
async function uploadToVercelBlob(buffer, filename) {
  const token = process.env.VERCEL_BLOB_READ_WRITE_TOKEN;

  if (!token) {
    throw new Error(
      "VERCEL_BLOB_READ_WRITE_TOKEN not found in environment variables"
    );
  }

  try {
    const blob = await put(filename, buffer, {
      access: "public",
      token: token,
    });

    return blob.url;
  } catch (error) {
    throw new Error(`Failed to upload ${filename}: ${error.message}`);
  }
}

/**
 * Clean filename by removing size suffixes
 */
function cleanFilename(filename) {
  const ext = path.extname(filename);
  const nameWithoutExt = path.parse(filename).name;

  // Remove size suffixes: -1440px, -768px, -sm
  const cleanName = nameWithoutExt
    .replace(/-1440px$/i, "")
    .replace(/-768px$/i, "")
    .replace(/-sm$/i, "");

  return cleanName + ext;
}

/**
 * Process a single image with error handling
 */
async function processImage(filename) {
  const inputPath = path.join(IMAGES_FOLDER, filename);
  const fileExt = path.extname(filename).toLowerCase();
  const nameWithoutExt = path.parse(filename).name;

  console.log(`🔄 Processing: ${filename}`);

  try {
    let buffer;
    let uploadFilename;

    if (fileExt === ".svg") {
      // For SVG files, read directly without conversion and clean filename
      buffer = await fs.readFile(inputPath);
      uploadFilename = cleanFilename(filename);
      console.log(
        `✅ Completed: ${filename} → ${uploadFilename} (uploaded as SVG)`
      );
    } else {
      // For other formats, convert to AVIF and clean filename
      const cleanName = path.parse(cleanFilename(filename)).name;
      const avifFilename = `${cleanName}.avif`;
      buffer = await convertToAvif(inputPath, QUALITY);
      uploadFilename = avifFilename;
      console.log(`✅ Completed: ${filename} → ${uploadFilename}`);
    }

    const uploadUrl = await uploadToVercelBlob(buffer, uploadFilename);

    return {
      originalFilename: filename,
      uploadedFilename: uploadFilename,
      url: uploadUrl,
      fileType: fileExt === ".svg" ? "svg" : "avif",
      quality: fileExt === ".svg" ? "original" : QUALITY,
      processedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`❌ Failed: ${filename} - ${error.message}`);
    return {
      originalFilename: filename,
      error: error.message,
      processedAt: new Date().toISOString(),
    };
  }
}

/**
 * Save results to JSON file
 */
async function saveResults(results) {
  // Create simple object with uploaded filename -> URL mapping
  const imageUrls = {};
  const successful = results.filter((r) => !r.error);

  successful.forEach((result) => {
    // Use the uploaded filename (without extension) as the key
    const nameWithoutExt = path.parse(result.uploadedFilename).name;
    imageUrls[nameWithoutExt] = result.url;
  });

  await fs.writeFile(OUTPUT_JSON, JSON.stringify(imageUrls, null, 2));
  console.log(`\n📄 Image URLs saved to: ${OUTPUT_JSON}`);
}

/**
 * Main execution function
 */
async function main() {
  console.log("🚀 Starting image processing and upload...\n");

  try {
    // Check if token exists
    if (!process.env.VERCEL_BLOB_READ_WRITE_TOKEN) {
      throw new Error(
        "VERCEL_BLOB_READ_WRITE_TOKEN not found in .env.local file"
      );
    }

    // Get all image files
    const imageFiles = await getImageFiles();

    if (imageFiles.length === 0) {
      console.log("No supported image files found in the images folder.");
      return;
    }

    console.log(`Found ${imageFiles.length} image(s) to process:\n`);

    // Separate SVG and raster images for logging
    const svgFiles = imageFiles.filter(
      (file) => path.extname(file).toLowerCase() === ".svg"
    );
    const rasterFiles = imageFiles.filter(
      (file) => path.extname(file).toLowerCase() !== ".svg"
    );

    if (rasterFiles.length > 0) {
      console.log(`  Raster images (will convert to AVIF):`);
      rasterFiles.forEach((file) => console.log(`    - ${file}`));
    }

    if (svgFiles.length > 0) {
      console.log(`  SVG images (will upload as-is):`);
      svgFiles.forEach((file) => console.log(`    - ${file}`));
    }

    console.log("");

    // Process all images concurrently
    console.log("Processing all images concurrently...\n");
    const results = await Promise.all(
      imageFiles.map((filename) => processImage(filename))
    );

    // Save results
    await saveResults(results);

    // Summary
    const successful = results.filter((r) => !r.error);
    const failed = results.filter((r) => r.error);

    console.log("\n📊 Processing Summary:");
    console.log(`  Total images: ${results.length}`);
    console.log(`  Successful: ${successful.length}`);
    console.log(`  Failed: ${failed.length}`);

    if (successful.length > 0) {
      console.log("\n✅ Successfully uploaded URLs:");
      successful.forEach((result) => {
        console.log(`  ${result.originalFilename} → ${result.url}`);
      });
    }

    if (failed.length > 0) {
      console.log("\n❌ Failed uploads:");
      failed.forEach((result) => {
        console.log(`  ${result.originalFilename}: ${result.error}`);
      });
    }

    console.log("\n🎉 Process completed!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
