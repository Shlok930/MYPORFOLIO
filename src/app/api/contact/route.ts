import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: "A valid contact message is required." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (name.length > 120 || email.length > 254 || message.length > 5000 || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid name, email, and message." }, { status: 400 });
  }

  const sender = process.env.GMAIL_USER?.trim();
  const appPassword = process.env.GMAIL_APP_PASS?.trim();

  if (!sender || !appPassword) {
    console.error("Contact email is unavailable: configure GMAIL_USER and GMAIL_APP_PASS.");
    return NextResponse.json(
      { error: "The email service is not configured. Please try again later." },
      { status: 503 }
    );
  }

  const recipient = process.env.CONTACT_EMAIL?.trim() || sender;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: sender,
      pass: appPassword,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: "New portfolio contact message",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Your message could not be sent. Please try again later." },
      { status: 502 }
    );
  } finally {
    transporter.close();
  }
}
