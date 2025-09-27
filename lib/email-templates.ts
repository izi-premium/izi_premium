export interface EmailTemplate {
  subject: string;
  html: string;
}

const BRAND_COLORS = {
  primary: "#3B82F6",
  elevated: "#F7F8F3",
  text: "#374151",
  lightText: "#6B7280",
  border: "#E5E7EB",
};

const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/i-z-i-e1ce7.firebasestorage.app/o/favicon.png?alt=media&token=96fa8865-5011-42b6-a224-319738491457";

export function getWelcomeEmailTemplate(
  name: string,
  otp: string,
  language: string,
  subscribeNewsletter: boolean,
  newsletterResult: { success: boolean }
): EmailTemplate {
  if (language === "en") {
    return {
      subject: "Welcome to IZI World! Please verify your email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
          <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid ${BRAND_COLORS.border}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <div style="background-color: white; padding: 30px 20px; text-align: center; border-bottom: 1px solid ${BRAND_COLORS.border};">
            <h1 style="color: ${BRAND_COLORS.primary}; font-size: 28px; margin: 0 0 16px 0; font-weight: 600;">Welcome to IZI World!</h1>
            <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 48px; width: auto;">
          </div>
          
          <div style="padding: 30px 20px; background-color: white;">
            <p style="margin: 0 0 10px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Hi ${name},</p>
            <p style="margin: 0 0 15px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Thank you for signing up! Your account has been created successfully.</p>
            <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text};">To complete your registration, please use this verification code:</p>
            
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 30px; text-align: center; margin: 25px 0; border-radius: 12px; border: 2px solid ${BRAND_COLORS.border};">
              <h1 style="color: ${BRAND_COLORS.primary}; font-size: 36px; margin: 0; letter-spacing: 8px; font-weight: bold;">${otp}</h1>
            </div>
            
            <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0; text-align: center;">This code will expire in 10 minutes.</p>
          </div>
          
          <div style="padding: 0 20px 20px 20px; background-color: white;">
            ${
              subscribeNewsletter && newsletterResult.success
                ? '<p style="color: #10b981; font-size: 14px; margin: 15px 0; padding: 12px; background-color: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">✅ You have been subscribed to our newsletter!</p>'
                : ""
            }
            ${
              subscribeNewsletter && !newsletterResult.success
                ? '<p style="color: #ef4444; font-size: 14px; margin: 15px 0; padding: 12px; background-color: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">⚠️ Newsletter subscription failed, but your account was created successfully.</p>'
                : ""
            }
          </div>
          
          <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
            <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0 0 10px 0;">If you didn't create an account, please ignore this email.</p>
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Best regards,<br><strong>IZI World Team</strong></p>
          </div>
          </div>
        </div>
      `,
    };
  }

  // Default to Spanish
  return {
    subject: "¡Bienvenido a IZI World! Por favor verifica tu email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid ${BRAND_COLORS.border}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <!-- Header with logo -->
        <div style="background-color: white; padding: 30px 20px; text-align: center; border-bottom: 1px solid ${BRAND_COLORS.border};">
          <h1 style="color: ${BRAND_COLORS.primary}; font-size: 28px; margin: 0 0 16px 0; font-weight: 600;">¡Bienvenido a IZI World!</h1>
          <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 48px; width: auto;">
        </div>
        
        <!-- Main content -->
        <div style="padding: 30px 20px; background-color: white;">
          <p style="margin: 0 0 10px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Hola ${name},</p>
          <p style="margin: 0 0 15px 0; font-size: 16px; color: ${BRAND_COLORS.text};">¡Gracias por registrarte! Tu cuenta ha sido creada exitosamente.</p>
          <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Para completar tu registro, por favor usa este código de verificación:</p>
          
          <div style="background-color: ${BRAND_COLORS.elevated}; padding: 30px; text-align: center; margin: 25px 0; border-radius: 12px; border: 2px solid ${BRAND_COLORS.border};">
            <h1 style="color: ${BRAND_COLORS.primary}; font-size: 36px; margin: 0; letter-spacing: 8px; font-weight: bold;">${otp}</h1>
          </div>
          
          <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0; text-align: center;">Este código expirará en 10 minutos.</p>
        </div>
        
        <!-- Newsletter status -->
        <div style="padding: 0 20px 20px 20px; background-color: white;">
          ${
            subscribeNewsletter && newsletterResult.success
              ? '<p style="color: #10b981; font-size: 14px; margin: 15px 0; padding: 12px; background-color: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">✅ ¡Te has suscrito a nuestro newsletter!</p>'
              : ""
          }
          ${
            subscribeNewsletter && !newsletterResult.success
              ? '<p style="color: #ef4444; font-size: 14px; margin: 15px 0; padding: 12px; background-color: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">⚠️ La suscripción al newsletter falló, pero tu cuenta se creó exitosamente.</p>'
              : ""
          }
        </div>
        
        <!-- Footer -->
        <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
          <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0 0 10px 0;">Si no creaste una cuenta, por favor ignora este email.</p>
          <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Saludos cordiales,<br><strong>Equipo IZI World</strong></p>
        </div>
        </div>
      </div>
    `,
  };
}

