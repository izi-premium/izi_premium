// import { NextRequest, NextResponse } from "next/server";
// // import { auth } from "@clerk/nextjs/server";
// import { adminDb } from "../../../lib/firebase-admin";

// export async function GET(req: NextRequest) {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ isPremium: false }, { status: 200 });
//     }

//     // Check user's premium status in Firebase
//     const userDoc = await adminDb.collection("users").doc(userId).get();

//     if (!userDoc.exists) {
//       return NextResponse.json({ isPremium: false }, { status: 200 });
//     }

//     const userData = userDoc.data();
//     const isPremium = userData?.plan === "premium";

//     return NextResponse.json({ isPremium });
//   } catch (error) {
//     console.error("Error checking premium status:", error);
//     return NextResponse.json({ isPremium: false }, { status: 200 });
//   }
// }
