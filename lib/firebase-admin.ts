import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
  credential: cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  } as any),
};

// Initialize Firebase Admin
const app =
  getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

// Initialize Firestore Admin
export const adminDb = getFirestore(app);

export default app;
