"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

type Cat = "Все" | "Повседневное" | "Инструменты" | "Финансы" | "Другое";

interface App {
  name: string;
  description: string;
  category: Exclude<Cat, "Все">;
  color: string;
  gradient?: string;
  url?: string;
  logo?: string;
  new?: boolean;
  comingSoon?: boolean;
}

interface Section {
  id: Exclude<Cat, "Все">;
  label: string;
  description: string;
}

const sections: Section[] = [
  { id: "Повседневное", label: "Повседневное", description: "Доставка, логистика и ежедневные задачи" },
  { id: "Инструменты",  label: "Инструменты",  description: "Безопасность и продуктивность" },
  { id: "Финансы",      label: "Финансы",      description: "Инвестиции и криптовалюта" },
  { id: "Другое",       label: "Другое",       description: "Другие проекты экосистемы" },
];

const apps: App[] = [
  { name: "NextVPN",       description: "Быстрый VPN сервис и IT консалтинг",          category: "Инструменты",  color: "#0c4a6e", gradient: "linear-gradient(135deg, #0c4a6e 0%, #1e1b4b 100%)", url: "https://nextforvpn.com",        logo: "/logos/nextvpn.png" },
  { name: "NextLOGISTICS", description: "Выкуп и доставка товаров из-за рубежа",        category: "Повседневное", color: "#1a2e1a", gradient: "linear-gradient(135deg, #0d2626 0%, #1a2e10 50%, #2e2a08 100%)", url: "https://nextforlogistics.com", logo: "/logos/nextlogistics.png" },
  { name: "NextFOCUS",     description: "Ассистент для продуктивной работы",            category: "Инструменты",  color: "#1a1a2e", gradient: "linear-gradient(135deg, #1a1a2e 0%, #2e2e4e 100%)", url: "https://nextforfocus.com",     logo: "/logos/nextfocus.png" },
  { name: "Nova",          description: "Дизайн студия для вашей жизни",               category: "Другое",       color: "#1a1020", gradient: "linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)", url: "https://novainlife.com",       logo: "/logos/nova.png" },
  { name: "NextCRYPTO",    description: "Социальная сеть для инвесторов и крипторынки", category: "Финансы",      color: "#0f1a0f", gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",                                      logo: "/logos/nextcrypto.png", comingSoon: true },
  { name: "Jury",          description: "Система для онлайн курсов и обучения",        category: "Другое",       color: "#0a1a2e", gradient: "linear-gradient(135deg, #0a1a2e 0%, #0d2a4a 100%)",                                      logo: "/logos/jury.png",       comingSoon: true },
];

const liveApps   = apps.filter(a => !a.comingSoon);
const soonApps   = apps.filter(a =>  a.comingSoon);

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

function AppRow({ app }: { app: App }) {
  return (
    <a href={app.url ?? "#"} target="_blank" rel="noopener noreferrer"
      className="app-row"
      style={{
        display: "grid", gridTemplateColumns: "44px 1fr auto",
        alignItems: "center", gap: 16, padding: "16px 0",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        textDecoration: "none", color: "inherit", transition: "opacity 0.15s",
      }}
    >
      <div style={{ width: 44, height: 44, background: app.gradient ?? app.color, borderRadius: 12, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {app.logo && <Image src={app.logo} alt={app.name} width={36} height={36} style={{ objectFit: "contain" }} />}
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#f5f5f7" }}>{app.name}</span>
          {app.new && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", padding: "2px 7px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100 }}>New</span>}
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{app.description}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
    </a>
  );
}

function SoonRow({ app }: { app: App }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "44px 1fr auto",
      alignItems: "center", gap: 16, padding: "16px 0",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      cursor: "default",
    }}>
      <div style={{ width: 44, height: 44, background: app.gradient ?? app.color, borderRadius: 12, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.4 }}>
        {app.logo && <Image src={app.logo} alt={app.name} width={36} height={36} style={{ objectFit: "contain" }} />}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>{app.name}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.18)" }}>{app.description}</div>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", padding: "3px 9px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 100, whiteSpace: "nowrap" }}>Скоро</span>
    </div>
  );
}

export default function AppsPage() {
  const [active, setActive] = useState<Cat>("Все");

  const liveSections = sections.filter(sec => liveApps.some(a => a.category === sec.id));
  const visibleSections = active === "Все" ? liveSections : liveSections.filter((s) => s.id === active);
  const cats: Cat[] = ["Все", ...liveSections.map((s) => s.id)];

  useEffect(() => {
    document.body.style.background = "#0a0a0a";
    return () => { document.body.style.background = ""; };
  }, []);

  return (
    <div style={{ paddingTop: 100, paddingBottom: 120, minHeight: "100vh", background: "#0a0a0a" }}>
      <style>{`
        .app-row:hover { opacity: 0.6 !important; }
        .cat-pill {
          padding: 6px 16px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent; color: rgba(255,255,255,0.55);
          font-size: 13px; font-weight: 500; cursor: pointer;
          white-space: nowrap; transition: all 0.15s; min-height: 44px;
        }
        .cat-pill:hover { border-color: rgba(255,255,255,0.2); color: #f5f5f7; }
        .cat-pill.active { background: rgba(255,255,255,0.1); color: #f5f5f7; border-color: rgba(255,255,255,0.15); }
        @media (max-width: 640px) {
          .app-row { grid-template-columns: 40px 1fr !important; }
          .app-row > *:last-child { display: none; }
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>

        <FadeIn>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Экосистема</p>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f5f5f7", marginBottom: 10, textTransform: "uppercase" }}>Наши продукты</h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Текущие продукты — экосистема продолжает расти</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 48, scrollbarWidth: "none" }}>
            {cats.map((cat) => (
              <button key={cat} className={`cat-pill${active === cat ? " active" : ""}`} onClick={() => setActive(cat)}>{cat}</button>
            ))}
          </div>
        </FadeIn>

        {/* Live apps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
          {visibleSections.map((sec, si) => {
            const secApps = liveApps.filter((a) => a.category === sec.id);
            if (!secApps.length) return null;
            return (
              <FadeIn key={sec.id} delay={si * 0.06}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#f5f5f7" }}>{sec.label}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginLeft: 10 }}>{sec.description}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", flexShrink: 0, marginLeft: 12 }}>{secApps.length}</span>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>{secApps.map((app) => <AppRow key={app.name} app={app} />)}</div>
              </FadeIn>
            );
          })}
        </div>

        {/* Coming soon section */}
        {(active === "Все") && soonApps.length > 0 && (
          <FadeIn delay={0.2}>
            <div style={{ marginTop: 72 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.28)" }}>Скоро</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", padding: "2px 8px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 100 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "inline-block" }}/>
                  В разработке
                </span>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", marginBottom: 20, lineHeight: 1.6 }}>
                Продукты, которые появятся в экосистеме в ближайшее время.
              </p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {soonApps.map((app) => <SoonRow key={app.name} app={app} />)}
              </div>
            </div>
          </FadeIn>
        )}

      </div>
    </div>
  );
}
