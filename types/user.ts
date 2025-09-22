import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      emailVerified?: boolean;
      displayName?: string;
      nickname?: string;
      isPremium: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
    emailVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
  }
}
