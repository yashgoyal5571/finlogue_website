import { NextResponse } from "next/server";
import { gallery as defaultGalleryData, GalleryItem } from "@/content/gallery";

export const runtime = "nodejs";

let dynamicGalleryCache: GalleryItem[] = [...defaultGalleryData.items];

export async function GET() {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${webhookUrl}?action=getGallery`, {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.gallery) && data.gallery.length > 0) {
          return NextResponse.json({ success: true, gallery: data.gallery, items: data.gallery, source: "google_sheets" });
        }
      }
    } catch {
      // Fallback
    }
  }

  return NextResponse.json({
    success: true,
    gallery: dynamicGalleryCache,
    items: dynamicGalleryCache,
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

    const { item } = body;
    if (!item || !item.title) {
      return NextResponse.json(
        { success: false, error: "Title is required for gallery moments." },
        { status: 400 }
      );
    }

    const itemId = item.id || `gal-${Date.now()}`;
    const normalizedItem: GalleryItem = {
      id: itemId,
      title: item.title,
      category: item.category || "Summits",
      image: item.image || "/assets/gallery/summit-keynote.jpg",
      date: item.date || "Spring 2026",
      location: item.location || "LNMIIT Campus",
      description: item.description || "",
      tag: item.tag || "CONCLAVE MOMENT",
    };

    const existingIdx = dynamicGalleryCache.findIndex((g) => g.id === itemId);
    if (existingIdx >= 0) {
      dynamicGalleryCache[existingIdx] = normalizedItem;
    } else {
      dynamicGalleryCache.unshift(normalizedItem);
    }

    // Forward to Google Sheets
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "saveGalleryItem", item: normalizedItem }),
        });
      } catch (err) {
        console.error("Google sheets gallery save error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      item: normalizedItem,
      message: `Gallery item "${normalizedItem.title}" saved.`,
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
        { success: false, error: "Gallery item ID missing." },
        { status: 400 }
      );
    }

    dynamicGalleryCache = dynamicGalleryCache.filter((g) => g.id !== id);

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "deleteGalleryItem", id }),
        });
      } catch (err) {
        console.error("Google sheets gallery delete error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      message: "Gallery moment removed.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
