import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import bcrypt from "bcryptjs";

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

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password using uid
    const userQuery = await getAdminDb()
      .collection("users")
      .where("uid", "==", resetData.userId)
      .limit(1)
      .get();

    if (!userQuery.empty) {
      await userQuery.docs[0].ref.update({
        password: hashedPassword,
        updatedAt: new Date(),
      });
    }

    // Delete the reset code
    await getAdminDb().collection("passwordResets").doc(email).delete();

    return NextResponse.json({
      message:
        "Password reset successfully. You can now sign in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
