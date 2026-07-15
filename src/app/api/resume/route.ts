import { NextRequest, NextResponse } from "next/server";

const RESUME_URL =
  "https://www.image2url.com/r2/default/documents/1784142209485-27f21cd5-3b4e-4791-bbb9-10f1f8e97d3d.pdf";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(RESUME_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch resume" },
        { status: 502 }
      );
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Shlok_Pandey_Resume.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("Resume proxy error:", err);
    return NextResponse.json(
      { error: "Server error while fetching resume" },
      { status: 500 }
    );
  }
}
