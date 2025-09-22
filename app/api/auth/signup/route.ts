import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, acceptedTerms, acceptedPrivacy } =
      await request.json();

    console.log("Signup attempt for:", email); // Debug log

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    if (!acceptedTerms || !acceptedPrivacy) {
      return NextResponse.json(
        { error: "You must accept the terms of use and privacy policy" },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log("Checking if user exists..."); // Debug log
    const existingUser = await getAdminDb()
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!existingUser.empty) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    console.log("Hashing password..."); // Debug log
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    console.log("Creating user document..."); // Debug log
    // Create user document with your existing schema
    const userRef = getAdminDb().collection("users").doc();
    const uid = userRef.id; // Use the document ID as uid

    await userRef.set({
      email,
      password: hashedPassword,
      displayName: name,
      nickname: name,
      uid: uid,
      emailVerified: false,
      acceptedTerms: true,
      acceptedPrivacy: true,
      acceptedAt: new Date(),
      createdAt: new Date(),
      gender: "",
      useApodo: false,
      useDate: false,
      isPremium: false, // Default to non-premium
    });

    console.log("User document created, storing OTP..."); // Debug log
    // Store OTP with reference to uid
    await getAdminDb().collection("otps").doc(email).set({
      otp,
      expiresAt: otpExpiry,
      userId: uid, // Use uid instead of userRef.id
      createdAt: new Date(),
    });

    console.log("Sending OTP email..."); // Debug log
    // Send OTP email
    try {
      if (!process.env.RESEND_API_KEY!) {
        console.error("RESEND_API_KEY not found");
        return NextResponse.json(
          { error: "Email service not configured. Please contact support." },
          { status: 500 }
        );
      }

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: "Verify your email address",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to IZI World!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for signing up. To complete your registration, please verify your email address using the code below:</p>
            <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
              ${otp}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't create an account, please ignore this email.</p>
            <p>Best regards,<br>IZI World Team</p>
          </div>
        `,
      });

      console.log("OTP email sent successfully"); // Debug log
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Clean up user and OTP if email fails
      await userRef.delete();
      await getAdminDb().collection("otps").doc(email).delete();

      return NextResponse.json(
        {
          error:
            "Failed to send verification email. Please try again or check if your email is valid.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message:
        "Account created successfully. Please check your email for verification code.",
      email,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
