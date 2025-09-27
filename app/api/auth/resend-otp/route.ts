import { getResendOtpEmailTemplate } from "@/lib/email-templates";
import { getAdminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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
    const resend = new Resend(process.env.RESEND_API_KEY!);

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

    // Get user language from Firestore
    const userLanguage = userData.idioma || "es";
    const userName = userData.name || userData.nickname || "Usuario";

    // Get email template based on language
    const emailTemplate = getResendOtpEmailTemplate(
      userName,
      otp,
      userLanguage
    );

    // Send OTP email
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
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
