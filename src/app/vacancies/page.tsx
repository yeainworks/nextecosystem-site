"use client";
import { useState, useEffect } from "react";

interface Vacancy {
  id: string;
  title: string;
  department: string;
  type: string;
  format: string;
  description: string;
  requirements: string;
  active: boolean;
  date: string;
}

const DEPT_BG: Record<string, string> = {
  "Разработка": "rgba(59,130,246,0.12)",
  "Дизайн":     "rgba(168,85,247,0.12)",
  "Маркетинг":  "rgba(34,197,94,0.12)",
  "Продукт":    "rgba(251,191,36,0.12)",
  "Поддержка":  "rgba(20,184,166,0.12)",
  "Другое":     "rgba(255,255,255,0.06)",
};
const DEPT_COLOR: Record<string, string> = {
  "Разработка": "rgba(147,197,253,0.9)",
  "Дизайн":     "rgba(216,180,254,0.9)",
  "Маркетинг":  "rgba(134,239,172,0.9)",
  "Продукт":    "rgba(253,224,71,0.9)",
  "Поддержка":  "rgba(94,234,212,0.9)",
  "Другое":     "rgba(255,255,255,0.5)",
};

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [dept, setDept] = useState("Все");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.background = "#0a0a0a";
    document.title = "Вакансии — NextECOSYSTEM";
    fetch("/api/vacancies?active=true")
      .then(r => r.json())
      .then(data => { setVacancies(data); setLoading(false); });
    return () => { document.body.style.background = ""; };
  }, []);

  const depts = ["Все", ...Array.from(new Set(vacancies.map(v => v.department)))];
  const filtered = dept === "Все" ? vacancies : vacancies.filter(v => v.department === dept);

  return (
    <div style={{ background: "#0a0a0a", color: "#f5f5f7", minHeight: "100vh", paddingTop: 100, paddingBottom: 120 }}>
      <style>{`
        .dept-tab { padding: 7px 16px; border-radius: 8px; border: 1px solid transparent; background: transparent; color: rgba(255,255,255,0.45); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s; }
        .dept-tab:hover { color: #f5f5f7; background: rgba(255,255,255,0.06); }
        .dept-tab.active { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.08); color: #f5f5f7; }
        .vac-card { transition: border-color 0.15s; }
        .vac-card:hover { border-color: rgba(255,255,255,0.14) !important; }
        .apply-btn:hover { opacity: 0.8 !important; }
        .vac-header { cursor: pointer; user-select: none; }
      `}</style>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>

        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Карьера</p>
          <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f5f5f7", marginBottom: 12, textTransform: "uppercase" }}>Вакансии</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 480 }}>
            Строим экосистему продуктов. Ищем людей, которым важен результат, а не процесс.
          </p>
        </div>

        {/* Dept filter */}
        {!loading && vacancies.length > 0 && (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 36 }}>
            {depts.map(d => (
              <button key={d} className={`dept-tab${dept === d ? " active" : ""}`} onClick={() => setDept(d)}>{d}</button>
            ))}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div style={{ padding: "80px 0", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Загрузка...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "80px 0", textAlign: "center" }}>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", marginBottom: 28, lineHeight: 1.7 }}>
              Сейчас открытых вакансий нет.<br/>Следите за обновлениями.
            </p>
            <a href="mailto:careers@next.xyz"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none", transition: "border-color 0.15s" }}>
              Отправить резюме
            </a>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map(v => {
              const isOpen = expanded === v.id;
              return (
                <div key={v.id} className="vac-card"
                  style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>

                  {/* Header row — clickable */}
                  <div className="vac-header" style={{ padding: "22px 24px" }}
                    onClick={() => setExpanded(p => p === v.id ? null : v.id)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 100, background: DEPT_BG[v.department] ?? "rgba(255,255,255,0.06)", color: DEPT_COLOR[v.department] ?? "rgba(255,255,255,0.5)" }}>
                        {v.department}
                      </span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", padding: "3px 10px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.08)" }}>{v.type}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", padding: "3px 10px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.08)" }}>{v.format}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                      <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#f5f5f7", margin: 0 }}>{v.title}</h3>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5"
                        style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                    {!isOpen && v.description && (
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 10, lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {v.description}
                      </p>
                    )}
                  </div>

                  {/* Expanded body */}
                  {isOpen && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 24px 28px" }}>
                      {v.description && (
                        <div style={{ marginBottom: 24 }}>
                          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>О позиции</p>
                          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, whiteSpace: "pre-line" }}>{v.description}</p>
                        </div>
                      )}
                      {v.requirements && (
                        <div style={{ marginBottom: 28 }}>
                          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Требования</p>
                          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, whiteSpace: "pre-line" }}>{v.requirements}</p>
                        </div>
                      )}
                      <a href={`mailto:careers@next.xyz?subject=Отклик: ${encodeURIComponent(v.title)}`} className="apply-btn"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 24px", borderRadius: 8, background: "#f5f5f7", color: "#0a0a0a", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "opacity 0.15s" }}>
                        Откликнуться
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
