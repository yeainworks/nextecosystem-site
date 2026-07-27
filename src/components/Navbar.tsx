"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGS, Lang } from "@/i18n/translations";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const touchStartY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function onClickOut(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", onClickOut);
    return () => document.removeEventListener("mousedown", onClickOut);
  }, []);

  const links = [
    { label: t.nav.apps,     href: "/apps" },
    { label: t.nav.news,     href: "/blog" },
    { label: t.nav.contacts, href: "/contacts" },
  ];

  const bg = scrolled ? "rgba(10,10,10,0.88)" : "transparent";
  const borderColor = scrolled ? "rgba(255,255,255,0.08)" : "transparent";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 64,
      display: "flex", alignItems: "center",
      background: bg,
      backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      borderBottom: `1px solid ${borderColor}`,
      transition: "background 0.3s, border-color 0.3s",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px)", width: "100%", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>

        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1, ease }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
            <Image src="/logo.png" alt="NEXT" width={30} height={30} style={{ borderRadius: 9, flexShrink: 0 }}/>
          </Link>
        </motion.div>

        {/* Desktop nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="nav-desktop">
          {links.map((l, i) => (
            <motion.div key={l.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 + i * 0.07, ease }}>
              <Link href={l.href} style={{
                padding: "7px 16px", borderRadius: 8,
                fontSize: 14, fontWeight: 500,
                color: pathname === l.href ? "#f5f5f7" : "rgba(255,255,255,0.45)",
                background: pathname === l.href ? "rgba(255,255,255,0.1)" : "transparent",
                transition: "color 0.15s, background 0.15s",
                textDecoration: "none", display: "block",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#f5f5f7"}
                onMouseLeave={e => e.currentTarget.style.color = pathname === l.href ? "#f5f5f7" : "rgba(255,255,255,0.45)"}
              >
                {l.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right: CTA + lang switcher + hamburger */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8 }}>

          {/* Language switcher */}
          <div ref={langRef} style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen(o => !o)}
              style={{
                background: "none", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 7, padding: "5px 10px",
                color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.06em", cursor: "pointer", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 4,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"; e.currentTarget.style.color = "#f5f5f7"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
            >
              {lang.toUpperCase()}
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: langOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            {langOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 8px)", right: 0,
                background: "#141414", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: 4, minWidth: 72, zIndex: 200,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}>
                {LANGS.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code as Lang); setLangOpen(false); }}
                    style={{
                      display: "block", width: "100%", padding: "7px 12px",
                      textAlign: "left", background: lang === l.code ? "rgba(255,255,255,0.08)" : "none",
                      border: "none", borderRadius: 7,
                      color: lang === l.code ? "#f5f5f7" : "rgba(255,255,255,0.5)",
                      fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", cursor: "pointer",
                      transition: "all 0.12s",
                    }}
                    onMouseEnter={e => { if (lang !== l.code) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#f5f5f7"; } }}
                    onMouseLeave={e => { if (lang !== l.code) { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; } }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop CTA */}
          <motion.div className="nav-desktop" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.4, ease }}>
            <Link href="/apps" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "9px 18px", borderRadius: 999,
              background: "#f5f5f7", color: "#0a0a0a",
              fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em",
              textDecoration: "none", transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {t.nav.cta}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>

          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setOpen(o => !o)}
            className="nav-mobile-btn"
            aria-label="Меню"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3, ease }}
            style={{
              display: "none", background: "none", border: "none", cursor: "pointer",
              color: "#f5f5f7", padding: 10, margin: -4,
              minWidth: 44, minHeight: 44,
              alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open
                ? <path d="M6 6l12 12M6 18L18 6"/>
                : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
              }
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu${open ? " mobile-menu--open" : ""}`}
        onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
        onTouchEnd={(e) => { if (e.changedTouches[0].clientY - touchStartY.current > 60) setOpen(false); }}
      >
        <div style={{ padding: "16px clamp(16px, 4vw, 28px) 28px" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "14px 0", fontSize: 16, fontWeight: 500, color: "#f5f5f7", borderBottom: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}
            >
              {l.label}
            </Link>
          ))}

          {/* Mobile lang picker */}
          <div style={{ display: "flex", gap: 6, padding: "20px 0 4px", flexWrap: "wrap" }}>
            {LANGS.map(l => (
              <button key={l.code} onClick={() => setLang(l.code as Lang)}
                style={{
                  padding: "6px 14px", borderRadius: 8,
                  border: lang === l.code ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.1)",
                  background: lang === l.code ? "rgba(255,255,255,0.1)" : "transparent",
                  color: lang === l.code ? "#f5f5f7" : "rgba(255,255,255,0.45)",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", cursor: "pointer",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <Link href="/apps" onClick={() => setOpen(false)}
            style={{ display: "block", marginTop: 16, padding: "14px 0", textAlign: "center", fontSize: 15, fontWeight: 600, background: "#f5f5f7", color: "#0a0a0a", borderRadius: 10, textDecoration: "none" }}
          >
            {t.nav.cta}
          </Link>
        </div>
      </div>

      <style>{`
        .mobile-menu {
          position: absolute;
          top: 64px; left: 0; right: 0;
          background: rgba(10,10,10,0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          pointer-events: none;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .mobile-menu--open {
          pointer-events: auto;
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
