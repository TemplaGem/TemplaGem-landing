import React, { useEffect, useMemo, useRef, useState } from "react";
import { INITIAL_PROMPTS, localizePrompt } from "../data/prompts";
import type { Language, PromptItem, SandboxTab, SortOption } from "../types";
import { PromptIcon, TemplaGemMark } from "./Icons";

interface SandboxSimulatorProps {
  lang: Language;
}

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

export const SandboxSimulator: React.FC<SandboxSimulatorProps> = ({ lang }) => {
  const isEn = lang === "en";

  const [sandboxMode, setSandboxMode] = useState<SandboxTab>("overlay");
  const [popoverOpen, setPopoverOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [popupQuery, setPopupQuery] = useState<string>("");
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

  const localizedPrompts = useMemo(
    () => prompts.map((p) => localizePrompt(p, lang)),
    [prompts, lang]
  );

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    localizedPrompts.forEach((p) => {
      p.displayTags.forEach((t) => tagSet.add(t));
    });
    return ["all", ...Array.from(tagSet)];
  }, [localizedPrompts]);

  const filterAndSort = (query: string, tag: string, sort: SortOption) => {
    const q = query.trim().toLowerCase();
    const filtered = localizedPrompts.filter((item) => {
      const matchesTag =
        !tag || tag === "all" || item.displayTags.includes(tag);
      const matchesQuery =
        !q ||
        item.displayTitle.toLowerCase().includes(q) ||
        item.displayText.toLowerCase().includes(q) ||
        item.displayTags.some((t) => t.toLowerCase().includes(q));
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
          return a.displayTitle.localeCompare(b.displayTitle);
        case "title-desc":
          return b.displayTitle.localeCompare(a.displayTitle);
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
  };

  const overlayItems = useMemo(
    () => filterAndSort(searchQuery, activeTag, "created-desc"),
    [localizedPrompts, searchQuery, activeTag]
  );

  const popupItems = useMemo(
    () => filterAndSort(popupQuery, "all", sortOption),
    [localizedPrompts, popupQuery, sortOption]
  );

  const setActiveVariablePill = (index: number) => {
    const editor = editorRef.current;
    if (!editor) return;
    const pills = Array.from(
      editor.querySelectorAll<HTMLElement>(".ph-template-variable")
    );
    if (pills.length === 0) return;
    const normalized = ((index % pills.length) + pills.length) % pills.length;
    activeVarIndexRef.current = normalized;
    pills.forEach((p, idx) => {
      p.classList.toggle("ph-template-variable-active", idx === normalized);
    });
  };

  const bindVariablePillEvents = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const pills = editor.querySelectorAll<HTMLElement>(".ph-template-variable");
    pills.forEach((pill, index) => {
      pill.onclick = (e) => {
        e.stopPropagation();
        setActiveVariablePill(index);
        editor.focus();
      };
    });
  };

  const insertTemplateIntoGemini = (
    templateText: string,
    closePopover = true
  ) => {
    const editor = editorRef.current;
    if (!editor) return;

    const escaped = escapeHtml(templateText);
    let varIdx = 0;
    const htmlWithPills = escaped.replace(
      /\{\{([^{}\n]+)\}\}/g,
      (_match, varName: string) => {
        const activeClass = varIdx === 0 ? "ph-template-variable-active" : "";
        const span = `<span class="ph-template-variable ${activeClass}" contenteditable="false" data-var-index="${varIdx}" data-var-name="${varName}">{{${varName}}}</span>`;
        varIdx++;
        return span;
      }
    );

    editor.innerHTML = htmlWithPills;
    activeVarIndexRef.current = 0;
    if (closePopover) {
      setPopoverOpen(false);
    }
    bindVariablePillEvents();
  };

  useEffect(() => {
    setActiveTag("all");
    const first = localizePrompt(INITIAL_PROMPTS[0], lang);
    insertTemplateIntoGemini(first.displayText, false);
    setPopoverOpen(true);
  }, [lang]);

  const jumpToNextPill = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const pills = editor.querySelectorAll(".ph-template-variable");
    if (pills.length === 0) return;
    setActiveVariablePill(activeVarIndexRef.current + 1);
    editor.focus();
  };

  const handleSendSimulatedMessage = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const rawText = editor.innerText.trim();
    if (!rawText) return;

    const cleanText = stripBrackets(rawText);
    setSentMessage(cleanText);
    editor.innerHTML = "";
    setPopoverOpen(true);
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const editor = editorRef.current;
    if (!editor) return;

    const pills = Array.from(editor.querySelectorAll(".ph-template-variable"));
    const activePill = editor.querySelector(".ph-template-variable-active");

    if (e.key === "Tab" && pills.length > 0) {
      e.preventDefault();
      setActiveKeyBadge("Tab");
      setTimeout(() => setActiveKeyBadge(null), 350);
      jumpToNextPill();
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      setActiveKeyBadge("Enter");
      setTimeout(() => setActiveKeyBadge(null), 350);
      if (popoverOpen && pills.length === 0) {
        e.preventDefault();
        const target = overlayItems[selectedIndex] || overlayItems[0];
        if (target) {
          insertTemplateIntoGemini(target.displayText, true);
        }
        return;
      }
      e.preventDefault();
      handleSendSimulatedMessage();
      return;
    }

    if (e.key === "Escape" && popoverOpen) {
      setActiveKeyBadge("Escape");
      setTimeout(() => setActiveKeyBadge(null), 350);
      setPopoverOpen(false);
      return;
    }

    if (
      activePill &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.preventDefault();
      const textNode = document.createTextNode(e.key);
      activePill.replaceWith(textNode);

      const sel = window.getSelection();
      if (sel) {
        const range = document.createRange();
        range.setStartAfter(textNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      const remaining = editor.querySelectorAll(".ph-template-variable");
      if (remaining.length > 0) {
        setActiveVariablePill(0);
      }
    }
  };

  const handleCreatePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    const text = newText.trim();
    const cleanTag = (newTag.trim() || "custom").replace(/^#/, "");
    if (!title || !text) return;

    const created: PromptItem = {
      id: "p-custom-" + Date.now(),
      title,
      titleEn: title,
      icon: "sparkles",
      color: "blue",
      text,
      textEn: text,
      tags: [cleanTag],
      tagsEn: [cleanTag],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setPrompts((prev) => [created, ...prev]);
    setNewTitle("");
    setNewText("");
    setNewTag("");
    setShowAddForm(false);
  };

  const handleEasterEggClick = () => {
    if (easterEggRevealed) return;
    const next = easterEggClicks + 1;
    setEasterEggClicks(next);
    if (next >= 5) {
      setEasterEggRevealed(true);
    }
  };

  return (
    <div
      className="macos-window-frame"
      role="region"
      aria-label="Interactive TemplaGem Simulator"
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
          <span>gemini.google.com/app</span>
        </div>

        <div className="macos-status-pill">
          <span className="macos-status-dot" aria-hidden="true" />
          <span>TemplaGem Active</span>
        </div>
      </div>

      <div className="sandbox-topbar">
        <div className="sandbox-tabs" role="tablist">
          <button
            type="button"
            id="tab-overlay"
            className="sandbox-tab"
            role="tab"
            aria-selected={sandboxMode === "overlay"}
            onClick={() => setSandboxMode("overlay")}
          >
            {isEn ? "1. Gemini Input Overlay" : "1. Поле вводу Gemini"}
          </button>
          <button
            type="button"
            id="tab-popup"
            className="sandbox-tab"
            role="tab"
            aria-selected={sandboxMode === "popup"}
            onClick={() => setSandboxMode("popup")}
          >
            {isEn ? "2. Extension Popup" : "2. Попап розширення"}
          </button>
        </div>
        <div className="sandbox-hint">
          <span>
            {isEn
              ? "Live sandbox — click and type"
              : "Живе демо — клікайте та друкуйте"}
          </span>
        </div>
      </div>

      {/* View 1: Simulated Gemini Page + Docked Overlay */}
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
                  placeholder={
                    isEn ? "Search templates..." : "Пошук промптів..."
                  }
                  aria-label="Search templates"
                />
              </div>
            </div>

            <div id="sim-tags" className="popover-tags">
              {availableTags.map((tag) => {
                const isActive = activeTag === tag;
                const label =
                  tag === "all" ? (isEn ? "All" : "Усі") : `#${tag}`;
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-chip ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setActiveTag(tag);
                      setSelectedIndex(0);
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <ul id="sim-prompt-list" className="popover-list">
              {overlayItems.length === 0 ? (
                <li
                  style={{
                    padding: "18px",
                    textAlign: "center",
                    color: "var(--text-muted)",
                    fontSize: "0.8125rem"
                  }}
                >
                  {isEn
                    ? "No templates match your filter."
                    : "Шаблонів за цим запитом не знайдено."}
                </li>
              ) : (
                overlayItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const preview = item.displayText.replace(/\n+/g, " ");
                  return (
                    <li
                      key={item.id}
                      className={`popover-item ${isSelected ? "selected" : ""}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedIndex(idx);
                        insertTemplateIntoGemini(item.displayText, true);
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
                          <div className="popover-item-title">
                            {item.displayTitle}
                          </div>
                          <div className="popover-item-preview">{preview}</div>
                        </div>
                      </div>
                      <div className="popover-item-tags">
                        {item.displayTags.slice(0, 2).map((t) => (
                          <span key={t} className="mini-tag">
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
                    {isEn
                      ? "Sent to Gemini — {{brackets}} stripped automatically"
                      : "Надіслано в Gemini — дужки {{...}} очищено автоматично"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Simulated Gemini Rich Input Box */}
        <div className="gemini-input-card">
          <div
            ref={editorRef}
            id="sim-gemini-editor"
            className="gemini-editor"
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            aria-label="Simulated Gemini prompt input"
            data-placeholder={
              isEn
                ? "Ask Gemini or pick a template above..."
                : "Введіть запит для Gemini або оберіть шаблон вище..."
            }
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
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
                    fill="#1a73e8"
                  />
                </svg>
                <span>{isEn ? "Templates" : "Шаблони"}</span>
              </button>

              <button
                type="button"
                id="btn-next-var"
                className="chip-action"
                onClick={jumpToNextPill}
              >
                <kbd>Tab</kbd>
                <span>
                  {isEn ? "Next {{variable}}" : "Наступна {{змінна}}"}
                </span>
              </button>
            </div>

            <button
              type="button"
              id="btn-send-prompt"
              className="gemini-send-btn"
              aria-label="Send prompt to Gemini"
              title="Send (Enter)"
              onClick={handleSendSimulatedMessage}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Reactive Keyboard Shortcuts Bar */}
        <div
          className="sim-shortcut-toolbar"
          aria-label="Interactive keyboard controls"
        >
          <span className="sim-shortcut-label">
            {isEn ? "Quick shortcuts:" : "Швидке керування:"}
          </span>
          <div className="sim-shortcut-badges">
            <div
              className={`sim-shortcut-badge ${
                activeKeyBadge === "Tab" ? "badge-active" : ""
              }`}
            >
              <kbd>Tab</kbd>
              <span>{isEn ? "next {{variable}}" : "наступна {{змінна}}"}</span>
            </div>
            <div
              className={`sim-shortcut-badge ${
                activeKeyBadge === "Enter" ? "badge-active" : ""
              }`}
            >
              <kbd>Enter</kbd>
              <span>{isEn ? "send clean" : "відправка без дужок"}</span>
            </div>
            <div
              className={`sim-shortcut-badge ${
                activeKeyBadge === "Escape" ? "badge-active" : ""
              }`}
            >
              <kbd>Esc</kbd>
              <span>{isEn ? "toggle overlay" : "сховати оверлей"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* View 2: Simulated 400px Extension Popup */}
      <div
        id="sandbox-popup-view"
        className="sandbox-body"
        style={{ display: sandboxMode === "popup" ? "block" : "none" }}
      >
        <div className="popup-sim-wrapper">
          <div className="popup-sim-frame">
            <div className="popup-sim-header">
              <div className="popover-brand">
                <TemplaGemMark size={18} />
                <span>TemplaGem Popup</span>
              </div>

              <button
                type="button"
                id="btn-toggle-add-form"
                className="popup-use-btn"
                onClick={() => setShowAddForm((prev) => !prev)}
              >
                {isEn ? "+ New Prompt" : "+ Новий шаблон"}
              </button>
            </div>

            <div className="popup-sim-body">
              {showAddForm && (
                <form
                  id="popup-add-form"
                  onSubmit={handleCreatePrompt}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "10px",
                    borderRadius: "12px",
                    background: "var(--surface-canvas)",
                    border: "1px solid var(--border-strong)"
                  }}
                >
                  <input
                    type="text"
                    id="new-prompt-title"
                    className="popover-search"
                    style={{ paddingLeft: "10px" }}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={
                      isEn ? "Prompt title..." : "Назва шаблону..."
                    }
                    required
                  />
                  <textarea
                    id="new-prompt-text"
                    rows={2}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--surface-interactive)",
                      fontSize: "0.78rem",
                      resize: "vertical"
                    }}
                    placeholder={
                      isEn
                        ? "Template text with {{variable}}..."
                        : "Текст із {{змінною}}..."
                    }
                    required
                  />
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      id="new-prompt-tag"
                      className="popover-search"
                      style={{ paddingLeft: "10px", flex: 1 }}
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder={
                        isEn ? "Tag (e.g. dev)" : "Тег (напр. dev)"
                      }
                    />
                    <button type="submit" className="popup-use-btn">
                      {isEn ? "Create" : "Зберегти"}
                    </button>
                  </div>
                </form>
              )}

              <div className="popup-sim-toolbar">
                <input
                  type="text"
                  id="popup-sim-search"
                  className="popover-search"
                  style={{ paddingLeft: "12px", flex: 1 }}
                  value={popupQuery}
                  onChange={(e) => setPopupQuery(e.target.value)}
                  placeholder={
                    isEn
                      ? "Filter by title or tag..."
                      : "Фільтр за назвою або тегом..."
                  }
                  aria-label="Filter popup prompts"
                />
                <select
                  id="popup-sim-sort"
                  className="popup-sim-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  aria-label="Sort prompts"
                >
                  <option value="created-desc">Newest first</option>
                  <option value="created-asc">Oldest first</option>
                  <option value="title-asc">A → Z</option>
                  <option value="title-desc">Z → A</option>
                  <option value="updated-desc">Recently updated</option>
                </select>
              </div>

              <div id="popup-sim-list" className="popup-card-list">
                {popupItems.map((item) => (
                  <div key={item.id} className="popup-card-item">
                    <div className="popover-item-left">
                      <span
                        className="prompt-icon-box"
                        data-color={item.color}
                      >
                        <PromptIcon icon={item.icon} />
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <div className="popover-item-title">
                          {item.displayTitle}
                        </div>
                        <div
                          className="popover-item-preview"
                          style={{ maxWidth: "210px" }}
                        >
                          {item.displayText.replace(/\n+/g, " ")}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="popup-use-btn"
                      onClick={() => {
                        setSandboxMode("overlay");
                        insertTemplateIntoGemini(item.displayText, true);
                      }}
                    >
                      {isEn ? "Insert in Gemini" : "Вставити в Gemini"}
                    </button>
                  </div>
                ))}
              </div>

              <div
                id="easter-egg-trigger"
                className="easter-egg-box"
                role="button"
                tabIndex={0}
                onClick={handleEasterEggClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleEasterEggClick();
                  }
                }}
              >
                <span>
                  {isEn
                    ? "Settings Easter egg: click here 5 times"
                    : "Пасхалка з Settings: клікніть 5 разів сюди"}
                </span>
                <span id="easter-egg-status" className="mono">
                  {easterEggRevealed ? (
                    <span
                      style={{
                        color: "var(--icon-green-fg)",
                        fontWeight: 700
                      }}
                    >
                      ● Local Storage Synced (chrome.storage.local)
                    </span>
                  ) : (
                    `${easterEggClicks}/5`
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
