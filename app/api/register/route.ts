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

    const { name, email, institution, statement, event } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const registrationToken = `REG-${Date.now().toString().slice(-6)}`;

    console.log(`[FINLOGUE NODE.JS EVENT REGISTRATION #${registrationToken}]`, {
      timestamp: new Date().toISOString(),
      event: event || "Flagship Conclave",
      name,
      email,
      institution: institution || "N/A",
      statementPreview: statement ? statement.slice(0, 80) : "N/A",
    });

    return NextResponse.json({
      success: true,
      registrationToken,
      message: `Registration confirmed for ${event || "the event"}.`,
    });
  } catch (error: any) {
    console.error("[NODE.JS API ERROR - REGISTER]", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
