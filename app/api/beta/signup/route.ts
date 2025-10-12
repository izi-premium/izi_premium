import { getAdminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name, platform, language = "es" } = await request.json();

    console.log("Beta signup request for:", email, "Platform:", platform);

    if (!email || !platform) {
      return NextResponse.json(
        { error: "Email and platform are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const existingBetaSignup = await getAdminDb()
      .collection("betaSignups")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!existingBetaSignup.empty) {
      return NextResponse.json(
        {
          error: "Email already registered for beta",
          alreadyRegistered: true,
          message: "Your email is already on our beta list",
        },
        { status: 200 }
      );
    }

    const betaSignupRef = await getAdminDb().collection("betaSignups").add({
      email,
      platform,
      language,
      status: "pending",
      source: "website",
      createdAt: new Date(),
      acceptedAt: null,
    });

    console.log("Beta signup created with ID:", betaSignupRef.id);

    try {
      await sendBetaConfirmationEmail(email, platform, language);
    } catch (emailError) {
      console.error("Failed to send beta confirmation email:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully registered for beta access",
        betaSignupId: betaSignupRef.id,
        email: email,
        platform: platform,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Beta signup error:", error);
    return NextResponse.json(
      {
        error: "Failed to register for beta",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function sendBetaConfirmationEmail(
  email: string,
  platform: string,
  language: string = "es"
) {
  try {
    const platformName = platform === "ios" ? "iOS" : "Android";

    const subject =
      language === "es"
        ? "¡Gracias por unirte a la Beta de IZI World! 🚀"
        : "Thanks for joining IZI World Beta! 🚀";

    const htmlContent =
      language === "es"
        ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6366f1; text-align: center;">¡Bienvenido a IZI World Beta! 🎉</h1>
        <p style="font-size: 16px; color: #333;">Hola,</p>
        <p style="font-size: 16px; color: #333;">
          ¡Gracias por registrarte para acceso anticipado a IZI World! Estamos emocionados de tenerte como parte de nuestra comunidad beta.
        </p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #6366f1; margin-top: 0;">Detalles de tu registro:</h3>
          <p style="color: #333; font-size: 15px; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="color: #333; font-size: 15px; margin: 5px 0;"><strong>Plataforma:</strong> ${platformName}</p>
        </div>
        <p style="font-size: 16px; color: #333;">
          Te notificaremos tan pronto como tu acceso esté listo para ${platformName}. Mientras tanto, estamos trabajando duro para ofrecerte la mejor experiencia.
        </p>
        <p style="font-size: 16px; color: #333;">
          ¡Nos vemos pronto!
        </p>
        <p style="font-size: 16px; color: #333;">
          Con cariño,<br>
          <strong>El equipo de IZI World</strong>
        </p>
      </div>
    `
        : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6366f1; text-align: center;">Welcome to IZI World Beta! 🎉</h1>
        <p style="font-size: 16px; color: #333;">Hi there,</p>
        <p style="font-size: 16px; color: #333;">
          Thank you for signing up for early access to IZI World! We're excited to have you as part of our beta community.
        </p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #6366f1; margin-top: 0;">Your registration details:</h3>
          <p style="color: #333; font-size: 15px; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="color: #333; font-size: 15px; margin: 5px 0;"><strong>Platform:</strong> ${platformName}</p>
        </div>
        <p style="font-size: 16px; color: #333;">
          We'll notify you as soon as your ${platformName} access is ready. In the meantime, we're working hard to bring you the best experience possible.
        </p>
        <p style="font-size: 16px; color: #333;">
          See you soon!
        </p>
        <p style="font-size: 16px; color: #333;">
          With love,<br>
          <strong>The IZI World Team</strong>
        </p>
      </div>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Failed to send beta confirmation email");
      throw new Error("Email sending failed");
    } else {
      console.log("Beta confirmation email sent successfully to:", email);
    }
  } catch (error) {
    console.error("Error sending beta confirmation email:", error);
    throw error;
  }
}
