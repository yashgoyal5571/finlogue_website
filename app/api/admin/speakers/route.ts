import { NextResponse } from "next/server";
import { home } from "@/content/home";
import { events } from "@/content/events";

export const runtime = "nodejs";

export interface SpeakerItem {
  id?: string;
  name: string;
  title: string;
  firm: string;
  category: string;
  quote: string;
  image?: string;
}

const potrMentors: SpeakerItem[] = events.flagship.investorsMentors.map((m, idx) => ({
  id: `potr-mentor-${idx + 1}`,
  name: m.name,
  title: m.role,
  firm: m.credential,
  category: "POTR Conclave Jury",
  quote: "Official diligence & investment panel judge for Pitch on the Rocks Flagship Conclave.",
  image: "/assets/gallery/summit-keynote.jpg",
}));

let dynamicSpeakersCache: SpeakerItem[] = [
  ...home.speakersMentors.map((s, idx) => ({
    id: `speaker-${idx + 1}`,
    ...s,
  })),
  ...potrMentors,
];

export async function GET() {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${webhookUrl}?action=getSpeakers`, {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.speakers) && data.speakers.length > 0) {
          return NextResponse.json({ success: true, speakers: data.speakers, source: "google_sheets" });
        }
      }
    } catch {
      // Fallback to cache
    }
  }

  return NextResponse.json({
    success: true,
    speakers: dynamicSpeakersCache,
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

    const { speaker } = body;
    if (!speaker || !speaker.name) {
      return NextResponse.json(
        { success: false, error: "Speaker name is required." },
        { status: 400 }
      );
    }

    const speakerId = speaker.id || `speaker-${Date.now()}`;
    const normalizedSpeaker: SpeakerItem = {
      id: speakerId,
      name: speaker.name,
      title: speaker.title || "Industry Mentor",
      firm: speaker.firm || "Finance & Venture Advisory",
      category: speaker.category || "Venture Capital",
      quote: speaker.quote || "Empowering the next generation of financial minds.",
      image: speaker.image || "/assets/team/aryan-mittal.jpg",
    };

    const existingIdx = dynamicSpeakersCache.findIndex((s) => s.id === speakerId);
    if (existingIdx >= 0) {
      dynamicSpeakersCache[existingIdx] = normalizedSpeaker;
    } else {
      dynamicSpeakersCache.unshift(normalizedSpeaker);
    }

    // Forward to Google Sheets if configured
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "saveSpeaker", speaker: normalizedSpeaker }),
        });
      } catch (err) {
        console.error("Google sheets speaker save error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      speaker: normalizedSpeaker,
      message: `Speaker "${normalizedSpeaker.name}" saved successfully.`,
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
        { success: false, error: "Speaker ID parameter missing." },
        { status: 400 }
      );
    }

    dynamicSpeakersCache = dynamicSpeakersCache.filter((s) => s.id !== id);

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "deleteSpeaker", id }),
        });
      } catch (err) {
        console.error("Google sheets speaker delete error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      message: "Speaker removed.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
