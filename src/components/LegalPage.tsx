import React, { useEffect, useState } from "react";
import { TemplaGemMark } from "./Icons";

export type LegalTab = "all" | "privacy" | "terms";

interface LegalPageProps {
  initialTab?: LegalTab;
  onNavigateHome: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  initialTab = "all",
  onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const showPrivacy = activeTab === "all" || activeTab === "privacy";
  const showTerms = activeTab === "all" || activeTab === "terms";

  return (
    <section className="legal-page-section" id="legal-top">
      <div className="container">
        {/* Top Breadcrumb & Back Action */}
        <div className="legal-topbar">
          <button
            type="button"
            className="btn-secondary btn-sm legal-back-btn"
            onClick={onNavigateHome}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Home</span>
          </button>

          <div className="legal-meta-pill mono">
            <span>Last Updated: November 4, 2026</span>
            <span>·</span>
            <span>Manifest V3 Compliant</span>
          </div>
        </div>

        {/* Hero Header */}
        <div className="legal-hero">
          <div className="bento-card-badge">
            <TemplaGemMark size={14} />
            <span>Transparency &amp; Data Governance</span>
          </div>
          <h1 className="legal-main-title">
            Privacy Policy &amp; Terms of Service
          </h1>
          <p className="legal-main-subtitle">
            TemplaGem is engineered with an offline-first, privacy-by-default
            architecture. Below is a complete technical breakdown of the exact
            data we process, how local and cloud storage work, and your rights
            and terms of use.
          </p>

          {/* Filter Switcher */}
          <div className="legal-tabs" role="tablist" aria-label="Document sections">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "all"}
              className={`legal-tab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Documents
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "privacy"}
              className={`legal-tab-btn ${activeTab === "privacy" ? "active" : ""}`}
              onClick={() => setActiveTab("privacy")}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "terms"}
              className={`legal-tab-btn ${activeTab === "terms" ? "active" : ""}`}
              onClick={() => setActiveTab("terms")}
            >
              Terms of Service
            </button>
          </div>
        </div>

        {/* Quick Highlights Summary Grid */}
        <div className="legal-highlights-grid">
          <div className="legal-highlight-card">
            <div className="legal-highlight-icon">🔒</div>
            <div className="legal-highlight-title">Zero Chat Harvesting</div>
            <p className="legal-highlight-text">
              We never read, log, or transmit your AI conversations, prompts
              submitted to AI chats, or model responses.
            </p>
          </div>

          <div className="legal-highlight-card">
            <div className="legal-highlight-icon">💾</div>
            <div className="legal-highlight-title">100% Local Guest Mode</div>
            <p className="legal-highlight-text">
              Use TemplaGem completely offline via browser IndexedDB without
              creating an account or sending data to any server.
            </p>
          </div>

          <div className="legal-highlight-card">
            <div className="legal-highlight-icon">🛡️</div>
            <div className="legal-highlight-title">Bcrypt &amp; JWT Security</div>
            <p className="legal-highlight-text">
              Optional cloud sync uses bcrypt (10 salt rounds) password hashing,
              HS256 JWT tokens, and strict HttpOnly cookies.
            </p>
          </div>

          <div className="legal-highlight-card">
            <div className="legal-highlight-icon">🗑️</div>
            <div className="legal-highlight-title">Instant Hard Deletion</div>
            <p className="legal-highlight-text">
              Delete your account at any time from settings to trigger an
              immediate cascading wipe of all cloud prompts and user records.
            </p>
          </div>
        </div>

        {/* ================================================================
            SECTION 1: PRIVACY POLICY
            ================================================================ */}
        {showPrivacy && (
          <div className="legal-document-block" id="privacy-policy">
            <div className="legal-doc-header">
              <span className="legal-doc-badge">Document 01</span>
              <h2 className="legal-doc-title">Privacy Policy</h2>
              <p className="legal-doc-lead">
                This Privacy Policy explains what information TemplaGem collects,
                how it is stored locally on your device and optionally in our
                cloud database, and how we comply with Chrome Web Store Developer
                Program Policies.
              </p>
            </div>

            {/* 1. Data Inventory Table */}
            <div className="legal-card">
              <h3>1. Complete Data Collection &amp; Storage Inventory</h3>
              <p>
                TemplaGem collects only the minimum functional data required to
                store, organize, and synchronize your prompt templates. We do not
                collect behavioral analytics, telemetry, or personal browsing
                history.
              </p>

              <div className="legal-table-wrap">
                <table className="legal-table">
                  <thead>
                    <tr>
                      <th>Data Category</th>
                      <th>Exact Fields / Keys</th>
                      <th>Where It Is Stored</th>
                      <th>Purpose &amp; Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Account Credentials</strong>
                        <span className="legal-badge-optional">Optional</span>
                      </td>
                      <td className="mono">
                        email, password (bcrypt hash), registeredAt, rating
                      </td>
                      <td>Cloud MongoDB (<code className="mono">UserModel</code>)</td>
                      <td>
                        Authenticates optional cloud sync across devices.
                        Plaintext passwords are never stored. Deleted
                        immediately upon account deletion.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Session &amp; Auth Tokens</strong>
                        <span className="legal-badge-optional">Optional</span>
                      </td>
                      <td className="mono">
                        accessToken (JWT), refreshToken (HttpOnly Cookie),
                        userEmail
                      </td>
                      <td>
                        <code className="mono">chrome.storage.local</code> &amp;
                        Strict HttpOnly Cookie
                      </td>
                      <td>
                        Maintains authenticated API sessions. Refresh tokens
                        expire automatically after 7 days or immediately upon
                        logout.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Prompt Templates</strong>
                        <span className="legal-badge-core">Core</span>
                      </td>
                      <td className="mono">
                        title, body, icon, tags[], access, likes, downloads,
                        clientTempId, createdAt, updatedAt, deletedAt
                      </td>
                      <td>
                        Local <code className="mono">IndexedDB</code> (always)
                        &amp; Cloud MongoDB (if signed in)
                      </td>
                      <td>
                        Stores your reusable prompt library and{" "}
                        <code className="mono">{"{{variables}}"}</code>.{" "}
                        <code className="mono">access</code> defaults to{" "}
                        <code className="mono">"private"</code>.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Offline Sync Queue</strong>
                        <span className="legal-badge-local">Local Only</span>
                      </td>
                      <td className="mono">
                        id, action (CREATE | UPDATE | DELETE), promptId,
                        payload, status, retryCount, lastServerUpdatedAt
                      </td>
                      <td>
                        Local <code className="mono">IndexedDB</code> (
                        <code className="mono">TemplaGemDB</code>)
                      </td>
                      <td>
                        Queues template changes made while offline and reconciles
                        them using Last-Write-Wins (LWW) when connectivity
                        returns.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>UI &amp; Layout Preferences</strong>
                        <span className="legal-badge-local">Local Only</span>
                      </td>
                      <td className="mono">
                        theme, templagem_sort_option, templagem_prompt_icons,
                        templagem_guest_mode, templagem_onboarding_completed
                      </td>
                      <td>
                        <code className="mono">chrome.storage.local</code> &amp;{" "}
                        <code className="mono">localStorage</code>
                      </td>
                      <td>
                        Remembers your selected theme (dark/light), sort mode,
                        custom icon mappings, and guest mode status on your
                        device.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Platform Discovery Cache</strong>
                        <span className="legal-badge-local">Local Only</span>
                      </td>
                      <td className="mono">
                        templagem_platform_manifest_v1,
                        templagem_discovery_hint_&lt;hostname&gt;
                      </td>
                      <td>
                        <code className="mono">chrome.storage.local</code> &amp;{" "}
                        <code className="mono">localStorage</code>
                      </td>
                      <td>
                        Caches remote DOM selector rules (60-minute TTL) and
                        heuristic input element hints so the overlay docks
                        reliably.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Local vs Cloud Storage */}
            <div className="legal-card">
              <h3>2. Local-First Operation vs. Optional Cloud Sync</h3>
              <ul className="legal-list">
                <li>
                  <strong>Guest / Offline-First Mode:</strong> You can use
                  TemplaGem without registering an account. In Guest Mode (
                  <code className="mono">templagem_guest_mode = "true"</code>),
                  100% of your prompt templates, tags, and settings remain
                  exclusively on your computer inside your browser&apos;s{" "}
                  <code className="mono">IndexedDB</code> (<code className="mono">TemplaGemDB</code>) and{" "}
                  <code className="mono">chrome.storage.local</code>.
                </li>
                <li>
                  <strong>Optional Cloud Synchronization:</strong> If you choose
                  to create an account and sign in, your templates are
                  synchronized with the TemplaGem API server using HTTPS.
                  Conflicts between devices are resolved deterministically via
                  timestamps (<code className="mono">clientUpdatedAt</code> and{" "}
                  <code className="mono">serverUpdatedAt</code>).
                </li>
                <li>
                  <strong>Soft-Delete Tombstones for Sync:</strong> When you
                  delete a prompt while signed in, a{" "}
                  <code className="mono">deletedAt</code> timestamp is recorded
                  to propagate the deletion across your other connected browsers
                  before removal.
                </li>
              </ul>
            </div>

            {/* 3. Browser Extension Permissions */}
            <div className="legal-card">
              <h3>3. Browser Extension Permissions &amp; Host Access</h3>
              <p>
                The TemplaGem Chrome Extension (Manifest V3) requests only the
                permissions strictly necessary to function:
              </p>
              <ul className="legal-list">
                <li>
                  <code className="mono">storage</code>: Used to store your
                  prompt library in IndexedDB, save UI preferences (theme, sort
                  order, icon assignments), and persist authentication tokens.
                </li>
                <li>
                  <code className="mono">alarms</code>: Used by the background
                  service worker (<code className="mono">templagem-periodic-sync</code>)
                  to run periodic 5-minute background synchronization of pending
                  offline mutations and refresh platform selector manifests.
                </li>
                <li>
                  <code className="mono">host_permissions ("https://*/*")</code>:
                  Required to inject the hermetically isolated Shadow DOM prompt
                  overlay and interactive{" "}
                  <code className="mono">{"{{variable}}"}</code> pills into
                  supported AI chat editors (Google Gemini, ChatGPT, Anthropic
                  Claude, and DeepSeek) and to communicate with the TemplaGem
                  backend API.
                </li>
              </ul>
            </div>

            {/* 4. What We Never Collect */}
            <div className="legal-card">
              <h3>4. What TemplaGem Never Collects</h3>
              <ul className="legal-list">
                <li>
                  <strong>No AI Chat Monitoring:</strong> TemplaGem never
                  captures, reads, stores, or transmits the prompts you submit to
                  AI platforms or the responses generated by Gemini, ChatGPT,
                  Claude, or DeepSeek. Content scripts interact with the chat
                  input box only at the moment you explicitly insert a template
                  or press <code className="mono">Tab</code> /{" "}
                  <code className="mono">Enter</code> on template variables.
                </li>
                <li>
                  <strong>No Browsing History:</strong> TemplaGem checks the
                  active hostname locally against its platform manifest and
                  immediately exits on non-supported websites. We never log or
                  transmit your web browsing activity.
                </li>
                <li>
                  <strong>No Third-Party Trackers or Data Sales:</strong> We do
                  not embed Google Analytics, Mixpanel, Sentry, or any
                  advertising SDKs. We never sell, rent, or trade user data, and
                  we never use your private templates to train AI models.
                </li>
              </ul>
            </div>

            {/* 5. Data Portability & Deletion Rights */}
            <div className="legal-card">
              <h3>5. Your Rights: Data Export, Modification &amp; Deletion</h3>
              <ul className="legal-list">
                <li>
                  <strong>Portable JSON Export:</strong> You can export your
                  entire prompt library to a standard, human-readable{" "}
                  <code className="mono">.json</code> file at any time from the
                  extension popup.
                </li>
                <li>
                  <strong>Account Credential Management:</strong> Registered
                  users can update their email address (
                  <code className="mono">PUT /api/users/email</code>) or change
                  their password (<code className="mono">PATCH /api/users/password</code>)
                  directly inside the extension settings.
                </li>
                <li>
                  <strong>Permanent Account &amp; Data Deletion:</strong> You can
                  permanently delete your account at any time via the extension
                  settings (<code className="mono">DELETE /api/users</code>).
                  This action immediately executes a cascading hard-delete in our
                  database (<code className="mono">promptModel.deleteMany</code>{" "}
                  followed by <code className="mono">userModel.deleteOne</code>),
                  permanently erasing your user profile and all associated
                  prompts, and clearing your authentication cookies.
                </li>
                <li>
                  <strong>Uninstalling the Extension:</strong> Removing the
                  TemplaGem extension from your browser automatically purges all
                  local <code className="mono">IndexedDB</code> and{" "}
                  <code className="mono">chrome.storage.local</code> data stored
                  on your machine.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ================================================================
            SECTION 2: TERMS OF SERVICE
            ================================================================ */}
        {showTerms && (
          <div className="legal-document-block" id="terms-of-service">
            <div className="legal-doc-header">
              <span className="legal-doc-badge">Document 02</span>
              <h2 className="legal-doc-title">Terms of Service</h2>
              <p className="legal-doc-lead">
                By installing, accessing, or using the TemplaGem browser
                extension, web application, or cloud synchronization API, you
                agree to be bound by these Terms of Service.
              </p>
            </div>

            {/* 1. Scope of Service */}
            <div className="legal-card">
              <h3>1. Description of Service</h3>
              <p>
                TemplaGem is a productivity browser extension and cloud-backed
                template library designed to help users create, organize, and
                insert parameterized prompt templates (using{" "}
                <code className="mono">{"{{variable}}"}</code> syntax) into
                supported third-party AI chat interfaces.
              </p>
            </div>

            {/* 2. Accounts & Guest Mode */}
            <div className="legal-card">
              <h3>2. Accounts, Guest Mode &amp; Security</h3>
              <ul className="legal-list">
                <li>
                  <strong>Guest Mode Responsibility:</strong> If you use
                  TemplaGem in local Guest Mode without a cloud account, your
                  templates are stored solely in your local browser storage. You
                  are responsible for backing up your library using the built-in
                  JSON Export tool.
                </li>
                <li>
                  <strong>Account Credentials:</strong> If you register a cloud
                  account, you must provide a valid email address and a password
                  of at least 6 characters. You are responsible for maintaining
                  the confidentiality of your account credentials and for all
                  activities that occur under your account.
                </li>
              </ul>
            </div>

            {/* 3. User Content & Ownership */}
            <div className="legal-card">
              <h3>3. User Content, Ownership &amp; Visibility</h3>
              <ul className="legal-list">
                <li>
                  <strong>You Own Your Prompts:</strong> You retain full
                  intellectual property rights and ownership over all prompt
                  templates, titles, variables, and tags you create or store in
                  TemplaGem.
                </li>
                <li>
                  <strong>Visibility Settings:</strong> By default, all created
                  prompts are set to <code className="mono">access: "private"</code>{" "}
                  and are accessible only to you. If you explicitly configure a
                  prompt&apos;s access level to <code className="mono">"public"</code>{" "}
                  or <code className="mono">"link"</code>, you grant TemplaGem a
                  non-exclusive, worldwide, royalty-free license to store,
                  display, and transmit that template as required to provide the
                  sharing functionality.
                </li>
              </ul>
            </div>

            {/* 4. Acceptable Use */}
            <div className="legal-card">
              <h3>4. Acceptable Use Policy</h3>
              <p>You agree not to misuse the TemplaGem service or API. Specifically, you must not:</p>
              <ul className="legal-list">
                <li>
                  Use automated scripts, scrapers, or denial-of-service attacks
                  against the TemplaGem synchronization API (
                  <code className="mono">/api/auth</code>,{" "}
                  <code className="mono">/api/prompts</code>,{" "}
                  <code className="mono">/api/users</code>,{" "}
                  <code className="mono">/api/v1/platforms</code>).
                </li>
                <li>
                  Attempt to bypass authentication middleware, forge JWT access
                  or refresh tokens, or access another user&apos;s private
                  prompts.
                </li>
                <li>
                  Upload malicious payloads, XSS vectors, or unlawful content
                  into shared or synced prompt templates.
                </li>
                <li>
                  Reverse-engineer, redistribute, or misrepresent the proprietary
                  TemplaGem package as your own product.
                </li>
              </ul>
            </div>

            {/* 5. Third-Party Platforms Disclaimer */}
            <div className="legal-card">
              <h3>5. Non-Affiliation with Third-Party AI Platforms</h3>
              <p>
                TemplaGem is an independent software product. TemplaGem is{" "}
                <strong>not affiliated with, endorsed by, sponsored by, or
                officially connected to</strong> Google LLC (Google Gemini),
                OpenAI OpCo, LLC (ChatGPT), Anthropic PBC (Claude), or DeepSeek.
                All third-party brand names, logos, and trademarks belong to
                their respective owners and are used solely to indicate
                platform compatibility. Your use of those AI services remains
                subject to their respective terms of service and privacy
                policies.
              </p>
            </div>

            {/* 6. Disclaimer of Warranties & Liability */}
            <div className="legal-card">
              <h3>6. Disclaimer of Warranties &amp; Limitation of Liability</h3>
              <p>
                TemplaGem is provided on an <strong>&ldquo;AS IS&rdquo;</strong>{" "}
                and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis without
                warranties of any kind, whether express or implied. While our
                3-tier heuristic Discovery Engine and remote platform manifest
                are designed to adapt to third-party DOM changes, we do not
                warrant that the extension will operate uninterrupted if a
                third-party AI platform modifies its web interface.
              </p>
              <p style={{ marginTop: "10px" }}>
                To the maximum extent permitted by applicable law, TemplaGem and
                its developers shall not be liable for any indirect, incidental,
                consequential, or special damages, including loss of data,
                prompts, or profits arising out of your use or inability to use
                the extension or cloud synchronization service.
              </p>
            </div>

            {/* 7. Termination & Updates */}
            <div className="legal-card">
              <h3>7. Termination &amp; Changes to These Terms</h3>
              <p>
                You may terminate your agreement at any time by deleting your
                cloud account in the extension settings and uninstalling the
                browser extension. We reserve the right to suspend or terminate
                accounts that violate our Acceptable Use Policy or abuse API
                infrastructure. We may update this Privacy Policy and Terms of
                Service periodically; any material updates will be reflected by
                the &ldquo;Last Updated&rdquo; date at the top of this page.
              </p>
            </div>
          </div>
        )}

        {/* Bottom CTA back to home */}
        <div className="legal-bottom-bar">
          <div>
            <strong>Have questions about your data or privacy?</strong>
            <p>
              You can inspect, export, or permanently delete all your stored data
              directly from the TemplaGem extension settings panel at any time.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={onNavigateHome}
          >
            ← Return to TemplaGem
          </button>
        </div>
      </div>
    </section>
  );
};

