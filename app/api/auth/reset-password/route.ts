import { getAdminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, resetCode, newPassword } = await request.json();

    if (!email || !resetCode || !newPassword) {
      return NextResponse.json(
        { error: "Email, reset code, and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Get reset code document
    const resetDoc = await getAdminDb()
      .collection("passwordResets")
      .doc(email)
      .get();

    if (!resetDoc.exists) {
      return NextResponse.json(
        { error: "Invalid or expired reset code" },
        { status: 400 }
      );
    }

    const resetData = resetDoc.data()!;

    // Check if reset code is expired
    if (new Date() > resetData.expiresAt.toDate()) {
      await getAdminDb().collection("passwordResets").doc(email).delete();
      return NextResponse.json(
        { error: "Reset code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if reset code matches
    if (resetData.resetCode !== resetCode) {
      return NextResponse.json(
        { error: "Invalid reset code" },
        { status: 400 }
      );
    }

    // Inicializar Firebase Admin
    const admin = require("firebase-admin");

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          project_id: process.env.FIREBASE_PROJECT_ID,
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
    }

    // CRÍTICO: Actualizar la contraseña en Firebase Auth (no en Firestore)
    // Firebase Auth maneja las contraseñas directamente, no las almacena en Firestore
    try {
      await admin.auth().updateUser(resetData.userId, {
        password: newPassword,
      });
    } catch (authError: any) {
      // Si el usuario no tiene proveedor de email/password, intentar crear uno
      if (
        authError.code === "auth/invalid-provider-data" ||
        authError.message?.includes("provider")
      ) {
        // Verificar si el usuario existe
        try {
          const userRecord = await admin.auth().getUser(resetData.userId);

          // Si el usuario no tiene proveedor de email/password, crear uno
          if (
            !userRecord.providerData.some(
              (p: any) => p.providerId === "password"
            )
          ) {
            // Obtener el email del usuario
            const emailToUse = userRecord.email || email;

            // Crear el proveedor de email/password
            await admin.auth().updateUser(resetData.userId, {
              email: emailToUse,
              password: newPassword,
              emailVerified: userRecord.emailVerified || false,
            });
          }
        } catch (getUserError: any) {
          return NextResponse.json(
            {
              error:
                "Error al actualizar la contraseña. Por favor, contacta al soporte.",
            },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          {
            error:
              "Error al actualizar la contraseña. Por favor, intenta de nuevo.",
          },
          { status: 500 }
        );
      }
    }

    // Actualizar Firestore (opcional, solo para referencia)
    const userQuery = await getAdminDb()
      .collection("users")
      .where("uid", "==", resetData.userId)
      .limit(1)
      .get();

    if (!userQuery.empty) {
      await userQuery.docs[0].ref.update({
        updatedAt: new Date(),
      });
    }

    // Delete the reset code
    await getAdminDb().collection("passwordResets").doc(email).delete();

    return NextResponse.json({
      message:
        "Password reset successfully. You can now sign in with your new password.",
    });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
