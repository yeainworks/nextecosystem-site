"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { label: "Приложения", href: "/apps" },
  { label: "Blog",       href: "/blog" },
  { label: "Контакты",   href: "/contacts" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const touchStartY = useRef(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px)", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/logo.png" alt="NEXT" width={30} height={30} style={{ borderRadius: 9, flexShrink: 0 }}/>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="nav-desktop">
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              padding: "7px 16px", borderRadius: 8,
              fontSize: 14, fontWeight: 500,
              color: pathname === l.href ? "#f5f5f7" : "rgba(255,255,255,0.45)",
              background: pathname === l.href ? "rgba(255,255,255,0.1)" : "transparent",
              transition: "color 0.15s, background 0.15s",
              textDecoration: "none",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#f5f5f7"}
              onMouseLeave={e => e.currentTarget.style.color = pathname === l.href ? "#f5f5f7" : "rgba(255,255,255,0.45)"}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="nav-desktop">
          <Link href="/apps"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "9px 18px", borderRadius: 999,
              background: "#f5f5f7", color: "#0a0a0a",
              fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em",
              textDecoration: "none", transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Открыть
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {/* Mobile hamburger — 44×44 tap target */}
        <button
          onClick={() => setOpen(o => !o)}
          className="nav-mobile-btn"
          aria-label="Меню"
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            color: "#f5f5f7",
            padding: 12,
            margin: -6,
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
        </button>
      </div>

      {/* Mobile menu — CSS-driven animation, swipe-down to close */}
      <div
        className={`mobile-menu${open ? " mobile-menu--open" : ""}`}
        onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
        onTouchEnd={(e) => { if (e.changedTouches[0].clientY - touchStartY.current > 60) setOpen(false); }}
      >
        <div style={{ padding: "16px clamp(16px, 4vw, 28px) 28px" }}>
          {links.map((l) => (
            <Link
              key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              style={{ display: "block", padding: "14px 0", fontSize: 16, fontWeight: 500, color: "#f5f5f7", borderBottom: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/apps"
            onClick={() => setOpen(false)}
            style={{ display: "block", marginTop: 16, padding: "14px 0", textAlign: "center", fontSize: 15, fontWeight: 600, background: "#f5f5f7", color: "#0a0a0a", borderRadius: 10, textDecoration: "none" }}
          >
            Открыть
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
