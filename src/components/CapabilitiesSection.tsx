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
              ? "Engineered specifically for the Google Gemini workspace"
              : "Спроектовано спеціально під екосистему Google Gemini"}
          </h2>
          <p className="section-subtitle">
            {isEn
              ? "Zero layout shift, Trusted Types compliant DOM manipulation, and instant local caching."
              : "Жодних важких фреймворків поверх сторінки чи конфліктів із політиками безпеки браузера."}
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: 40+ Curated Icons & Categories */}
          <div className="bento-card bento-span-7">
            <div>
              <h3 className="bento-title">
                {isEn
                  ? "40+ curated icons across 5 categories and 6 sort modes"
                  : "40+ тематичних іконок у 5 категоріях та 6 режимів сортування"}
              </h3>
              <p className="bento-text">
                {isEn
                  ? "Assign color-coded Lucide icons across AI & Tech, Writing & Learning, Productivity, and Media, and sort templates by creation date, modification time, or title."
                  : "Призначайте кожному шаблону власну кольорову іконку (AI & Tech, Writing & Learning, Productivity, Media & Fun) та впорядковуйте список за датою створення, оновлення або алфавітом."}
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
                <span>Sparkles · AI &amp; Tech</span>
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
                <span>Writing &amp; Study</span>
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

          {/* Card 2: MV3 Service Worker + Express & MongoDB API */}
          <div className="bento-card bento-span-5">
            <div>
              <h3 className="bento-title">
                MV3 Service Worker + Express &amp; MongoDB API
              </h3>
              <p className="bento-text">
                {isEn
                  ? "Because MV3 Service Workers are event-driven, tokens, theme, and prompt cache persist in chrome.storage.local while syncing with the Express + MongoDB REST API via chrome.runtime.sendMessage."
                  : "Оскільки Service Worker у Manifest V3 вивантажується з пам'яті, токени, тема та кеш промптів зберігаються в chrome.storage.local, а фонова синхронізація з бекендом (Express + MongoDB) працює через асинхронний chrome.runtime.sendMessage."}
              </p>
            </div>

            <div className="step-code-preview mono">
              CSUI → chrome.runtime.sendMessage → SW ↔ Express + MongoDB
            </div>
          </div>

          {/* Card 3: Shadow DOM vs Light DOM & Trusted Types */}
          <div className="bento-card bento-span-6">
            <div>
              <h3 className="bento-title">
                Shadow DOM (Plasmo CSUI) + Light DOM (Quill &amp; Trusted Types)
              </h3>
              <p className="bento-text">
                {isEn
                  ? "The overlay UI is hermetically isolated inside Shadow DOM. To style variable badges inside Gemini's Light DOM (.ql-editor / rich-textarea), TemplateHighlighter uses Trusted-Types-safe TreeWalker & Range APIs plus inline attributes recognized by Quill's Parchment Blots."
                  : "Інтерфейс оверлею герметично ізольований у Shadow DOM від стилів Gemini. А для підсвічування бейджів у полі вводу (.ql-editor / rich-textarea в Light DOM) TemplateHighlighter поєднує TreeWalker, Range API (сумісні з Trusted Types) та inline-атрибути під Parchment Blots редактора Quill."}
              </p>
            </div>
          </div>

          {/* Card 4: Technical Specs */}
          <div className="bento-card bento-span-6">
            <div>
              <h3 className="bento-title">
                {isEn ? "Technical specifications" : "Технічний стек проєкту"}
              </h3>
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
                <div className="spec-item-label">Backend &amp; Storage</div>
                <div className="spec-item-value">
                  Express · MongoDB · chrome.storage
                </div>
              </li>
              <li className="spec-item">
                <div className="spec-item-label">Quality Assurance</div>
                <div className="spec-item-value">
                  Vitest (&gt;85% cov) · Playwright E2E
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
