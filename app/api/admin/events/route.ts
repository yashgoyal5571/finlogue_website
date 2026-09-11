import { NextResponse } from "next/server";
import { getCmsData, saveCmsData } from "@/lib/cms";
import { CaseFile } from "@/content/events";

export const runtime = "nodejs";

export async function GET() {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      // Query Google Sheets with short timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${webhookUrl}?action=getEvents`, {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.events) && data.events.length > 0) {
          const sheetEvents = data.events.map((e: any) => ({
            id: e.id || e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            fileNumber: e.fileNumber || "",
            title: e.title,
            status: e.status || "ACTIVE",
            category: e.category || "Strategy",
            date: e.date || "TBA",
            description: e.description || "",
            prizeOrOutput: e.prizeOrOutput || "",
            eligibility: e.eligibility || "Open Pan-India",
          }));
          return NextResponse.json({ success: true, events: sheetEvents, source: "google_sheets" });
        }
      }
    } catch (err) {
      console.warn("[ADMIN EVENTS API] Google Sheets fetch failed, using CMS store:", err);
    }
  }

  const cms = await getCmsData();
  return NextResponse.json({
    success: true,
    events: cms.events.caseFiles,
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
    const { event } = body;

    if (!event || !event.title) {
      return NextResponse.json(
        { success: false, error: "Event title is required." },
        { status: 400 }
      );
    }

    const eventId = event.id || event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const normalizedEvent: CaseFile = {
      id: eventId,
      fileNumber: event.fileNumber || "",
      title: event.title.toUpperCase(),
      status: event.status || "ACTIVE",
      category: event.category || "Strategy",
      date: event.date || "UPCOMING",
      description: event.description || "",
      prizeOrOutput: event.prizeOrOutput || "Citation & Certificates",
      eligibility: event.eligibility || "Open Pan-India",
    };

    const cms = await getCmsData();
    const currentList = [...cms.events.caseFiles];
    const existingIndex = currentList.findIndex((e) => e.id === eventId);
    if (existingIndex >= 0) {
      currentList[existingIndex] = normalizedEvent;
    } else {
      currentList.unshift(normalizedEvent);
    }

    await saveCmsData({
      events: {
        ...cms.events,
        caseFiles: currentList,
      },
    });

    // Sync to Google Sheets if configured
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "saveEvent",
            event: normalizedEvent,
          }),
        });
      } catch (err) {
        console.error("[ADMIN EVENTS API] Failed to push event to Google Sheets:", err);
      }
    }

    return NextResponse.json({
      success: true,
      event: normalizedEvent,
      message: `Event "${normalizedEvent.title}" saved successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}

// TOGGLE STATUS: ACTIVE (LIVE) | UPCOMING | CLOSED (ARCHIVED)
export async function PATCH(request: Request) {
  try {
    const text = await request.text();
    let body: any = {};
    try {
      body = JSON.parse(text);
    } catch {
      body = {};
    }
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Event ID and status are required." },
        { status: 400 }
      );
    }

    const cms = await getCmsData();
    const updatedList = cms.events.caseFiles.map((e) =>
      e.id === id ? { ...e, status } : e
    );

    await saveCmsData({
      events: {
        ...cms.events,
        caseFiles: updatedList,
      },
    });

    // Sync status to Google Sheets
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "updateStatus",
            id,
            status,
          }),
        });
      } catch (err) {
        console.error("[ADMIN EVENTS API] Failed to push status toggle to Google Sheets:", err);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      status,
      message: `Event status toggled to ${status}.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error." },
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
        { success: false, error: "Event ID parameter missing." },
        { status: 400 }
      );
    }

    const cms = await getCmsData();
    const filteredList = cms.events.caseFiles.filter((e) => e.id !== id);

    await saveCmsData({
      events: {
        ...cms.events,
        caseFiles: filteredList,
      },
    });

    // Sync delete to Google Sheets
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "deleteEvent",
            id,
          }),
        });
      } catch (err) {
        console.error("[ADMIN EVENTS API] Failed to push delete to Google Sheets:", err);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      message: "Event removed from catalog.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
