import path from "path";
import fs from "fs/promises";
import { CmsData, defaultCmsData } from "./cms-types";

export * from "./cms-types";

const DATA_DIR = path.join(process.cwd(), "data");
const CMS_FILE_PATH = path.join(DATA_DIR, "cms-content.json");
const CMS_BACKUP_PATH = path.join(DATA_DIR, "cms-content.backup.json");

/**
 * Reads all CMS data from data/cms-content.json.
 * Uses persistent backup if there is any read or parse error,
 * and NEVER overwrites existing data with sample defaults.
 */
export async function getCmsData(): Promise<CmsData> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  // 1. Try reading primary CMS file
  try {
    const content = await fs.readFile(CMS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(content);

    return {
      home: { ...defaultCmsData.home, ...(parsed.home || {}) },
      events: { ...defaultCmsData.events, ...(parsed.events || {}) },
      gallery: { ...defaultCmsData.gallery, ...(parsed.gallery || {}) },
      team: Array.isArray(parsed.team) && parsed.team.length > 0 ? parsed.team : defaultCmsData.team,
      contact: { ...defaultCmsData.contact, ...(parsed.contact || {}) },
      googleSheets: { ...defaultCmsData.googleSheets, ...(parsed.googleSheets || {}) },
    };
  } catch (primaryErr: any) {
    // 2. If primary file doesn't exist, check if backup exists before defaulting
    if (primaryErr?.code !== "ENOENT") {
      console.warn("[CMS ENGINE] Read error on primary file, attempting backup recovery:", primaryErr?.message);
      try {
        const backupContent = await fs.readFile(CMS_BACKUP_PATH, "utf-8");
        const parsedBackup = JSON.parse(backupContent);
        return {
          home: { ...defaultCmsData.home, ...(parsedBackup.home || {}) },
          events: { ...defaultCmsData.events, ...(parsedBackup.events || {}) },
          gallery: { ...defaultCmsData.gallery, ...(parsedBackup.gallery || {}) },
          team: Array.isArray(parsedBackup.team) && parsedBackup.team.length > 0 ? parsedBackup.team : defaultCmsData.team,
          contact: { ...defaultCmsData.contact, ...(parsedBackup.contact || {}) },
          googleSheets: { ...defaultCmsData.googleSheets, ...(parsedBackup.googleSheets || {}) },
        };
      } catch (backupErr) {
        console.error("[CMS ENGINE] Backup recovery also failed:", backupErr);
      }
    }

    // 3. Only if file strictly does not exist anywhere, initialize once
    if (primaryErr?.code === "ENOENT") {
      try {
        await fs.writeFile(CMS_FILE_PATH, JSON.stringify(defaultCmsData, null, 2), "utf-8");
      } catch (writeErr) {
        console.warn("[CMS ENGINE] Could not initialize CMS file:", writeErr);
      }
    }

    return defaultCmsData;
  }
}

/**
 * Updates CMS data atomically and creates a permanent backup.
 */
export async function saveCmsData(updates: Partial<CmsData>): Promise<CmsData> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const current = await getCmsData();

  const merged: CmsData = {
    home: updates.home ? { ...current.home, ...updates.home } : current.home,
    events: updates.events ? { ...current.events, ...updates.events } : current.events,
    gallery: updates.gallery ? { ...current.gallery, ...updates.gallery } : current.gallery,
    team: updates.team ?? current.team,
    contact: updates.contact ? { ...current.contact, ...updates.contact } : current.contact,
    googleSheets: updates.googleSheets ? { ...current.googleSheets, ...updates.googleSheets } : current.googleSheets,
  };

  const payload = JSON.stringify(merged, null, 2);

  // Write to temporary file first, then atomically rename
  const tempPath = `${CMS_FILE_PATH}.${Date.now()}.tmp`;
  await fs.writeFile(tempPath, payload, "utf-8");
  await fs.rename(tempPath, CMS_FILE_PATH);

  // Keep a separate persistent backup copy
  try {
    await fs.writeFile(CMS_BACKUP_PATH, payload, "utf-8");
  } catch (backupWriteErr) {
    console.warn("[CMS ENGINE] Could not write backup:", backupWriteErr);
  }

  return merged;
}
