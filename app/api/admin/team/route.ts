import { NextResponse } from "next/server";
import { about } from "@/content/about";

export const runtime = "nodejs";

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  tier: "coordinators" | "heads" | "coreTeam";
  dept?: string;
  batch?: string;
  focus?: string;
  email: string;
  linkedin: string;
  image: string;
}

// Flatten all initial team members
let dynamicTeamCache: TeamMemberItem[] = [
  ...about.leadership.coordinators.map((c, idx) => ({
    id: `coord-${idx + 1}`,
    name: c.name,
    role: c.role,
    tier: "coordinators" as const,
    focus: c.focus || "",
    dept: c.focus || "Steering Council",
    email: c.email || "24uec533@lnmiit.ac.in",
    linkedin: c.linkedin || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
    image: c.image || "/assets/team/aryan-mittal.jpg",
  })),
  ...about.leadership.heads.map((h, idx) => ({
    id: `head-${idx + 1}`,
    name: h.name,
    role: h.role,
    tier: "heads" as const,
    dept: h.dept || "Department Head",
    batch: h.batch || "Y24",
    focus: h.focus || "",
    email: h.email || "24uec533@lnmiit.ac.in",
    linkedin: h.linkedin || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
    image: h.image || "/assets/team/aryan-mittal.jpg",
  })),
  ...(about.leadership.coreTeam ?? []).map((m, idx) => ({
    id: `core-${idx + 1}`,
    name: m.name,
    role: m.role,
    tier: "coreTeam" as const,
    dept: m.dept || "Equity Research",
    batch: m.batch || "Y25",
    focus: m.focus || "",
    email: m.email || "24uec533@lnmiit.ac.in",
    linkedin: m.linkedin || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
    image: m.image || "/assets/team/aditya-tiwari.jpg",
  })),
];

export async function GET() {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${webhookUrl}?action=getTeam`, {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.team) && data.team.length > 0) {
          return NextResponse.json({ success: true, team: data.team, source: "google_sheets" });
        }
      }
    } catch {
      // Fallback
    }
  }

  return NextResponse.json({
    success: true,
    team: dynamicTeamCache,
    source: "local_cache",
  });
}

export async function POST(request: Request) {
  try {
    const text = await request.text();
    let body: any = {};
    try {
      body = JSON.parse(text);
    } catch {
      body = {};
    }

    const { member } = body;
    if (!member || !member.name) {
      return NextResponse.json(
        { success: false, error: "Member name is required." },
        { status: 400 }
      );
    }

    const memberId = member.id || `team-${Date.now()}`;
    const normalizedMember: TeamMemberItem = {
      id: memberId,
      name: member.name,
      role: member.role || "Associate",
      tier: member.tier || "coreTeam",
      dept: member.dept || "",
      batch: member.batch || "Y25",
      focus: member.focus && member.focus !== member.dept ? member.focus : "",
      email: member.email || "24uec533@lnmiit.ac.in",
      linkedin: member.linkedin || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
      image: member.image || "/assets/team/aditya-tiwari.jpg",
    };

    const existingIdx = dynamicTeamCache.findIndex((m) => m.id === memberId);
    if (existingIdx >= 0) {
      dynamicTeamCache[existingIdx] = normalizedMember;
    } else {
      dynamicTeamCache.push(normalizedMember);
    }

    // Forward to Google Sheets
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "saveTeamMember", member: normalizedMember }),
        });
      } catch (err) {
        console.error("Google sheets team member save error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      member: normalizedMember,
      message: `Member "${normalizedMember.name}" saved.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Member ID parameter missing." },
        { status: 400 }
      );
    }

    dynamicTeamCache = dynamicTeamCache.filter((m) => m.id !== id);

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "deleteTeamMember", id }),
        });
      } catch (err) {
        console.error("Google sheets team member delete error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      message: "Member removed.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
