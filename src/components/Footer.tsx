"use client";

import Link from "next/link";
import Image from "next/image";

const socials = [
  {
    label: "Telegram",
    href: "https://t.me/nextforecosystem",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.697l-2.95-.924c-.64-.203-.653-.64.136-.95l11.57-4.461c.537-.194 1.006.131.326.886z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com/nextecosystem",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nextforecosystem/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
];

const legal = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Условия использования",       href: "/terms" },
  { label: "Правовая информация",         href: "/legal" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>

        {/* ── Main ── */}
        <div style={{ padding: "52px 0 44px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 40 }}>

          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", marginBottom: 14 }}>
              <Image src="/logo.png" alt="NEXT" width={28} height={28} style={{ borderRadius: 8 }}/>
            </Link>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 260, marginBottom: 20 }}>
              Реальные сервисы под одним брендом. Экосистема постоянно растёт.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="social-icon" aria-label={s.label}
                  style={{ color: "rgba(255,255,255,0.45)", transition: "color 0.15s", display: "flex" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Copyright © 2025 NEXT Ecosystem</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>|</span>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
            {legal.map((l, i) => (
              <span key={l.label} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>|</span>}
                <a href={l.href} className="fl" style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.15s" }}>
                  {l.label}
                </a>
              </span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .fl:hover { color: #f5f5f7 !important; }
        .social-icon:hover { color: #f5f5f7 !important; }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > *:first-child { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > *:first-child { grid-column: 1 / -1 !important; }
        }
      `}</style>
    </footer>
  );
}
