import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passkey } = body;

    const expectedPasskey = process.env.ADMIN_PASSKEY || "FINLOGUE@LNMIIT2026";

    if (!passkey || passkey.trim() !== expectedPasskey.trim()) {
      return NextResponse.json(
        { success: false, error: "Invalid coordinator passkey." },
        { status: 401 }
      );
    }

    // Generate a simple session token
    const token = `FIN-SESSION-${Buffer.from(Date.now().toString()).toString("base64")}`;

    const response = NextResponse.json({
      success: true,
      token,
      message: "Authorization granted.",
    });

    // Set HTTP-only cookie for session
    response.cookies.set("finlogue_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const isAuthenticated = cookieHeader.includes("finlogue_admin_session=");

  return NextResponse.json({
    authenticated: isAuthenticated,
  });
}
