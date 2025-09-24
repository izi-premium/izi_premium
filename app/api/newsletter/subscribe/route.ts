import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
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

    // The data center is the part after the last dash in your API key
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
        status: "subscribed", // Use "pending" if you want double opt-in
        merge_fields: {
          // Add any additional fields you want to capture
          // FNAME: firstName,
          // LNAME: lastName,
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(
        { message: "Successfully subscribed to newsletter!" },
        { status: 200 }
      );
    } else {
      // Handle specific Mailchimp errors
      if (data.title === "Member Exists") {
        return NextResponse.json(
          { message: "This email is already subscribed!" },
          { status: 400 }
        );
      } else if (data.title === "Invalid Resource") {
        return NextResponse.json(
          { message: "Invalid email address" },
          { status: 400 }
        );
      } else {
        console.error("Mailchimp API error:", data);
        return NextResponse.json(
          { message: data.detail || "Failed to subscribe. Please try again." },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
