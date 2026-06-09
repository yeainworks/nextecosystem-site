"use client";
import { useState } from "react";

type Category = "Все" | "DeFi" | "NFT" | "Платежи" | "Биржа" | "Утилиты" | "Социальное";

interface App {
  id: string;
  name: string;
  description: string;
  category: Category;
  tag?: string;
  tagColor?: string;
  gradient: string;
  icon: React.ReactNode;
  featured?: boolean;
  new?: boolean;
  url?: string;
}

const apps: App[] = [
  {
    id: "next-swap",
    name: "NEXT Swap",
    description: "Децентрализованная биржа с лучшими курсами по всем пулам ликвидности",
    category: "DeFi",
    gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    tag: "DeFi",
    tagColor: "#3B82F6",
    featured: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    ),
  },
  {
    id: "next-vault",
    name: "NEXT Vault",
    description: "Зарабатывайте доходность с автоматизированными DeFi-стратегиями",
    category: "DeFi",
    gradient: "linear-gradient(135deg, #22C55E, #16A34A)",
    tag: "DeFi",
    tagColor: "#22C55E",
    featured: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
        <circle cx="12" cy="16" r="1" fill="white" />
      </svg>
    ),
  },
  {
    id: "next-nft",
    name: "NEXT NFT",
    description: "Находите, покупайте, продавайте и создавайте NFT в нескольких сетях",
    category: "NFT",
    gradient: "linear-gradient(135deg, #A855F7, #7C3AED)",
    tag: "NFT",
    tagColor: "#A855F7",
    featured: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: "next-pay",
    name: "NEXT Pay",
    description: "Отправляйте и получайте платежи глобально без комиссий по QR-коду",
    category: "Платежи",
    gradient: "linear-gradient(135deg, #F97316, #EA580C)",
    tag: "Платежи",
    tagColor: "#F97316",
    featured: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: "next-bridge",
    name: "NEXT Bridge",
    description: "Кросс-чейн мост для мгновенных переводов активов между сетями",
    category: "DeFi",
    gradient: "linear-gradient(135deg, #06B6D4, #0284C7)",
    tag: "DeFi",
    tagColor: "#06B6D4",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
      </svg>
    ),
  },
  {
    id: "next-id",
    name: "NEXT ID",
    description: "Ваша Web3-идентичность — один адрес, вся on-chain репутация",
    category: "Утилиты",
    gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
    tag: "Утилиты",
    tagColor: "#8B5CF6",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: "next-launch",
    name: "NEXT Launch",
    description: "IDO-лаунчпад для самых перспективных Web3-проектов",
    category: "DeFi",
    gradient: "linear-gradient(135deg, #EC4899, #BE185D)",
    tag: "DeFi",
    tagColor: "#EC4899",
    new: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-5 0V4.5A2.5 2.5 0 019.5 2z" />
        <path d="M14.5 8A2.5 2.5 0 0117 10.5v9a2.5 2.5 0 01-5 0v-9A2.5 2.5 0 0114.5 8z" />
      </svg>
    ),
  },
  {
    id: "next-earn",
    name: "NEXT Earn",
    description: "Стейкайте активы и получайте награды с гибкими периодами блокировки",
    category: "DeFi",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    tag: "DeFi",
    tagColor: "#F59E0B",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    id: "next-market",
    name: "NEXT Market",
    description: "P2P-маркетплейс для цифровых активов и коллекционных предметов",
    category: "NFT",
    gradient: "linear-gradient(135deg, #6366F1, #4338CA)",
    tag: "NFT",
    tagColor: "#6366F1",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    id: "next-exchange",
    name: "NEXT Exchange",
    description: "Профессиональный торговый терминал с расширенными типами ордеров",
    category: "Биржа",
    gradient: "linear-gradient(135deg, #0EA5E9, #0369A1)",
    tag: "Биржа",
    tagColor: "#0EA5E9",
    new: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    id: "next-convert",
    name: "NEXT Convert",
    description: "Мгновенная конвертация крипто-в-крипто по лучшему рыночному курсу",
    category: "Биржа",
    gradient: "linear-gradient(135deg, #14B8A6, #0F766E)",
    tag: "Биржа",
    tagColor: "#14B8A6",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 014-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 01-4 4H3" />
      </svg>
    ),
  },
  {
    id: "next-social",
    name: "NEXT Social",
    description: "Нативная Web3-соцсеть с on-chain репутацией и наградами",
    category: "Социальное",
    gradient: "linear-gradient(135deg, #F472B6, #DB2777)",
    tag: "Социальное",
    tagColor: "#F472B6",
    new: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: "next-analytics",
    name: "NEXT Analytics",
    description: "Трекер портфеля в реальном времени и on-chain аналитика",
    category: "Утилиты",
    gradient: "linear-gradient(135deg, #84CC16, #4D7C0F)",
    tag: "Утилиты",
    tagColor: "#84CC16",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: "next-wallet",
    name: "NEXT Wallet",
    description: "Некастодиальный мультичейн-кошелёк с поддержкой аппаратной защиты",
    category: "Утилиты",
    gradient: "linear-gradient(135deg, #3B82F6, #2563EB)",
    tag: "Утилиты",
    tagColor: "#3B82F6",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
        <path d="M18 12a2 2 0 000 4h4v-4h-4z" />
      </svg>
    ),
  },
  {
    id: "next-scan",
    name: "NEXT Scan",
    description: "Блокчейн-эксплорер с аналитикой транзакций и адресов в реальном времени",
    category: "Утилиты",
    gradient: "linear-gradient(135deg, #64748B, #374151)",
    tag: "Утилиты",
    tagColor: "#94A3B8",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: "next-gift",
    name: "NEXT Gift",
    description: "Дарите крипто через QR-коды, ссылки и сообщения в соцсетях",
    category: "Платежи",
    gradient: "linear-gradient(135deg, #F43F5E, #BE123C)",
    tag: "Платежи",
    tagColor: "#F43F5E",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
];

