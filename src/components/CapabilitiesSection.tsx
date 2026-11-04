import React from "react";

export const CapabilitiesSection: React.FC = () => {
  return (
    <section className="page-section" id="capabilities">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Engineered for high-frequency prompt workflows
          </h2>
          <p className="section-subtitle">
            Sub-millisecond speed, private-by-default architecture, and fluid
            keyboard control tailored for daily AI productivity.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: 0ms Latency & Keyboard Flow (Span 7) */}
          <div className="bento-card bento-span-7">
            <div className="bento-card-header">
              <div className="bento-card-badge">
                <span>⚡️</span>
                <span>0ms Latency</span>
              </div>
              <h3 className="bento-title">
                Instant search &amp; fluid Tab-jumping between variables
              </h3>
              <p className="bento-text">
                Local in-memory caching delivers immediate results as you type.
                Double-brace tokens turn into interactive glass pills that you
                can replace and navigate with Tab without lifting your fingers
                from the keyboard.
              </p>
            </div>

            <div className="var-flow-box">
              <div className="var-flow-preview">
                <span className="var-flow-prompt-text">
                  Explain{" "}
                  <span className="ph-template-variable ph-template-variable-active">
                    {"{{concept}}"}
                  </span>{" "}
                  for level{" "}
                  <span className="ph-template-variable">
                    {"{{level}}"}
                  </span>{" "}
                  with{" "}
                  <span className="ph-template-variable">
                    {"{{count}}"}
                  </span>{" "}
                  real-world examples.
                </span>
              </div>
              <div className="var-flow-actions">
                <div className="var-flow-action-pill">
                  <kbd className="mono">Tab ⇥</kbd>
                  <span>Next variable</span>
                </div>
                <div className="var-flow-action-pill">
                  <kbd className="mono">Shift + Tab</kbd>
                  <span>Previous</span>
                </div>
                <div className="var-flow-action-pill">
                  <kbd className="mono">Enter ⏎</kbd>
                  <span>Strip brackets &amp; submit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Offline-First & Privacy (Span 5) */}
          <div className="bento-card bento-span-5">
            <div className="bento-card-header">
              <div className="bento-card-badge">
                <span>🔒</span>
                <span>Private &amp; Offline-First</span>
              </div>
              <h3 className="bento-title">
                Offline IndexedDB speed with optional cloud sync
              </h3>
              <p className="bento-text">
                Your personal templates reside securely inside browser IndexedDB.
                100% offline functionality with zero telemetry, plus automatic
                cloud backup &amp; multi-device sync when connected.
              </p>
            </div>

            <div className="storage-metrics-box">
              <div className="storage-metrics-grid">
                <div className="storage-metric-cell">
                  <div className="storage-metric-number mono">0ms</div>
                  <div className="storage-metric-desc">Local Latency</div>
                </div>
                <div className="storage-metric-cell">
                  <div className="storage-metric-number mono">100%</div>
                  <div className="storage-metric-desc">Offline First</div>
                </div>
                <div className="storage-metric-cell">
                  <div className="storage-metric-number mono">0 B</div>
                  <div className="storage-metric-desc">Telemetry</div>
                </div>
              </div>

              <div className="storage-flow-status mono">
                <span>IndexedDB Cache</span>
                <span className="storage-flow-sep">⇄</span>
                <span>Mutation Queue</span>
                <span className="storage-flow-sep">⇄</span>
                <span>Cloud API</span>
              </div>
            </div>
          </div>

          {/* Card 3: Curated Icons, Categories & Sort (Span 6) */}
          <div className="bento-card bento-span-6">
            <div className="bento-card-header">
              <div className="bento-card-badge">
                <span>✦</span>
                <span>Smart Organization</span>
              </div>
              <h3 className="bento-title">
                Curated icons across 5 categories and 5 sort modes
              </h3>
              <p className="bento-text">
                Assign color-coded icons across AI &amp; Tech, Writing,
                Productivity, and Development. Filter your entire library by
                custom #tags with a single click.
              </p>
            </div>

            <div className="org-showcase-box">
              {/* Category Pills Header */}
              <div className="org-category-pills">
                <span className="org-cat-chip active">All</span>
                <span className="org-cat-chip">AI &amp; Tech</span>
                <span className="org-cat-chip">Code · Dev</span>
                <span className="org-cat-chip">Writing</span>
                <span className="org-cat-chip">Productivity</span>
              </div>

              {/* Curated Icons Palette Matrix */}
              <div className="org-icons-matrix">
                <div className="org-icon-badge">
                  <span className="prompt-icon-box" data-color="blue">✦</span>
                  <span className="org-icon-name">Sparkles</span>
                </div>
                <div className="org-icon-badge">
                  <span className="prompt-icon-box" data-color="purple">&lt;/&gt;</span>
                  <span className="org-icon-name">Code</span>
                </div>
                <div className="org-icon-badge">
                  <span className="prompt-icon-box" data-color="green">✎</span>
                  <span className="org-icon-name">Writing</span>
                </div>
                <div className="org-icon-badge">
                  <span className="prompt-icon-box" data-color="amber">⚡</span>
                  <span className="org-icon-name">Zap</span>
                </div>
                <div className="org-icon-badge">
                  <span className="prompt-icon-box" data-color="blue">🤖</span>
                  <span className="org-icon-name">AI Bot</span>
                </div>
                <div className="org-icon-badge">
                  <span className="prompt-icon-box" data-color="purple">🧠</span>
                  <span className="org-icon-name">Logic</span>
                </div>
                <div className="org-icon-badge">
                  <span className="prompt-icon-box" data-color="green">📖</span>
                  <span className="org-icon-name">Notes</span>
                </div>
                <div className="org-icon-badge">
                  <span className="prompt-icon-box" data-color="amber">⏱</span>
                  <span className="org-icon-name">Timer</span>
                </div>
              </div>

              {/* Sort Modes & Quick Tags Footer */}
              <div className="org-sort-tags-footer">
                <div className="org-sort-pill">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="14" y2="12" />
                    <line x1="4" y1="18" x2="8" y2="18" />
                  </svg>
                  <span>Sort: Newest first ▾ (5 modes)</span>
                </div>
                <div className="org-quick-tags">
                  <span className="mini-tag">#coding</span>
                  <span className="mini-tag">#study</span>
                  <span className="mini-tag">#work</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Architecture Specs (Span 6) */}
          <div className="bento-card bento-span-6">
            <div className="bento-card-header">
              <div className="bento-card-badge">
                <span>⚙️</span>
                <span>Hermetic Architecture</span>
              </div>
              <h3 className="bento-title">
                Multi-Platform Plasmo MV3 &amp; Discovery Engine
              </h3>
              <p className="bento-text">
                Hermetically isolated Shadow DOM overlays with safe Light DOM
                injection across Gemini, ChatGPT, Claude, and DeepSeek.
              </p>
            </div>

            <ul className="spec-list">
              <li className="spec-item">
                <div className="spec-item-label">AI Platform Adapters</div>
                <div className="spec-item-value">
                  Gemini · ChatGPT · Claude · DeepSeek
                </div>
              </li>
              <li className="spec-item">
                <div className="spec-item-label">Discovery &amp; Manifest</div>
                <div className="spec-item-value">
                  Heuristic DOM Engine · Dynamic TTL Manifest
                </div>
              </li>
              <li className="spec-item">
                <div className="spec-item-label">Storage &amp; Sync</div>
                <div className="spec-item-value">
                  IndexedDB · TanStack Query v5 · Express + Mongo
                </div>
              </li>
              <li className="spec-item">
                <div className="spec-item-label">Security &amp; Sandboxing</div>
                <div className="spec-item-value">
                  Hermetic Shadow DOM · Trusted Types API
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
