const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  });
}

async function uploadLogoToStorage() {
  try {
    console.log("📤 Subiendo logo a Firebase Storage...");

    const bucket = admin.storage().bucket();
    const logoPath = path.join(__dirname, "..", "app", "favicon.png");

    if (!fs.existsSync(logoPath)) {
      console.error("❌ No se encontró el archivo favicon.png");
      return;
    }

    const fileName = "email-logo.png";
    const file = bucket.file(fileName);

    await bucket.upload(logoPath, {
      destination: fileName,
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: admin.storage().bucket()
            .generateSignedPostPolicyV4,
        },
      },
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    console.log("✅ Logo subido exitosamente!");
    console.log("🔗 URL pública:", publicUrl);
    console.log("\n📋 Copia esta URL y úsala en email-templates.ts:");
    console.log(`const LOGO_URL = "${publicUrl}";`);
  } catch (error) {
    console.error("❌ Error subiendo logo:", error);
  }
}

uploadLogoToStorage();
