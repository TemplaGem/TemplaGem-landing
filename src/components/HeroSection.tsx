import React from "react";
import type { Language } from "../types";
import { SandboxSimulator } from "./SandboxSimulator";

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const isEn = lang === "en";

  return (
    <section className="hero-section" id="interactive-demo">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="status-pill">
            <span className="status-dot" aria-hidden="true" />
            <span>
              {isEn
                ? "Browser extension for Google Gemini (Chrome / Brave / Edge)"
                : "Розширення для Google Gemini (Chrome / Brave / Edge)"}
            </span>
          </div>

          <h1 className="hero-title">
            {isEn
              ? "Your variable-ready prompt library right inside Gemini's input"
              : "Ваша бібліотека промптів зі змінними прямо в полі вводу Gemini"}
          </h1>

          <p className="hero-description">
            {isEn
              ? "Stop copying prompts from scattered notes. Click into Gemini's chat box, pick a template, fill highlighted {{variables}} with Tab, and send a clean prompt on Enter."
              : "Більше ніякого копіювання з нотаток. Клікніть у поле чату Gemini, оберіть шаблон, заповніть підсвічені {{змінні}} клавішею Tab і надішліть чистий запит одним натисканням Enter."}
          </p>

          <div className="hero-actions">
            <a href="#install" className="btn-primary">
              {isEn ? "Install extension" : "Встановити розширення"}
            </a>

            <a
              href="https://github.com/TemplaGem/TemplaGem"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0.3C5.37 0.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 22.1 24 17.6 24 12.3 24 5.67 18.63 0.3 12 0.3z" />
              </svg>
              <span>{isEn ? "Source on GitHub" : "Вихідний код на GitHub"}</span>
            </a>
          </div>

          <div className="shortcut-strip" aria-label="Keyboard shortcuts">
            <div className="shortcut-strip-title">
              {isEn
                ? "Keyboard-first control inside Gemini chat:"
                : "Керування з клавіатури прямо в чаті Gemini:"}
            </div>
            <div className="shortcut-items">
              <div className="shortcut-item">
                <kbd>↑</kbd>
                <kbd>↓</kbd>
                <span>{isEn ? "select template" : "вибір шаблону"}</span>
              </div>
              <div className="shortcut-item">
                <kbd>Tab</kbd>
                <span>{isEn ? "next {{variable}}" : "наступна {{змінна}}"}</span>
              </div>
              <div className="shortcut-item">
                <kbd>Enter</kbd>
                <span>
                  {isEn ? "send without brackets" : "відправка без дужок"}
                </span>
              </div>
              <div className="shortcut-item">
                <kbd>Esc</kbd>
                <span>{isEn ? "dismiss overlay" : "сховати меню"}</span>
              </div>
            </div>
          </div>
        </div>

        <SandboxSimulator lang={lang} />
      </div>
    </section>
  );
};
