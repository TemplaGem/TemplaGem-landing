import React from "react";
import {
  ChatGPTMark,
  ClaudeMark,
  CloudSyncMark,
  DeepSeekMark,
  GeminiMark
} from "./Icons";

export const PlatformsSection: React.FC = () => {
  return (
    <section className="page-section" id="platforms">
      <div className="container">
        <div className="section-header">
          <div className="bento-card-badge" style={{ marginBottom: "14px" }}>
            <span>🌐</span>
            <span>Universal AI Ecosystem</span>
          </div>
          <h2 className="section-title">
            One prompt library across all leading AI chats
          </h2>
          <p className="section-subtitle">
            TemplaGem integrates directly into Google Gemini, ChatGPT, Claude,
            and DeepSeek — powered by self-healing input discovery and
            offline-first storage.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="bento-grid">
          {/* Card 1: Multi-Platform AI Support (Span 7) */}
          <div className="bento-card bento-span-7">
            <div>
              <div
                className="bento-card-badge"
                style={{ color: "var(--accent-blue)" }}
              >
                <span>✦</span>
                <span>Native Adapters</span>
              </div>
              <h3 className="bento-title">
                Zero friction across Gemini, ChatGPT, Claude &amp; DeepSeek
              </h3>
              <p className="bento-text">
                Dedicated input adapters hook into each platform's distinct
                editor technology (Quill rich-text, ProseMirror contenteditable,
                or native textareas) while adapting the overlay styling to
                match each brand's aesthetic.
              </p>
            </div>

            {/* Platform Badges Row */}
            <div className="platform-badges-grid">
              <div
                className="platform-badge-item"
                style={{ borderColor: "rgba(11, 87, 208, 0.4)" }}
              >
                <span
                  className="platform-logo"
                  style={{
                    backgroundColor: "rgba(11, 87, 208, 0.12)",
                    color: "#0b57d0"
                  }}
                >
                  <GeminiMark size={18} />
                </span>
                <div className="platform-badge-info">
                  <div className="platform-badge-name">Google Gemini</div>
                  <div className="platform-badge-sub mono">
                    Quill Editor · #0b57d0
                  </div>
                </div>
                <span
                  className="platform-status-dot"
                  style={{ backgroundColor: "#0b57d0" }}
                />
              </div>

              <div
                className="platform-badge-item"
                style={{ borderColor: "rgba(16, 163, 127, 0.4)" }}
              >
                <span
                  className="platform-logo"
                  style={{
                    backgroundColor: "rgba(16, 163, 127, 0.12)",
                    color: "#10a37f"
                  }}
                >
                  <ChatGPTMark size={18} />
                </span>
                <div className="platform-badge-info">
                  <div className="platform-badge-name">ChatGPT</div>
                  <div className="platform-badge-sub mono">
                    ProseMirror · #10a37f
                  </div>
                </div>
                <span
                  className="platform-status-dot"
                  style={{ backgroundColor: "#10a37f" }}
                />
              </div>

              <div
                className="platform-badge-item"
                style={{ borderColor: "rgba(217, 119, 87, 0.4)" }}
              >
                <span
                  className="platform-logo"
                  style={{
                    backgroundColor: "rgba(217, 119, 87, 0.12)",
                    color: "#d97757"
                  }}
                >
                  <ClaudeMark size={18} />
                </span>
                <div className="platform-badge-info">
                  <div className="platform-badge-name">Anthropic Claude</div>
                  <div className="platform-badge-sub mono">
                    ProseMirror · #d97757
                  </div>
                </div>
                <span
                  className="platform-status-dot"
                  style={{ backgroundColor: "#d97757" }}
                />
              </div>

              <div
                className="platform-badge-item"
                style={{ borderColor: "rgba(77, 107, 254, 0.4)" }}
              >
                <span
                  className="platform-logo"
                  style={{
                    backgroundColor: "rgba(77, 107, 254, 0.12)",
                    color: "#4d6bfe"
                  }}
                >
                  <DeepSeekMark size={18} />
                </span>
                <div className="platform-badge-info">
                  <div className="platform-badge-name">DeepSeek Chat</div>
                  <div className="platform-badge-sub mono">
                    Textarea · #4d6bfe
                  </div>
                </div>
                <span
                  className="platform-status-dot"
                  style={{ backgroundColor: "#4d6bfe" }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Autonomous Discovery & Drift Resilience (Span 5) */}
          <div className="bento-card bento-span-5">
            <div>
              <div
                className="bento-card-badge"
                style={{ color: "var(--icon-purple-fg)" }}
              >
                <span>🎯</span>
                <span>Self-Healing Engine</span>
              </div>
              <h3 className="bento-title">
                Autonomous 3-Tier Input Discovery
              </h3>
              <p className="bento-text">
                When AI platforms update their layout or obfuscate CSS classes
                into hashed selectors, TemplaGem doesn't break. An autonomous
                scoring algorithm analyzes DOM geometry and accessibility to
                dock reliably.
              </p>
            </div>

            <div className="discovery-pipeline-box mono">
              <div className="discovery-step">
                <span className="step-tag">Tier 1</span>
                <span>Manifest Selectors (Fast Path)</span>
              </div>
              <div className="discovery-arrow">↓</div>
              <div className="discovery-step active">
                <span className="step-tag">Tier 2</span>
                <span>Heuristic Geometry &amp; A11y Scoring</span>
              </div>
              <div className="discovery-arrow">↓</div>
              <div className="discovery-step">
                <span className="step-tag">Tier 3</span>
                <span>Focusin Capture Fallback</span>
              </div>
            </div>
          </div>

          {/* Card 3: Offline-First & 2-Way Cloud Sync (Span 6) */}
          <div className="bento-card bento-span-6">
            <div>
              <div
                className="bento-card-badge"
                style={{ color: "var(--icon-green-fg)" }}
              >
                <span>☁️</span>
                <span>Hybrid Storage</span>
              </div>
              <h3 className="bento-title">
                Offline-First IndexedDB &amp; Bi-Directional Cloud Sync
              </h3>
              <p className="bento-text">
                Enjoy sub-millisecond local queries from browser IndexedDB.
                Prompts work completely offline. When connected, an automatic
                mutation queue reconciles changes with the cloud backend using
                Last-Write-Wins (LWW) conflict resolution.
              </p>
            </div>

            <div className="sync-visual-card">
              <div className="sync-node">
                <div className="sync-node-icon">💾</div>
                <div className="sync-node-label">IndexedDB</div>
                <div className="sync-node-desc mono">0ms Local Cache</div>
              </div>
              <div className="sync-flow-arrows">
                <CloudSyncMark size={20} />
                <span className="sync-flow-badge mono">
                  Auto Queue &amp; Sync
                </span>
              </div>
              <div className="sync-node">
                <div className="sync-node-icon">☁️</div>
                <div className="sync-node-label">Cloud API</div>
                <div className="sync-node-desc mono">Express + MongoDB</div>
              </div>
            </div>
          </div>

          {/* Card 4: Dynamic Manifest & Caret Control (Span 6) */}
          <div className="bento-card bento-span-6">
            <div>
              <div
                className="bento-card-badge"
                style={{ color: "var(--icon-amber-fg)" }}
              >
                <span>⚡️</span>
                <span>Zero Downtime</span>
              </div>
              <h3 className="bento-title">
                Dynamic Remote Manifest &amp; Visual Caret Flow
              </h3>
              <p className="bento-text">
                Platform rules and selectors update remotely via TTL-cached
                manifest — no waiting days for Chrome Web Store reviews.
                Meanwhile, double-brace tokens become interactive glass pills
                with automatic cursor positioning and Tab navigation.
              </p>
            </div>

            <div className="manifest-pills-row">
              <div className="manifest-pill">
                <span
                  className="mono"
                  style={{ color: "var(--accent-blue)", fontWeight: 700 }}
                >
                  TTL 60m
                </span>
                <span>Remote Manifest Cache (Zero-Downtime Updates)</span>
              </div>
              <div className="manifest-pill">
                <span
                  className="mono"
                  style={{ color: "var(--icon-green-fg)", fontWeight: 700 }}
                >
                  Tab ⇥
                </span>
                <span>Automatic Caret Jump to First Variable</span>
              </div>
              <div className="manifest-pill">
                <span
                  className="mono"
                  style={{ color: "var(--icon-amber-fg)", fontWeight: 700 }}
                >
                  Auto-Strip
                </span>
                <span>Strip {"{{ }}"} Brackets on Prompt Submit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

