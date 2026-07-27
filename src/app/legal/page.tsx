import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Правовая информация — NEXT Ecosystem",
  description: "Юридические сведения о компании NEXT Ecosystem.",
};

const sections = [
  {
    title: "О компании",
    text: `NEXT Ecosystem — частная технологическая компания, разрабатывающая и предоставляющая цифровые сервисы для пользователей по всему миру. Компания работает в формате полностью удалённой команды.`,
  },
  {
    title: "Товарные знаки",
    text: `Названия NEXT Ecosystem, NextVPN, NextLOGISTICS, NextFOCUS, NextCRYPTO, Nova, Jury и соответствующие логотипы являются товарными знаками NEXT Ecosystem. Несанкционированное использование запрещено.`,
  },
  {
    title: "Авторские права",
    text: `© 2026 NEXT Ecosystem. Все права защищены.\n\nВесь контент на сайтах экосистемы — тексты, изображения, графика, программный код — является интеллектуальной собственностью Компании. Частичное или полное воспроизведение без письменного разрешения запрещено.`,
  },
  {
    title: "Ограничение ответственности",
    text: `Компания прилагает все усилия для обеспечения точности и актуальности информации на своих ресурсах, однако не гарантирует её полноту и безошибочность. Компания не несёт ответственности за любые убытки, возникшие в результате использования или невозможности использования публикуемых материалов.`,
  },
  {
    title: "Сторонние сервисы",
    text: `Наши продукты могут содержать ссылки на сторонние сайты и интеграции. NEXT Ecosystem не несёт ответственности за содержание, политику конфиденциальности или практику сторонних ресурсов.`,
  },
  {
    title: "Применимое право",
    text: `Деятельность Компании регулируется действующим международным законодательством в области информационных технологий и защиты данных.`,
  },
  {
    title: "Контакты",
    text: `По юридическим вопросам:\nEmail: nextforbusiness@gmail.com\nTelegram: @nextformgmt`,
  },
];

export default function LegalPage() {
  return (
    <div style={{ paddingTop: 100, paddingBottom: 120, minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(16px,5vw,40px)" }}>

        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Документы</p>
          <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f5f5f7", marginBottom: 12, textTransform: "uppercase" }}>
            Правовая информация
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Последнее обновление: июль 2026</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {sections.map((s) => (
            <div key={s.title}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#f5f5f7", marginBottom: 10 }}>{s.title}</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{s.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
