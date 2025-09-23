import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { signIn } from "next-auth/react";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Get OTP document
    const otpDoc = await getAdminDb().collection("otps").doc(email).get();

    if (!otpDoc.exists) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    const otpData = otpDoc.data()!;

    // Check if OTP is expired
    if (new Date() > otpData.expiresAt.toDate()) {
      await otpDoc.ref.delete();
      return NextResponse.json(
        { error: "Verification code has expired" },
        { status: 400 }
      );
    }

    // Check if OTP matches
    if (otpData.otp !== otp) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Find and update user
    const userQuery = await getAdminDb()
      .collection("users")
      .where("uid", "==", otpData.userId)
      .limit(1)
      .get();

    if (userQuery.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();

    // Update user as verified
    await userDoc.ref.update({
      emailVerified: true,
      updatedAt: new Date(),
    });

    // Clean up OTP
    await otpDoc.ref.delete();

    // Return success with user data for auto-login
    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
      user: {
        email: userData.email,
        displayName: userData.displayName,
        emailVerified: true,
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
