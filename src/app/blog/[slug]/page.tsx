"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface Post {
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

function formatDate(iso: string, lang: string) {
  const d = new Date(iso);
  const locale = lang === "zh" ? "zh-CN" : lang === "es" ? "es-ES" : lang === "en" ? "en-US" : "ru-RU";
  return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t, lang } = useLanguage();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.background = "#0a0a0a";
    fetch("/api/posts")
      .then(r => r.json())
      .then((posts: Post[]) => {
        setPost(posts.find(p => p.slug === decodeURIComponent(slug)) ?? null);
        setLoading(false);
      });
    return () => { document.body.style.background = ""; };
  }, [slug]);

  if (loading) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", paddingTop: 160, textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
        {t.blog.loading}
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", paddingTop: 160, textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 15, marginBottom: 24 }}>404</p>
        <Link href="/blog" style={{ color: "#f5f5f7", fontSize: 14, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 22px", borderRadius: 8 }}>
          ← {t.blog.h1}
        </Link>
      </div>
    );
  }

  // Content: "\n\n"-separated blocks; "## " prefix marks a subheading
  const blocks = post.content.split(/\n\n+/).map(b => b.trim()).filter(Boolean);

  return (
    <div style={{ background: "#0a0a0a", color: "#f5f5f7", minHeight: "100vh", paddingTop: 96, paddingBottom: 120 }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>

        <Link href="/blog" className="back-link" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: 36, transition: "color 0.15s" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          {t.blog.h1}
        </Link>

        {/* Hero */}
        <div style={{ background: post.gradient, borderRadius: 16, height: "clamp(140px, 24vw, 220px)", marginBottom: 36, display: "flex", alignItems: "flex-end", padding: 24 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.4)", padding: "4px 10px", borderRadius: 100 }}>
            {post.category}
          </span>
        </div>

        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>{formatDate(post.date, lang)}</p>

        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 20 }}>
          {post.title}
        </h1>

        <p style={{ fontSize: "clamp(15px,2vw,17px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: 44, borderLeft: "2px solid rgba(255,255,255,0.15)", paddingLeft: 18 }}>
          {post.excerpt}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {blocks.map((block, i) =>
            block.startsWith("## ") ? (
              <h2 key={i} style={{ fontSize: "clamp(19px,2.5vw,24px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#f5f5f7", marginTop: 18 }}>
                {block.slice(3)}
              </h2>
            ) : (
              <p key={i} style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                {block}
              </p>
            )
          )}
        </div>

      </div>

      <style>{`
        .back-link:hover { color: #f5f5f7 !important; }
      `}</style>
    </div>
  );
}
