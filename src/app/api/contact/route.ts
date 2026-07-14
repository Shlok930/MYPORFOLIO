import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Create Gmail SMTP transporter using App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,       // shlokpan930@gmail.com
        pass: process.env.GMAIL_APP_PASS,   // Gmail App Password (16 chars)
      },
    });

    // Email sent TO Shlok
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: "shlokpan930@gmail.com",
      replyTo: email,
      subject: `📬 New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #09090b; color: #f4f4f5; padding: 0; border-radius: 16px; overflow: hidden; border: 1px solid #27272a;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #18181b 0%, #1c1917 100%); padding: 32px 36px; border-bottom: 1px solid #27272a;">
            <p style="margin: 0 0 6px; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: #f59e0b; font-weight: 700;">New message via portfolio</p>
            <h1 style="margin: 0; font-size: 26px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">Shlok's Portfolio</h1>
          </div>

          <!-- Body -->
          <div style="padding: 32px 36px; display: flex; flex-direction: column; gap: 24px;">
            
            <p style="margin: 0; font-size: 15px; color: #a1a1aa; line-height: 1.7;">
              You've received a new secure message from your portfolio contact form.
            </p>

            <!-- Sender Details -->
            <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; width: 90px; font-weight: 600;">Name</td>
                  <td style="padding: 8px 0; color: #f4f4f5; font-size: 15px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; border-top: 1px solid #27272a;">Email</td>
                  <td style="padding: 8px 0; border-top: 1px solid #27272a;">
                    <a href="mailto:${email}" style="color: #f59e0b; font-size: 15px; text-decoration: none;">${email}</a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Message -->
            <div style="background: #18181b; border: 1px solid #27272a; border-left: 3px solid #f59e0b; border-radius: 12px; padding: 20px 24px;">
              <p style="margin: 0 0 10px; color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Message</p>
              <p style="margin: 0; color: #e4e4e7; font-size: 15px; line-height: 1.75; white-space: pre-wrap;">${message}</p>
            </div>

            <!-- Reply CTA -->
            <a href="mailto:${email}?subject=Re: Your message to Shlok Pandey" style="display: inline-block; background: #f59e0b; color: #000000; text-decoration: none; font-weight: 800; font-size: 13px; letter-spacing: 0.5px; padding: 14px 28px; border-radius: 999px; text-align: center;">
              ↩ Reply to ${name}
            </a>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 36px; border-top: 1px solid #27272a; background: #0c0c0d;">
            <p style="margin: 0; font-size: 11px; color: #52525b; text-align: center;">
              Sent via Shlok Pandey's Portfolio · shlokpan930@gmail.com
            </p>
          </div>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Shlok Pandey" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Got your message, ${name}! 👋`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #09090b; color: #f4f4f5; padding: 0; border-radius: 16px; overflow: hidden; border: 1px solid #27272a;">
          <div style="background: linear-gradient(135deg, #18181b 0%, #1c1917 100%); padding: 32px 36px; border-bottom: 1px solid #27272a;">
            <p style="margin: 0 0 6px; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: #f59e0b; font-weight: 700;">Message Received</p>
            <h1 style="margin: 0; font-size: 26px; font-weight: 900; color: #ffffff;">Hey ${name}! 👋</h1>
          </div>
          <div style="padding: 32px 36px;">
            <p style="margin: 0 0 16px; font-size: 15px; color: #a1a1aa; line-height: 1.75;">
              Thank you for reaching out! I've received your message and will get back to you within <strong style="color: #f4f4f5;">24 hours</strong>.
            </p>
            <p style="margin: 0 0 24px; font-size: 15px; color: #a1a1aa; line-height: 1.75;">
              In the meantime, feel free to check out my projects and connect with me on GitHub or LinkedIn.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="https://github.com/Shlok930" style="display: inline-block; background: #18181b; color: #f4f4f5; text-decoration: none; font-weight: 600; font-size: 12px; padding: 10px 22px; border-radius: 999px; border: 1px solid #27272a;">GitHub</a>
              <a href="https://www.linkedin.com/in/shlok-pandey-b29190309/" style="display: inline-block; background: #18181b; color: #f4f4f5; text-decoration: none; font-weight: 600; font-size: 12px; padding: 10px 22px; border-radius: 999px; border: 1px solid #27272a;">LinkedIn</a>
            </div>
          </div>
          <div style="padding: 20px 36px; border-top: 1px solid #27272a; background: #0c0c0d;">
            <p style="margin: 0; font-size: 11px; color: #52525b; text-align: center;">Shlok Pandey · Full Stack Developer & AI Enthusiast</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
