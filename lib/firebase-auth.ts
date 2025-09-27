import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const app =
  getApps().length === 0
    ? initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      })
    : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  isPremium?: boolean;
  premiumEndsAt?: Date | null;
}

export async function createOrUpdateUserInFirestore(
  user: User,
  additionalData?: any
) {
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      nickname: user.displayName || "",
      emailVerified: user.emailVerified,
      createdAt: userSnap.exists() ? userSnap.data().createdAt : new Date(),
      updatedAt: new Date(),
      ...additionalData,
    };

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        ...userData,
        gender: "",
        useApodo: false,
        useDate: false,
        isPremium: false,
        birthDate: "",
        genderToTalk: "",
        idioma: "",
        premiumEndsAt: null,
        subscribeNewsletter: false,
        newsletterSubscribed: false,
        newsletterSubscribedAt: null,
      });
    } else {
      await updateDoc(userRef, userData);
    }
  } catch (error: any) {
    console.error("Error en createOrUpdateUserInFirestore:", error);
    throw error;
  }
}

export async function loginWithEmail(
  email: string,
  password: string,
  language: string = "es"
) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!userCredential.user.emailVerified) {
      await signOut(auth);
      const message =
        language === "en"
          ? "Your email is not verified. Please verify your email before signing in."
          : "Tu email no está verificado. Por favor, verifica tu email antes de iniciar sesión.";
      return {
        user: null,
        error: "email-not-verified",
        message,
      };
    }

    await createOrUpdateUserInFirestore(userCredential.user);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    const friendlyMessage = getFirebaseErrorMessage(error.code);
    return { user: null, error: friendlyMessage };
  }
}

// registerWithEmail removed - now handled by API route /api/auth/signup

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createOrUpdateUserInFirestore(result.user);
    return { user: result.user, error: null };
  } catch (error: any) {
    const friendlyMessage = getFirebaseErrorMessage(error.code);
    return { user: null, error: friendlyMessage };
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error: any) {
    const friendlyMessage = getFirebaseErrorMessage(error.code);
    return { success: false, error: friendlyMessage };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    const friendlyMessage = getFirebaseErrorMessage(error.code);
    return { success: false, error: friendlyMessage };
  }
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export function getFirebaseErrorMessage(errorCode: string): string {
  const errorMessages: { [key: string]: string } = {
    "auth/email-already-in-use":
      "Este correo electrónico ya está registrado. Intenta iniciar sesión o usa otro correo.",
    "auth/weak-password":
      "La contraseña es muy débil. Debe tener al menos 6 caracteres.",
    "auth/invalid-email": "El formato del correo electrónico no es válido.",
    "auth/user-not-found": "No existe una cuenta con este correo electrónico.",
    "auth/wrong-password": "La contraseña es incorrecta.",
    "auth/too-many-requests":
      "Demasiados intentos fallidos. Intenta de nuevo más tarde.",
    "auth/network-request-failed":
      "Error de conexión. Verifica tu internet e intenta de nuevo.",
    "auth/invalid-credential": "Las credenciales no son válidas.",
    "auth/user-disabled": "Esta cuenta ha sido deshabilitada.",
    "auth/operation-not-allowed": "Esta operación no está permitida.",
    "auth/requires-recent-login":
      "Por seguridad, necesitas iniciar sesión nuevamente.",
  };

  return (
    errorMessages[errorCode] ||
    "Ha ocurrido un error inesperado. Intenta de nuevo."
  );
}
