"use client";
import { useState, useEffect } from "react";

interface Post {
  id: string; title: string; excerpt: string; content: string;
  category: string; date: string; featured: boolean; slug: string; gradient: string;
}
interface Vacancy {
  id: string; title: string; department: string; type: string;
  format: string; description: string; requirements: string; active: boolean; date: string;
}

const POST_CATS = ["Анонс", "Продукт", "Партнёрство", "Компания"];
const VAC_DEPTS = ["Разработка", "Дизайн", "Маркетинг", "Продукт", "Поддержка", "Другое"];
const VAC_TYPES = ["Полная занятость", "Частичная занятость", "Контракт", "Стажировка"];
const VAC_FORMATS = ["Удалённо", "Офис", "Гибрид"];
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" });
}

const INP: React.CSSProperties = {
  width: "100%", background: "#141414", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8, padding: "10px 14px", color: "#f5f5f7", fontSize: 14, outline: "none",
};
const LBL: React.CSSProperties = {
  display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6,
};

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [tab, setTab] = useState<"posts" | "vacancies">("posts");

  // Posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [postForm, setPostForm] = useState({ title: "", excerpt: "", content: "", category: "Анонс", featured: false });
  const [postSaving, setPostSaving] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [deletingPost, setDeletingPost] = useState<string | null>(null);

  // Vacancies
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [vacForm, setVacForm] = useState({ title: "", department: "Разработка", type: "Полная занятость", format: "Удалённо", description: "", requirements: "" });
  const [vacSaving, setVacSaving] = useState(false);
  const [vacSuccess, setVacSuccess] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Vacancy>>({});
  const [editSaving, setEditSaving] = useState(false);
  const [deletingVac, setDeletingVac] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) return;
    document.body.style.background = "#0a0a0a";
    Promise.all([
      fetch("/api/posts").then(r => r.json()),
      fetch("/api/vacancies").then(r => r.json()),
    ]).then(([p, v]) => { setPosts(p); setVacancies(v); });
    return () => { document.body.style.background = ""; };
  }, [auth]);

  /* ── auth ── */
  async function login() {
    setPwLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) { setAuth(true); setPwErr(false); }
      else setPwErr(true);
    } catch {
      setPwErr(true);
    } finally {
      setPwLoading(false);
    }
  }

  /* ── posts ── */
  async function submitPost(e: React.FormEvent) {
    e.preventDefault();
    if (!postForm.title.trim()) return;
    setPostSaving(true);
    const res = await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(postForm) });
    const newPost = await res.json();
    setPosts(p => [newPost, ...p]);
    setPostForm({ title: "", excerpt: "", content: "", category: "Анонс", featured: false });
    setPostSaving(false); setPostSuccess(true);
    setTimeout(() => setPostSuccess(false), 3000);
  }
  async function deletePost(id: string) {
    setDeletingPost(id);
    await fetch("/api/posts", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setPosts(p => p.filter(x => x.id !== id)); setDeletingPost(null);
  }
  async function toggleFeatured(post: Post) {
    const updated = { ...post, featured: !post.featured };
    await fetch("/api/posts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: post.id, featured: updated.featured }) });
    setPosts(p => p.map(x => x.id === post.id ? updated : x));
  }

  /* ── vacancies ── */
  async function submitVac(e: React.FormEvent) {
    e.preventDefault();
    if (!vacForm.title.trim()) return;
    setVacSaving(true);
    const res = await fetch("/api/vacancies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(vacForm) });
    const newVac = await res.json();
    setVacancies(v => [newVac, ...v]);
    setVacForm({ title: "", department: "Разработка", type: "Полная занятость", format: "Удалённо", description: "", requirements: "" });
    setVacSaving(false); setVacSuccess(true);
    setTimeout(() => setVacSuccess(false), 3000);
  }
  async function deleteVac(id: string) {
    setDeletingVac(id);
    await fetch("/api/vacancies", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setVacancies(v => v.filter(x => x.id !== id)); setDeletingVac(null);
  }
  async function toggleActive(vac: Vacancy) {
    const updated = { ...vac, active: !vac.active };
    await fetch("/api/vacancies", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: vac.id, active: updated.active }) });
    setVacancies(v => v.map(x => x.id === vac.id ? updated : x));
  }
  function startEdit(vac: Vacancy) {
    setEditingId(vac.id);
    setEditForm({ title: vac.title, department: vac.department, type: vac.type, format: vac.format, description: vac.description, requirements: vac.requirements });
  }
  async function saveEdit(id: string) {
    setEditSaving(true);
    const res = await fetch("/api/vacancies", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...editForm }) });
    const updated = await res.json();
    setVacancies(v => v.map(x => x.id === id ? updated : x));
    setEditingId(null); setEditSaving(false);
  }

  /* ── login screen ── */
  if (!auth) return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 360, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Admin</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: "#f5f5f7" }}>Вход</h1>
        </div>
        <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 28 }}>
          <label style={LBL}>Пароль</label>
          <input type="password" value={pw}
            onChange={e => { setPw(e.target.value); setPwErr(false); }}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="••••••••"
            style={{ ...INP, borderColor: pwErr ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.1)", marginBottom: 8 }}
          />
          {pwErr && <p style={{ fontSize: 12, color: "rgba(255,80,80,0.8)", marginBottom: 8 }}>Неверный пароль</p>}
          <button onClick={login} disabled={pwLoading} style={{ width: "100%", marginTop: 8, padding: 11, borderRadius: 8, background: "#f5f5f7", color: "#0a0a0a", fontSize: 14, fontWeight: 600, border: "none", cursor: pwLoading ? "default" : "pointer", opacity: pwLoading ? 0.6 : 1 }}>
            {pwLoading ? "..." : "Войти"}
          </button>
        </div>
      </div>
    </div>
  );

  /* ── admin panel ── */
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#f5f5f7", paddingTop: 80 }}>
      <style>{`
        input:focus, textarea:focus, select:focus { border-color: rgba(255,255,255,0.3) !important; }
        .del-btn:hover { background: rgba(255,60,60,0.12) !important; color: rgba(255,100,100,0.9) !important; }
        .act-btn:hover { background: rgba(255,255,255,0.08) !important; }
        .row-item:hover { border-color: rgba(255,255,255,0.12) !important; }
        .pause-btn:hover { background: rgba(255,160,0,0.1) !important; color: rgba(255,180,60,0.9) !important; }
        .go-btn:hover { background: rgba(100,220,100,0.1) !important; color: rgba(100,220,100,0.9) !important; }
      `}</style>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 clamp(16px,5vw,40px) 100px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "40px 0 28px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Admin</p>
            <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "#f5f5f7" }}>Управление</h1>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="/vacancies" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Вакансии ↗</a>
            <a href="/blog" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Новости ↗</a>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "inline-flex", gap: 2, padding: 4, background: "#141414", borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)", marginBottom: 40 }}>
          {([["posts", "Публикации", posts.length], ["vacancies", "Вакансии", vacancies.length]] as const).map(([key, label, count]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{
                padding: "8px 18px", borderRadius: 7, border: tab === key ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
                background: tab === key ? "rgba(255,255,255,0.08)" : "transparent",
                color: tab === key ? "#f5f5f7" : "rgba(255,255,255,0.45)",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
              }}>
              {label}
              <span style={{ fontSize: 11, background: "rgba(255,255,255,0.08)", borderRadius: 100, padding: "1px 7px", color: "rgba(255,255,255,0.45)" }}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* ════ POSTS TAB ════ */}
        {tab === "posts" && (
          <>
            <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px", marginBottom: 48 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", color: "#f5f5f7", marginBottom: 22 }}>Новая публикация</h2>
              <form onSubmit={submitPost}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={LBL}>Заголовок *</label>
                    <input value={postForm.title} onChange={e => setPostForm(f => ({ ...f, title: e.target.value }))} placeholder="Заголовок статьи" required style={INP}/>
                  </div>
                  <div>
                    <label style={LBL}>Категория</label>
                    <select value={postForm.category} onChange={e => setPostForm(f => ({ ...f, category: e.target.value }))} style={{ ...INP, cursor: "pointer" }}>
                      {POST_CATS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={LBL}>Краткое описание</label>
                  <input value={postForm.excerpt} onChange={e => setPostForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Отображается в карточке" style={INP}/>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={LBL}>Текст статьи</label>
                  <textarea value={postForm.content} onChange={e => setPostForm(f => ({ ...f, content: e.target.value }))} placeholder="Полный текст..." rows={5} style={{ ...INP, resize: "vertical", lineHeight: 1.65 }}/>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                    <div onClick={() => setPostForm(f => ({ ...f, featured: !f.featured }))}
                      style={{ width: 36, height: 20, borderRadius: 10, background: postForm.featured ? "#f5f5f7" : "rgba(255,255,255,0.1)", position: "relative", transition: "background 0.2s", flexShrink: 0, cursor: "pointer" }}>
                      <div style={{ position: "absolute", top: 3, left: postForm.featured ? 18 : 3, width: 14, height: 14, borderRadius: "50%", background: postForm.featured ? "#0a0a0a" : "rgba(255,255,255,0.5)", transition: "left 0.2s" }}/>
                    </div>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Featured</span>
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {postSuccess && <span style={{ fontSize: 12, color: "rgba(100,220,100,0.8)" }}>✓ Опубликовано</span>}
                    <button type="submit" disabled={postSaving} style={{ padding: "10px 24px", borderRadius: 8, background: "#f5f5f7", color: "#0a0a0a", fontSize: 13, fontWeight: 600, border: "none", cursor: postSaving ? "not-allowed" : "pointer", opacity: postSaving ? 0.6 : 1 }}>
                      {postSaving ? "..." : "Опубликовать"}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", color: "#f5f5f7" }}>Все публикации</h2>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{posts.length} статей</span>
            </div>
            {posts.length === 0 ? (
              <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Нет публикаций</div>
            ) : posts.map(post => (
              <div key={post.id} className="row-item" style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 16, padding: "14px 18px", marginBottom: 6, background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, transition: "border-color 0.15s" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 7px", borderRadius: 100 }}>{post.category}</span>
                    {post.featured && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,220,100,0.7)", border: "1px solid rgba(255,220,100,0.2)", padding: "2px 7px", borderRadius: 100 }}>Featured</span>}
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{fmtDate(post.date)}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button className="act-btn" onClick={() => toggleFeatured(post)} style={{ padding: "5px 11px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer", transition: "all 0.15s" }}>
                    {post.featured ? "Убрать featured" : "Featured"}
                  </button>
                  <button className="del-btn" onClick={() => deletePost(post.id)} disabled={deletingPost === post.id} style={{ padding: "5px 11px", borderRadius: 6, border: "1px solid rgba(255,60,60,0.2)", background: "transparent", color: "rgba(255,100,100,0.6)", fontSize: 11, cursor: "pointer", transition: "all 0.15s", opacity: deletingPost === post.id ? 0.5 : 1 }}>
                    {deletingPost === post.id ? "..." : "Удалить"}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ════ VACANCIES TAB ════ */}
        {tab === "vacancies" && (
          <>
            {/* New vacancy form */}
            <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px", marginBottom: 48 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", color: "#f5f5f7", marginBottom: 22 }}>Новая вакансия</h2>
              <form onSubmit={submitVac}>
                <div style={{ marginBottom: 12 }}>
                  <label style={LBL}>Название позиции *</label>
                  <input value={vacForm.title} onChange={e => setVacForm(f => ({ ...f, title: e.target.value }))} placeholder="Например: Frontend Developer" required style={INP}/>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={LBL}>Отдел</label>
                    <select value={vacForm.department} onChange={e => setVacForm(f => ({ ...f, department: e.target.value }))} style={{ ...INP, cursor: "pointer" }}>
                      {VAC_DEPTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={LBL}>Тип занятости</label>
                    <select value={vacForm.type} onChange={e => setVacForm(f => ({ ...f, type: e.target.value }))} style={{ ...INP, cursor: "pointer" }}>
                      {VAC_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={LBL}>Формат</label>
                    <select value={vacForm.format} onChange={e => setVacForm(f => ({ ...f, format: e.target.value }))} style={{ ...INP, cursor: "pointer" }}>
                      {VAC_FORMATS.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={LBL}>Описание позиции</label>
                  <textarea value={vacForm.description} onChange={e => setVacForm(f => ({ ...f, description: e.target.value }))} placeholder="Расскажите о роли, команде и задачах..." rows={4} style={{ ...INP, resize: "vertical", lineHeight: 1.65 }}/>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={LBL}>Требования</label>
                  <textarea value={vacForm.requirements} onChange={e => setVacForm(f => ({ ...f, requirements: e.target.value }))} placeholder={"— Опыт работы от N лет\n— Владение технологиями\n— ..."} rows={4} style={{ ...INP, resize: "vertical", lineHeight: 1.65 }}/>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12 }}>
                  {vacSuccess && <span style={{ fontSize: 12, color: "rgba(100,220,100,0.8)" }}>✓ Добавлено</span>}
                  <button type="submit" disabled={vacSaving} style={{ padding: "10px 24px", borderRadius: 8, background: "#f5f5f7", color: "#0a0a0a", fontSize: 13, fontWeight: 600, border: "none", cursor: vacSaving ? "not-allowed" : "pointer", opacity: vacSaving ? 0.6 : 1 }}>
                    {vacSaving ? "..." : "Добавить вакансию"}
                  </button>
                </div>
              </form>
            </div>

            {/* Vacancies list */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", color: "#f5f5f7" }}>Все вакансии</h2>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{vacancies.filter(v => v.active).length} активных</span>
            </div>

            {vacancies.length === 0 ? (
              <div style={{ padding: "40px 0", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Нет вакансий</div>
            ) : vacancies.map(vac => (
              <div key={vac.id} style={{ marginBottom: 6 }}>

                {/* Row */}
                <div className="row-item" style={{
                  display: "grid", gridTemplateColumns: "1fr auto",
                  alignItems: "center", gap: 16, padding: "14px 18px",
                  background: "#111", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: editingId === vac.id ? "10px 10px 0 0" : 10,
                  borderBottom: editingId === vac.id ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(255,255,255,0.07)",
                  transition: "border-color 0.15s",
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: vac.active ? "rgba(100,220,100,0.8)" : "rgba(255,255,255,0.2)", flexShrink: 0, display: "inline-block" }}/>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 7px", borderRadius: 100 }}>{vac.department}</span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{vac.type}</span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>· {vac.format}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{vac.title}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button className="act-btn"
                      onClick={() => editingId === vac.id ? setEditingId(null) : startEdit(vac)}
                      style={{ padding: "5px 11px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: editingId === vac.id ? "rgba(255,255,255,0.08)" : "transparent", color: "rgba(255,255,255,0.55)", fontSize: 11, cursor: "pointer", transition: "all 0.15s" }}>
                      {editingId === vac.id ? "Свернуть" : "Редактировать"}
                    </button>
                    <button onClick={() => toggleActive(vac)}
                      className={vac.active ? "pause-btn" : "go-btn"}
                      style={{ padding: "5px 11px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: vac.active ? "rgba(255,160,60,0.7)" : "rgba(100,220,100,0.7)", fontSize: 11, cursor: "pointer", transition: "all 0.15s" }}>
                      {vac.active ? "Приостановить" : "Активировать"}
                    </button>
                    <button className="del-btn" onClick={() => deleteVac(vac.id)} disabled={deletingVac === vac.id}
                      style={{ padding: "5px 11px", borderRadius: 6, border: "1px solid rgba(255,60,60,0.2)", background: "transparent", color: "rgba(255,100,100,0.6)", fontSize: 11, cursor: "pointer", transition: "all 0.15s", opacity: deletingVac === vac.id ? 0.5 : 1 }}>
                      {deletingVac === vac.id ? "..." : "Удалить"}
                    </button>
                  </div>
                </div>

                {/* Inline edit form */}
                {editingId === vac.id && (
                  <div style={{ background: "#0e0e0e", border: "1px solid rgba(255,255,255,0.07)", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "24px 20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={LBL}>Название позиции</label>
                        <input value={editForm.title ?? ""} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} style={INP}/>
                      </div>
                      <div>
                        <label style={LBL}>Отдел</label>
                        <select value={editForm.department ?? ""} onChange={e => setEditForm(f => ({ ...f, department: e.target.value }))} style={{ ...INP, cursor: "pointer" }}>
                          {VAC_DEPTS.map(d => <option key={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={LBL}>Тип занятости</label>
                        <select value={editForm.type ?? ""} onChange={e => setEditForm(f => ({ ...f, type: e.target.value }))} style={{ ...INP, cursor: "pointer" }}>
                          {VAC_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={LBL}>Формат</label>
                        <select value={editForm.format ?? ""} onChange={e => setEditForm(f => ({ ...f, format: e.target.value }))} style={{ ...INP, cursor: "pointer" }}>
                          {VAC_FORMATS.map(f => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <label style={LBL}>Описание</label>
                      <textarea value={editForm.description ?? ""} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} rows={4} style={{ ...INP, resize: "vertical", lineHeight: 1.65 }}/>
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <label style={LBL}>Требования</label>
                      <textarea value={editForm.requirements ?? ""} onChange={e => setEditForm(f => ({ ...f, requirements: e.target.value }))} rows={4} style={{ ...INP, resize: "vertical", lineHeight: 1.65 }}/>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                      <button onClick={() => setEditingId(null)} style={{ padding: "8px 16px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer" }}>
                        Отмена
                      </button>
                      <button onClick={() => saveEdit(vac.id)} disabled={editSaving} style={{ padding: "8px 20px", borderRadius: 7, background: "#f5f5f7", color: "#0a0a0a", fontSize: 13, fontWeight: 600, border: "none", cursor: editSaving ? "not-allowed" : "pointer", opacity: editSaving ? 0.7 : 1 }}>
                        {editSaving ? "Сохранение..." : "Сохранить"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
