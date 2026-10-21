import React from "react";
import type { Language } from "../types";

interface CapabilitiesSectionProps {
  lang: Language;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  lang
}) => {
  const isEn = lang === "en";

  return (
    <section className="page-section" id="capabilities">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {isEn
              ? "Superpowers designed for your daily Gemini workflow"
              : "Суперсили для щоденної продуктивної роботи в Gemini"}
          </h2>
          <p className="section-subtitle">
            {isEn
              ? "Speed, complete privacy, and fluid keyboard control engineered directly into Google Gemini."
              : "Миттєвий відгук, абсолютна локальна приватність та бездоганний контроль з клавіатури."}
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: 0ms Latency & Keyboard Flow */}
          <div className="bento-card bento-span-7">
            <div>
              <div className="bento-card-badge">
                <span>⚡️</span>
                <span>{isEn ? "0ms Latency" : "0ms затримки"}</span>
              </div>
              <h3 className="bento-title">
                {isEn
                  ? "Instant search & fluid Tab-jumping between variables"
                  : "Миттєвий пошук та плавний перехід між змінними"}
              </h3>
              <p className="bento-text">
                {isEn
                  ? "Local memory caching delivers immediate results as you type. Double-brace tokens become interactive glass pills that you can replace and navigate with Tab in a single flow."
                  : "Локальний кеш у пам'яті браузера забезпечує миттєвий пошук без затримок мережі. Змінні у фігурних дужках стають живими токенами, якими ви керуєте клавішею Tab без миші."}
              </p>
            </div>

            <div className="step-code-preview" style={{ borderRadius: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="mono" style={{ color: "var(--accent-blue)", fontWeight: 600 }}>Tab ⇥</span>
              <span>
                {isEn ? "Focus next variable instantly:" : "Миттєвий фокус наступної змінної:"}{" "}
                <span className="ph-template-variable ph-template-variable-active">
                  {"{{тема}}"}
                </span>
              </span>
            </div>
          </div>

          {/* Card 2: 100% Local-First & Privacy */}
          <div className="bento-card bento-span-5">
            <div>
              <div className="bento-card-badge">
                <span>🔒</span>
                <span>{isEn ? "Private by Design" : "100% приватність"}</span>
              </div>
              <h3 className="bento-title">
                {isEn
                  ? "Local-first storage: your prompts stay on your device"
                  : "Локальне сховище: промпти залишаються лише у вас"}
              </h3>
              <p className="bento-text">
                {isEn
                  ? "Your personal templates and keys reside securely inside chrome.storage.local. Zero tracking, zero telemetry, and Trusted Types compliance."
                  : "Усі ваші шаблони та змінні зберігаються безпосередньо в локальній базі chrome.storage.local вашого браузера. Жодного збору даних чи витоку інформації."}
              </p>
            </div>

            <div className="step-code-preview mono" style={{ borderRadius: "14px", fontSize: "0.76rem" }}>
              chrome.storage.local · Zero Telemetry · Trusted Types
            </div>
          </div>

          {/* Card 3: 40+ Curated Icons & Categories */}
          <div className="bento-card bento-span-6">
            <div>
              <div className="bento-card-badge">
                <span>✦</span>
                <span>{isEn ? "Smart Organization" : "Зручна організація"}</span>
              </div>
              <h3 className="bento-title">
                {isEn
                  ? "40+ curated icons across 5 categories and 6 sort modes"
                  : "40+ тематичних іконок у 5 категоріях та гнучке сортування"}
              </h3>
              <p className="bento-text">
                {isEn
                  ? "Assign color-coded Lucide icons across AI & Tech, Writing, Productivity, and Dev. Filter templates by custom #tags with a single click."
                  : "Призначайте шаблонам власні кольорові іконки (AI, Dev, Writing, Productivity) та миттєво фільтруйте бібліотеку за тегами."}
              </p>
            </div>

            <div className="icon-showcase-grid">
              <span className="icon-pill-demo">
                <span
                  className="prompt-icon-box"
                  data-color="blue"
                  style={{ width: "26px", height: "26px" }}
                >
                  ✦
                </span>
                <span>AI &amp; Tech</span>
              </span>
              <span className="icon-pill-demo">
                <span
                  className="prompt-icon-box"
                  data-color="purple"
                  style={{ width: "26px", height: "26px" }}
                >
                  &lt;/&gt;
                </span>
                <span>Code · Dev</span>
              </span>
              <span className="icon-pill-demo">
                <span
                  className="prompt-icon-box"
                  data-color="green"
                  style={{ width: "26px", height: "26px" }}
                >
                  ✎
                </span>
                <span>Writing</span>
              </span>
              <span className="icon-pill-demo">
                <span
                  className="prompt-icon-box"
                  data-color="amber"
                  style={{ width: "26px", height: "26px" }}
                >
                  ⚡
                </span>
                <span>Productivity</span>
              </span>
            </div>
          </div>

          {/* Card 4: Engineering Specs */}
          <div className="bento-card bento-span-6">
            <div>
              <div className="bento-card-badge">
                <span>⚙️</span>
                <span>{isEn ? "Open Source Architecture" : "Архітектура та відкритий код"}</span>
              </div>
              <h3 className="bento-title">
                {isEn
                  ? "Engineered with Plasmo MV3 & Trusted Types"
                  : "Створено на базі Plasmo MV3 та Trusted Types"}
              </h3>
              <p className="bento-text">
                {isEn
                  ? "Hermetically isolated Shadow DOM overlays with safe Light DOM injection into Gemini's editor."
                  : "Герметично ізольований інтерфейс у Shadow DOM та безпечне інтегрування в полі вводу Gemini."}
              </p>
            </div>

            <ul className="spec-list">
              <li className="spec-item">
                <div className="spec-item-label">Extension UI &amp; CSUI</div>
                <div className="spec-item-value">Plasmo MV3 · React 18 · SCSS</div>
              </li>
              <li className="spec-item">
                <div className="spec-item-label">State &amp; Validation</div>
                <div className="spec-item-value">TanStack Query v5 · Zod v4</div>
              </li>
              <li className="spec-item">
                <div className="spec-item-label">Quality Assurance</div>
                <div className="spec-item-value">Vitest (&gt;85% cov) · Playwright</div>
              </li>
              <li className="spec-item">
                <div className="spec-item-label">License</div>
                <div className="spec-item-value">MIT · Open Source on GitHub</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
