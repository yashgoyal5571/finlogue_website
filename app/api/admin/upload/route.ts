import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided for upload." },
        { status: 400 }
      );
    }

    // Validate mime type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/svg+xml"];
    if (!validTypes.includes(file.type) && !file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload a JPG, PNG, or WEBP image." },
        { status: 400 }
      );
    }

    // Sanitize and format filename
    const originalName = file.name || "portrait.jpg";
    const ext = path.extname(originalName) || ".jpg";
    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const finalFileName = `${baseName || `member-${Date.now()}`}${ext.toLowerCase()}`;

    const requestedFolder = ((formData.get("folder") as string) || "general").toLowerCase();
    const safeFolder = ["team", "gallery", "hero", "events"].includes(requestedFolder)
      ? requestedFolder
      : "general";

    // Target upload directory
    const targetDir = path.join(process.cwd(), "public", "assets", safeFolder);
    await fs.mkdir(targetDir, { recursive: true });

    // Write file to public/assets/${safeFolder}/
    const filePath = path.join(targetDir, finalFileName);
    const bytes = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(bytes));

    return NextResponse.json({
      success: true,
      fileName: finalFileName,
      url: `/assets/${safeFolder}/${finalFileName}`,
      size: file.size,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload image." },
      { status: 500 }
    );
  }
}
