import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAdminDb } from "@/lib/firebase-admin";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

// Helper function to subscribe user to newsletter
async function subscribeToNewsletter(email: string, name: string) {
  try {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    if (!apiKey) {
      console.error("Mailchimp API key not found");
      return { success: false, error: "Newsletter service unavailable" };
    }

    const dataCenter = apiKey.split("-").pop();
    const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name.split(" ")[0] || name, // First name
          LNAME: name.split(" ").slice(1).join(" ") || "", // Last name
        },
        tags: ["google-oauth-signup"], // Tag to identify source
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(
        `Successfully subscribed ${email} to newsletter via Google OAuth`
      );
      return { success: true };
    } else {
      console.error("Newsletter subscription failed:", data);
      return {
        success: false,
        error: data.detail || "Newsletter subscription failed",
      };
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: "Newsletter service error" };
  }
}

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
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        try {
          // Check if user already exists
          const existingUserQuery = await getAdminDb()
            .collection("users")
            .where("email", "==", user.email)
            .limit(1)
            .get();

          let isNewUser = false;
          let userDoc;

          if (existingUserQuery.empty) {
            // Generate a unique uid for the new user
            const newUserRef = getAdminDb().collection("users").doc();
            const uid = newUserRef.id;
            isNewUser = true;

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
              isPremium: false,
              birthDate: "",
              genderToTalk: "",
              idioma: "",
              premiumEndsAt: null,
              subscribeNewsletter: false, // Default to false, will be updated if needed
              newsletterSubscribed: false,
              newsletterSubscribedAt: null,
            });

            // Update the user object with the generated uid
            user.id = uid;
            userDoc = newUserRef;
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
            userDoc = existingUser.ref;
          }

          // Check if user opted for newsletter during Google signup
          // This will be set by the frontend cookie before initiating Google OAuth
          if (isNewUser) {
            // Note: We can't read cookies directly in NextAuth callbacks
            // Instead, we'll handle this in a separate API route that gets called after OAuth
            console.log(
              "New Google OAuth user created, will check for newsletter preference"
            );
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
    async redirect({ url, baseUrl }) {
      console.log("🔍 REDIRECT DEBUG:");
      console.log("- url:", url);
      console.log("- baseUrl:", baseUrl);

      // Force redirect to home page if the URL contains dashboard
      if (url.includes("/dashboard")) {
        console.log("🚫 Intercepting dashboard redirect, forcing to home");
        return baseUrl + "/";
      }

      // If the URL is relative, prepend baseUrl
      if (url.startsWith("/")) {
        const fullUrl = `${baseUrl}${url}`;
        console.log("- Relative URL, returning:", fullUrl);
        return fullUrl;
      }

      // Parse the URL to check for redirect parameters
      try {
        const urlObj = new URL(url);

        // Check for redirect parameter in the current URL
        const redirectParam = urlObj.searchParams.get("redirect");
        if (redirectParam) {
          console.log("- Found redirect param:", redirectParam);
          return redirectParam.startsWith("/")
            ? `${baseUrl}${redirectParam}`
            : redirectParam;
        }

        // Check for callbackUrl parameter
        const callbackUrl = urlObj.searchParams.get("callbackUrl");
        if (callbackUrl) {
          console.log("- Found callbackUrl param:", callbackUrl);
          return callbackUrl.startsWith("/")
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl;
        }

        // If URL is from the same host, check if it's dashboard and redirect to home
        if (url.startsWith(baseUrl)) {
          if (url.includes("/dashboard")) {
            console.log("🚫 Same host dashboard URL, redirecting to home");
            return baseUrl + "/";
          }
          console.log("- Same host URL, allowing:", url);
          return url;
        }
      } catch (error) {
        console.error("Error parsing redirect URL:", error);
      }

      // Default redirect to home page
      console.log("- Defaulting to home page");
      return baseUrl + "/";
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  // Explicitly set default redirect
  events: {
    async signIn(message) {
      console.log("NextAuth signIn event:", message);
    },
    async signOut(message) {
      console.log("NextAuth signOut event:", message);
    },
  },
};
