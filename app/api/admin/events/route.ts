import { NextResponse } from "next/server";
import { events as defaultEventsData, CaseFile } from "@/content/events";

export const runtime = "nodejs";

// In-memory cache for dynamic changes within server runtime (fallback when webhook not yet configured)
let dynamicEventsCache: CaseFile[] = [...defaultEventsData.caseFiles];

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
          // Normalize status
          const sheetEvents = data.events.map((e: any) => ({
            id: e.id || e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            fileNumber: e.fileNumber || "CASE FILE",
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
      console.warn("[ADMIN EVENTS API] Google Sheets fetch failed or timed out, using fallback cache:", err);
    }
  }

  return NextResponse.json({
    success: true,
    events: dynamicEventsCache,
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
      fileNumber: event.fileNumber || `INITIATIVE 0${dynamicEventsCache.length + 1}`,
      title: event.title.toUpperCase(),
      status: event.status || "ACTIVE",
      category: event.category || "Strategy",
      date: event.date || "UPCOMING",
      description: event.description || "",
      prizeOrOutput: event.prizeOrOutput || "Citation & Certificates",
      eligibility: event.eligibility || "Open Pan-India",
    };

    // Update in-memory cache
    const existingIndex = dynamicEventsCache.findIndex((e) => e.id === eventId);
    if (existingIndex >= 0) {
      dynamicEventsCache[existingIndex] = normalizedEvent;
    } else {
      dynamicEventsCache.unshift(normalizedEvent);
    }

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

    const target = dynamicEventsCache.find((e) => e.id === id);
    if (target) {
      target.status = status;
    }

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

    dynamicEventsCache = dynamicEventsCache.filter((e) => e.id !== id);

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
