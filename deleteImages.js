require("dotenv").config({ path: ".env.local" }); // Load env variables

const { list, del } = require("@vercel/blob");

const BLOB_TOKEN = process.env.VERCEL_BLOB_READ_WRITE_TOKEN;

if (!BLOB_TOKEN) {
  console.error(
    "Error: No Vercel Blob token found. Check your .env.local file."
  );
  process.exit(1);
}

async function deleteAllImages() {
  try {
    // List all blobs in storage
    const blobs = await list({ token: BLOB_TOKEN });

    if (blobs.blobs.length === 0) {
      console.log("No images found to delete.");
      return;
    }

    // Allowed image formats
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

    // Loop through and delete only image files
    for (const blob of blobs.blobs) {
      if (imageExtensions.some((ext) => blob.url.toLowerCase().endsWith(ext))) {
        await del(blob.url, { token: BLOB_TOKEN });
        console.log(`Deleted: ${blob.url}`);
      }
    }

    console.log("All images deleted successfully!");
  } catch (error) {
    console.error("Error deleting images:", error.message);
  }
}

deleteAllImages();
