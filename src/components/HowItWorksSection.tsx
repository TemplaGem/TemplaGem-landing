import React from "react";
import type { Language } from "../types";

interface HowItWorksSectionProps {
  lang: Language;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ lang }) => {
  const isEn = lang === "en";

  return (
    <section className="page-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {isEn
              ? "From template to clean prompt in three steps"
              : "Від шаблону до готового запиту за три дії"}
          </h2>
          <p className="section-subtitle">
            {isEn
              ? "TemplaGem hooks directly into the Quill editor on gemini.google.com and handles variable highlighting and cleanup automatically."
              : "TemplaGem вбудовується безпосередньо в Quill-редактор сторінки gemini.google.com і бере на себе всю рутину з форматуванням."}
          </p>
        </div>

        <div className="pipeline-grid">
          <article className="pipeline-step">
            <div>
              <div className="step-header">
                <span className="step-number">01 / Focus</span>
                <kbd>Click</kbd>
              </div>
              <h3 className="step-title" style={{ marginTop: "14px" }}>
                {isEn
                  ? "Instant overlay docked to Gemini's input"
                  : "Миттєвий доступ біля поля вводу"}
              </h3>
              <p className="step-desc">
                {isEn
                  ? "As soon as you focus Gemini's chat input, a lightweight popover docks above it with instant search and tag filtering."
                  : "Щойно ви ставите курсор у поле чату Gemini, над ним з'являється легке вікно зі списком ваших шаблонів, пошуком та фільтрацією за тегами."}
              </p>
            </div>
            <div className="step-code-preview mono">
              #навчання &nbsp; #код &nbsp; #email
              <br />
              ▸ Конспект матеріалу
              <br />
              &nbsp;&nbsp;Code Review &amp; Refactor
            </div>
          </article>

          <article className="pipeline-step">
            <div>
              <div className="step-header">
                <span className="step-number">02 / Fill</span>
                <kbd>Tab</kbd>
              </div>
              <h3 className="step-title" style={{ marginTop: "14px" }}>
                {isEn
                  ? "Highlighted {{variables}} & Tab jumping"
                  : "Підсвічування {{змінних}} та навігація"}
              </h3>
              <p className="step-desc">
                {isEn
                  ? "Every double-brace token becomes an interactive pill. Start typing to replace its value immediately, and press Tab to jump to the next variable."
                  : "Кожен параметр у подвійних фігурних дужках перетворюється на інтерактивний токен. Почніть друкувати, щоб замінити значення, і натискайте Tab для переходу далі."}
              </p>
            </div>
            <div className="step-code-preview">
              Зроби конспект за темою:{" "}
              <span className="ph-template-variable ph-template-variable-active">
                {"{{тема}}"}
              </span>{" "}
              для рівня{" "}
              <span className="ph-template-variable">{"{{рівень}}"}</span>
            </div>
          </article>

          <article className="pipeline-step">
            <div>
              <div className="step-header">
                <span className="step-number">03 / Send</span>
                <kbd>Enter</kbd>
              </div>
              <h3 className="step-title" style={{ marginTop: "14px" }}>
                {isEn
                  ? "Automatic bracket stripping on send"
                  : "Автоматичне очищення дужок при відправці"}
              </h3>
              <p className="step-desc">
                {isEn
                  ? "Even if you leave a default variable untouched, pressing Enter or clicking Gemini's send button automatically strips all {{ }} braces."
                  : "Навіть якщо ви залишили якусь змінну за замовчуванням, під час натискання Enter або кнопки відправки розширення прибере службові дужки {{ }}."}
              </p>
            </div>
            <div className="step-code-preview mono">
              <span
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "line-through"
                }}
              >
                {"{{TypeScript}}"}
              </span>{" "}
              → <span style={{ color: "var(--icon-green-fg)" }}>TypeScript</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
