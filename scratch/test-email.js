async function testMail() {
  const [{ default: nodemailer }, { loadEnvConfig }] = await Promise.all([
    import("nodemailer"),
    import("@next/env"),
  ]);
  loadEnvConfig(process.cwd());

  const user = process.env.GMAIL_USER;
  const appPassword = process.env.GMAIL_APP_PASS;

  if (!user || !appPassword) {
    throw new Error("Set GMAIL_USER and GMAIL_APP_PASS in .env.local before running this test.");
  }

  console.log("Starting SMTP test...");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass: appPassword,
    },
  });

  try {
    console.log("Verifying transporter...");
    await transporter.verify();
    console.log("Transporter verified successfully!");

    console.log("Sending test email...");
    const info = await transporter.sendMail({
      from: user,
      to: process.env.CONTACT_EMAIL || user,
      subject: "Test Email from Local Script",
      text: "If you see this, Nodemailer is working perfectly!",
    });

    console.log("Email sent successfully! Message ID:", info.messageId);
  } catch (error) {
    console.error("SMTP test failed:", error.code || "unknown error");
    process.exitCode = 1;
  } finally {
    transporter.close();
  }
}

testMail().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
