import React, { useState } from "react";
import type { ThemeMode } from "../types";
import { TemplaGemMark } from "./Icons";
import type { LegalTab } from "./LegalPage";

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  isLegalView?: boolean;
  onNavigateHome?: (sectionHash?: string) => void;
  onOpenLegal?: (tab?: LegalTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  isLegalView = false,
  onNavigateHome,
  onOpenLegal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobile = () => setMobileMenuOpen(false);

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionHash: string
  ) => {
    if (isLegalView && onNavigateHome) {
      e.preventDefault();
      onNavigateHome(sectionHash);
    }
    closeMobile();
  };

  const handleLegalClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: LegalTab = "all"
  ) => {
    if (onOpenLegal) {
      e.preventDefault();
      onOpenLegal(tab);
    }
    closeMobile();
  };

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <a
            href="#"
            className="brand-link"
            aria-label="TemplaGem Home"
            onClick={(e) => handleSectionClick(e, "#")}
          >
            <span className="brand-mark" aria-hidden="true">
              <TemplaGemMark size={22} />
            </span>
            <span>TemplaGem</span>
            <span className="brand-version">MV3</span>
          </a>

          <nav aria-label="Primary navigation">
            <ul className="nav-links">
              <li>
                <a
                  href="#interactive-demo"
                  onClick={(e) => handleSectionClick(e, "#interactive-demo")}
                >
                  Demo
                </a>
              </li>
              <li>
                <a
                  href="#platforms"
                  onClick={(e) => handleSectionClick(e, "#platforms")}
                >
                  Platforms
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleSectionClick(e, "#how-it-works")}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#capabilities"
                  onClick={(e) => handleSectionClick(e, "#capabilities")}
                >
                  Capabilities
                </a>
              </li>
              <li>
                <a
                  href="#install"
                  onClick={(e) => handleSectionClick(e, "#install")}
                >
                  Installation
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className={isLegalView ? "nav-link-active" : ""}
                  onClick={(e) => handleLegalClick(e, "all")}
                >
                  Privacy &amp; Terms
                </a>
              </li>
            </ul>
          </nav>

          <div className="nav-controls">
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

            {/* Install CTA in Nav */}
            <a
              href="#install"
              className="btn-primary btn-sm nav-install-btn"
              onClick={(e) => handleSectionClick(e, "#install")}
            >
              Install Free
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className="mobile-nav-toggle"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Glass Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <ul className="mobile-nav-links">
            <li>
              <a
                href="#interactive-demo"
                className="mobile-nav-link"
                onClick={(e) => handleSectionClick(e, "#interactive-demo")}
              >
                <span>Interactive Demo</span>
                <span style={{ opacity: 0.6 }}>›</span>
              </a>
            </li>
            <li>
              <a
                href="#platforms"
                className="mobile-nav-link"
                onClick={(e) => handleSectionClick(e, "#platforms")}
              >
                <span>Supported Platforms</span>
                <span style={{ opacity: 0.6 }}>›</span>
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="mobile-nav-link"
                onClick={(e) => handleSectionClick(e, "#how-it-works")}
              >
                <span>How It Works</span>
                <span style={{ opacity: 0.6 }}>›</span>
              </a>
            </li>
            <li>
              <a
                href="#capabilities"
                className="mobile-nav-link"
                onClick={(e) => handleSectionClick(e, "#capabilities")}
              >
                <span>Capabilities</span>
                <span style={{ opacity: 0.6 }}>›</span>
              </a>
            </li>
            <li>
              <a
                href="#install"
                className="mobile-nav-link"
                onClick={(e) => handleSectionClick(e, "#install")}
              >
                <span>Installation</span>
                <span style={{ opacity: 0.6 }}>›</span>
              </a>
            </li>
            <li>
              <a
                href="#privacy"
                className="mobile-nav-link"
                onClick={(e) => handleLegalClick(e, "all")}
              >
                <span>Privacy Policy &amp; Terms</span>
                <span style={{ opacity: 0.6 }}>›</span>
              </a>
            </li>
            <li
              style={{
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "12px",
                marginTop: "6px"
              }}
            >
              <a
                href="#install"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={(e) => handleSectionClick(e, "#install")}
              >
                Install for Chrome
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