export function getPasswordResetEmailTemplate(
  name: string,
  resetCode: string,
  language: string
): EmailTemplate {
  if (language === "en") {
    return {
      subject: "Reset your password - IZI World",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
          <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid ${BRAND_COLORS.border}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header with logo -->
          <div style="background-color: white; padding: 30px 20px; text-align: center; border-bottom: 1px solid ${BRAND_COLORS.border};">
            <h1 style="color: ${BRAND_COLORS.primary}; font-size: 24px; margin: 0 0 16px 0; font-weight: 600;">Password Reset</h1>
            <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 48px; width: auto;">
          </div>
          
          <!-- Main content -->
          <div style="padding: 30px 20px; background-color: white;">
            <p style="margin: 0 0 10px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Hi ${name},</p>
            <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text};">You requested a password reset. Use this code to reset your password:</p>
            
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 30px; text-align: center; margin: 25px 0; border-radius: 12px; border: 2px solid ${BRAND_COLORS.border};">
              <h1 style="color: ${BRAND_COLORS.primary}; font-size: 36px; margin: 0; letter-spacing: 8px; font-weight: bold;">${resetCode}</h1>
            </div>
            
            <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0; text-align: center;">This code will expire in 30 minutes.</p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
            <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0 0 10px 0;">If you didn't request this password reset, please ignore this email.</p>
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Best regards,<br><strong>IZI World Team</strong></p>
          </div>
          </div>
        </div>
      `,
    };
  }

  // Default to Spanish
  return {
    subject: "Restablece tu contraseña - IZI World",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid ${BRAND_COLORS.border}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header with logo -->
          <div style="background-color: white; padding: 30px 20px; text-align: center; border-bottom: 1px solid ${BRAND_COLORS.border};">
            <h1 style="color: ${BRAND_COLORS.primary}; font-size: 24px; margin: 0 0 16px 0; font-weight: 600;">Restablecer Contraseña</h1>
            <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 48px; width: auto;">
          </div>
          
          <!-- Main content -->
          <div style="padding: 30px 20px; background-color: white;">
            <p style="margin: 0 0 10px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Hola ${name},</p>
            <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Solicitaste un restablecimiento de contraseña. Usa este código para restablecer tu contraseña:</p>
            
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 30px; text-align: center; margin: 25px 0; border-radius: 12px; border: 2px solid ${BRAND_COLORS.border};">
              <h1 style="color: ${BRAND_COLORS.primary}; font-size: 36px; margin: 0; letter-spacing: 8px; font-weight: bold;">${resetCode}</h1>
            </div>
            
            <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0; text-align: center;">Este código expirará en 30 minutos.</p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
            <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0 0 10px 0;">Si no solicitaste este restablecimiento de contraseña, por favor ignora este email.</p>
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Saludos cordiales,<br><strong>Equipo IZI World</strong></p>
          </div>
        </div>
      </div>
    `,
  };
}

