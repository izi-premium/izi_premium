"use client";

import { auth } from "@/lib/firebase-auth";
import { User, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a FirebaseAuthProvider");
  }
  return context;
}

interface FirebaseAuthProviderProps {
  children: React.ReactNode;
}

export function FirebaseAuthProvider({ children }: FirebaseAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setUser(user);
        setLoading(false);
        setError(null);

        if (user) {
          try {
            const token = await user.getIdToken();
            document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; secure; samesite=strict`;
          } catch (error) {
            console.error("Error getting ID token:", error);
          }
        } else {
          document.cookie =
            "firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      },
      (error) => {
        console.error("Firebase Auth Error:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
