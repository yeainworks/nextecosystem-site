"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  featured: boolean;
  slug: string;
  gradient: string;
}

const CATS = ["Все", "Анонс", "Продукт", "Партнёрство", "Компания"];
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeIn({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease }} style={style}>
      {children}
    </motion.div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

function FeaturedCard({ post, large }: { post: Post; large?: boolean }) {
  if (large) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ background: post.gradient, minHeight: 320, display: "flex", alignItems: "flex-end", padding: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", background: "rgba(0,0,0,0.4)", padding: "4px 10px", borderRadius: 100 }}>
            {post.category}
          </div>
        </div>
        <div style={{ padding: "36px 36px 36px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)", padding: "3px 8px", borderRadius: 100 }}>Featured</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{formatDate(post.date)}</span>
          </div>
          <h2 style={{ fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 700, letterSpacing: "-0.025em", color: "#f5f5f7", marginBottom: 16, lineHeight: 1.25 }}>{post.title}</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: 28, maxWidth: 340 }}>{post.excerpt}</p>
          <Link href={`/blog/${post.slug}`} style={{ fontSize: 13, color: "#f5f5f7", display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}
            className="read-link">
            Читать статью
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="feat-small" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", cursor: "pointer" }}>
      <div style={{ background: post.gradient, height: 140 }}/>
      <div style={{ padding: "20px 20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>{post.category}</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}>·</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{formatDate(post.date)}</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#f5f5f7", letterSpacing: "-0.015em", lineHeight: 1.35 }}>{post.title}</div>
      </div>
    </div>
  );
}

function PostRow({ post, first }: { post: Post; first: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-row" style={{
      display: "grid", gridTemplateColumns: "72px 1fr",
      gap: 20, padding: "20px 0",
      borderTop: first ? "1px solid rgba(255,255,255,0.07)" : "none",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      textDecoration: "none", color: "inherit",
    }}>
      <div style={{ width: 72, height: 72, borderRadius: 10, background: post.gradient, flexShrink: 0 }}/>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{post.category}</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{formatDate(post.date)}</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f7", letterSpacing: "-0.015em", marginBottom: 6, lineHeight: 1.3 }}>{post.title}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.55, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{post.excerpt}</div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cat, setCat] = useState("Все");
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.background = "#0a0a0a";
    fetch("/api/posts").then(r => r.json()).then(data => { setPosts(data); setLoading(false); });
    return () => { document.body.style.background = ""; };
  }, []);

  const featured = posts.filter(p => p.featured);
  const filtered = (cat === "Все" ? posts : posts.filter(p => p.category === cat));
  const shown = filtered.slice(0, visible);

  return (
    <div style={{ background: "#0a0a0a", color: "#f5f5f7", minHeight: "100vh", paddingTop: 80 }}>
      <style>{`
        .read-link:hover { opacity: 0.65; }
        .feat-small:hover { border-color: rgba(255,255,255,0.15) !important; }
        .post-row:hover { opacity: 0.7; }
        .cat-tab { padding: 6px 16px; border-radius: 6px; border: 1px solid transparent; background: transparent; color: rgba(255,255,255,0.45); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
        .cat-tab:hover { color: #f5f5f7; }
        .cat-tab.active { border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.07); color: #f5f5f7; }
        .load-more:hover { background: rgba(255,255,255,0.12) !important; }
        @media (max-width: 768px) {
          .feat-large-grid { grid-template-columns: 1fr !important; }
          .feat-large-grid > *:first-child > div { min-height: 180px !important; }
          .feat-small-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>

        {/* Header */}
        <FadeIn>
          <div style={{ padding: "52px 0 40px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#f5f5f7", marginBottom: 10 }}>Blog</h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Последние новости и обновления от NEXT Ecosystem</p>
          </div>
        </FadeIn>

        {/* Featured */}
        {!loading && featured.length > 0 && (
          <div style={{ padding: "40px 0" }}>
            <FadeIn>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Featured Posts</p>
            </FadeIn>
            <FadeIn delay={0.06}>
              <div className="feat-large-grid" style={{ marginBottom: 12 }}>
                <FeaturedCard post={featured[0]} large/>
              </div>
            </FadeIn>
            {featured.length > 1 && (
              <FadeIn delay={0.1}>
                <div className="feat-small-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(featured.length - 1, 3)}, 1fr)`, gap: 12, marginTop: 12 }}>
                  {featured.slice(1, 4).map(p => <FeaturedCard key={p.id} post={p}/>)}
                </div>
              </FadeIn>
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "8px 0 32px" }}/>

        {/* All Posts */}
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>All Posts</p>
            <div style={{ display: "flex", gap: 4, overflowX: "auto", scrollbarWidth: "none" }}>
              {CATS.map(c => (
                <button key={c} className={`cat-tab${cat === c ? " active" : ""}`} onClick={() => { setCat(c); setVisible(8); }}>{c}</button>
              ))}
            </div>
          </div>
        </FadeIn>

        {loading ? (
          <div style={{ padding: "60px 0", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Загрузка...</div>
        ) : shown.length === 0 ? (
          <div style={{ padding: "60px 0", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Нет публикаций в этой категории</div>
        ) : (
          <>
            {shown.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.04}>
                <PostRow post={p} first={i === 0}/>
              </FadeIn>
            ))}
            {filtered.length > visible && (
              <FadeIn>
                <div style={{ textAlign: "center", padding: "32px 0 48px" }}>
                  <button className="load-more" onClick={() => setVisible(v => v + 8)}
                    style={{ padding: "10px 28px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "background 0.15s" }}>
                    Загрузить ещё
                  </button>
                </div>
              </FadeIn>
            )}
          </>
        )}

        {!loading && shown.length > 0 && filtered.length <= visible && (
          <div style={{ padding: "32px 0 48px" }}/>
        )}
      </div>
    </div>
  );
}
