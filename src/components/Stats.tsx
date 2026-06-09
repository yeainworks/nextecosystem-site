"use client";
const stats = [
  {
    value: "$2.4B+",
    label: "Общий объём",
    sublabel: "По всем протоколам",
    color: "#3B82F6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    value: "180K+",
    label: "Активных пользователей",
    sublabel: "Ежемесячных кошельков",
    color: "#22C55E",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    value: "32",
    label: "Приложений и сервисов",
    sublabel: "И число растёт каждый месяц",
    color: "#A855F7",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="7" height="7" rx="1" />
        <rect x="15" y="3" width="7" height="7" rx="1" />
        <rect x="2" y="14" width="7" height="7" rx="1" />
        <rect x="15" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    value: "14",
    label: "Блокчейнов",
    sublabel: "Полностью интегрированных сетей",
    color: "#F97316",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    value: "4.8★",
    label: "Рейтинг приложения",
    sublabel: "Среднее по магазинам",
    color: "#F59E0B",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    value: "99.9%",
    label: "SLA доступности",
    sublabel: "Корпоративная надёжность",
    color: "#06B6D4",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function Stats() {
  return (
    <section id="about" className="py-24 px-6 relative">
      {/* Bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.05), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)", color: "#4ADE80" }}
            >
              О NEXT
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
              Создано для{" "}
              <span className="gradient-text">следующего миллиарда</span>
              {" "}пользователей
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
              NEXT — компания Web3-экосистемы, основанная в 2021 году с миссией сделать
              децентрализованные финансы доступными, безопасными и интуитивными для всех —
              от крипто-нативных до полных новичков.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Наш набор из 32+ приложений охватывает всё от DeFi и NFT до ежедневных платежей
              и кросс-чейн обменов — защищённых ведущими аудитами и принципами открытого кода.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {["Открытый код", "Некастодиальный", "Прошедший аудит", "Управление DAO"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "var(--text-secondary)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(168,85,247,0.08) 50%, rgba(34,197,94,0.05) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #8B5CF6, transparent)", filter: "blur(30px)" }}
            />
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Основан", value: "2021" },
                { label: "Команда", value: "200+" },
                { label: "Стран", value: "40+" },
                { label: "Инвесторы", value: "Топ ВК" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl p-4"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-2xl font-black mb-1 gradient-text">{item.value}</div>
                  <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div
              className="mt-4 rounded-2xl p-4 flex items-center gap-3"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(59,130,246,0.2)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  Безопасность прежде всего
                </div>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Проверено Trail of Bits и Certik
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider mb-16" />

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-card text-center">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${s.color}18`, color: s.color }}
              >
                {s.icon}
              </div>
              <div className="text-2xl font-black mb-1 stat-number" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                {s.label}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted, #4A5568)" }}>
                {s.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
