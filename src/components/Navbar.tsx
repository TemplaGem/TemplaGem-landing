import React from "react";
import type { Language, ThemeMode } from "../types";
import { TemplaGemMark } from "./Icons";

interface NavbarProps {
  lang: Language;
  theme: ThemeMode;
  onToggleLang: () => void;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  theme,
  onToggleLang,
  onToggleTheme
}) => {
  const isEn = lang === "en";
  const activeCode = isEn ? "EN" : "UA";
  const unselectedCode = isEn ? "UA" : "EN";

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a href="#" className="brand-link" aria-label="TemplaGem Home">
          <span className="brand-mark" aria-hidden="true">
            <TemplaGemMark size={24} />
          </span>
          <span>TemplaGem</span>
          <span className="brand-version">MV3</span>
        </a>

        <nav aria-label="Primary navigation">
          <ul className="nav-links">
            <li>
              <a href="#interactive-demo">
                {isEn ? "Interactive demo" : "Інтерактивне демо"}
              </a>
            </li>
            <li>
              <a href="#how-it-works">
                {isEn ? "How it works" : "Як це працює"}
              </a>
            </li>
            <li>
              <a href="#capabilities">
                {isEn ? "Capabilities" : "Можливості"}
              </a>
            </li>
            <li>
              <a href="#install">
                {isEn ? "Installation" : "Встановлення"}
              </a>
            </li>
          </ul>
        </nav>

        <div className="nav-controls">
          <button
            type="button"
            id="lang-toggle"
            className="control-pill"
            aria-label="Switch language"
            onClick={onToggleLang}
          >
            <span className="lang-active-prefix">{activeCode} / </span>
            <span id="lang-unselected-label">{unselectedCode}</span>
          </button>

          <button
            type="button"
            id="theme-toggle"
            className="control-pill"
            aria-label="Toggle color theme"
            onClick={onToggleTheme}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            <span id="theme-toggle-label">
              {theme === "dark" ? "Dark" : "Light"}
            </span>
          </button>

          <a
            href="https://github.com/TemplaGem/TemplaGem/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-sm"
          >
            {isEn ? "Download .zip" : "Завантажити .zip"}
          </a>
        </div>
      </div>
    </header>
  );
};
