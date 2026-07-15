import { NextRequest, NextResponse } from "next/server";

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

    // Web3Forms access key provided by Shlok
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || "c993a6fc-6399-4e93-8a86-26f576c34151";

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        message: message,
        subject: `📬 Secure Portfolio Message from ${name}`,
        from_name: "Portfolio Contact Form",
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: data.message || "Web3Forms submission failed." },
        { status: response.status || 400 }
      );
    }
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: `Transmission failed: ${error.message || error}` },
      { status: 500 }
    );
  }
}
