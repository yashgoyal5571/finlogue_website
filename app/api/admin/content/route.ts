import { NextRequest, NextResponse } from "next/server";
import { getCmsData, saveCmsData, CmsData } from "@/lib/cms";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section") as keyof CmsData | null;

    const cmsData = await getCmsData();

    if (section && section in cmsData) {
      return NextResponse.json({
        success: true,
        section,
        data: cmsData[section],
      });
    }

    return NextResponse.json({
      success: true,
      data: cmsData,
    });
  } catch (error: any) {
    console.error("[CMS API] Error fetching data:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load content" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    let updates: Partial<CmsData> = {};

    if (body.section && body.data) {
      updates = { [body.section]: body.data };
    } else if (body.updates) {
      updates = body.updates;
    } else {
      updates = body;
    }

    const updated = await saveCmsData(updates);

    return NextResponse.json({
      success: true,
      message: "Content successfully updated and persisted to disk.",
      data: updated,
    });
  } catch (error: any) {
    console.error("[CMS API] Error saving content:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to persist content changes" },
      { status: 500 }
    );
  }
}
