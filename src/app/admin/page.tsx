"use client";
import { useState, useEffect } from "react";

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

const CATS = ["Анонс", "Продукт", "Партнёрство", "Компания"];
const PASS = "next2025";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", category: "Анонс", featured: false,
  });

  useEffect(() => {
    if (!auth) return;
    document.body.style.background = "#0a0a0a";
    fetch("/api/posts").then(r => r.json()).then(data => { setPosts(data); setLoading(false); });
    return () => { document.body.style.background = ""; };
  }, [auth]);

  function login() {
    if (pw === PASS) { setAuth(true); setPwErr(false); }
    else setPwErr(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    const res = await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const post = await res.json();
    setPosts(prev => [post, ...prev]);
    setForm({ title: "", excerpt: "", content: "", category: "Анонс", featured: false });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  async function deletePost(id: string) {
    setDeleting(id);
    await fetch("/api/posts", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setPosts(prev => prev.filter(p => p.id !== id));
    setDeleting(null);
  }

  async function toggleFeatured(post: Post) {
    const updated = { ...post, featured: !post.featured };
    await fetch("/api/posts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: post.id, featured: updated.featured }) });
    setPosts(prev => prev.map(p => p.id === post.id ? updated : p));
  }

  const inp: React.CSSProperties = {
    width: "100%", background: "#141414", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8, padding: "10px 14px", color: "#f5f5f7", fontSize: 14,
    outline: "none", transition: "border-color 0.15s",
  };

  if (!auth) {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 360, padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Admin</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: "#f5f5f7" }}>Вход</h1>
          </div>
          <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28 }}>
            <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Пароль</label>
            <input
              type="password" value={pw}
              onChange={e => { setPw(e.target.value); setPwErr(false); }}
              onKeyDown={e => e.key === "Enter" && login()}
              placeholder="••••••••"
              style={{ ...inp, borderColor: pwErr ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.1)", marginBottom: 8 }}
            />
            {pwErr && <p style={{ fontSize: 12, color: "rgba(255,80,80,0.8)", marginBottom: 12 }}>Неверный пароль</p>}
            <button onClick={login} style={{ width: "100%", marginTop: 8, padding: "11px", borderRadius: 8, background: "#f5f5f7", color: "#0a0a0a", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}>
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f5f5f7", paddingTop: 80 }}>
      <style>{`
        input:focus, textarea:focus, select:focus { border-color: rgba(255,255,255,0.3) !important; }
        .del-btn:hover { background: rgba(255,60,60,0.15) !important; color: rgba(255,100,100,0.9) !important; }
        .feat-btn:hover { background: rgba(255,255,255,0.1) !important; }
        .post-item:hover { border-color: rgba(255,255,255,0.12) !important; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,5vw,40px) 80px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "40px 0 36px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 40 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Admin</p>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: "#f5f5f7" }}>Управление блогом</h1>
          </div>
          <a href="/blog" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}
            className="feat-btn" >
            Перейти к блогу →
          </a>
        </div>

        {/* New post form */}
        <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px", marginBottom: 48 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", color: "#f5f5f7", marginBottom: 24 }}>Новая публикация</h2>
          <form onSubmit={submit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Заголовок *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Заголовок статьи" required style={inp}/>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Категория</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  style={{ ...inp, cursor: "pointer" }}>
                  {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Краткое описание</label>
              <input value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                placeholder="Отображается в карточке поста" style={inp}/>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Текст статьи</label>
              <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                placeholder="Полный текст публикации..." rows={5}
                style={{ ...inp, resize: "vertical", lineHeight: 1.65 }}/>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                  style={{ width: 36, height: 20, borderRadius: 10, background: form.featured ? "#f5f5f7" : "rgba(255,255,255,0.1)", position: "relative", transition: "background 0.2s", flexShrink: 0, cursor: "pointer" }}>
                  <div style={{ position: "absolute", top: 3, left: form.featured ? 18 : 3, width: 14, height: 14, borderRadius: "50%", background: form.featured ? "#0a0a0a" : "rgba(255,255,255,0.5)", transition: "left 0.2s" }}/>
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Featured (на главной)</span>
              </label>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {success && <span style={{ fontSize: 12, color: "rgba(100,220,100,0.8)" }}>✓ Опубликовано</span>}
                <button type="submit" disabled={saving}
                  style={{ padding: "10px 24px", borderRadius: 8, background: "#f5f5f7", color: "#0a0a0a", fontSize: 13, fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1 }}>
                  {saving ? "Публикация..." : "Опубликовать"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Posts list */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", color: "#f5f5f7" }}>Все публикации</h2>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{posts.length} статей</span>
          </div>

          {loading ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Загрузка...</div>
          ) : posts.length === 0 ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Нет публикаций</div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="post-item" style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                alignItems: "center", gap: 16,
                padding: "16px 20px", marginBottom: 8,
                background: "#111", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12, transition: "border-color 0.15s",
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 7px", borderRadius: 100 }}>{post.category}</span>
                    {post.featured && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,220,100,0.7)", border: "1px solid rgba(255,220,100,0.2)", padding: "2px 7px", borderRadius: 100 }}>Featured</span>}
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{formatDate(post.date)}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <button className="feat-btn" onClick={() => toggleFeatured(post)}
                    style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 12, cursor: "pointer", transition: "background 0.15s" }}>
                    {post.featured ? "Убрать featured" : "Featured"}
                  </button>
                  <button className="del-btn" onClick={() => deletePost(post.id)} disabled={deleting === post.id}
                    style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(255,60,60,0.2)", background: "transparent", color: "rgba(255,100,100,0.6)", fontSize: 12, cursor: "pointer", transition: "all 0.15s", opacity: deleting === post.id ? 0.5 : 1 }}>
                    {deleting === post.id ? "..." : "Удалить"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
