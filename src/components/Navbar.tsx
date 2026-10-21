import React, { useState } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isEn = lang === "en";

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <a href="#" className="brand-link" aria-label="TemplaGem Home">
            <span className="brand-mark" aria-hidden="true">
              <TemplaGemMark size={22} />
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
            {/* Apple Segmented Language Switch */}
            <div
              className="segmented-lang-control"
              role="group"
              aria-label="Language selection"
            >
              <button
                type="button"
                className={`segmented-btn ${lang === "uk" ? "active" : ""}`}
                onClick={() => {
                  if (lang !== "uk") onToggleLang();
                }}
                aria-pressed={lang === "uk"}
              >
                UA
              </button>
              <button
                type="button"
                className={`segmented-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => {
                  if (lang !== "en") onToggleLang();
                }}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle */}
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

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className="mobile-nav-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>

            {/* Desktop Direct Download CTA */}
            <a
              href="https://github.com/TemplaGem/TemplaGem/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-sm"
              style={{ display: "none" }}
            >
              {isEn ? "Download .zip" : "Завантажити .zip"}
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Glass Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <ul className="mobile-nav-links">
            <li>
              <a href="#interactive-demo" className="mobile-nav-link" onClick={closeMobile}>
                <span>{isEn ? "Interactive demo" : "Інтерактивне демо"}</span>
                <span style={{ opacity: 0.6 }}>›</span>
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="mobile-nav-link" onClick={closeMobile}>
                <span>{isEn ? "How it works" : "Як це працює"}</span>
                <span style={{ opacity: 0.6 }}>›</span>
              </a>
            </li>
            <li>
              <a href="#capabilities" className="mobile-nav-link" onClick={closeMobile}>
                <span>{isEn ? "Capabilities" : "Можливості"}</span>
                <span style={{ opacity: 0.6 }}>›</span>
              </a>
            </li>
            <li>
              <a href="#install" className="mobile-nav-link" onClick={closeMobile}>
                <span>{isEn ? "Installation" : "Встановлення"}</span>
                <span style={{ opacity: 0.6 }}>›</span>
              </a>
            </li>
            <li style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "8px", marginTop: "4px" }}>
              <a
                href="https://github.com/TemplaGem/TemplaGem/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={closeMobile}
              >
                {isEn ? "Download .zip Release" : "Завантажити .zip реліз"}
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
