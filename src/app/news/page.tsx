"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const articles = [
  { tag: "Анонс",       date: "8 мая 2025",  readTime: "3 мин", title: "NEXT Ecosystem Сезон 2 запущен — Что нового",             excerpt: "Сезон 2 приносит полностью переработанный интерфейс, три новые интеграции протоколов и пул наград 50M $NEXT.", featured: true },
  { tag: "Продукт",     date: "5 мая 2025",  readTime: "5 мин", title: "Представляем NEXT Exchange — профессиональный трейдинг",  excerpt: "Полностью децентрализованный торговый терминал с расширенными типами ордеров и субсекундным исполнением." },
  { tag: "DeFi",        date: "28 апр 2025", readTime: "4 мин", title: "NEXT Vault: 14 новых стратегий доходности",               excerpt: "Пулы RWA и доходность до 18,7% APY." },
  { tag: "Партнёрство", date: "20 апр 2025", readTime: "2 мин", title: "NEXT × Chainlink: реальные данные в блокчейне",           excerpt: "Оракулы Chainlink интегрированы во все протоколы NEXT." },
  { tag: "Безопасность",date: "15 апр 2025", readTime: "6 мин", title: "Отчёт по безопасности Q1 2025 — ноль критических уязвимостей", excerpt: "Trail of Bits подтвердил отсутствие критических уязвимостей." },
  { tag: "Сообщество",  date: "8 апр 2025",  readTime: "3 мин", title: "Голосование DAO: распределение экосистемного фонда Q2",  excerpt: "62% от 8,2M $NEXT пойдут на поддержку DeFi-разработчиков." },
  { tag: "DeFi",        date: "30 мар 2025", readTime: "4 мин", title: "NEXT Bridge добавляет поддержку 4 новых сетей",          excerpt: "Base, Blast, Scroll и Linea с нативной абстракцией газа." },
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

export default function NewsPage() {
  const featured = articles.find((a) => a.featured)!;
  const rest = articles.filter((a) => !a.featured);

  useEffect(() => {
    document.body.style.background = "#0a0a0a";
    return () => { document.body.style.background = ""; };
  }, []);

  return (
    <div style={{ paddingTop: 100, paddingBottom: 100, minHeight: "100vh", background: "#0a0a0a" }}>
      <style>{`
        .news-featured { transition: opacity 0.15s; }
        .news-featured:hover { opacity: 0.8 !important; }
        .article-row { transition: background 0.15s; }
        .article-row:hover .article-title { color: #f5f5f7 !important; }
        @media (max-width: 640px) {
          .article-row { grid-template-columns: 1fr !important; gap: 6px !important; }
          .article-row > div:first-child, .article-row > div:last-child { display: none; }
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>

        <FadeIn>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Медиа</p>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f5f5f7", marginBottom: 10, textTransform: "uppercase" }}>Новости</h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>{articles.length} материалов</p>
          </div>
        </FadeIn>

        {/* Featured */}
        <FadeIn delay={0.08}>
          <a href="#" className="news-featured" style={{
            display: "block", padding: "28px",
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            marginBottom: 48, textDecoration: "none", color: "inherit",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", padding: "3px 8px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100 }}>{featured.tag}</span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", padding: "3px 8px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100 }}>Избранное</span>
            </div>
            <h2 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#f5f5f7", marginBottom: 12, lineHeight: 1.2 }}>{featured.title}</h2>
            <p style={{ fontSize: 14, color: "#f5f5f7", lineHeight: 1.65, marginBottom: 16 }}>{featured.excerpt}</p>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{featured.date} · {featured.readTime} чтения</span>
          </a>
        </FadeIn>

        {/* Article list */}
        <div>
          {rest.map((article, i) => (
            <FadeIn key={article.title} delay={i * 0.04}>
              <a href="#" className="article-row" style={{
                display: "grid", gridTemplateColumns: "90px 1fr 60px",
                gap: 24, alignItems: "center", padding: "18px 0",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                textDecoration: "none", color: "inherit",
              }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{article.date}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", padding: "2px 7px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100 }}>{article.tag}</span>
                  </div>
                  <div className="article-title" style={{ fontSize: 15, fontWeight: 500, color: "#f5f5f7", lineHeight: 1.3, transition: "color 0.15s" }}>{article.title}</div>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "right" }}>{article.readTime}</div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
