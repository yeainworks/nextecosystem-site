"use client";
interface Article {
  id: string;
  tag: string;
  tagColor: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: "1",
    tag: "Анонс",
    tagColor: "#3B82F6",
    date: "8 мая 2025",
    readTime: "3 мин",
    title: "NEXT Ecosystem Сезон 2 запущен — Что нового",
    excerpt:
      "Сезон 2 приносит полностью переработанный интерфейс, три новые интеграции протоколов и пул наград 50M $NEXT для ранних пользователей.",
    author: "Алекс Петров",
    authorRole: "CEO и сооснователь",
    featured: true,
  },
  {
    id: "2",
    tag: "Продукт",
    tagColor: "#A855F7",
    date: "5 мая 2025",
    readTime: "5 мин",
    title: "Представляем NEXT Exchange — профессиональный трейдинг в Web3",
    excerpt:
      "Запускаем полностью децентрализованный торговый терминал с расширенными типами ордеров, графиками глубины и субсекундным исполнением на новом движке.",
    author: "Мария Ким",
    authorRole: "Руководитель продукта",
  },
  {
    id: "3",
    tag: "DeFi",
    tagColor: "#22C55E",
    date: "28 апр 2025",
    readTime: "4 мин",
    title: "NEXT Vault: 14 новых стратегий доходности",
    excerpt:
      "Движок оптимизации доходности расширился на 14 дополнительных стратегий, включая пулы с обеспечением RWA и годовой доходностью до 18,7% APY.",
    author: "Дэвид Ли",
    authorRole: "Руководитель DeFi",
  },
  {
    id: "4",
    tag: "Партнёрство",
    tagColor: "#F97316",
    date: "20 апр 2025",
    readTime: "2 мин",
    title: "NEXT × Chainlink: реальные данные в блокчейне",
    excerpt:
      "Интегрировали сеть оракулов Chainlink во все протоколы NEXT для ценовых фидов, рандомности и кросс-чейн совместимости экосистемы.",
    author: "Сара Чен",
    authorRole: "Партнёрства",
  },
  {
    id: "5",
    tag: "Безопасность",
    tagColor: "#F43F5E",
    date: "15 апр 2025",
    readTime: "6 мин",
    title: "Отчёт по безопасности Q1 2025 — ноль критических уязвимостей",
    excerpt:
      "Комплексный аудит Q1 от Trail of Bits подтвердил отсутствие критических уязвимостей во всех 12 смарт-контрактах NEXT. Полный отчёт о прозрачности внутри.",
    author: "Джеймс Райт",
    authorRole: "Руководитель безопасности",
  },
  {
    id: "6",
    tag: "Сообщество",
    tagColor: "#F59E0B",
    date: "8 апр 2025",
    readTime: "3 мин",
    title: "Голосование DAO: результаты распределения экосистемного фонда",
    excerpt:
      "Сообщество NEXT проголосовало за распределение фонда Q2 2025. 62% от 8,2M $NEXT в грантах пойдут на поддержку DeFi-разработчиков и призы хакатонов.",
    author: "NEXT DAO",
    authorRole: "Сообщество",
  },
];

export default function News() {
  const featured = articles.find((a) => a.featured)!;
  const rest = articles.filter((a) => !a.featured);

  return (
    <section id="news" className="py-24 px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(168,85,247,0.04), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.08)", color: "#FCD34D" }}
            >
              Последние новости
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              Что&nbsp;<span className="gradient-text">происходит</span>
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold self-start sm:self-auto"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            Все статьи
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Featured + grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Featured article */}
          <a
            href="#"
            className="glass-card lg:col-span-3 rounded-3xl p-8 flex flex-col justify-between no-underline min-h-72 relative overflow-hidden"
          >
            <div
              className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #3B82F6, transparent)", filter: "blur(30px)" }}
            />
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="tag"
                  style={{
                    background: `${featured.tagColor}18`,
                    color: featured.tagColor,
                    border: `1px solid ${featured.tagColor}30`,
                  }}
                >
                  {featured.tag}
                </span>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: "rgba(59,130,246,0.15)", color: "#60A5FA" }}
                >
                  Избранное
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
                {featured.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {featured.excerpt}
              </p>
            </div>
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "white" }}
                >
                  {featured.author[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {featured.author}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {featured.authorRole}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-secondary)" }}>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime} чтения</span>
              </div>
            </div>
          </a>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.slice(0, 2).map((article) => (
              <a
                key={article.id}
                href="#"
                className="glass-card rounded-2xl p-6 flex flex-col gap-3 no-underline"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="tag"
                    style={{
                      background: `${article.tagColor}18`,
                      color: article.tagColor,
                      border: `1px solid ${article.tagColor}30`,
                    }}
                  >
                    {article.tag}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {article.date}
                  </span>
                </div>
                <h3 className="font-bold text-base leading-snug" style={{ color: "var(--text-primary)" }}>
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: `${article.tagColor}30`, color: article.tagColor }}
                  >
                    {article.author[0]}
                  </div>
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    {article.author} · {article.readTime} чтения
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {rest.slice(2).map((article) => (
            <a
              key={article.id}
              href="#"
              className="glass-card rounded-2xl p-5 flex flex-col gap-3 no-underline"
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="tag"
                  style={{
                    background: `${article.tagColor}18`,
                    color: article.tagColor,
                    border: `1px solid ${article.tagColor}30`,
                  }}
                >
                  {article.tag}
                </span>
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  {article.readTime}
                </span>
              </div>
              <h3 className="font-bold text-sm leading-snug" style={{ color: "var(--text-primary)" }}>
                {article.title}
              </h3>
              <p className="text-xs leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                {article.excerpt}
              </p>
              <div className="text-xs mt-auto" style={{ color: "var(--text-secondary)" }}>
                {article.date}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
