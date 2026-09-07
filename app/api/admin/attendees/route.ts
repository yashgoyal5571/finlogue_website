import { NextResponse } from "next/server";

export const runtime = "nodejs";

export interface AttendeeItem {
  id: string;
  token: string;
  name: string;
  email: string;
  phone?: string;
  institution: string;
  event: string;
  status: "CONFIRMED" | "WAITLISTED" | "CHECKED-IN" | "REJECTED";
  registeredAt: string;
  notes?: string;
}

export let dynamicAttendeesCache: AttendeeItem[] = [
  {
    id: "att-01",
    token: "REG-882101",
    name: "Aarav Khandelwal",
    email: "aarav.khandelwal@lnmiit.ac.in",
    phone: "+91 98290 11421",
    institution: "The LNM Institute of Information Technology",
    event: "PITCH ON THE ROCKS (POTR)",
    status: "CONFIRMED",
    registeredAt: "2026-03-01 14:22",
    notes: "Pitching DeepTech startup SensoVision; Deck reviewed by venture panel.",
  },
  {
    id: "att-02",
    token: "REG-882102",
    name: "Sanya Mehra",
    email: "sanya.m@srcc.du.ac.in",
    phone: "+91 98112 44302",
    institution: "SRCC, University of Delhi",
    event: "NATIONAL CASE CRACKERS",
    status: "CONFIRMED",
    registeredAt: "2026-03-02 11:05",
    notes: "Team Lead — Syndicate 04 (Corporate Turnaround Strategy).",
  },
  {
    id: "att-03",
    token: "REG-882103",
    name: "Devansh Singhania",
    email: "devansh.s@iitb.ac.in",
    phone: "+91 99301 55219",
    institution: "IIT Bombay",
    event: "PITCH ON THE ROCKS (POTR)",
    status: "CONFIRMED",
    registeredAt: "2026-03-03 09:40",
    notes: "Pre-seed founder pitch; requesting investor 1-on-1 slot.",
  },
  {
    id: "att-04",
    token: "REG-882104",
    name: "Pooja Verma",
    email: "pooja.verma@pilani.bits-pilani.ac.in",
    phone: "+91 97188 33100",
    institution: "BITS Pilani",
    event: "VALUATION & EQUITY RESEARCH LAB",
    status: "CHECKED-IN",
    registeredAt: "2026-03-03 16:15",
    notes: "Completed prerequisite DCF screening test with 94% score.",
  },
  {
    id: "att-05",
    token: "REG-882105",
    name: "Kabir Mathur",
    email: "kabir.mathur@lnmiit.ac.in",
    phone: "+91 96541 22987",
    institution: "The LNM Institute of Information Technology",
    event: "M&A BOARDROOM SIMULATION",
    status: "CONFIRMED",
    registeredAt: "2026-03-04 18:30",
    notes: "Assigned Buy-Side Investment Banking Lead role.",
  },
  {
    id: "att-06",
    token: "REG-882106",
    name: "Ananya Deshmukh",
    email: "ananya.d@iitd.ac.in",
    phone: "+91 98109 77651",
    institution: "IIT Delhi",
    event: "PITCH ON THE ROCKS (POTR)",
    status: "WAITLISTED",
    registeredAt: "2026-03-05 13:12",
    notes: "Awaiting secondary deck verification from 100X.VC analysts.",
  },
  {
    id: "att-07",
    token: "REG-882107",
    name: "Rohan Bhattacharya",
    email: "rohan.b@stxaviers.edu",
    phone: "+91 98311 00234",
    institution: "St. Xavier's College, Kolkata",
    event: "CONSULTANTS GOT TALENT",
    status: "CONFIRMED",
    registeredAt: "2026-03-06 10:45",
    notes: "Track B: Structured Market Entry Case Round.",
  },
  {
    id: "att-08",
    token: "REG-882108",
    name: "Meera Nair",
    email: "meera.nair@lnmiit.ac.in",
    phone: "+91 94471 88912",
    institution: "The LNM Institute of Information Technology",
    event: "VALUATION & EQUITY RESEARCH LAB",
    status: "CHECKED-IN",
    registeredAt: "2026-03-06 15:20",
    notes: "Cohort 2026 Analyst; LBO modeling workshop attendee.",
  },
];

export async function GET() {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(`${webhookUrl}?action=getRegistrations`, {
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.registrations) && data.registrations.length > 0) {
          return NextResponse.json({
            success: true,
            attendees: data.registrations,
            items: data.registrations,
            source: "google_sheets",
          });
        }
      }
    } catch {
      // Fallback
    }
  }

  return NextResponse.json({
    success: true,
    attendees: dynamicAttendeesCache,
    items: dynamicAttendeesCache,
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

    const { attendee } = body;
    if (!attendee || !attendee.name || !attendee.email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required for attendee records." },
        { status: 400 }
      );
    }

    const attendeeId = attendee.id || `att-${Date.now()}`;
    const token = attendee.token || `REG-${Math.floor(100000 + Math.random() * 900000)}`;

    const normalizedAttendee: AttendeeItem = {
      id: attendeeId,
      token,
      name: attendee.name,
      email: attendee.email,
      phone: attendee.phone || "",
      institution: attendee.institution || "Independent Participant",
      event: attendee.event || "PITCH ON THE ROCKS (POTR)",
      status: attendee.status || "CONFIRMED",
      registeredAt: attendee.registeredAt || new Date().toISOString().replace("T", " ").slice(0, 16),
      notes: attendee.notes || "",
    };

    const existingIdx = dynamicAttendeesCache.findIndex((a) => a.id === attendeeId);
    if (existingIdx >= 0) {
      dynamicAttendeesCache[existingIdx] = normalizedAttendee;
    } else {
      dynamicAttendeesCache.unshift(normalizedAttendee);
    }

    // Forward to Google Sheets if configured
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "saveAttendee", attendee: normalizedAttendee }),
        });
      } catch (err) {
        console.error("Google sheets attendee save error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      attendee: normalizedAttendee,
      message: `Attendee "${normalizedAttendee.name}" saved.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID and status are required." },
        { status: 400 }
      );
    }

    const target = dynamicAttendeesCache.find((a) => a.id === id);
    if (target) {
      target.status = status;
    }

    // Forward status update to Google Sheets
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "updateAttendeeStatus", id, status }),
        });
      } catch (err) {
        console.error("Google sheets attendee status update error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      status,
      message: `Attendee status updated to ${status}.`,
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
        { success: false, error: "Attendee ID missing." },
        { status: 400 }
      );
    }

    dynamicAttendeesCache = dynamicAttendeesCache.filter((a) => a.id !== id);

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "deleteAttendee", id }),
        });
      } catch (err) {
        console.error("Google sheets attendee delete error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      message: "Attendee removed.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
