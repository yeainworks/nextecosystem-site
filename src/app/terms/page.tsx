"use client";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsPage() {
  const { t } = useLanguage();
  return (
    <div style={{ paddingTop: 100, paddingBottom: 120, minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>{t.terms.eyebrow}</p>
          <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f5f5f7", marginBottom: 12, textTransform: "uppercase" }}>
            {t.terms.h1}
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{t.terms.updated}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {t.terms.sections.map((s) => (
            <div key={s.title}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f5f5f7", marginBottom: 10 }}>{s.title}</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