export function getPremiumWelcomeEmailTemplate(
  name: string,
  language: string
): EmailTemplate {
  if (language === "en") {
    return {
      subject: "🎉 Welcome to IZI World Premium!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
          <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid ${BRAND_COLORS.border}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
            <!-- Header with logo -->
            <div style="background: linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, #1e40af 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0 0 16px 0; font-weight: 700;">🎉 Welcome to Premium!</h1>
              <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 56px; width: auto; filter: brightness(0) invert(1);">
            </div>
            
            <!-- Main content -->
            <div style="padding: 40px 20px; background-color: white;">
              <p style="margin: 0 0 20px 0; font-size: 18px; color: ${BRAND_COLORS.text}; font-weight: 600;">Hi ${name}! 👋</p>
              <p style="margin: 0 0 25px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">Congratulations! Your premium subscription is now active and you have access to all our exclusive features.</p>
              
              <!-- Premium features highlight -->
              <div style="background: linear-gradient(135deg, ${BRAND_COLORS.elevated} 0%, #f8fafc 100%); padding: 30px; border-radius: 12px; border: 2px solid ${BRAND_COLORS.border}; margin: 25px 0;">
                <h3 style="color: ${BRAND_COLORS.primary}; font-size: 20px; margin: 0 0 15px 0; text-align: center; font-weight: 600;">✨ Premium Features Unlocked</h3>
                <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.text};">
                  <li style="margin: 8px 0; font-size: 15px;">🚀 Unlimited access to all content</li>
                  <li style="margin: 8px 0; font-size: 15px;">💎 Exclusive premium features</li>
                  <li style="margin: 8px 0; font-size: 15px;">🎯 Priority customer support</li>
                  <li style="margin: 8px 0; font-size: 15px;">📱 Advanced customization options</li>
                </ul>
              </div>
              
              <p style="margin: 25px 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">Your subscription will renew automatically, and you can manage it anytime in your account settings.</p>
              
              <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
                <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.lightText};">Thank you for supporting IZI World! 🙏</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 25px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
              <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Best regards,<br><strong>IZI World Team</strong></p>
            </div>
          </div>
        </div>
      `,
    };
  }

  // Default to Spanish
  return {
    subject: "🎉 ¡Bienvenido a IZI World Premium!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid ${BRAND_COLORS.border}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header with logo -->
          <div style="background: linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, #1e40af 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; font-size: 28px; margin: 0 0 16px 0; font-weight: 700;">🎉 ¡Bienvenido a Premium!</h1>
            <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 56px; width: auto; filter: brightness(0) invert(1);">
          </div>
          
          <!-- Main content -->
          <div style="padding: 40px 20px; background-color: white;">
            <p style="margin: 0 0 20px 0; font-size: 18px; color: ${BRAND_COLORS.text}; font-weight: 600;">¡Hola ${name}! 👋</p>
            <p style="margin: 0 0 25px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">¡Felicitaciones! Tu suscripción premium ya está activa y tienes acceso a todas nuestras funciones exclusivas.</p>
            
            <!-- Premium features highlight -->
            <div style="background: linear-gradient(135deg, ${BRAND_COLORS.elevated} 0%, #f8fafc 100%); padding: 30px; border-radius: 12px; border: 2px solid ${BRAND_COLORS.border}; margin: 25px 0;">
              <h3 style="color: ${BRAND_COLORS.primary}; font-size: 20px; margin: 0 0 15px 0; text-align: center; font-weight: 600;">✨ Funciones Premium Desbloqueadas</h3>
              <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.text};">
                <li style="margin: 8px 0; font-size: 15px;">🚀 Acceso ilimitado a todo el contenido</li>
                <li style="margin: 8px 0; font-size: 15px;">💎 Funciones premium exclusivas</li>
                <li style="margin: 8px 0; font-size: 15px;">🎯 Soporte prioritario al cliente</li>
                <li style="margin: 8px 0; font-size: 15px;">📱 Opciones de personalización avanzadas</li>
              </ul>
            </div>
            
            <p style="margin: 25px 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">Tu suscripción se renovará automáticamente, y puedes gestionarla en cualquier momento desde la configuración de tu cuenta.</p>
            
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.lightText};">¡Gracias por apoyar a IZI World! 🙏</p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: ${BRAND_COLORS.elevated}; padding: 25px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Saludos cordiales,<br><strong>Equipo IZI World</strong></p>
          </div>
        </div>
      </div>
    `,
  };
}

