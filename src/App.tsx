import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { InstallSection } from "./components/InstallSection";
import type { LegalTab } from "./components/LegalPage";
import { Navbar } from "./components/Navbar";
import { PlatformsSection } from "./components/PlatformsSection";
import type { ThemeMode } from "./types";

const LegalPage = lazy(() =>
  import("./components/LegalPage").then((m) => ({ default: m.LegalPage }))
);

function resolveLegalState(): { isLegal: boolean; tab: LegalTab } {
  const hash = window.location.hash.toLowerCase();
  const pathname = window.location.pathname.toLowerCase();

  if (hash === "#privacy" || hash === "#privacy-policy" || pathname.endsWith("/privacy")) {
    return { isLegal: true, tab: "privacy" };
  }
  if (hash === "#terms" || hash === "#terms-of-service" || pathname.endsWith("/terms")) {
    return { isLegal: true, tab: "terms" };
  }
  if (hash === "#legal" || pathname.endsWith("/legal")) {
    return { isLegal: true, tab: "all" };
  }
  return { isLegal: false, tab: "all" };
}

export const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [legalView, setLegalView] = useState<{ isLegal: boolean; tab: LegalTab }>(
    () => resolveLegalState()
  );

  useEffect(() => {
    document.documentElement.setAttribute("lang", "en");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const syncRoute = () => {
      const next = resolveLegalState();
      setLegalView(next);
      if (next.isLegal) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  const handleOpenLegal = useCallback((tab: LegalTab = "all") => {
    const targetHash =
      tab === "privacy" ? "#privacy" : tab === "terms" ? "#terms" : "#legal";
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, "", targetHash);
    }
    setLegalView({ isLegal: true, tab });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleNavigateHome = useCallback((sectionHash?: string) => {
    const target = sectionHash || "#";
    window.history.pushState(null, "", target);
    setLegalView({ isLegal: false, tab: "all" });

    if (sectionHash && sectionHash.startsWith("#") && sectionHash.length > 1) {
      setTimeout(() => {
        const el = document.querySelector(sectionHash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 30);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        isLegalView={legalView.isLegal}
        onNavigateHome={handleNavigateHome}
        onOpenLegal={handleOpenLegal}
      />
      <main>
        {legalView.isLegal ? (
          <Suspense fallback={null}>
            <LegalPage
              initialTab={legalView.tab}
              onNavigateHome={() => handleNavigateHome()}
            />
          </Suspense>
        ) : (
          <>
            <HeroSection />
            <PlatformsSection />
            <HowItWorksSection />
            <CapabilitiesSection />
            <InstallSection />
          </>
        )}
      </main>
      <Footer
        onNavigateHome={handleNavigateHome}
        onOpenLegal={handleOpenLegal}
      />
    </>
  );
};
