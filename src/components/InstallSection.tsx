import React, { useState } from "react";
import type { InstallTab, Language } from "../types";

interface InstallSectionProps {
  lang: Language;
}

const CopyCommandBar: React.FC<{ command: string; lang: Language }> = ({
  command,
  lang
}) => {
  const [copied, setCopied] = useState(false);
  const isEn = lang === "en";

  const handleCopy = () => {
    navigator.clipboard?.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code-copy-bar mono">
      <span>{command}</span>
      <button type="button" className="copy-btn" onClick={handleCopy}>
        {copied
          ? isEn
            ? "Copied"
            : "Скопійовано"
          : isEn
            ? "Copy"
            : "Копіювати"}
      </button>
    </div>
  );
};

export const InstallSection: React.FC<InstallSectionProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<InstallTab>("release");
  const isEn = lang === "en";

  return (
    <section className="page-section" id="install">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {isEn ? "Install in 30 seconds" : "Встановлення за 30 секунд"}
          </h2>
          <p className="section-subtitle">
            {isEn
              ? "Download the ready-to-use release archive or build directly from source."
              : "Оберіть зручний спосіб: завантажте готовий архів із GitHub Releases або зберіть розширення локально з вихідного коду."}
          </p>
        </div>

        <div className="install-box">
          <div className="install-tabs" role="tablist">
            <button
              type="button"
              id="install-tab-release"
              className="install-tab"
              role="tab"
              aria-selected={activeTab === "release"}
              onClick={() => setActiveTab("release")}
            >
              {isEn
                ? "Option 1: From GitHub Release (.zip)"
                : "Спосіб 1: З готового релізу (.zip)"}
            </button>
            <button
              type="button"
              id="install-tab-source"
              className="install-tab"
              role="tab"
              aria-selected={activeTab === "source"}
              onClick={() => setActiveTab("source")}
            >
              {isEn
                ? "Option 2: Build from source"
                : "Спосіб 2: Збірка з вихідного коду"}
            </button>
          </div>

          {activeTab === "release" ? (
            <div id="install-panel-release" className="install-steps">
              <div className="install-card">
                <div
                  className="step-number"
                  style={{ alignSelf: "flex-start" }}
                >
                  {isEn ? "Step 1" : "Крок 1"}
                </div>
                <h3 className="install-card-title">
                  {isEn
                    ? "Download the release archive"
                    : "Завантажте архів збірки"}
                </h3>
                <p className="install-card-text">
                  {isEn
                    ? "Download chrome-mv3-prod.zip from the latest GitHub Release and extract it to a folder."
                    : "Перейдіть у розділ Releases на GitHub, завантажте файл chrome-mv3-prod.zip та розпакуйте його у зручну папку."}
                </p>
                <a
                  href="https://github.com/TemplaGem/TemplaGem/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary btn-sm"
                  style={{ alignSelf: "flex-start" }}
                >
                  {isEn ? "Open GitHub Releases" : "Відкрити GitHub Releases"}
                </a>
              </div>

              <div className="install-card">
                <div
                  className="step-number"
                  style={{ alignSelf: "flex-start" }}
                >
                  {isEn ? "Step 2" : "Крок 2"}
                </div>
                <h3 className="install-card-title">
                  {isEn
                    ? "Enable Developer Mode"
                    : "Увімкніть Режим розробника"}
                </h3>
                <p className="install-card-text">
                  {isEn
                    ? "Open your browser's extensions page and toggle on Developer mode in the top-right corner."
                    : "Відкрийте сторінку керування розширеннями у вашому браузері та активуйте перемикач Developer mode у верхньому кутку."}
                </p>
                <CopyCommandBar command="chrome://extensions" lang={lang} />
              </div>

              <div className="install-card">
                <div
                  className="step-number"
                  style={{ alignSelf: "flex-start" }}
                >
                  {isEn ? "Step 3" : "Крок 3"}
                </div>
                <h3 className="install-card-title">
                  {isEn
                    ? "Load unpacked extension"
                    : "Завантажте розпаковане розширення"}
                </h3>
                <p className="install-card-text">
                  {isEn
                    ? "Click 'Load unpacked' and select the extracted chrome-mv3-prod directory. Open gemini.google.com and enjoy!"
                    : "Натисніть «Load unpacked» (Завантажити розпаковане) і виберіть розпаковану папку chrome-mv3-prod. Готово!"}
                </p>
              </div>
            </div>
          ) : (
            <div id="install-panel-source" className="install-steps">
              <div className="install-card">
                <div
                  className="step-number"
                  style={{ alignSelf: "flex-start" }}
                >
                  {isEn ? "Step 1" : "Крок 1"}
                </div>
                <h3 className="install-card-title">
                  {isEn ? "Clone the repository" : "Клонуйте репозиторій"}
                </h3>
                <p className="install-card-text">
                  {isEn
                    ? "Clone the TemplaGem repository and install dependencies with pnpm."
                    : "Склонуйте проєкт TemplaGem та встановіть залежності через pnpm."}
                </p>
                <CopyCommandBar command="pnpm install" lang={lang} />
              </div>

              <div className="install-card">
                <div
                  className="step-number"
                  style={{ alignSelf: "flex-start" }}
                >
                  {isEn ? "Step 2" : "Крок 2"}
                </div>
                <h3 className="install-card-title">
                  {isEn
                    ? "Build the production bundle"
                    : "Зберіть production-бандл"}
                </h3>
                <p className="install-card-text">
                  {isEn
                    ? "Run the Plasmo build script. The bundle will be generated inside build/chrome-mv3-prod."
                    : "Виконайте команду збірки Plasmo. Готове розширення з'явиться в папці build/chrome-mv3-prod."}
                </p>
                <CopyCommandBar command="pnpm build" lang={lang} />
              </div>

              <div className="install-card">
                <div
                  className="step-number"
                  style={{ alignSelf: "flex-start" }}
                >
                  {isEn ? "Step 3" : "Крок 3"}
                </div>
                <h3 className="install-card-title">
                  {isEn ? "Load into browser" : "Додайте в браузер"}
                </h3>
                <p className="install-card-text">
                  {isEn
                    ? "In chrome://extensions, click 'Load unpacked' and select build/chrome-mv3-prod."
                    : "На сторінці chrome://extensions натисніть «Load unpacked» та вкажіть шлях до build/chrome-mv3-prod."}
                </p>
                <CopyCommandBar command="build/chrome-mv3-prod" lang={lang} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
