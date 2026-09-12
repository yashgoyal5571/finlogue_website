/**
 * Shared API Utilities for Request Parsing and Validation
 */

export async function parseRequestBody<T = Record<string, any>>(request: Request): Promise<T> {
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const text = await request.text();
      return text ? JSON.parse(text) : ({} as T);
    }
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      return Object.fromEntries(formData) as unknown as T;
    }
    const text = await request.text();
    return text ? JSON.parse(text) : ({} as T);
  } catch {
    return {} as T;
  }
}

export function sanitizeString(val: unknown, maxLen = 500): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen);
}