export function getPaymentFailedEmailTemplate(
  name: string,
  language: string
): EmailTemplate {
  if (language === "en") {
    return {
      subject: "⚠️ Payment Failed - Action Required",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
          <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid #ef4444; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);">
            <!-- Header with logo -->
            <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0 0 16px 0; font-weight: 700;">⚠️ Payment Issue</h1>
              <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 56px; width: auto; filter: brightness(0) invert(1);">
            </div>
            
            <!-- Main content -->
            <div style="padding: 40px 20px; background-color: white;">
              <p style="margin: 0 0 20px 0; font-size: 18px; color: ${BRAND_COLORS.text}; font-weight: 600;">Hi ${name},</p>
              <p style="margin: 0 0 25px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">We couldn't process your subscription payment. Don't worry, your premium access is still active for a few more days.</p>
              
              <!-- Action required box -->
              <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 30px; border-radius: 12px; border: 2px solid #fecaca; margin: 25px 0;">
                <h3 style="color: #dc2626; font-size: 20px; margin: 0 0 15px 0; text-align: center; font-weight: 600;">🔧 Action Required</h3>
                <p style="margin: 0 0 15px 0; font-size: 15px; color: ${BRAND_COLORS.text}; text-align: center;">Please update your payment method to continue enjoying premium features:</p>
                <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.text};">
                  <li style="margin: 8px 0; font-size: 15px;">💳 Check your payment information</li>
                  <li style="margin: 8px 0; font-size: 15px;">📅 Verify your card expiration date</li>
                  <li style="margin: 8px 0; font-size: 15px;">🏦 Ensure sufficient funds are available</li>
                  <li style="margin: 8px 0; font-size: 15px;">🔄 Try a different payment method if needed</li>
                </ul>
              </div>
              
              <p style="margin: 25px 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">Visit your account settings to update your payment information and restore your premium access.</p>
              
              <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
                <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.lightText};">Need help? Contact our support team! 💬</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 25px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
              <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Best regards,<br><strong>IZI World Team</strong></p>
            </div>
          </div>
        </div>
      `,
    };
  }

  // Default to Spanish
  return {
    subject: "⚠️ Pago Fallido - Acción Requerida",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid #ef4444; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);">
          <!-- Header with logo -->
          <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; font-size: 28px; margin: 0 0 16px 0; font-weight: 700;">⚠️ Problema de Pago</h1>
            <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 56px; width: auto; filter: brightness(0) invert(1);">
          </div>
          
          <!-- Main content -->
          <div style="padding: 40px 20px; background-color: white;">
            <p style="margin: 0 0 20px 0; font-size: 18px; color: ${BRAND_COLORS.text}; font-weight: 600;">Hola ${name},</p>
            <p style="margin: 0 0 25px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">No pudimos procesar el pago de tu suscripción. No te preocupes, tu acceso premium seguirá activo por algunos días más.</p>
            
            <!-- Action required box -->
            <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); padding: 30px; border-radius: 12px; border: 2px solid #fecaca; margin: 25px 0;">
              <h3 style="color: #dc2626; font-size: 20px; margin: 0 0 15px 0; text-align: center; font-weight: 600;">🔧 Acción Requerida</h3>
              <p style="margin: 0 0 15px 0; font-size: 15px; color: ${BRAND_COLORS.text}; text-align: center;">Por favor actualiza tu método de pago para continuar disfrutando de las funciones premium:</p>
              <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.text};">
                <li style="margin: 8px 0; font-size: 15px;">💳 Verifica tu información de pago</li>
                <li style="margin: 8px 0; font-size: 15px;">📅 Confirma la fecha de vencimiento de tu tarjeta</li>
                <li style="margin: 8px 0; font-size: 15px;">🏦 Asegúrate de que haya fondos suficientes</li>
                <li style="margin: 8px 0; font-size: 15px;">🔄 Prueba un método de pago diferente si es necesario</li>
              </ul>
            </div>
            
            <p style="margin: 25px 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">Visita la configuración de tu cuenta para actualizar tu información de pago y restaurar tu acceso premium.</p>
            
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.lightText};">¿Necesitas ayuda? ¡Contacta a nuestro equipo de soporte! 💬</p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: ${BRAND_COLORS.elevated}; padding: 25px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Saludos cordiales,<br><strong>Equipo IZI World</strong></p>
          </div>
        </div>
      </div>
    `,
  };
}

