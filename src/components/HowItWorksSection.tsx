import React from "react";

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="page-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            From template to clean prompt in three fluid steps
          </h2>
          <p className="section-subtitle">
            TemplaGem docks directly into Gemini, ChatGPT, Claude, and DeepSeek,
            handling popover positioning, variable navigation, and bracket
            cleanup automatically.
          </p>
        </div>

        <div className="pipeline-grid">
          {/* Step 1: Focus */}
          <article className="pipeline-step">
            <div>
              <div className="step-header">
                <span className="step-number">01 / Focus</span>
                <kbd>Click</kbd>
              </div>
              <h3 className="step-title" style={{ marginTop: "14px" }}>
                Instant overlay docked to your AI input
              </h3>
              <p className="step-desc">
                As soon as you focus the chat input in Gemini, ChatGPT, Claude,
                or DeepSeek, a lightweight popover docks above it with instant
                fuzzy search and tags.
              </p>
            </div>
            <div
              className="step-code-preview mono"
              style={{ borderRadius: "14px" }}
            >
              <div
                style={{
                  color: "var(--accent-blue)",
                  fontSize: "0.75rem",
                  marginBottom: "4px"
                }}
              >
                #study &nbsp; #coding &nbsp; #email
              </div>
              <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                ▸ Code Review &amp; Refactor
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                &nbsp;&nbsp;Executive Email Draft
              </div>
            </div>
          </article>

          {/* Step 2: Fill */}
          <article className="pipeline-step">
            <div>
              <div className="step-header">
                <span className="step-number">02 / Fill</span>
                <kbd>Tab</kbd>
              </div>
              <h3 className="step-title" style={{ marginTop: "14px" }}>
                Highlighted variables &amp; Tab jumping
              </h3>
              <p className="step-desc">
                Every double-brace token becomes an interactive glass pill. Start
                typing to replace its value immediately, and hit Tab to cycle to
                the next variable.
              </p>
            </div>
            <div
              className="step-code-preview"
              style={{ borderRadius: "14px", lineHeight: "1.8" }}
            >
              <span>Review code for </span>
              <span className="ph-template-variable ph-template-variable-active">
                <span style={{ fontSize: "0.7em", opacity: 0.8 }}>⇥</span>{" "}
                {"{{language}}"}
              </span>{" "}
              <span>focusing on </span>
              <span className="ph-template-variable">{"{{benchmark}}"}</span>
            </div>
          </article>

          {/* Step 3: Send */}
          <article className="pipeline-step">
            <div>
              <div className="step-header">
                <span className="step-number">03 / Send</span>
                <kbd>Enter</kbd>
              </div>
              <h3 className="step-title" style={{ marginTop: "14px" }}>
                Automatic bracket stripping on send
              </h3>
              <p className="step-desc">
                Even if you leave a default variable untouched, pressing Enter or
                clicking the platform's send button automatically strips all
                {" {{ }}"} braces for a spotless prompt.
              </p>
            </div>
            <div
              className="step-code-preview mono"
              style={{
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <span
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "line-through"
                }}
              >
                {"{{TypeScript}}"}
              </span>
              <span style={{ color: "var(--accent-blue)", fontWeight: 600 }}>
                →
              </span>
              <span style={{ color: "var(--icon-green-fg)", fontWeight: 600 }}>
                TypeScript ✓
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
