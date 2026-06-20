import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  featured: boolean;
  slug: string;
  gradient: string;
}

const postsFile = path.join(process.cwd(), "src/data/posts.json");

function readPosts(): Post[] {
  try {
    return JSON.parse(fs.readFileSync(postsFile, "utf-8"));
  } catch {
    return [];
  }
}

function writePosts(posts: Post[]) {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
}

const gradients = [
  "linear-gradient(135deg, #0d2626 0%, #1a2e10 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #2e2e4e 100%)",
  "linear-gradient(135deg, #0c4a6e 0%, #1e1b4b 100%)",
  "linear-gradient(135deg, #1a0d2e 0%, #2e1a4e 100%)",
  "linear-gradient(135deg, #0a1a2e 0%, #0d2a4a 100%)",
  "linear-gradient(135deg, #2e1a0d 0%, #4e2e0a 100%)",
];

export async function GET() {
  return NextResponse.json(readPosts());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const posts = readPosts();
  const post: Post = {
    id: Date.now().toString(),
    title: body.title ?? "",
    excerpt: body.excerpt ?? "",
    content: body.content ?? "",
    category: body.category ?? "Анонс",
    date: new Date().toISOString().split("T")[0],
    featured: body.featured ?? false,
    slug: body.title
      .toLowerCase()
      .replace(/[^a-zа-яё0-9\s]/gi, "")
      .trim()
      .replace(/\s+/g, "-")
      .substring(0, 60),
    gradient: gradients[posts.length % gradients.length],
  };
  posts.unshift(post);
  writePosts(posts);
  return NextResponse.json(post, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const posts = readPosts().filter((p) => p.id !== id);
  writePosts(posts);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();
  const posts = readPosts().map((p) => (p.id === id ? { ...p, ...updates } : p));
  writePosts(posts);
  return NextResponse.json({ ok: true });
}
