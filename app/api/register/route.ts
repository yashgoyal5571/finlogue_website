import { NextResponse } from "next/server";
import { dynamicAttendeesCache } from "@/app/api/admin/attendees/route";
import { parseRequestBody, sanitizeString } from "@/lib/api-utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await parseRequestBody<Record<string, string>>(request);
    const name = sanitizeString(body.name, 100);
    const email = sanitizeString(body.email, 120);
    const institution = sanitizeString(body.institution, 150);
    const statement = sanitizeString(body.statement, 2000);
    const event = sanitizeString(body.event || body.eventTitle, 150);

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const registrationToken = `REG-${Date.now().toString().slice(-6)}`;
    const eventTitle = event || body.eventTitle || "PITCH ON THE ROCKS (POTR)";

    // Allow multiple submissions (for intake & coordinator testing)

    // Append to live attendees roster for admin visibility
    dynamicAttendeesCache.unshift({
      id: `att-${Date.now()}`,
      token: registrationToken,
      name,
      email,
      phone: body.phone || "",
      institution: institution || "Independent Participant",
      event: eventTitle,
      status: "CONFIRMED",
      registeredAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      notes: statement ? `Statement: ${statement}` : "Direct Portal Registration",
    });

    console.log(`[FINLOGUE NODE.JS EVENT REGISTRATION #${registrationToken}]`, {
      timestamp: new Date().toISOString(),
      event: eventTitle,
      name,
      email,
      institution: institution || "N/A",
      statementPreview: statement ? statement.slice(0, 80) : "N/A",
    });

    const rawRoll = body.rollNumber || body.institution || "";
    const cleanRoll = sanitizeString(rawRoll.replace(/^Roll:\s*/i, ""), 50);

    // Forward to Google Sheets Webhook if configured (strictly: timestamp, name, rollNumber, email, phone, statement)
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
          body: JSON.stringify({
            action: "register",
            timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            name,
            rollNumber: cleanRoll,
            email,
            phone: sanitizeString(body.phone, 25) || "",
            statement: statement || "",
            eventTitle: eventTitle,
          }),
        });
      } catch (err) {
        console.error("[REGISTER API] Google Sheets forwarding error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      token: registrationToken,
      registrationToken,
      message: `Registration confirmed for ${eventTitle}.`,
    });
  } catch (error: any) {
    console.error("[NODE.JS API ERROR - REGISTER]", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
