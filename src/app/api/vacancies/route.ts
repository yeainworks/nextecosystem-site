import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "src/data/vacancies.json");

function read() {
  try { return JSON.parse(fs.readFileSync(FILE, "utf-8")); }
  catch { return []; }
}
function write(data: unknown[]) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function GET(req: NextRequest) {
  let vacancies = read();
  if (req.nextUrl.searchParams.get("active") === "true") {
    vacancies = vacancies.filter((v: { active: boolean }) => v.active);
  }
  return NextResponse.json(vacancies);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const vacancies = read();
  const vacancy = {
    id: Date.now().toString(),
    title: (body.title || "").trim(),
    department: body.department || "Другое",
    type: body.type || "Полная занятость",
    format: body.format || "Удалённо",
    description: (body.description || "").trim(),
    requirements: (body.requirements || "").trim(),
    active: true,
    date: new Date().toISOString(),
  };
  vacancies.unshift(vacancy);
  write(vacancies);
  return NextResponse.json(vacancy);
}

export async function PATCH(req: NextRequest) {
  const { id, ...fields } = await req.json();
  const vacancies = read();
  const idx = vacancies.findIndex((v: { id: string }) => v.id === id);
  if (idx === -1) return NextResponse.json({ error: "not found" }, { status: 404 });
  vacancies[idx] = { ...vacancies[idx], ...fields };
  write(vacancies);
  return NextResponse.json(vacancies[idx]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  write(read().filter((v: { id: string }) => v.id !== id));
  return NextResponse.json({ ok: true });
}
