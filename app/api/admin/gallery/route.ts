import { NextResponse } from "next/server";
import { getCmsData, saveCmsData } from "@/lib/cms";
import { GalleryItem } from "@/content/gallery";

export const runtime = "nodejs";

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

  const cms = await getCmsData();
  return NextResponse.json({
    success: true,
    gallery: cms.gallery.items,
    items: cms.gallery.items,
    celebratingSuccess: cms.gallery.celebratingSuccess,
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

    const { item } = body;
    if (!item || !item.image) {
      return NextResponse.json(
        { success: false, error: "Photo image is required." },
        { status: 400 }
      );
    }

    const itemId = item.id || `gal-${Date.now()}`;
    const normalizedItem: GalleryItem = {
      id: itemId,
      image: item.image,
      title: item.title || "",
      category: item.category || "Gallery",
      date: item.date || "",
      location: item.location || "",
      description: item.description || "",
      tag: item.tag || "",
    };

    const cms = await getCmsData();
    const currentList = [...cms.gallery.items];
    const existingIdx = currentList.findIndex((g) => g.id === itemId);
    if (existingIdx >= 0) {
      currentList[existingIdx] = normalizedItem;
    } else {
      currentList.unshift(normalizedItem);
    }

    await saveCmsData({
      gallery: {
        ...cms.gallery,
        items: currentList,
      },
    });

    // Forward to Google Sheets if configured
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

    const cms = await getCmsData();
    const filteredList = cms.gallery.items.filter((g) => g.id !== id);

    await saveCmsData({
      gallery: {
        ...cms.gallery,
        items: filteredList,
      },
    });

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

