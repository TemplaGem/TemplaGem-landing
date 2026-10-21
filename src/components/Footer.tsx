import React from "react";
import { TemplaGemMark } from "./Icons";

export const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="container footer-inner">
      <div
        className="footer-meta"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <TemplaGemMark size={18} />
        <span>TemplaGem · Open Source MV3 Extension for Google Gemini</span>
      </div>
      <div className="footer-links">
        <a
          href="https://github.com/TemplaGem/TemplaGem"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://github.com/TemplaGem/TemplaGem/releases"
          target="_blank"
          rel="noopener noreferrer"
        >
          Releases
        </a>
        <a
          href="https://gemini.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Gemini
        </a>
      </div>
    </div>
  </footer>
);
