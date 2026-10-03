import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  createdAt: string;
  source: string;
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const interest = String(body.interest || "General inquiry").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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

    const newSubmission: ContactSubmission = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      interest,
      message,
      createdAt: new Date().toISOString(),
      source: "viruj-health-landing",
    };

    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      let existing: ContactSubmission[] = [];
      try {
        const content = await fs.readFile(CONTACTS_FILE, "utf-8");
        existing = JSON.parse(content);
      } catch {
        existing = [];
      }

      existing.push(newSubmission);
      await fs.writeFile(
        CONTACTS_FILE,
        JSON.stringify(existing, null, 2),
        "utf-8"
      );
    } catch (fsErr) {
      console.error("Failed to write contact submission to disk:", fsErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. Our team will contact you shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
