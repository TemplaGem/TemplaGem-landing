import React, { useState } from "react";

const CopyCommandBar: React.FC<{ command: string }> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code-copy-bar mono">
      <span>{command}</span>
      <button type="button" className="copy-btn" onClick={handleCopy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
};

export const InstallSection: React.FC = () => {
  return (
    <section className="page-section" id="install">
      <div className="container">
        <div className="section-header">
          <div className="bento-card-badge" style={{ marginBottom: "14px" }}>
            <span>⚡️</span>
            <span>Quick Setup</span>
          </div>
          <h2 className="section-title">Install in under a minute</h2>
          <p className="section-subtitle">
            Add TemplaGem to Google Chrome, Brave, Microsoft Edge, Arc, or any
            Chromium-based browser.
          </p>
        </div>

        <div className="install-box">
          <div className="install-steps">
            <div className="install-card">
              <div
                className="step-number"
                style={{ alignSelf: "flex-start" }}
              >
                Step 1
              </div>
              <h3 className="install-card-title">
                Download the package
              </h3>
              <p className="install-card-text">
                Download the pre-packaged <code>templagem-extension.zip</code> and
                extract it to a folder on your computer.
              </p>
              <a
                href="#download"
                className="btn-primary btn-sm"
                style={{ alignSelf: "flex-start", marginTop: "auto" }}
                onClick={(e) => {
                  e.preventDefault();
                  alert("Extension package will download. Place your production zip in the distribution path.");
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download .zip</span>
              </a>
            </div>

            <div className="install-card">
              <div
                className="step-number"
                style={{ alignSelf: "flex-start" }}
              >
                Step 2
              </div>
              <h3 className="install-card-title">Enable Developer Mode</h3>
              <p className="install-card-text">
                Open your browser extensions manager and turn on Developer mode
                in the top-right corner.
              </p>
              <div style={{ marginTop: "auto" }}>
                <CopyCommandBar command="chrome://extensions" />
              </div>
            </div>

            <div className="install-card">
              <div
                className="step-number"
                style={{ alignSelf: "flex-start" }}
              >
                Step 3
              </div>
              <h3 className="install-card-title">Load unpacked</h3>
              <p className="install-card-text">
                Click <strong>Load unpacked</strong> and select the extracted
                folder. Open Gemini, ChatGPT, Claude or DeepSeek and enjoy!
              </p>
              <div
                className="step-code-preview mono"
                style={{
                  borderRadius: "10px",
                  fontSize: "0.75rem",
                  marginTop: "auto",
                  padding: "8px 12px",
                  textAlign: "center"
                }}
              >
                Ready in all AI chats ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
