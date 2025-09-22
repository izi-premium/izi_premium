import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

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
    const otpDoc = await adminDb.collection("otps").doc(email).get();

    if (!otpDoc.exists) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    const otpData = otpDoc.data()!;

    // Check if OTP is expired
    if (new Date() > otpData.expiresAt.toDate()) {
      await adminDb.collection("otps").doc(email).delete();
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new one." },
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

    // Update user as verified
    await adminDb.collection("users").doc(otpData.userId).update({
      emailVerified: true,
      verifiedAt: new Date(),
      updatedAt: new Date(),
    });

    // Delete the OTP
    await adminDb.collection("otps").doc(email).delete();

    return NextResponse.json({
      message: "Email verified successfully. You can now sign in.",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
