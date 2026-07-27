"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeIn({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function ContactsPage() {
  const { t } = useLanguage();

  const channels = [
    { label: t.contacts.email_label, value: "nextforbusiness@gmail.com", href: "mailto:nextforbusiness@gmail.com", desc: t.contacts.email_desc },
    { label: t.contacts.tg_label,   value: "@nextformgmt",              href: "https://t.me/nextformgmt",         desc: t.contacts.tg_desc },
  ];

  useEffect(() => {
    document.body.style.background = "#0a0a0a";
    return () => { document.body.style.background = ""; };
  }, []);

  return (
    <div style={{ paddingTop: 100, paddingBottom: 100, minHeight: "100vh", background: "#0a0a0a" }}>
      <style>{`
        .contact-cell:hover { background: #1a1a1a !important; }
        .careers-btn:hover  { opacity: 0.8 !important; }
        @media (max-width: 768px) {
          .contacts-grid { grid-template-columns: 1fr !important; }
          .careers-row   { flex-direction: column !important; gap: 20px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>

        <FadeIn>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>{t.contacts.eyebrow}</p>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f5f5f7", marginBottom: 10, textTransform: "uppercase" }}>
              {t.contacts.h1line1}<br />{t.contacts.h1line2}
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{t.contacts.subtitle}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div style={{ marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>{t.contacts.connection}</p>
            <div className="contacts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: "rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden" }}>
              {channels.map((c) => (
                <a key={c.value} href={c.href} target={c.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer" className="contact-cell"
                  style={{ display: "block", padding: "22px 24px", background: "#141414", textDecoration: "none", color: "inherit", transition: "background 0.15s" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{c.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f7", marginBottom: 4 }}>{c.value}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{c.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="careers-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "28px", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", color: "#f5f5f7", marginBottom: 6 }}>{t.contacts.career_title}</div>
              <p style={{ fontSize: 13, color: "#f5f5f7", maxWidth: 380, lineHeight: 1.6, margin: 0 }}>{t.contacts.career_text}</p>
            </div>
            <a href="/vacancies" className="careers-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "11px 14px 11px 20px", background: "#f5f5f7", color: "#0a0a0a", borderRadius: 8, fontSize: 13, fontWeight: 600, flexShrink: 0, textDecoration: "none", transition: "opacity 0.15s" }}>
              {t.contacts.career_btn}
              <span style={{ background: "rgba(0,0,0,0.12)", borderRadius: 4, width: 24, height: 24, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>→</span>
            </a>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
