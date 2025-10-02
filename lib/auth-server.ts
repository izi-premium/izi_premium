import { cookies } from "next/headers";
import { getAdminDb } from "./firebase-admin";

export async function getServerUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("firebase-auth-token");

    if (!token) {
      return null;
    }

    const admin = require("firebase-admin");

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          project_id: process.env.FIREBASE_PROJECT_ID,
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token.value);

    const userDoc = await getAdminDb()
      .collection("users")
      .doc(decodedToken.uid)
      .get();

    if (!userDoc.exists) {
      return null;
    }

    const userData = userDoc.data();

    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      ...userData,
    };
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getServerUser();

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}
