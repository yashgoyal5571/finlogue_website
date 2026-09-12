import { NextResponse } from "next/server";
import { getCmsData, saveCmsData, TeamMemberItem } from "@/lib/cms";

export const runtime = "nodejs";

export { type TeamMemberItem };

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

  const cms = await getCmsData();
  return NextResponse.json({
    success: true,
    team: cms.team,
    source: "cms_store",
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
      focus: member.dept ? member.dept : (member.focus || ""),
      email: member.email || "24uec533@lnmiit.ac.in",
      linkedin: member.linkedin || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
      image: member.image || "/assets/team/aditya-tiwari.jpg",
    };

    const cms = await getCmsData();
    const currentList = [...cms.team];
    const existingIdx = currentList.findIndex((m) => m.id === memberId);
    if (existingIdx >= 0) {
      currentList[existingIdx] = normalizedMember;
    } else {
      currentList.push(normalizedMember);
    }

    await saveCmsData({
      team: currentList,
    });

    // Forward to Google Sheets if configured
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

    const cms = await getCmsData();
    const filteredList = cms.team.filter((m) => m.id !== id);

    await saveCmsData({
      team: filteredList,
    });

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

