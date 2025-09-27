import { getNewsletterWelcomeEmailTemplate } from "@/lib/email-templates";
import { getAdminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  let language = "es";
  try {
    const requestData = await request.json();
    const { email, language: requestLanguage = "es" } = requestData;
    language = requestLanguage;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    if (!apiKey) {
      throw new Error("Mailchimp API key not found");
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
        merge_fields: {},
      }),
    });

    const data = await response.json();

    if (response.ok) {
      try {
        const userQuery = await getAdminDb()
          .collection("users")
          .where("email", "==", email)
          .limit(1)
          .get();

        if (!userQuery.empty) {
          const userDoc = userQuery.docs[0];
          await userDoc.ref.update({
            newsletterSubscribed: true,
            newsletterSubscribedAt: new Date(),
            updatedAt: new Date(),
          });
          console.log("Updated newsletter status in Firestore for:", email);
        }
      } catch (firestoreError) {
        console.error("Error updating Firestore:", firestoreError);
      }

      try {
        const resend = new Resend(process.env.RESEND_API_KEY!);
        const emailTemplate = getNewsletterWelcomeEmailTemplate(
          email,
          language
        );

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: email,
          subject: emailTemplate.subject,
          html: emailTemplate.html,
        });

        console.log("Newsletter welcome email sent successfully to:", email);
      } catch (emailError) {
        console.error("Error sending newsletter welcome email:", emailError);
      }

      const successMessage =
        language === "en"
          ? "Successfully subscribed to newsletter!"
          : "¡Te has suscrito exitosamente a la newsletter!";

      return NextResponse.json({ message: successMessage }, { status: 200 });
    } else {
      if (data.title === "Member Exists") {
        const alreadySubscribedMessage =
          language === "en"
            ? "This email is already subscribed!"
            : "¡Este email ya está suscrito!";

        return NextResponse.json(
          { message: alreadySubscribedMessage },
          { status: 400 }
        );
      } else if (data.title === "Invalid Resource") {
        const invalidEmailMessage =
          language === "en"
            ? "Invalid email address"
            : "Dirección de email inválida";

        return NextResponse.json(
          { message: invalidEmailMessage },
          { status: 400 }
        );
      } else {
        console.error("Mailchimp API error:", data);
        const errorMessage =
          language === "en"
            ? data.detail || "Failed to subscribe. Please try again."
            : "Error al suscribirse. Por favor, inténtalo de nuevo.";

        return NextResponse.json({ message: errorMessage }, { status: 400 });
      }
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    const errorMessage =
      language === "en"
        ? "Internal server error. Please try again later."
        : "Error interno del servidor. Por favor, inténtalo más tarde.";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
