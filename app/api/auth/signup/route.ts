import { getWelcomeEmailTemplate } from "@/lib/email-templates";
import { getAdminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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
        tags: ["signup-registration"], // Tag to identify source
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`Successfully subscribed ${email} to newsletter`);
      return { success: true, error: null };
    } else {
      // Don't fail the entire signup if newsletter subscription fails
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

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      name,
      acceptedTerms,
      acceptedPrivacy,
      subscribeNewsletter,
      language = "es",
    } = await request.json();

    console.log("Signup attempt for:", email);
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
    console.log("RESEND_FROM_EMAIL:", process.env.RESEND_FROM_EMAIL);

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

    // Check if user already exists in Firebase Auth
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

    // Create user in Firebase Auth
    const admin = require("firebase-admin");
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
      emailVerified: false,
    });

    console.log("User created in Firebase Auth with UID:", userRecord.uid);

    // Create user document in Firestore
    const userRef = getAdminDb().collection("users").doc(userRecord.uid);
    await userRef.set({
      uid: userRecord.uid,
      email,
      displayName: name,
      nickname: name,
      emailVerified: false,
      acceptedTerms: true,
      acceptedPrivacy: true,
      subscribeNewsletter: subscribeNewsletter || false,
      acceptedAt: new Date(),
      createdAt: new Date(),
      gender: "",
      useApodo: false,
      useDate: false,
      isPremium: false,
      birthDate: "",
      genderToTalk: "",
      idioma: language,
      premiumEndsAt: null,
      newsletterSubscribed: false,
      newsletterSubscribedAt: null,
    });

    // Handle newsletter subscription if requested
    let newsletterResult = { success: false, error: null };
    if (subscribeNewsletter) {
      console.log("Subscribing to newsletter...");
      newsletterResult = await subscribeToNewsletter(email, name);

      // Update user document with newsletter subscription status
      await userRef.update({
        newsletterSubscribed: newsletterResult.success,
        newsletterSubscribedAt: newsletterResult.success ? new Date() : null,
        newsletterError: newsletterResult.error,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await getAdminDb().collection("otps").doc(email).set({
      otp,
      expiresAt: otpExpiry,
      userId: userRecord.uid,
      createdAt: new Date(),
    });

    try {
      const resend = new Resend(process.env.RESEND_API_KEY!);

      if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY not found");
        return NextResponse.json(
          { error: "Email service not configured. Please contact support." },
          { status: 500 }
        );
      }

      // Get email template based on language
      const emailTemplate = getWelcomeEmailTemplate(
        name,
        otp,
        language,
        subscribeNewsletter,
        newsletterResult
      );

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });

      console.log("Welcome email with OTP sent successfully");
    } catch (emailError: any) {
      console.error("Error sending welcome email:", emailError);
      console.error("Email error details:", emailError.message);
      // Don't fail the signup if welcome email fails
    }

    // Return success response
    const response: any = {
      message:
        "Account created successfully. Please check your email for verification.",
      email,
      uid: userRecord.uid,
    };

    // Add newsletter information to response
    if (subscribeNewsletter) {
      response.newsletterSubscribed = newsletterResult.success;
      if (!newsletterResult.success) {
        response.newsletterError =
          "Newsletter subscription failed, but your account was created successfully.";
      }
    }

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("Signup error:", error);

    // Handle Firebase Auth specific errors
    if (error.code === "auth/email-already-exists") {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    if (error.code === "auth/invalid-email") {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (error.code === "auth/weak-password") {
      return NextResponse.json(
        { error: "Password is too weak" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
