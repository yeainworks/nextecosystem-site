"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const offices = [
  { city: "Дубай",    country: "ОАЭ", address: "DIFC Innovation Hub, Gate District 3", role: "Штаб-квартира" },
  { city: "Сингапур", country: "SGP", address: "One Marina Boulevard, Level 28",        role: "Азиатско-Тихоокеанский" },
  { city: "Лондон",   country: "GBR", address: "22 Bishopsgate, EC2N 4BQ",              role: "Европа" },
];

const contacts = [
  { label: "Общие вопросы", email: "hello@next.xyz",     desc: "Вопросы, партнёрство, пресса" },
  { label: "Поддержка",     email: "support@next.xyz",   desc: "Техническая помощь и баги" },
  { label: "Безопасность",  email: "security@next.xyz",  desc: "Только ответственное раскрытие" },
  { label: "Инвесторам",    email: "investors@next.xyz", desc: "Финансирование и IR" },
];

const socials = [
  { name: "Twitter / X", handle: "@nextxyz",              href: "#" },
  { name: "Telegram",    handle: "t.me/nextforecosystem", href: "https://t.me/nextforecosystem" },
  { name: "Discord",     handle: "discord.gg/next",       href: "#" },
  { name: "GitHub",      handle: "github.com/nextxyz",    href: "#" },
];

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
  useEffect(() => {
    document.body.style.background = "#0a0a0a";
    return () => { document.body.style.background = ""; };
  }, []);

  return (
    <div style={{ paddingTop: 100, paddingBottom: 100, minHeight: "100vh", background: "#0a0a0a" }}>
      <style>{`
        .contact-cell:hover { background: #1a1a1a !important; }
        .social-cell:hover  { background: #1a1a1a !important; }
        .careers-btn:hover  { opacity: 0.8 !important; }
        @media (max-width: 768px) {
          .contacts-grid { grid-template-columns: 1fr !important; }
          .socials-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .office-row    { grid-template-columns: 1fr !important; gap: 4px !important; }
          .office-tag    { display: none !important; }
          .careers-row   { flex-direction: column !important; gap: 20px !important; }
        }
        @media (max-width: 480px) {
          .socials-grid { grid-template-columns: repeat(2,1fr) !important; }
          .contacts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>

        <FadeIn>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Контакты</p>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f5f5f7", marginBottom: 10, textTransform: "uppercase" }}>Свяжитесь<br />с нами</h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Ответим на любой вопрос — выберите удобный способ</p>
          </div>
        </FadeIn>

        {/* Email contacts */}
        <FadeIn delay={0.08}>
          <div style={{ marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Почта</p>
            <div className="contacts-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: "rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden" }}>
              {contacts.map((c) => (
                <a key={c.email} href={`mailto:${c.email}`} className="contact-cell"
                  style={{ display: "block", padding: "22px 24px", background: "#141414", textDecoration: "none", color: "inherit", transition: "background 0.15s" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{c.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f7", marginBottom: 4 }}>{c.email}</div>
                  <div style={{ fontSize: 12, color: "#f5f5f7" }}>{c.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Offices */}
        <FadeIn delay={0.12}>
          <div style={{ marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Офисы</p>
            {offices.map((o, i) => (
              <div key={o.city} className="office-row" style={{
                display: "grid", gridTemplateColumns: "140px 1fr auto",
                alignItems: "center", gap: 24, padding: "18px 0",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#f5f5f7" }}>{o.city}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{o.country}</div>
                </div>
                <div style={{ fontSize: 13, color: "#f5f5f7" }}>{o.address}</div>
                <span className="office-tag" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", padding: "3px 8px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, flexShrink: 0 }}>{o.role}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Social */}
        <FadeIn delay={0.16}>
          <div style={{ marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Сообщество</p>
            <div className="socials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.05)", borderRadius: 16, overflow: "hidden" }}>
              {socials.map((s) => (
                <a key={s.name} href={s.href} className="social-cell"
                  style={{ display: "block", padding: "20px", background: "#141414", textDecoration: "none", color: "inherit", transition: "background 0.15s" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f7", marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{s.handle}</div>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Careers */}
        <FadeIn delay={0.2}>
          <div className="careers-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "28px", background: "#141414", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", color: "#f5f5f7", marginBottom: 6 }}>Карьера</div>
              <p style={{ fontSize: 13, color: "#f5f5f7", maxWidth: 380, lineHeight: 1.6, margin: 0 }}>
                Нанимаем разработчиков, дизайнеров и DeFi-исследователей. Удалёнка с офисами в Дубае, Сингапуре и Лондоне.
              </p>
            </div>
            <a href="mailto:careers@next.xyz" className="careers-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "11px 14px 11px 20px", background: "#f5f5f7", color: "#0a0a0a", borderRadius: 8, fontSize: 13, fontWeight: 600, flexShrink: 0, textDecoration: "none", transition: "opacity 0.15s" }}>
              Вакансии
              <span style={{ background: "rgba(0,0,0,0.12)", borderRadius: 4, width: 24, height: 24, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>→</span>
            </a>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
