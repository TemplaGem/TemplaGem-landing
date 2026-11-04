import React from "react";
import { TemplaGemMark } from "./Icons";
import type { LegalTab } from "./LegalPage";

interface FooterProps {
  onNavigateHome?: (sectionHash?: string) => void;
  onOpenLegal?: (tab?: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onOpenLegal
}) => {
  const handleSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome(hash);
    }
  };

  const handleLegal = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: LegalTab
  ) => {
    if (onOpenLegal) {
      e.preventDefault();
      onOpenLegal(tab);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div
          className="footer-meta"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <TemplaGemMark size={18} />
          <span>
            TemplaGem · Browser Extension for Gemini, ChatGPT, Claude &amp;
            DeepSeek
          </span>
        </div>
        <div className="footer-links">
          <a
            href="#interactive-demo"
            onClick={(e) => handleSection(e, "#interactive-demo")}
          >
            Demo
          </a>
          <a
            href="#platforms"
            onClick={(e) => handleSection(e, "#platforms")}
          >
            Platforms
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleSection(e, "#how-it-works")}
          >
            How It Works
          </a>
          <a
            href="#capabilities"
            onClick={(e) => handleSection(e, "#capabilities")}
          >
            Capabilities
          </a>
          <a
            href="#install"
            onClick={(e) => handleSection(e, "#install")}
          >
            Installation
          </a>
          <span style={{ color: "var(--border-strong)", userSelect: "none" }}>
            ·
          </span>
          <a
            href="#privacy"
            onClick={(e) => handleLegal(e, "privacy")}
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            onClick={(e) => handleLegal(e, "terms")}
          >
            Terms of Service
          </a>
          <span style={{ color: "var(--border-strong)", userSelect: "none" }}>
            ·
          </span>
          <a
            href="https://gemini.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gemini
          </a>
          <a
            href="https://chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            ChatGPT
          </a>
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claude
          </a>
          <a
            href="https://chat.deepseek.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            DeepSeek
          </a>
        </div>
      </div>
    </footer>
  );
};
