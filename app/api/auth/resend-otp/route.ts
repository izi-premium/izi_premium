import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists and is not verified
    const userQuery = await getAdminDb()
      .collection("users")
      .where("email", "==", email)
      .where("emailVerified", "==", false)
      .limit(1)
      .get();

    if (userQuery.empty) {
      return NextResponse.json(
        { error: "User not found or already verified" },
        { status: 400 }
      );
    }

    const user = userQuery.docs[0];
    const userData = user.data();

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update or create OTP document
    await getAdminDb().collection("otps").doc(email).set({
      otp,
      expiresAt: otpExpiry,
      userId: user.id,
      createdAt: new Date(),
    });

    // Send OTP email
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: "New verification code for your email",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Email Verification</h2>
            <p>Hi ${userData.name},</p>
            <p>Here's your new verification code:</p>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
              ${otp}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <p>Best regards,<br>IZI World  Team</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "New verification code sent to your email.",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
