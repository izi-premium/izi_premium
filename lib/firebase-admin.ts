import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let app: any;
let adminDb: any;

function initializeFirebaseAdmin() {
  if (app) return { app, adminDb };

  // Check if required env vars exist
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY
  ) {
    throw new Error("Missing Firebase Admin environment variables");
  }

  // Clean and format the private key
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Remove quotes if they exist
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  // Replace escaped newlines with actual newlines
  privateKey = privateKey.replace(/\\n/g, "\n");

  // Ensure proper formatting
  if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
    throw new Error("Invalid private key format - missing BEGIN marker");
  }

  if (!privateKey.includes("-----END PRIVATE KEY-----")) {
    throw new Error("Invalid private key format - missing END marker");
  }

  console.log(
    "Initializing Firebase Admin with project:",
    process.env.FIREBASE_PROJECT_ID
  );

  try {
    const firebaseAdminConfig = {
      credential: cert({
        project_id: process.env.FIREBASE_PROJECT_ID,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: privateKey,
      } as any),
    };

    // Initialize Firebase Admin
    app =
      getApps().length === 0
        ? initializeApp(firebaseAdminConfig)
        : getApps()[0];
    adminDb = getFirestore(app);

    console.log("Firebase Admin initialized successfully");
    return { app, adminDb };
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
    throw error;
  }
}

// Export functions that initialize on-demand
export function getAdminDb() {
  const { adminDb } = initializeFirebaseAdmin();
  return adminDb;
}

export function getFirebaseApp() {
  const { app } = initializeFirebaseAdmin();
  return app;
}

// For backward compatibility
export { getAdminDb as adminDb };
