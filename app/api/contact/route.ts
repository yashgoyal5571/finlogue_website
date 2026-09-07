import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    let body: any = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid JSON format in payload." },
          { status: 400 }
        );
      }
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      body = Object.fromEntries(formData);
    } else {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = {};
      }
    }

    const { name, email, organization, inquiryType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const ticketId = `FIN-${Date.now().toString().slice(-6)}`;

    // Server-side Node.js logging
    console.log(`[FINLOGUE NODE.JS INTAKE #${ticketId}]`, {
      timestamp: new Date().toISOString(),
      name,
      email,
      organization: organization || "N/A",
      inquiryType: inquiryType || "General",
      messagePreview: message.slice(0, 100),
    });

    return NextResponse.json({
      success: true,
      ticketId,
      message: "Correspondence successfully cataloged in the Finlogue Archive.",
    });
  } catch (error: any) {
    console.error("[NODE.JS API ERROR - CONTACT]", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
