import { NextResponse } from "next/server";
import { parseRequestBody, sanitizeString } from "@/lib/api-utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await parseRequestBody<Record<string, string>>(request);
    const name = sanitizeString(body.name, 100);
    const email = sanitizeString(body.email, 120);
    const organization = sanitizeString(body.organization, 150);
    const inquiryType = sanitizeString(body.inquiryType, 100);
    const message = sanitizeString(body.message, 3000);

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

    // Forward to Google Sheets Webhook if configured
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "contact",
            ticketId,
            name,
            email,
            organization: organization || "N/A",
            inquiryType: inquiryType || "General",
            message: message || "",
          }),
        });
      } catch (err) {
        console.error("[CONTACT API] Google Sheets forwarding error:", err);
      }
    }

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
