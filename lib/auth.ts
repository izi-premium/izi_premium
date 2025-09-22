import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAdminDb } from "@/lib/firebase-admin";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Get user from Firestore using email
          const userDoc = await getAdminDb()
            .collection("users")
            .where("email", "==", credentials.email)
            .limit(1)
            .get();

          if (userDoc.empty) {
            return null;
          }

          const user = userDoc.docs[0];
          const userData = user.data();

          // Check if email is verified
          if (!userData.emailVerified) {
            throw new Error("Please verify your email before signing in");
          }

          // Check password
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            userData.password
          );

          if (passwordMatch) {
            return {
              id: userData.uid,
              email: userData.email,
              name: userData.displayName,
              displayName: userData.displayName,
              nickname: userData.nickname,
              emailVerified: userData.emailVerified,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user already exists
          const existingUserQuery = await getAdminDb()
            .collection("users")
            .where("email", "==", user.email)
            .limit(1)
            .get();

          if (existingUserQuery.empty) {
            // Generate a unique uid for the new user
            const newUserRef = getAdminDb().collection("users").doc();
            const uid = newUserRef.id;

            // Create new user with your existing schema
            await newUserRef.set({
              email: user.email,
              displayName: user.name || "",
              nickname: user.name || "",
              uid: uid,
              createdAt: new Date(),
              gender: "",
              useApodo: false,
              useDate: false,
              emailVerified: true, // Google users are pre-verified
              // No password field for Google users
            });

            // Update the user object with the generated uid
            user.id = uid;
          } else {
            // Update existing user as verified and get their uid
            const existingUser = existingUserQuery.docs[0];
            const userData = existingUser.data();

            await existingUser.ref.update({
              emailVerified: true,
              updatedAt: new Date(),
            });

            // Use the existing user's uid
            user.id = userData.uid;
          }
        } catch (error) {
          console.error("Error handling Google signin:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;

        // Get additional user data from Firestore using uid
        try {
          const userQuery = await getAdminDb()
            .collection("users")
            .where("uid", "==", token.sub)
            .limit(1)
            .get();

          if (!userQuery.empty) {
            const userData = userQuery.docs[0].data();
            session.user.displayName = userData.displayName;
            session.user.nickname = userData.nickname;
            session.user.emailVerified = userData.emailVerified;
            // Add premium status check here
            session.user.isPremium = userData.isPremium || false;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
};
