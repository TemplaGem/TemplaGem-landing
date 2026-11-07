import React from "react";
import { ChromeWebStoreMark } from "./Icons";
import { CHROME_STORE_URL } from "../data/constants";

export const InstallSection: React.FC = () => {
  return (
    <section className="page-section" id="install">
      <div className="container">
        <div className="section-header">
          <div className="bento-card-badge" style={{ marginBottom: "14px" }}>
            <span>⚡️</span>
            <span>Official Release</span>
          </div>
          <h2 className="section-title">Install directly from Chrome Web Store</h2>
          <p className="section-subtitle">
            TemplaGem is fully verified and available on the Chrome Web Store.
            One click to install on Google Chrome, Brave, Arc, Microsoft Edge, and any Chromium-based browser.
          </p>
        </div>

        <div className="install-store-banner">
          <div className="install-store-content">
            <div className="install-store-badge">
              <span className="install-store-dot" />
              <span>Available now · Chrome Web Store</span>
            </div>

            <h3 className="install-store-title">
              Ready to supercharge your prompt workflow?
            </h3>
            <p className="install-store-desc">
              Automatic injection into Gemini, ChatGPT, Claude, and DeepSeek.
              No complex setup, no developer mode or zip archives required.
            </p>

            <div className="install-store-actions">
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="chrome-store-cta"
              >
                <div className="chrome-store-cta-icon">
                  <ChromeWebStoreMark size={22} />
                </div>
                <div className="chrome-store-cta-text">
                  <span className="chrome-store-cta-sub">Available in the</span>
                  <span className="chrome-store-cta-main">Chrome Web Store</span>
                </div>
                <svg
                  className="chrome-store-cta-arrow"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <div className="install-store-meta">
                <span className="install-meta-pill">✓ 1-Click Install</span>
                <span className="install-meta-pill">✓ Automatic Updates</span>
                <span className="install-meta-pill">✓ 100% Free &amp; Private</span>
              </div>
            </div>
          </div>

          <div className="install-store-perks">
            <div className="install-perk-card">
              <div className="install-perk-num">01</div>
              <div className="install-perk-body">
                <div className="install-perk-title">Instant 1-Click Setup</div>
                <div className="install-perk-desc">
                  Click "Add to Chrome" and start using prompt templates in your favorite AI chat immediately.
                </div>
              </div>
            </div>

            <div className="install-perk-card">
              <div className="install-perk-num">02</div>
              <div className="install-perk-body">
                <div className="install-perk-title">Universal Multi-AI Support</div>
                <div className="install-perk-desc">
                  Native overlay, interactive variables, and quick insert on Gemini, ChatGPT, Claude, and DeepSeek.
                </div>
              </div>
            </div>

            <div className="install-perk-card">
              <div className="install-perk-num">03</div>
              <div className="install-perk-body">
                <div className="install-perk-title">Offline-First &amp; Cloud Sync</div>
                <div className="install-perk-desc">
                  Your prompt library lives in local IndexedDB with optional end-to-end cloud sync across devices.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
