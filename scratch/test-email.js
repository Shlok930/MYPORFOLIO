const nodemailer = require("nodemailer");

async function testMail() {
  console.log("Starting SMTP test...");
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: "shlokpan930@gmail.com",
      pass: "kuyxpwviygqvegnp",
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log("Verifying transporter...");
    await transporter.verify();
    console.log("Transporter verified successfully!");

    console.log("Sending test email...");
    const info = await transporter.sendMail({
      from: '"SMTP Tester" <shlokpan930@gmail.com>',
      to: "shlokpan930@gmail.com",
      subject: "Test Email from Local Script",
      text: "If you see this, Nodemailer is working perfectly!",
    });

    console.log("Email sent successfully! Message ID:", info.messageId);
  } catch (error) {
    console.error("Test failed with error:", error);
  }
}

testMail();
