import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "waitlist.json");

type Entry = {
  email: string;
  region?: string;
  courseType?: string;
  mood?: string;
  createdAt: string;
};

async function readEntries(): Promise<Entry[]> {
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    return JSON.parse(raw) as Entry[];
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Partial<Entry> | null;
  const email = body?.email?.trim();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const entry: Entry = {
    email,
    region: body?.region || undefined,
    courseType: body?.courseType || undefined,
    mood: body?.mood || undefined,
    createdAt: new Date().toISOString(),
  };

  await fs.mkdir(dataDir, { recursive: true });
  const entries = await readEntries();
  entries.push(entry);
  await fs.writeFile(dataFile, JSON.stringify(entries, null, 2), "utf8");

  return NextResponse.json({ ok: true });
}
