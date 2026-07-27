"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type CatKey = "everyday" | "tools" | "finance" | "other";

interface App {
  name: string;
  key: string;
  category: CatKey;
  color: string;
  gradient?: string;
  url?: string;
  logo?: string;
  new?: boolean;
  comingSoon?: boolean;
}

const apps: App[] = [
  { name: "NextVPN",       key: "nextvpn",       category: "tools",     color: "#0c4a6e", gradient: "linear-gradient(135deg, #0c4a6e 0%, #1e1b4b 100%)",                    url: "https://nextforvpn.com",        logo: "/logos/nextvpn.png" },
  { name: "NextLOGISTICS", key: "nextlogistics",  category: "everyday",  color: "#1a2e1a", gradient: "linear-gradient(135deg, #0d2626 0%, #1a2e10 50%, #2e2a08 100%)",       url: "https://nextforlogistics.com",  logo: "/logos/nextlogistics.png" },
  { name: "NextFOCUS",     key: "nextfocus",      category: "tools",     color: "#1a1a2e", gradient: "linear-gradient(135deg, #1a1a2e 0%, #2e2e4e 100%)",                    url: "https://nextforfocus.com",      logo: "/logos/nextfocus.png" },
  { name: "Nova",          key: "nova",           category: "other",     color: "#1a1020", gradient: "linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)",                    url: "https://novainlife.com",        logo: "/logos/nova.png" },
  { name: "NextCRYPTO",    key: "nextcrypto",     category: "finance",   color: "#0f1a0f", gradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",                   logo: "/logos/nextcrypto.png", comingSoon: true },
  { name: "Jury",          key: "jury",           category: "other",     color: "#0a1a2e", gradient: "linear-gradient(135deg, #0a1a2e 0%, #0d2a4a 100%)",                   logo: "/logos/jury.png",       comingSoon: true },
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

export default function AppsPage() {
  const { t } = useLanguage();
  const [activeKey, setActiveKey] = useState<CatKey | "all">("all");

  const liveApps = apps.filter(a => !a.comingSoon);
  const soonApps = apps.filter(a => a.comingSoon);

  const sectionDefs: { key: CatKey; tKey: keyof typeof t.apps.sections }[] = [
    { key: "everyday", tKey: "everyday" },
    { key: "tools",    tKey: "tools" },
    { key: "finance",  tKey: "finance" },
    { key: "other",    tKey: "other" },
  ];

  const liveSections = sectionDefs.filter(s => liveApps.some(a => a.category === s.key));
  const visibleSections = activeKey === "all" ? liveSections : liveSections.filter(s => s.key === activeKey);

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
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>{t.apps.eyebrow}</p>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f5f5f7", marginBottom: 10, textTransform: "uppercase" }}>{t.apps.h1}</h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{t.apps.subtitle}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: 48, scrollbarWidth: "none" }}>
            <button className={`cat-pill${activeKey === "all" ? " active" : ""}`} onClick={() => setActiveKey("all")}>{t.apps.all}</button>
            {liveSections.map(s => (
              <button key={s.key} className={`cat-pill${activeKey === s.key ? " active" : ""}`} onClick={() => setActiveKey(s.key)}>
                {t.apps.sections[s.tKey].label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Live apps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
          {visibleSections.map((sec, si) => {
            const secApps = liveApps.filter(a => a.category === sec.key);
            if (!secApps.length) return null;
            const secT = t.apps.sections[sec.tKey];
            return (
              <FadeIn key={sec.key} delay={si * 0.06}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#f5f5f7" }}>{secT.label}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginLeft: 10 }}>{secT.description}</span>
                  </div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", flexShrink: 0, marginLeft: 12 }}>{secApps.length}</span>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  {secApps.map(app => {
                    const desc = t.apps.descs[app.key as keyof typeof t.apps.descs];
                    return (
                      <a key={app.name} href={app.url ?? "#"} target="_blank" rel="noopener noreferrer"
                        className="app-row"
                        style={{ display: "grid", gridTemplateColumns: "44px 1fr auto", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", color: "inherit", transition: "opacity 0.15s" }}
                      >
                        <div style={{ width: 44, height: 44, background: app.gradient ?? app.color, borderRadius: 12, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {app.logo && <Image src={app.logo} alt={app.name} width={36} height={36} style={{ objectFit: "contain" }} />}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#f5f5f7", marginBottom: 3 }}>{app.name}</div>
                          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{desc}</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </a>
                    );
                  })}
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Coming soon */}
        {activeKey === "all" && soonApps.length > 0 && (
          <FadeIn delay={0.2}>
            <div style={{ marginTop: 72 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.28)" }}>{t.apps.soon_label}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", padding: "2px 8px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 100 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "inline-block" }}/>
                  {t.apps.soon_badge}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.18)", marginBottom: 20, lineHeight: 1.6 }}>{t.apps.soon_desc}</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {soonApps.map(app => {
                  const desc = t.apps.descs[app.key as keyof typeof t.apps.descs];
                  return (
                    <div key={app.name} style={{ display: "grid", gridTemplateColumns: "44px 1fr auto", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "default" }}>
                      <div style={{ width: 44, height: 44, background: app.gradient ?? app.color, borderRadius: 12, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.4 }}>
                        {app.logo && <Image src={app.logo} alt={app.name} width={36} height={36} style={{ objectFit: "contain" }} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.3)", marginBottom: 3 }}>{app.name}</div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.18)" }}>{desc}</div>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", padding: "3px 9px", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 100, whiteSpace: "nowrap" }}>{t.apps.comingSoon}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        )}

      </div>
    </div>
  );
}
