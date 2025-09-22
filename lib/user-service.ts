import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { adminDb } from "./firebase-admin";
import { User } from "../types/user";

export class UserService {
  // Get user data (server-side)
  static async getUserById(uid: string): Promise<User | null> {
    try {
      const userDoc = await adminDb.collection("users").doc(uid).get();
      if (!userDoc.exists) return null;

      const data = userDoc.data();
      return {
        ...data,
        birthDate: data?.birthDate?.toDate(),
        createdAt: data?.createdAt?.toDate(),
        subscriptionStartDate: data?.subscriptionStartDate?.toDate(),
        subscriptionEndDate: data?.subscriptionEndDate?.toDate(),
        paymentDate: data?.paymentDate?.toDate(),
      } as User;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  // Update user subscription (server-side)
  static async updateSubscription(
    uid: string,
    plan: "free" | "premium",
    subscriptionEndDate?: Date,
    stripeCustomerId?: string,
    stripeSubscriptionId?: string
  ): Promise<void> {
    try {
      const updateData: any = {
        plan,
        paymentDate: new Date(),
      };

      if (plan === "premium" && subscriptionEndDate) {
        updateData.subscriptionStartDate = new Date();
        updateData.subscriptionEndDate = subscriptionEndDate;
      } else if (plan === "free") {
        updateData.subscriptionStartDate = null;
        updateData.subscriptionEndDate = null;
        updateData.stripeSubscriptionId = null;
      }

      if (stripeCustomerId) {
        updateData.stripeCustomerId = stripeCustomerId;
      }

      if (stripeSubscriptionId) {
        updateData.stripeSubscriptionId = stripeSubscriptionId;
      }

      await adminDb.collection("users").doc(uid).update(updateData);
    } catch (error) {
      console.error("Error updating subscription:", error);
      throw error;
    }
  }

  // Check if user has active premium subscription
  static async hasActivePremium(uid: string): Promise<boolean> {
    const user = await this.getUserById(uid);
    if (!user || user.plan !== "premium") return false;

    if (!user.subscriptionEndDate) return false;

    return user.subscriptionEndDate > new Date();
  }

  // Get user data (client-side)
  static async getUserByIdClient(uid: string): Promise<User | null> {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return null;

      const data = userSnap.data();
      return {
        ...data,
        birthDate: data?.birthDate?.toDate(),
        createdAt: data?.createdAt?.toDate(),
        subscriptionStartDate: data?.subscriptionStartDate?.toDate(),
        subscriptionEndDate: data?.subscriptionEndDate?.toDate(),
        paymentDate: data?.paymentDate?.toDate(),
      } as User;
    } catch (error) {
      console.error("Error getting user (client):", error);
      return null;
    }
  }
}
