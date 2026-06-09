"use client";

import Link from "next/link";
import Image from "next/image";

const products = [
  { label: "NextVPN",       href: "https://nextvpn.ru" },
  { label: "NextLOGISTICS", href: "#" },
  { label: "NextCRYPTO",    href: "https://nextforcrypto.com" },
  { label: "NextFOCUS",     href: "https://nextforfocus.com" },
  { label: "Nova",          href: "https://novaforlive.ru" },
  { label: "Jury",          href: "https://juryapp.org" },
];

const nav = [
  { label: "Приложения", href: "/apps" },
  { label: "Новости",    href: "/news" },
  { label: "Контакты",   href: "/contacts" },
];

const community = [
  { label: "Telegram",  href: "https://t.me/nextforecosystem" },
  { label: "Twitter",   href: "#" },
  { label: "GitHub",    href: "#" },
  { label: "Discord",   href: "#" },
];

const legal = [
  { label: "Политика конфиденциальности", href: "#" },
  { label: "Условия использования",       href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>

        {/* ── Main columns ── */}
        <div className="footer-cols" style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1fr", gap: 64, padding: "72px 0 64px" }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 16, letterSpacing: "-0.04em", color: "#f5f5f7", textDecoration: "none", marginBottom: 16 }}>
              <Image src="/logo.png" alt="NEXT" width={30} height={30} style={{ borderRadius: 9 }}/>
              NEXT
            </Link>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 240, marginBottom: 28 }}>
              Реальные продукты под одним брендом. Доставка, инвестиции, продуктивность.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ffffff", display: "inline-block" }}/>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f5f5f7" }}>Ecosystem</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>Продукты</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {products.map(p => (
                <li key={p.label}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer"
                    className="footer-link"
                    style={{ fontSize: 14, color: "#f5f5f7", textDecoration: "none", transition: "color 0.15s" }}
                  >{p.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>Компания</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {nav.map(n => (
                <li key={n.label}>
                  <Link href={n.href} className="footer-link" style={{ fontSize: 14, color: "#f5f5f7", textDecoration: "none", transition: "color 0.15s" }}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>Сообщество</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {community.map(c => (
                <li key={c.label}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    className="footer-link"
                    style={{ fontSize: 14, color: "#f5f5f7", textDecoration: "none", transition: "color 0.15s" }}
                  >{c.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>© 2025 NEXT Ecosystem</span>
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            {legal.map(l => (
              <a key={l.label} href={l.href} className="footer-link" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.15s" }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .footer-link:hover { color: #f5f5f7 !important; }
        @media (max-width: 900px) {
          .footer-cols { grid-template-columns: 1fr 1fr !important; gap: 40px !important; padding: 48px 0 40px !important; }
        }
        @media (max-width: 560px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-cols { grid-template-columns: 1fr !important; gap: 32px !important; padding: 40px 0 32px !important; }
        }
      `}</style>
    </footer>
  );
}
