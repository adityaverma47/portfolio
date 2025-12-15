import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import nodemailer from "nodemailer";

// --- Design Configuration ---
// Primary Color: Teal (#0f766e - teal-700 for text, #14b8a6 - teal-500 for accents)
// Background: #f3f4f6 (gray-100)
// Card: #ffffff
// Text: #1f2937 (gray-800)

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/adityaverma47",
  github: "https://github.com/bugSlayer555/",
  portfolio: "https://uiwizard.netlify.app"
};

// --- Email Templates ---

const getConfirmationEmailHTML = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting UIWizard</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6; color: #1f2937;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; border-bottom: 3px solid #14b8a6;">
              <h1 style="color: #111827; margin: 0; font-size: 30px; font-weight: 800; letter-spacing: -0.025em;">UIWizard</h1>
              <p style="color: #6b7280; font-size: 14px; margin-top: 8px; font-weight: 500;">Building Digital Experiences</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #111827; margin: 0 0 24px 0; font-size: 22px; font-weight: 600;">Hi ${name},</h2>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Thanks for reaching out! I've received your message and I'm excited to hear from you.
              </p>

              <!-- What's Next Section -->
              <div style="background-color: #f0fdfa; border-radius: 12px; padding: 24px; margin: 32px 0; border: 1px solid #ccfbf1;">
                <h3 style="color: #0f766e; font-size: 16px; font-weight: 700; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.05em;">What's Next?</h3>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #334155; font-size: 15px; line-height: 1.6;">
                  <li style="margin-bottom: 8px;">I will review your message within <strong>24 hours</strong>.</li>
                  <li style="margin-bottom: 8px;">If it's a project inquiry, I'll prepare some initial thoughts.</li>
                  <li>We can schedule a quick call to discuss details if needed.</li>
                </ul>
              </div>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                In the meantime, feel free to explore more of my work or connect with me on social media.
              </p>

              <!-- Social Links Button Group -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${SOCIAL_LINKS.github}" style="display: inline-block; background-color: #1f2937; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 0 8px;">GitHub</a>
                <a href="${SOCIAL_LINKS.linkedin}" style="display: inline-block; background-color: #0077b5; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 0 8px;">LinkedIn</a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0; text-align: center;">
                Best regards,<br>
                <strong style="color: #111827;">Aditya Verma (UIWizard)</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                &copy; ${new Date().getFullYear()} UIWizard Portfolio. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const getNotificationEmailHTML = (data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1f2937; padding: 24px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">New Contact Form Submission</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0;">
                
                <!-- Name -->
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Name</span>
                    <div style="color: #111827; font-size: 16px; font-weight: 500; margin-top: 4px;">${data.name}</div>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Email</span>
                    <div style="margin-top: 4px;">
                      <a href="mailto:${data.email}" style="color: #14b8a6; font-size: 16px; text-decoration: none; font-weight: 500;">${data.email}</a>
                    </div>
                  </td>
                </tr>

                <!-- Phone (Optional) -->
                ${data.phone ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Phone</span>
                    <div style="margin-top: 4px;">
                      <a href="tel:${data.phone}" style="color: #111827; font-size: 16px; text-decoration: none;">${data.phone}</a>
                    </div>
                  </td>
                </tr>
                ` : ''}

                <!-- Company (Optional) -->
                ${data.company ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Company</span>
                    <div style="color: #111827; font-size: 16px; margin-top: 4px;">${data.company}</div>
                  </td>
                </tr>
                ` : ''}

                <!-- Message -->
                <tr>
                  <td style="padding: 24px 0 0 0;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; display: block; margin-bottom: 8px;">Message</span>
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
                  </td>
                </tr>

              </table>

              <!-- Quick Action -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${data.email}" style="display: inline-block; background-color: #14b8a6; color: #ffffff; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(20, 184, 166, 0.2);">Reply Now</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, company, phone, message, _honeypot } = body;

    // Honeypot check
    if (_honeypot) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Message received" }),
      };
    }

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Get environment variables
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.RECIPIENT_EMAIL || "adityaverma4769@gmail.com";

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      pool: true,
      maxConnections: 5,
    });

    const timestamp = new Date().toISOString();

    const mailOptionsUser = {
      from: `"UIWizard" <${smtpUser}>`,
      to: email,
      replyTo: smtpUser,
      subject: `Thank you for contacting UIWizard`,
      html: getConfirmationEmailHTML(name),
    };

    const mailOptionsAdmin = {
      from: `"UIWizard Form" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New Contact: ${name}`,
      html: getNotificationEmailHTML({
        name,
        email,
        company,
        phone,
        message,
      }),
    };

    // Parallel execution
    await Promise.all([
      transporter.sendMail(mailOptionsUser),
      transporter.sendMail(mailOptionsAdmin)
    ]);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({
        success: true,
        message: "Emails sent successfully",
      }),
    };
  } catch (error: any) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to send email",
        message: error.message,
      }),
    };
  }
};
