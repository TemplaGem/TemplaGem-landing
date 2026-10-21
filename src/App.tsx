import React, { useEffect, useState } from "react";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { InstallSection } from "./components/InstallSection";
import { Navbar } from "./components/Navbar";
import type { Language, ThemeMode } from "./types";

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>("uk");
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Navbar
        lang={lang}
        theme={theme}
        onToggleLang={() => setLang((prev) => (prev === "uk" ? "en" : "uk"))}
        onToggleTheme={() =>
          setTheme((prev) => (prev === "dark" ? "light" : "dark"))
        }
      />
      <main>
        <HeroSection lang={lang} />
        <HowItWorksSection lang={lang} />
        <CapabilitiesSection lang={lang} />
        <InstallSection lang={lang} />
      </main>
      <Footer />
    </>
  );
};
