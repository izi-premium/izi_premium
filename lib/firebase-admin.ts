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

  const firebaseAdminConfig = {
    credential: cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    } as any),
  };

  // Initialize Firebase Admin
  app =
    getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
  adminDb = getFirestore(app);

  return { app, adminDb };
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
