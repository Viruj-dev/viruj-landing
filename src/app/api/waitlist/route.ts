import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  city?: string;
  phone?: string;
  role?: string;
  createdAt: string;
  source: string;
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const city = String(body.city || "").trim();
    const phone = String(body.phone || "").trim();
    const role = String(body.role || "patient").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const newEntry: WaitlistEntry = {
      id: `wl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      city: city || "Noida / Greater Noida / Ghaziabad",
      phone: phone || undefined,
      role,
      createdAt: new Date().toISOString(),
      source: "viruj-health-landing",
    };

    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      let existing: WaitlistEntry[] = [];
      try {
        const content = await fs.readFile(WAITLIST_FILE, "utf-8");
        existing = JSON.parse(content);
      } catch {
        existing = [];
      }

      // Check if already registered
      const alreadyExists = existing.some(
        (entry) => entry.email.toLowerCase() === email
      );

      if (!alreadyExists) {
        existing.push(newEntry);
        await fs.writeFile(
          WAITLIST_FILE,
          JSON.stringify(existing, null, 2),
          "utf-8"
        );
      }
    } catch (fsErr) {
      console.error("Failed to write to waitlist storage:", fsErr);
      // Even if local FS is read-only in serverless, log and proceed with successful acknowledgment
    }

    return NextResponse.json(
      {
        success: true,
        message: "You have been added to the early access waitlist!",
        email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
