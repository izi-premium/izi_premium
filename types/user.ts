// export interface User {
//   uid: string;
//   email: string;
//   displayName: string;
//   nickname: string;
//   birthDate?: Date;
//   createdAt: Date;
//   gender: string;
//   useApodo: boolean;
//   useDate: boolean;
//   // Subscription fields
//   plan: "free" | "premium";
//   subscriptionStartDate?: Date;
//   subscriptionEndDate?: Date;
//   paymentDate?: Date;
//   stripeCustomerId?: string;
//   stripeSubscriptionId?: string;
// }

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
