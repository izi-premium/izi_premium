import { getPasswordResetEmailTemplate } from "@/lib/email-templates";
import { getAdminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { email, language = "es" } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const userQuery = await getAdminDb()
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (userQuery.empty) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message:
          "If an account with that email exists, we sent a password reset link.",
      });
    }

    const user = userQuery.docs[0];
    const userData = user.data();

    // Verificar que el usuario tenga un UID válido
    if (!userData.uid) {
      console.error("User does not have a uid:", email);
      return NextResponse.json({
        message:
          "If an account with that email exists, we sent a password reset link.",
      });
    }

    // Generate reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

    // Store reset code in Firestore - usar el UID de Firebase Auth, no el ID del documento
    await getAdminDb().collection("passwordResets").doc(email).set({
      resetCode,
      expiresAt: resetExpiry,
      userId: userData.uid, // Usar el UID de Firebase Auth, no user.id (que es el doc ID)
      createdAt: new Date(),
    });

    // Get user language and name
    const userLanguage = userData.idioma || language;
    const userName = userData.name || userData.nickname || "Usuario";

    // Get email template based on language
    const emailTemplate = getPasswordResetEmailTemplate(
      userName,
      resetCode,
      userLanguage
    );

    // Send reset email using Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY!);

      if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY not found");
        return NextResponse.json(
          { error: "Email service not configured. Please contact support." },
          { status: 500 }
        );
      }

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });

      console.log("Password reset email sent successfully to:", email);

      return NextResponse.json({
        message:
          "If an account with that email exists, we sent a password reset link.",
      });
    } catch (emailError: any) {
      console.error("Error sending password reset email:", emailError);
      return NextResponse.json(
        { error: "Failed to send reset email. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
