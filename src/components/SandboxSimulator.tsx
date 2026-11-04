import React, { useEffect, useMemo, useRef, useState } from "react";
import { INITIAL_PROMPTS } from "../data/prompts";
import type { PromptItem, SandboxTab, SortOption } from "../types";
import {
  ChatGPTMark,
  ClaudeMark,
  DeepSeekMark,
  GeminiMark,
  PromptIcon,
  TemplaGemMark
} from "./Icons";

export type SimulatedPlatform = "gemini" | "chatgpt" | "claude" | "deepseek";

const PLATFORM_CONFIG: Record<
  SimulatedPlatform,
  {
    name: string;
    url: string;
    color: string;
    placeholder: string;
  }
> = {
  gemini: {
    name: "Google Gemini",
    url: "gemini.google.com/app",
    color: "#0b57d0",
    placeholder: "Ask Gemini or pick a template above..."
  },
  chatgpt: {
    name: "ChatGPT",
    url: "chatgpt.com",
    color: "#10a37f",
    placeholder: "Message ChatGPT or pick a template..."
  },
  claude: {
    name: "Claude",
    url: "claude.ai/new",
    color: "#d97757",
    placeholder: "How can Claude help you today? Pick a template..."
  },
  deepseek: {
    name: "DeepSeek",
    url: "chat.deepseek.com",
    color: "#4d6bfe",
    placeholder: "Ask DeepSeek anything or pick a template..."
  }
};

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripBrackets(text: string): string {
  return text.replace(/\{\{([^{}\n]+)\}\}/g, "$1");
}

