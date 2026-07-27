"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeIn({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function EcosystemCard() {
  const nodes: [number, number][] = [[55, 38], [210, 32], [248, 112], [198, 172], [80, 172], [40, 122]];
  return (
    <div className="eco-card" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "52px 48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="300" height="220" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: "100%", height: "auto" }}>
        {[75, 150, 225].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="white" strokeOpacity="0.04" strokeWidth="1"/>)}
        {[55, 110, 165].map(y => <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="1"/>)}
        {nodes.map(([x, y], i) => <line key={i} x1="150" y1="110" x2={x} y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="0.8"/>)}
        <circle cx="150" cy="110" r="9" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
          <animate attributeName="r" values="9;26;9" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="stroke-opacity" values="0.35;0;0.35" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="150" cy="110" r="6" fill="#ffffff"/>
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="white" fillOpacity="0.45">
              <animate attributeName="fill-opacity" values="0.45;0.9;0.45" dur="3s" begin={`${i * 0.5}s`} repeatCount="indefinite"/>
            </circle>
            <circle r="2.5" fill="white">
              <animateMotion path={`M 150 110 L ${x} ${y}`} dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite"/>
              <animate attributeName="fill-opacity" values="0;0.9;0.9;0" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite"/>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();

  const apps = [
    { name: "NextVPN",        key: "nextvpn",       gradient: "linear-gradient(135deg, #0c4a6e 0%, #1e1b4b 100%)",                  url: "https://nextforvpn.com",       logo: "/logos/nextvpn.png",      span: 5, comingSoon: false },
    { name: "NextLOGISTICS",  key: "nextlogistics",  gradient: "linear-gradient(135deg, #0d2626 0%, #1a2e10 50%, #2e2a08 100%)",     url: "https://nextforlogistics.com", logo: "/logos/nextlogistics.png", span: 4, comingSoon: false },
    { name: "NextCRYPTO",     key: "nextcrypto",     gradient: "linear-gradient(135deg, #141414 0%, #222 100%)",                    url: "https://nextforcrypto.com",    logo: "/logos/nextcrypto.png",   span: 3, comingSoon: true  },
    { name: "NextFOCUS",      key: "nextfocus",      gradient: "linear-gradient(135deg, #1a1a2e 0%, #2e2e4e 100%)",                  url: "https://nextforfocus.com",     logo: "/logos/nextfocus.png",    span: 3, comingSoon: false },
    { name: "Nova",           key: "nova",           gradient: "linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)",                  url: "https://novainlife.com",       logo: "/logos/nova.png",         span: 4, comingSoon: false },
    { name: "Jury",           key: "jury",           gradient: "linear-gradient(135deg, #0a1a2e 0%, #0d2a4a 100%)",                  url: "https://juryapp.org",          logo: "/logos/jury.png",         span: 5, comingSoon: true  },
  ];

  const ticker = ["NEXTVPN", "NEXTLOGISTICS", "NEXTCRYPTO", "NEXTFOCUS", "NOVA", "JURY"];

  function AppsCard() {
    return (
      <div className="apps-vis-card" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {apps.slice(0, 4).map(app => {
          const appT = t.home.apps[app.key as keyof typeof t.home.apps];
          return (
            <div key={app.name} className="apps-vis-item" style={{ background: "#181818", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: app.gradient, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <Image src={app.logo} alt={app.name} width={30} height={30} style={{ objectFit: "contain" }}/>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f7", letterSpacing: "-0.01em", marginBottom: 3 }}>{app.name}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{appT.cat}</div>
            </div>
          );
        })}
      </div>
    );
  }

  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#0a0a0a";
    return () => { document.body.style.background = prev; };
  }, []);

  return (
    <div style={{ background: "#0a0a0a", color: "#f5f5f7" }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100svh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "144px clamp(16px,5vw,40px) 96px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 640, background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 65%)", pointerEvents: "none" }}/>

        <div style={{ maxWidth: 960, position: "relative", zIndex: 1 }}>
          <motion.h1
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.08, ease }}
            style={{ fontSize: "clamp(32px, 7.5vw, 88px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.96, textTransform: "uppercase", marginBottom: 36 }}
          >
            {t.home.hero.line1}<br/>
            <span style={{ color: "#f5f5f7" }}>{t.home.hero.line2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            style={{ fontSize: "clamp(15px,2vw,18px)", color: "#f5f5f7", lineHeight: 1.65, maxWidth: 490, margin: "0 auto 52px" }}
          >
            {t.home.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease }}
            className="hero-btns"
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/apps" className="h-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 30px", borderRadius: 999, background: "#f5f5f7", color: "#0a0a0a", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", textDecoration: "none", transition: "opacity 0.2s" }}>
              {t.home.hero.cta1}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/contacts" className="h-btn-ghost" style={{ display: "inline-flex", alignItems: "center", padding: "14px 30px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.14)", color: "#f5f5f7", fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em", textDecoration: "none", transition: "border-color 0.2s, background 0.2s" }}>
              {t.home.hero.cta2}
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.7 }} style={{ position: "absolute", bottom: 44, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.22))" }}/>
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#0d0d0d", overflow: "hidden", padding: "14px 0" }}>
        <div className="ticker-track">
          {[...ticker, ...ticker, ...ticker].map((name, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 700, color: "#f5f5f7", opacity: 0.22, letterSpacing: "0.18em", textTransform: "uppercase", padding: "0 44px", whiteSpace: "nowrap" }}>
              {name}<span style={{ marginLeft: 44, opacity: 0.5 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS BENTO ── */}
      <section className="products-section" style={{ padding: "140px clamp(16px,5vw,40px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.17em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>{t.home.products.eyebrow}</p>
            <h2 style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 0.96, marginBottom: 64 }}>
              {t.home.products.h2line1}<br/>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{t.home.products.h2line2}</span>
            </h2>
          </FadeIn>

          <div className="bento-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 8 }}>
            {apps.map((app, i) => {
              const appT = t.home.apps[app.key as keyof typeof t.home.apps];
              return (
                <FadeIn key={app.name} delay={i * 0.065} style={{ gridColumn: `span ${app.span}` }}>
                  {app.comingSoon ? (
                    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 210, background: "#111", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 20, padding: "28px 28px 24px", cursor: "default", position: "relative" }}>
                      <div style={{ width: 52, height: 52, borderRadius: 14, background: app.gradient, marginBottom: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", opacity: 0.4 }}>
                        <Image src={app.logo} alt={app.name} width={40} height={40} style={{ objectFit: "contain" }}/>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 10 }}>{appT.cat}</div>
                      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.025em", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>{app.name}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.18)", lineHeight: 1.55 }}>{appT.desc}</div>
                      <div style={{ marginTop: "auto", paddingTop: 16 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", padding: "3px 9px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100 }}>
                          {t.apps.comingSoon}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <a href={app.url} target="_blank" rel="noopener noreferrer" className="bento-card"
                      style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 210, background: "#141414", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 28px 24px", textDecoration: "none", color: "inherit", transition: "border-color 0.22s, background 0.22s, transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
                    >
                      <div style={{ width: 52, height: 52, borderRadius: 14, background: app.gradient, marginBottom: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        <Image src={app.logo} alt={app.name} width={40} height={40} style={{ objectFit: "contain" }}/>
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>{appT.cat}</div>
                      <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.025em", color: "#f5f5f7", marginBottom: 8 }}>{app.name}</div>
                      <div style={{ fontSize: 13, color: "#f5f5f7", lineHeight: 1.55 }}>{appT.desc}</div>
                    </a>
                  )}
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ marginTop: 28, textAlign: "center" }}>
              <Link href="/apps" className="muted-lnk" style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", display: "inline-flex", alignItems: "center", gap: 8, transition: "color 0.2s", textDecoration: "none" }}>
                {t.home.products.all}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FEATURE 1 ── */}
      <section className="feat-section" style={{ padding: "120px clamp(16px,5vw,40px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="feat-grid" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.17em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>{t.home.feat1.eyebrow}</p>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 0.96, marginBottom: 24, color: "#f5f5f7", whiteSpace: "pre-line" }}>
              {t.home.feat1.h2}
            </h2>
            <p style={{ fontSize: "clamp(15px,1.5vw,17px)", color: "#f5f5f7", lineHeight: 1.65, maxWidth: 400, marginBottom: 36 }}>
              {t.home.feat1.body}
            </p>
            <Link href="/apps" style={{ fontSize: 14, color: "#f5f5f7", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", letterSpacing: "-0.01em", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.55"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {t.home.feat1.cta}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </FadeIn>
          <FadeIn delay={0.12}><EcosystemCard/></FadeIn>
        </div>
      </section>

      {/* ── FEATURE 2 ── */}
      <section className="feat-section" style={{ padding: "120px clamp(16px,5vw,40px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="feat-grid" style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center" }}>
          <FadeIn delay={0.12}><AppsCard/></FadeIn>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.17em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>{t.home.feat2.eyebrow}</p>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 0.96, marginBottom: 24, color: "#f5f5f7" }}>
              {t.home.feat2.h2line1}<br/>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>{t.home.feat2.h2line2}</span>
            </h2>
            <p style={{ fontSize: "clamp(15px,1.5vw,17px)", color: "#f5f5f7", lineHeight: 1.65, maxWidth: 400, marginBottom: 36 }}>
              {t.home.feat2.body}
            </p>
            <Link href="/blog" style={{ fontSize: 14, color: "#f5f5f7", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", letterSpacing: "-0.01em", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.55"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {t.home.feat2.cta}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" style={{ padding: "160px clamp(16px,5vw,40px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 1000, height: 600, background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 60%)", pointerEvents: "none" }}/>
        <FadeIn>
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.17em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 40 }}>{t.home.cta.eyebrow}</p>
            <h2 style={{ fontSize: "clamp(32px, 8vw, 96px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.96, textTransform: "uppercase", marginBottom: 56 }}>
              {t.home.cta.h2line1}<br/>
              <span style={{ color: "#f5f5f7" }}>{t.home.cta.h2line2}</span>
            </h2>
            <Link href="/apps" className="cta-white" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px", borderRadius: 999, background: "#f5f5f7", color: "#0a0a0a", fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em", textDecoration: "none", transition: "opacity 0.2s" }}>
              {t.home.cta.btn}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </FadeIn>
      </section>

      <style>{`
        .h-btn-primary:hover { opacity: 0.82 !important; }
        .h-btn-ghost:hover { border-color: rgba(255,255,255,0.3) !important; background: rgba(255,255,255,0.05) !important; }
        .bento-card:hover { border-color: rgba(255,255,255,0.16) !important; background: #1b1b1b !important; transform: translateY(-3px) !important; }
        .muted-lnk:hover { color: #f5f5f7 !important; }
        .cta-white:hover { opacity: 0.82 !important; }

        /* Ticker */
        .ticker-track { display: flex; width: max-content; animation: ticker 28s linear infinite; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }

        /* Layout breakpoints */
        @media (max-width: 1024px) {
          .feat-grid { grid-template-columns: 1fr !important; gap: 52px !important; }
        }
        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: repeat(6, 1fr) !important; }
          .bento-grid > * { grid-column: span 3 !important; }
        }
        @media (max-width: 640px) {
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-grid > * { grid-column: span 1 !important; }
          .bento-card { min-height: 160px !important; }
          .feat-grid { gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .hero-btns > * { width: 100% !important; justify-content: center !important; }
        }

        /* Mobile section padding */
        @media (max-width: 768px) {
          .products-section { padding-top: 72px !important; padding-bottom: 72px !important; }
          .feat-section    { padding-top: 64px !important; padding-bottom: 64px !important; }
          .cta-section     { padding-top: 80px !important; padding-bottom: 80px !important; }
          .eco-card        { padding: 28px 20px !important; }
          .apps-vis-card   { padding: 20px !important; gap: 6px !important; }
          .apps-vis-item   { padding: 14px !important; }
        }
        @media (max-width: 480px) {
          .apps-vis-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
