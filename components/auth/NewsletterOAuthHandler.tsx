"use client";

import { useAuth } from "@/components/providers/FirebaseAuthProvider";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function NewsletterOAuthHandler() {
  const tNewsletter = useTranslations("Newsletter");
  const { user, loading } = useAuth();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    async function handleOAuthNewsletter() {
      // Only run once when authenticated and not already processed
      if (!loading && user?.email && !processed) {
        const shouldSubscribe = localStorage.getItem("google_oauth_newsletter");

        if (shouldSubscribe === "true") {
          console.log(
            "🔄 Processing newsletter subscription for OAuth user:",
            user.email
          );

          try {
            const response = await fetch("/api/newsletter/subscribe", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: user.email,
                language: "es",
              }),
            });

            const result = await response.json();

            if (response.ok) {
              console.log(
                "✅ Newsletter subscription successful for OAuth user"
              );

              // Show a temporary success notification
              showNotification(`${tNewsletter("approved")}`, "success");
            } else {
              console.warn(
                "❌ Newsletter subscription failed:",
                result.message
              );

              // Show a warning but don't make it too prominent
              showNotification(`${tNewsletter("failed")}`, "warning");
            }
          } catch (error) {
            console.error(
              "❌ Error subscribing to newsletter after OAuth:",
              error
            );
          }

          // Clean up localStorage
          localStorage.removeItem("google_oauth_newsletter");
          setProcessed(true);
        }
      }
    }

    handleOAuthNewsletter();
  }, [user, loading, processed]);

  return null; // This component doesn't render anything visible
}

// Helper function to show temporary notifications
function showNotification(message: string, type: "success" | "warning") {
  // Create notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 400px;
    font-family: switzer;
    font-size: 1.4rem;
    font-weight: 500;
    ${
      type === "success"
        ? "background-color: #10b981;"
        : "background-color: #f59e0b;"
    }
  `;
  notification.textContent = message;

  // Add to document
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}