function filterAndSortPrompts(
  prompts: PromptItem[],
  query: string,
  tag: string,
  sort: SortOption
): PromptItem[] {
  const q = query.trim().toLowerCase();
  const filtered = prompts.filter((item) => {
    const matchesTag = !tag || tag === "all" || item.tags.includes(tag);
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.text.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    return matchesTag && matchesQuery;
  });

  const sorted = [...filtered];
  sorted.sort((a, b) => {
    switch (sort) {
      case "created-asc":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "updated-desc":
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case "created-desc":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  return sorted;
}

export const SandboxSimulator: React.FC = React.memo(() => {
  const [platform, setPlatform] = useState<SimulatedPlatform>("gemini");
  const [sandboxMode, setSandboxMode] = useState<SandboxTab>("overlay");
  const [popoverOpen, setPopoverOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [popupQuery, setPopupQuery] = useState<string>("");
  const [popupTag, setPopupTag] = useState<string>("all");
  const [sortOption, setSortOption] = useState<SortOption>("created-desc");
  const [prompts, setPrompts] = useState<PromptItem[]>(INITIAL_PROMPTS);

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newText, setNewText] = useState<string>("");
  const [newTag, setNewTag] = useState<string>("");

  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [easterEggClicks, setEasterEggClicks] = useState<number>(0);
  const [easterEggRevealed, setEasterEggRevealed] = useState<boolean>(false);
  const [activeKeyBadge, setActiveKeyBadge] = useState<string | null>(null);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const activeVarIndexRef = useRef<number>(0);
  const keyBadgeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (keyBadgeTimerRef.current !== null) {
        window.clearTimeout(keyBadgeTimerRef.current);
      }
    };
  }, []);

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    prompts.forEach((p) => {
      p.tags.forEach((t) => tagSet.add(t));
    });
    return ["all", ...Array.from(tagSet)];
  }, [prompts]);

  const overlayList = useMemo(
    () => filterAndSortPrompts(prompts, searchQuery, activeTag, "created-desc"),
    [prompts, searchQuery, activeTag]
  );

  const popupList = useMemo(
    () => filterAndSortPrompts(prompts, popupQuery, popupTag, sortOption),
    [prompts, popupQuery, popupTag, sortOption]
  );

  const showKeyFeedback = (label: string) => {
    if (keyBadgeTimerRef.current !== null) {
      window.clearTimeout(keyBadgeTimerRef.current);
    }
    setActiveKeyBadge(label);
    keyBadgeTimerRef.current = window.setTimeout(() => {
      setActiveKeyBadge((curr) => (curr === label ? null : curr));
      keyBadgeTimerRef.current = null;
    }, 700);
  };

  const selectVariablePill = (
    pills: NodeListOf<HTMLSpanElement>,
    index: number
  ) => {
    if (pills.length === 0) return;
    const clamped = (index + pills.length) % pills.length;
    activeVarIndexRef.current = clamped;

    pills.forEach((p, i) => {
      if (i === clamped) {
        p.classList.add("ph-template-variable-active");
        p.focus();
        try {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(p);
          selection?.removeAllRanges();
          selection?.addRange(range);
        } catch {
          // Fallback if selection isn't supported in environment
        }
      } else {
        p.classList.remove("ph-template-variable-active");
      }
    });
  };

  const insertTemplateIntoEditor = (rawText: string, closeOverlay = true) => {
    const editor = editorRef.current;
    if (!editor) return;

    // Convert {{variable}} to interactive spans
    const tokenRegex = /\{\{([^{}\n]+)\}\}/g;
    let resultHtml = "";
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(rawText)) !== null) {
      const before = rawText.slice(lastIndex, match.index);
      resultHtml += escapeHtml(before);
      const varName = match[1];
      resultHtml += `<span class="ph-template-variable" contenteditable="true" role="textbox" data-default="${escapeHtml(
        varName
      )}">{{${escapeHtml(varName)}}}</span>`;
      lastIndex = tokenRegex.lastIndex;
    }
    resultHtml += escapeHtml(rawText.slice(lastIndex));

    editor.innerHTML = resultHtml.replace(/\n/g, "<br>");
    if (closeOverlay) {
      setPopoverOpen(false);
    }

    // Auto-focus first variable
    setTimeout(() => {
      const pills = editor.querySelectorAll<HTMLSpanElement>(
        ".ph-template-variable"
      );
      if (pills.length > 0) {
        selectVariablePill(pills, 0);
      } else {
        editor.focus();
      }
    }, 20);
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const editor = editorRef.current;
    if (!editor) return;

    if (e.key === "Tab") {
      const pills = editor.querySelectorAll<HTMLSpanElement>(
        ".ph-template-variable"
      );
      if (pills.length > 0) {
        e.preventDefault();
        const nextIndex = e.shiftKey
          ? activeVarIndexRef.current - 1
          : activeVarIndexRef.current + 1;
        selectVariablePill(pills, nextIndex);
        showKeyFeedback(e.shiftKey ? "Shift + Tab" : "Tab ⇥");
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const raw = editor.innerText || "";
      const cleaned = stripBrackets(raw).trim();
      if (!cleaned) return;

      setSentMessage(cleaned);
      editor.innerHTML = "";
      showKeyFeedback("Enter ⏎ (Sent)");
      return;
    }

    if (e.key === "Escape") {
      setPopoverOpen(false);
      showKeyFeedback("Esc");
    }
  };

  const handleAddNewPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    const tagsArray = newTag
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    const created: PromptItem = {
      id: "custom-" + Date.now(),
      title: newTitle.trim(),
      icon: "sparkles",
      color: "blue",
      text: newText.trim(),
      tags: tagsArray.length > 0 ? tagsArray : ["custom"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setPrompts((prev) => [created, ...prev]);
    setNewTitle("");
    setNewText("");
    setNewTag("");
    setShowAddForm(false);
    showKeyFeedback("Saved");
  };

  const handleEasterEggClick = () => {
    const next = easterEggClicks + 1;
    setEasterEggClicks(next);
    if (next >= 5) {
      setEasterEggRevealed(true);
    }
  };

  // Keyboard shortcut listener inside overlay search box
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        overlayList.length ? (prev + 1) % overlayList.length : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        overlayList.length
          ? (prev - 1 + overlayList.length) % overlayList.length
          : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const picked = overlayList[selectedIndex];
      if (picked) {
        insertTemplateIntoEditor(picked.text, true);
      }
    }
  };

  return (
    <div
      className="macos-window-frame"
      role="region"
      aria-label="Interactive TemplaGem Simulator"
      style={
        {
          "--platform-accent": PLATFORM_CONFIG[platform].color
        } as React.CSSProperties
      }
    >
      {/* macOS Safari Window Chrome */}
      <div className="macos-titlebar">
        <div className="macos-dots" aria-hidden="true">
          <span className="macos-dot macos-dot-red" />
          <span className="macos-dot macos-dot-yellow" />
          <span className="macos-dot macos-dot-green" />
        </div>

        <div className="macos-url-pill">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: PLATFORM_CONFIG[platform].color
              }}
            />
            {PLATFORM_CONFIG[platform].url}
          </span>
        </div>

        <div className="macos-status-pill">
          <span className="macos-status-dot" aria-hidden="true" />
          <span>TemplaGem Ready</span>
        </div>
      </div>

      {/* Unified Toolbar: Platform Selector + Mode Tabs */}
      <div className="sandbox-topbar">
        <div
          className="sim-platform-selector"
          role="tablist"
          aria-label="Select Target AI Platform"
        >
          <button
            type="button"
            className={`sim-platform-btn ${platform === "gemini" ? "active" : ""}`}
            onClick={() => setPlatform("gemini")}
            aria-selected={platform === "gemini"}
            title="Google Gemini"
          >
            <span
              className="sim-platform-dot"
              style={{ backgroundColor: "#0b57d0" }}
            />
            <GeminiMark size={13} />
            <span>Gemini</span>
          </button>
          <button
            type="button"
            className={`sim-platform-btn ${platform === "chatgpt" ? "active" : ""}`}
            onClick={() => setPlatform("chatgpt")}
            aria-selected={platform === "chatgpt"}
            title="ChatGPT"
          >
            <span
              className="sim-platform-dot"
              style={{ backgroundColor: "#10a37f" }}
            />
            <ChatGPTMark size={13} />
            <span>ChatGPT</span>
          </button>
          <button
            type="button"
            className={`sim-platform-btn ${platform === "claude" ? "active" : ""}`}
            onClick={() => setPlatform("claude")}
            aria-selected={platform === "claude"}
            title="Anthropic Claude"
          >
            <span
              className="sim-platform-dot"
              style={{ backgroundColor: "#d97757" }}
            />
            <ClaudeMark size={13} />
            <span>Claude</span>
          </button>
          <button
            type="button"
            className={`sim-platform-btn ${platform === "deepseek" ? "active" : ""}`}
            onClick={() => setPlatform("deepseek")}
            aria-selected={platform === "deepseek"}
            title="DeepSeek"
          >
            <span
              className="sim-platform-dot"
              style={{ backgroundColor: "#4d6bfe" }}
            />
            <DeepSeekMark size={13} />
            <span>DeepSeek</span>
          </button>
        </div>

        <div className="sandbox-tabs" role="tablist">
          <button
            type="button"
            id="tab-overlay"
            className={`sandbox-tab ${sandboxMode === "overlay" ? "active" : ""}`}
            role="tab"
            aria-selected={sandboxMode === "overlay"}
            onClick={() => setSandboxMode("overlay")}
          >
            Overlay
          </button>
          <button
            type="button"
            id="tab-popup"
            className={`sandbox-tab ${sandboxMode === "popup" ? "active" : ""}`}
            role="tab"
            aria-selected={sandboxMode === "popup"}
            onClick={() => setSandboxMode("popup")}
          >
            Popup
          </button>
        </div>
      </div>

      {/* View 1: Simulated Chat Page + Docked Overlay */}
      <div
        id="sandbox-overlay-view"
        className="sandbox-body"
        style={{ display: sandboxMode === "overlay" ? "flex" : "none" }}
      >
        <div>
          <div
            id="sim-popover"
            className={`gemini-popover-sim ${popoverOpen ? "" : "is-closed"}`}
            role="listbox"
            aria-label="TemplaGem Prompts"
            style={
              {
                "--platform-accent": PLATFORM_CONFIG[platform].color
              } as React.CSSProperties
            }
          >
            <div className="popover-header">
              <div className="popover-brand">
                <TemplaGemMark size={16} />
                <span>TemplaGem</span>
              </div>

              <div className="popover-search-wrap">
                <svg
                  className="popover-search-icon"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  id="sim-search"
                  className="popover-search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search templates..."
                  aria-label="Search templates"
                />
              </div>
            </div>

            <div className="popover-tags-bar">
              <nav
                id="sim-tags"
                className="popover-tags"
                aria-label="Filter templates by tag"
                onWheel={(e) => {
                  if (e.deltaY !== 0) {
                    e.currentTarget.scrollLeft += e.deltaY;
                  }
                }}
              >
                {availableTags.map((t) => {
                  const isSelected = activeTag === t;
                  return (
                    <button
                      type="button"
                      key={t}
                      className={`tag-pill ${isSelected ? "active" : ""}`}
                      aria-pressed={isSelected}
                      onClick={() => {
                        const nextTag = isSelected && t !== "all" ? "all" : t;
                        setActiveTag(nextTag);
                        setSelectedIndex(0);
                      }}
                    >
                      {t === "all" ? "All" : `#${t}`}
                    </button>
                  );
                })}
              </nav>
            </div>

            <ul id="sim-list" className="popover-list">
              {overlayList.length === 0 ? (
                <li className="popover-empty">
                  <span>No templates match your query</span>
                  {(activeTag !== "all" || searchQuery) && (
                    <button
                      type="button"
                      className="chip-action"
                      style={{ marginTop: 8 }}
                      onClick={() => {
                        setActiveTag("all");
                        setSearchQuery("");
                        setSelectedIndex(0);
                      }}
                    >
                      Reset filters
                    </button>
                  )}
                </li>
              ) : (
                overlayList.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const preview = item.text.replace(/\n+/g, " ");
                  return (
                    <li
                      key={item.id}
                      className={`popover-item ${isSelected ? "selected" : ""}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedIndex(idx);
                        insertTemplateIntoEditor(item.text, true);
                      }}
                    >
                      <div className="popover-item-left">
                        <span
                          className="prompt-icon-box"
                          data-color={item.color}
                        >
                          <PromptIcon icon={item.icon} />
                        </span>
                        <div style={{ minWidth: 0 }}>
                          <div className="popover-item-title">{item.title}</div>
                          <div className="popover-item-preview">{preview}</div>
                        </div>
                      </div>
                      <div className="popover-item-tags">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className={`mini-tag ${activeTag === t ? "active" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextTag = activeTag === t ? "all" : t;
                              setActiveTag(nextTag);
                              setSelectedIndex(0);
                            }}
                            title={`Filter by #${t}`}
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          {/* Sent Message Log */}
          <div
            id="sim-chat-log"
            className="gemini-chat-log"
            aria-live="polite"
          >
            {sentMessage && (
              <>
                <div className="sent-bubble">{sentMessage}</div>
                <div className="sent-meta">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>
                    Sent to {PLATFORM_CONFIG[platform].name} — {"{{brackets}}"} stripped automatically
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Simulated Rich Input Box */}
        <div className="gemini-input-card">
          <div
            ref={editorRef}
            id="sim-gemini-editor"
            className="gemini-editor"
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            aria-label={`Simulated ${PLATFORM_CONFIG[platform].name} prompt input`}
            data-placeholder={PLATFORM_CONFIG[platform].placeholder}
            onFocus={() => {
              const editor = editorRef.current;
              if (!editor) return;
              const pills = editor.querySelectorAll(".ph-template-variable");
              if (pills.length === 0 && !editor.innerText.trim()) {
                setPopoverOpen(true);
              }
            }}
            onKeyDown={handleEditorKeyDown}
          />

          <div className="gemini-input-Readout">
            <div className="gemini-Readout-actions">
              <button
                type="button"
                id="btn-toggle-popover"
                className="chip-action"
                onClick={() => setPopoverOpen((prev) => !prev)}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: PLATFORM_CONFIG[platform].color
                  }}
                >
                  <TemplaGemMark size={13} />
                </span>
                <span>Templates</span>
              </button>

              <button
                type="button"
                id="btn-cycle-vars"
                className="chip-action"
                onClick={() => {
                  const editor = editorRef.current;
                  if (!editor) return;
                  const pills = editor.querySelectorAll<HTMLSpanElement>(
                    ".ph-template-variable"
                  );
                  if (pills.length > 0) {
                    selectVariablePill(
                      pills,
                      activeVarIndexRef.current + 1
                    );
                    showKeyFeedback("Tab ⇥");
                  }
                }}
              >
                <kbd>Tab ⇥</kbd>
                <span>Cycle Variables</span>
              </button>
            </div>

            <button
              type="button"
              id="sim-send-btn"
              className="gemini-send-btn"
              aria-label="Send prompt to AI"
              onClick={() => {
                const editor = editorRef.current;
                if (!editor) return;
                const raw = editor.innerText || "";
                const cleaned = stripBrackets(raw).trim();
                if (!cleaned) return;
                setSentMessage(cleaned);
                editor.innerHTML = "";
                showKeyFeedback("Enter ⏎ (Sent)");
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* View 2: Simulated Popup View */}
      <div
        id="sandbox-popup-view"
        className="sandbox-body"
        style={{ display: sandboxMode === "popup" ? "flex" : "none" }}
      >
        <div className="sim-popup-container">
          <div className="sim-popup-header">
            <div
              className="sim-popup-title"
              onClick={handleEasterEggClick}
              title="TemplaGem Popup"
              style={{ cursor: "pointer" }}
            >
              <TemplaGemMark size={18} />
              <span>TemplaGem Library</span>
            </div>

            <button
              type="button"
              className="btn-primary btn-sm"
              onClick={() => setShowAddForm((prev) => !prev)}
            >
              {showAddForm ? "Cancel" : "+ New"}
            </button>
          </div>

          {showAddForm && (
            <form className="sim-add-form" onSubmit={handleAddNewPrompt}>
              <input
                type="text"
                placeholder="Template Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Prompt text with {{variables}}..."
                rows={3}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Tags (comma separated, e.g. dev, notes)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button
                type="submit"
                className="btn-primary btn-sm"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Save to IndexedDB
              </button>
            </form>
          )}

          <div className="sim-popup-controls">
            <input
              type="text"
              className="popover-search"
              placeholder="Search library..."
              value={popupQuery}
              onChange={(e) => setPopupQuery(e.target.value)}
            />
            <select
              className="sim-sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              aria-label="Sort templates"
            >
              <option value="created-desc">Newest first</option>
              <option value="created-asc">Oldest first</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>

          <div
            className="popover-tags-bar"
            style={{
              borderRadius: 0,
              borderTop: "1px solid var(--border-subtle)"
            }}
          >
            <nav
              className="popover-tags"
              aria-label="Filter popup library by tag"
              onWheel={(e) => {
                if (e.deltaY !== 0) {
                  e.currentTarget.scrollLeft += e.deltaY;
                }
              }}
            >
              {availableTags.map((t) => {
                const isSelected = popupTag === t;
                return (
                  <button
                    type="button"
                    key={t}
                    className={`tag-pill ${isSelected ? "active" : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => {
                      const nextTag = isSelected && t !== "all" ? "all" : t;
                      setPopupTag(nextTag);
                    }}
                  >
                    {t === "all" ? "All" : `#${t}`}
                  </button>
                );
              })}
            </nav>
          </div>

          <ul className="sim-popup-list">
            {popupList.length === 0 ? (
              <li
                className="popover-empty"
                style={{ padding: "28px 14px", textAlign: "center" }}
              >
                <span>No templates match your filters</span>
                <button
                  type="button"
                  className="chip-action"
                  style={{ marginTop: 8 }}
                  onClick={() => {
                    setPopupTag("all");
                    setPopupQuery("");
                  }}
                >
                  Reset filters
                </button>
              </li>
            ) : (
              popupList.map((item) => (
                <li key={item.id} className="sim-popup-card">
                  <div className="sim-popup-card-header">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <span
                        className="prompt-icon-box"
                        data-color={item.color}
                        style={{ width: "22px", height: "22px" }}
                      >
                        <PromptIcon icon={item.icon} />
                      </span>
                      <strong>{item.title}</strong>
                    </div>
                    <button
                      type="button"
                      className="chip-action"
                      style={{ padding: "3px 8px", fontSize: "0.72rem" }}
                      onClick={() => {
                        insertTemplateIntoEditor(item.text, true);
                        setSandboxMode("overlay");
                        showKeyFeedback("Inserted");
                      }}
                    >
                      Insert ↗
                    </button>
                  </div>
                  <p className="sim-popup-card-text">{item.text}</p>
                  <div className="sim-popup-card-tags">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className={`mini-tag ${popupTag === t ? "active" : ""}`}
                        onClick={() => {
                          const nextTag = popupTag === t ? "all" : t;
                          setPopupTag(nextTag);
                        }}
                        title={`Filter by #${t}`}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </li>
              ))
            )}
          </ul>

          {easterEggRevealed && (
            <div className="easter-egg-banner">
              ✦ Backend API: <code>http://localhost:4300</code> · IndexedDB
              Active · 2-Way Sync Engine Ready
            </div>
          )}
        </div>
      </div>

      {/* Floating Keypress Feedback Toast */}
      {activeKeyBadge && (
        <div className="floating-key-badge" aria-hidden="true">
          {activeKeyBadge}
        </div>
      )}
    </div>
  );
});