const categories: Category[] = ["Все", "DeFi", "NFT", "Платежи", "Биржа", "Утилиты", "Социальное"];

export default function Services() {
  const [active, setActive] = useState<Category>("Все");

  const filtered = active === "Все" ? apps : apps.filter((a) => a.category === active);
  const featured = apps.filter((a) => a.featured);

  return (
    <section id="ecosystem" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ border: "1px solid rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)", color: "#C084FC" }}
          >
            32 приложения и сервиса
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Экосистема <span className="gradient-text">NEXT</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Всё необходимое в Web3 под одной крышей. Открывайте, взаимодействуйте и растите.
          </p>
        </div>

        {/* Featured cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {featured.map((app) => (
            <a
              key={app.id}
              href={app.url || "#"}
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 cursor-pointer no-underline"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 app-icon" style={{ background: app.gradient }}>
                  {app.icon}
                </div>
                {app.tag && (
                  <span
                    className="tag"
                    style={{
                      background: `${app.tagColor}18`,
                      color: app.tagColor,
                      border: `1px solid ${app.tagColor}30`,
                    }}
                  >
                    {app.tag}
                  </span>
                )}
              </div>
              <div>
                <div className="font-bold text-base mb-1" style={{ color: "var(--text-primary)" }}>
                  {app.name}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {app.description}
                </div>
              </div>
              <div
                className="mt-auto text-xs font-semibold flex items-center gap-1"
                style={{ color: app.tagColor || "var(--accent)" }}
              >
                Открыть
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="divider mb-10" />

        {/* Category filter */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn${active === cat ? " active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Apps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((app, i) => (
            <a
              key={app.id}
              href={app.url || "#"}
              className="glass-card rounded-2xl p-4 flex items-center gap-4 no-underline group"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div
                className="w-12 h-12 app-icon flex-shrink-0 flex items-center justify-center"
                style={{ background: app.gradient }}
              >
                {app.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                    {app.name}
                  </span>
                  {app.new && (
                    <span
                      className="tag flex-shrink-0"
                      style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.2)" }}
                    >
                      Новое
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                  {app.description}
                </p>
              </div>
              <svg
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="var(--text-secondary)" strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all hover:scale-105"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            Все 32 приложения
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