export function getNewsletterWelcomeEmailTemplate(
  email: string,
  language: string
): EmailTemplate {
  if (language === "en") {
    return {
      subject: "🎉 Welcome to IZI World Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
          <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid ${BRAND_COLORS.border}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
            <!-- Header with logo -->
            <div style="background: linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, #1e40af 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0 0 16px 0; font-weight: 700;">🎉 Newsletter Confirmed!</h1>
              <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 56px; width: auto; filter: brightness(0) invert(1);">
            </div>
            
            <!-- Main content -->
            <div style="padding: 40px 20px; background-color: white;">
              <p style="margin: 0 0 20px 0; font-size: 18px; color: ${BRAND_COLORS.text}; font-weight: 600;">Welcome to IZI World! 👋</p>
              <p style="margin: 0 0 25px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">Thank you for subscribing to our newsletter! You're now part of our community and will receive the latest updates, tips, and exclusive content.</p>
              
              <!-- What to expect section -->
              <div style="background: linear-gradient(135deg, ${BRAND_COLORS.elevated} 0%, #f8fafc 100%); padding: 30px; border-radius: 12px; border: 2px solid ${BRAND_COLORS.border}; margin: 25px 0;">
                <h3 style="color: ${BRAND_COLORS.primary}; font-size: 20px; margin: 0 0 15px 0; text-align: center; font-weight: 600;">✨ What to Expect</h3>
                <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.text};">
                  <li style="margin: 8px 0; font-size: 15px;">📱 Tips on how to get the most out of the app</li>
                  <li style="margin: 8px 0; font-size: 15px;">🆕 Latest news and updates in I.Z.I</li>
                  <li style="margin: 8px 0; font-size: 15px;">🎯 Exclusive content and features</li>
                  <li style="margin: 8px 0; font-size: 15px;">💡 Best practices and insights</li>
                </ul>
              </div>
              
              <p style="margin: 25px 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">We promise to only send you valuable content and never spam your inbox.</p>
              
              <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
                <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.lightText};">Thank you for joining the IZI World community! 🙏</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 25px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
              <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Best regards,<br><strong>IZI World Team</strong></p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: ${BRAND_COLORS.lightText};">You can unsubscribe at any time by clicking the link in any email.</p>
            </div>
          </div>
        </div>
      `,
    };
  }

  // Default to Spanish
  return {
    subject: "🎉 ¡Bienvenido a la Newsletter de IZI World!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid ${BRAND_COLORS.border}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header with logo -->
          <div style="background: linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, #1e40af 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; font-size: 28px; margin: 0 0 16px 0; font-weight: 700;">🎉 ¡Newsletter Confirmada!</h1>
            <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 56px; width: auto; filter: brightness(0) invert(1);">
          </div>
          
          <!-- Main content -->
          <div style="padding: 40px 20px; background-color: white;">
            <p style="margin: 0 0 20px 0; font-size: 18px; color: ${BRAND_COLORS.text}; font-weight: 600;">¡Bienvenido a IZI World! 👋</p>
            <p style="margin: 0 0 25px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">¡Gracias por suscribirte a nuestra newsletter! Ahora eres parte de nuestra comunidad y recibirás las últimas actualizaciones, consejos y contenido exclusivo.</p>
            
            <!-- What to expect section -->
            <div style="background: linear-gradient(135deg, ${BRAND_COLORS.elevated} 0%, #f8fafc 100%); padding: 30px; border-radius: 12px; border: 2px solid ${BRAND_COLORS.border}; margin: 25px 0;">
              <h3 style="color: ${BRAND_COLORS.primary}; font-size: 20px; margin: 0 0 15px 0; text-align: center; font-weight: 600;">✨ Qué Esperar</h3>
              <ul style="margin: 0; padding-left: 20px; color: ${BRAND_COLORS.text};">
                <li style="margin: 8px 0; font-size: 15px;">📱 Consejos sobre cómo aprovechar al máximo la aplicación</li>
                <li style="margin: 8px 0; font-size: 15px;">🆕 Últimas noticias y actualizaciones en I.Z.I</li>
                <li style="margin: 8px 0; font-size: 15px;">🎯 Contenido y funciones exclusivas</li>
                <li style="margin: 8px 0; font-size: 15px;">💡 Mejores prácticas e ideas</li>
              </ul>
            </div>
            
            <p style="margin: 25px 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text}; line-height: 1.6;">Te prometemos enviarte solo contenido valioso y nunca spam en tu bandeja de entrada.</p>
            
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.lightText};">¡Gracias por unirte a la comunidad IZI World! 🙏</p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: ${BRAND_COLORS.elevated}; padding: 25px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Saludos cordiales,<br><strong>Equipo IZI World</strong></p>
            <p style="margin: 10px 0 0 0; font-size: 12px; color: ${BRAND_COLORS.lightText};">Puedes darte de baja en cualquier momento haciendo clic en el enlace de cualquier email.</p>
          </div>
        </div>
      </div>
    `,
  };
}

