import React from "react";

export const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="container footer-inner">
      <div className="footer-meta">
        <span>TemplaGem · Built by skyzary</span>
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
