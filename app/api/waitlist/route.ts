import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const dataDir = path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "waitlist.json");

type Entry = {
  email: string;
  region?: string;
  tripType?: string;
  travelTime?: string;
  companion?: string;
  ageGroups?: string[];
  moods?: string[];
  indoorOutdoor?: string;
  planB?: string;
  place?: string;
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
    tripType: body?.tripType || undefined,
    travelTime: body?.travelTime || undefined,
    companion: body?.companion || undefined,
    ageGroups:
      Array.isArray(body?.ageGroups) && body.ageGroups.length > 0
        ? body.ageGroups
        : undefined,
    moods:
      Array.isArray(body?.moods) && body.moods.length > 0
        ? body.moods
        : undefined,
    indoorOutdoor: body?.indoorOutdoor || undefined,
    planB: body?.planB || undefined,
    place: body?.place?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  await fs.mkdir(dataDir, { recursive: true });
  const entries = await readEntries();
  entries.push(entry);
  await fs.writeFile(dataFile, JSON.stringify(entries, null, 2), "utf8");

  return NextResponse.json({ ok: true });
}