export function getResendOtpEmailTemplate(
  name: string,
  otp: string,
  language: string
): EmailTemplate {
  if (language === "en") {
    return {
      subject: "Your new verification code - IZI World",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
          <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid ${BRAND_COLORS.border}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header with logo -->
          <div style="background-color: white; padding: 30px 20px; text-align: center; border-bottom: 1px solid ${BRAND_COLORS.border};">
            <h1 style="color: ${BRAND_COLORS.primary}; font-size: 24px; margin: 0 0 16px 0; font-weight: 600;">New Verification Code</h1>
            <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 48px; width: auto;">
          </div>
          
          <!-- Main content -->
          <div style="padding: 30px 20px; background-color: white;">
            <p style="margin: 0 0 10px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Hi ${name},</p>
            <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Here's your new verification code:</p>
            
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 30px; text-align: center; margin: 25px 0; border-radius: 12px; border: 2px solid ${BRAND_COLORS.border};">
              <h1 style="color: ${BRAND_COLORS.primary}; font-size: 36px; margin: 0; letter-spacing: 8px; font-weight: bold;">${otp}</h1>
            </div>
            
            <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0; text-align: center;">This code will expire in 10 minutes.</p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
            <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0 0 10px 0;">If you didn't request this code, please ignore this email.</p>
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Best regards,<br><strong>IZI World Team</strong></p>
          </div>
          </div>
        </div>
      `,
    };
  }

  // Default to Spanish
  return {
    subject: "Tu nuevo código de verificación - IZI World",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
        <div style="background-color: ${BRAND_COLORS.elevated}; border-radius: 16px; overflow: hidden; border: 2px solid ${BRAND_COLORS.border}; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <!-- Header with logo -->
          <div style="background-color: white; padding: 30px 20px; text-align: center; border-bottom: 1px solid ${BRAND_COLORS.border};">
            <h1 style="color: ${BRAND_COLORS.primary}; font-size: 24px; margin: 0 0 16px 0; font-weight: 600;">Nuevo Código de Verificación</h1>
            <img src="${LOGO_URL}" alt="IZI World Logo" style="height: 48px; width: auto;">
          </div>
          
          <!-- Main content -->
          <div style="padding: 30px 20px; background-color: white;">
            <p style="margin: 0 0 10px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Hola ${name},</p>
            <p style="margin: 0 0 20px 0; font-size: 16px; color: ${BRAND_COLORS.text};">Aquí está tu nuevo código de verificación:</p>
            
            <div style="background-color: ${BRAND_COLORS.elevated}; padding: 30px; text-align: center; margin: 25px 0; border-radius: 12px; border: 2px solid ${BRAND_COLORS.border};">
              <h1 style="color: ${BRAND_COLORS.primary}; font-size: 36px; margin: 0; letter-spacing: 8px; font-weight: bold;">${otp}</h1>
            </div>
            
            <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0; text-align: center;">Este código expirará en 10 minutos.</p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: ${BRAND_COLORS.elevated}; padding: 20px; text-align: center; border-top: 1px solid ${BRAND_COLORS.border};">
            <p style="color: ${BRAND_COLORS.lightText}; font-size: 14px; margin: 0 0 10px 0;">Si no solicitaste este código, por favor ignora este email.</p>
            <p style="margin: 0; font-size: 14px; color: ${BRAND_COLORS.text}; font-weight: 500;">Saludos cordiales,<br><strong>Equipo IZI World</strong></p>
          </div>
        </div>
      </div>
    `,
  };
}
