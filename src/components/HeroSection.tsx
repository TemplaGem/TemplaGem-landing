import React from "react";
import { ChatGPTMark, ClaudeMark, DeepSeekMark, GeminiMark } from "./Icons";
import { SandboxSimulator } from "./SandboxSimulator";
import { CHROME_STORE_URL } from "../data/constants";

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-section" id="interactive-demo">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="status-pill">
            <span className="status-dot" aria-hidden="true" />
            <span>Now on Chrome Web Store · MV3 Verified</span>
          </div>

          <h1 className="hero-title">
            Your variable-ready prompt library right inside every AI chat
          </h1>

          <p className="hero-description">
            Stop copying prompts from scattered notes. Click into Gemini,
            ChatGPT, Claude, or DeepSeek, pick a template, fill dynamic{" "}
            <code>{"{{variables}}"}</code> with Tab, and send cleanly with
            offline-first speed.
          </p>

          <div className="hero-actions">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary apple-cta"
            >
              <span>Add to Chrome — It's Free</span>
              <svg
                className="cta-arrow"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>

            <a href="#platforms" className="btn-secondary">
              <span>Explore Platforms</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>

          {/* Supported Platforms Strip */}
          <div className="hero-platforms-strip">
            <span className="hero-platforms-label">Works natively with</span>
            <div className="hero-platforms-list">
              <a href="#platforms" className="hero-platform-tag" title="Google Gemini">
                <span className="platform-tag-icon" style={{ color: "#0b57d0" }}>
                  <GeminiMark size={14} />
                </span>
                <span>Gemini</span>
              </a>
              <a href="#platforms" className="hero-platform-tag" title="ChatGPT">
                <span className="platform-tag-icon" style={{ color: "#10a37f" }}>
                  <ChatGPTMark size={14} />
                </span>
                <span>ChatGPT</span>
              </a>
              <a href="#platforms" className="hero-platform-tag" title="Anthropic Claude">
                <span className="platform-tag-icon" style={{ color: "#d97757" }}>
                  <ClaudeMark size={14} />
                </span>
                <span>Claude</span>
              </a>
              <a href="#platforms" className="hero-platform-tag" title="DeepSeek Chat">
                <span className="platform-tag-icon" style={{ color: "#4d6bfe" }}>
                  <DeepSeekMark size={14} />
                </span>
                <span>DeepSeek</span>
              </a>
            </div>
          </div>
        </div>

        <SandboxSimulator />
      </div>
    </section>
  );
};
