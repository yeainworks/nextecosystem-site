"use client";
export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden grid-lines"
    >
      {/* Background orbs */}
      <div
        className="orb w-96 h-96 -top-20 -left-20 opacity-30"
        style={{ background: "radial-gradient(circle, #3B82F6, transparent)", animationDelay: "0s" }}
      />
      <div
        className="orb w-80 h-80 top-1/3 -right-16 opacity-20"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent)", animationDelay: "3s" }}
      />
      <div
        className="orb w-64 h-64 bottom-1/4 left-1/4 opacity-15"
        style={{ background: "radial-gradient(circle, #22C55E, transparent)", animationDelay: "6s" }}
      />

      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
        style={{
          border: "1px solid rgba(59,130,246,0.3)",
          background: "rgba(59,130,246,0.08)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "#22C55E", boxShadow: "0 0 8px #22C55E" }}
        />
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#60A5FA" }}>
          Онлайн — Сезон 2 активен
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
        <span className="gradient-text">Одна экосистема.</span>
        <br />
        <span style={{ color: "var(--text-primary)" }}>Безграничные возможности.</span>
      </h1>

      <p
        className="max-w-2xl text-lg sm:text-xl leading-relaxed mb-10"
        style={{ color: "var(--text-secondary)" }}
      >
        NEXT объединяет DeFi, NFT, платежи, биржи и утилиты в единый Web3-опыт.
        Создано для следующего поколения цифровых финансов.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-16">
        <a
          href="#ecosystem"
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
            boxShadow: "0 8px 32px rgba(59,130,246,0.3)",
          }}
        >
          Изучить экосистему
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a
          href="#about"
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105"
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
          Узнать больше
        </a>
      </div>

      {/* Stats row */}
      <div
        className="flex flex-wrap justify-center gap-8 sm:gap-16"
        style={{ color: "var(--text-secondary)", fontSize: 14 }}
      >
        {[
          { value: "$2.4B+", label: "Общий объём" },
          { value: "180K+", label: "Активных пользователей" },
          { value: "32",    label: "Приложений" },
          { value: "99.9%", label: "Доступность" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <span className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>
              {s.value}
            </span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)", fontSize: 10 }}>
          Прокрутить
        </span>
        <div
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)" }}
        />
      </div>
    </section>
  );
}
