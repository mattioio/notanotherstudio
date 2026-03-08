"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

/* ── Public types ───────────────────────────────────────────── */

export interface PackageTier {
  key: string;
  name: string;
  price: string;
  desc: string;
  note: string;
  features: string[];
  /** How many features to show on mobile before the accordion */
  visibleFeatureCount: number;
}

export interface PackageTab {
  key: string;
  label: string;
  icon: React.ReactNode;
  tiers: PackageTier[];
}

export interface PackagesConfig {
  heading: string;
  subheading: string;
  tabs: PackageTab[];
}

/* ── Component ──────────────────────────────────────────────── */

export default function PackagesSection({ config }: { config: PackagesConfig }) {
  const { heading, subheading, tabs } = config;

  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [activeTier, setActiveTier] = useState(tabs[0].tiers[0].key);
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  const tabBarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Sliding pill refs
  const tabNavRef = useRef<HTMLElement>(null);
  const tabLinkRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const tabPillRef = useRef<HTMLDivElement>(null);

  const setTabLinkRef = useCallback((key: string, el: HTMLButtonElement | null) => {
    if (el) tabLinkRefs.current.set(key, el);
    else tabLinkRefs.current.delete(key);
  }, []);

  // Update sliding pill position when active tab changes
  useEffect(() => {
    const pill = tabPillRef.current;
    const nav = tabNavRef.current;
    if (!pill || !nav) return;

    const activeLink = tabLinkRefs.current.get(activeTab);
    if (!activeLink) {
      pill.style.opacity = "0";
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    pill.style.opacity = "1";
    pill.style.left = `${linkRect.left - navRect.left}px`;
    pill.style.width = `${linkRect.width}px`;
    pill.style.height = `${linkRect.height}px`;
  }, [activeTab]);

  // Listen for #packages-{tabKey} hash to auto-switch tab and scroll
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function checkHash() {
      const hash = window.location.hash;
      const match = hash.match(/^#packages-(.+)$/);
      if (!match) return;
      const tabKey = match[1];
      const tab = tabs.find((t) => t.key === tabKey);
      if (tab) {
        setActiveTab(tabKey);
        setActiveTier(tab.tiers[0].key);
        // Delay scroll so it isn't cancelled by the browser's native hash-scroll
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const target = tabBarRef.current && getComputedStyle(tabBarRef.current).display !== "none"
              ? tabBarRef.current
              : sectionRef.current;
            if (target) {
              const top = target.getBoundingClientRect().top + window.scrollY - 20;
              window.scrollTo({ top, behavior: "smooth" });
            }
          });
        });
      }
    }
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [tabs]);

  /* Derived lookups */
  const currentTab = tabs.find((t) => t.key === activeTab) ?? tabs[0];
  const currentTier = currentTab.tiers.find((t) => t.key === activeTier) ?? currentTab.tiers[0];

  function handleTabChange(tabKey: string) {
    const tab = tabs.find((t) => t.key === tabKey);
    if (!tab) return;
    setActiveTab(tabKey);
    setActiveTier(tab.tiers[0].key);
    // Snap content to just below the sticky packages tab bar
    if (contentRef.current && tabBarRef.current) {
      const tabBarH = tabBarRef.current.getBoundingClientRect().height;
      const contentTop = contentRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: contentTop - tabBarH, behavior: "smooth" });
    }
  }

  function toggleAccordion(key: string) {
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <section ref={sectionRef} id="packages" className="bg-[#f0ede6]">
      {/* Header */}
      <div className="px-6 md:px-12 pt-24">
        <div className="text-center mb-16 fade-up">
          <h2 className="syne text-[clamp(36px,4vw,56px)] tracking-[-0.03em] leading-[1.05] mb-4">
            {heading}
          </h2>
          <p className="text-[16px] text-[#6b6b6b] max-w-[480px] mx-auto font-light">
            {subheading}
          </p>
        </div>
      </div>

      {/* ── DESKTOP ──────────────────────────────────────────────── */}

      {/* Sticky tab bar — pill style with sliding indicator */}
      <div ref={tabBarRef} data-packages-tabbar className="hidden md:flex sticky top-5 z-40 justify-center pb-4">
        <nav
          ref={tabNavRef}
          className="relative inline-flex items-center gap-1 bg-white/70 backdrop-blur-xl rounded-full px-1.5 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.10)] border border-white/50"
        >
          {/* Sliding pill indicator */}
          <div
            ref={tabPillRef}
            className="absolute rounded-full bg-[#0d0d0d]"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              transition: "left 0.4s cubic-bezier(0.22, 1, 0.36, 1), width 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
              opacity: 0,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {tabs.map(({ key, label }) => (
            <button
              key={key}
              ref={(el) => setTabLinkRef(key, el)}
              onClick={() => handleTabChange(key)}
              className={`relative z-10 px-5 py-2 text-[13px] font-medium border-none rounded-full cursor-pointer transition-colors duration-300 ${
                activeTab === key
                  ? "bg-transparent text-white"
                  : "bg-transparent text-[#555] hover:text-[#0d0d0d]"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Desktop two-column content */}
      <div ref={contentRef} className="hidden md:block px-6 md:px-12 pt-12 pb-24">
        <div className="grid grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Tier list — sticky so it travels with the detail panel on the right */}
          <div className="flex flex-col gap-[3px] sticky top-[100px] self-start">
            {currentTab.tiers.map(({ key, name, price, desc }) => {
              const isActive = activeTier === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTier(key)}
                  className={`text-left p-8 cursor-pointer transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl border-l-[3px] ${
                    isActive
                      ? "bg-[#1a1a1a] text-white border-l-[#f0c93a]"
                      : "bg-white text-[#0d0d0d] border-l-transparent hover:bg-[#f5f3ef]"
                  } group`}
                >
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="font-bold text-base">{name}</span>
                    <span className={`syne text-xl ${isActive ? "text-[#f0c93a]" : "text-[#0d0d0d] group-hover:text-[#0d0d0d]"}`}>
                      {price}
                    </span>
                  </div>
                  <p className={`text-[13px] leading-relaxed font-light ${isActive ? "text-white/50" : "text-[#6b6b6b]"}`}>
                    {desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="bg-white p-10 rounded-2xl">
            <div className="syne text-[28px] tracking-[-0.02em] mb-2">{currentTier.name}</div>
            <div className="syne text-[42px] tracking-[-0.03em] mb-2">{currentTier.price}</div>
            <p className="text-[13px] text-[#6b6b6b] mb-8 font-light">{currentTier.note}</p>
            <ul className="list-none p-0 m-0 mb-8">
              {currentTier.features.map((f) => (
                <li key={f} className="flex items-start gap-3 py-3 text-sm border-b border-black/10 font-normal">
                  <span className="font-bold flex-shrink-0 mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="/#contact"
              className="inline-block px-8 py-4 rounded-full bg-[#0d0d0d] text-[#f5f3ef] font-bold text-[14px] tracking-[0.02em] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] transition-colors"
            >
              Get started
            </a>
          </div>
        </div>
      </div>

      {/* ── MOBILE ───────────────────────────────────────────────── */}
      {/* All packages shown flat, grouped by category, no tab switcher */}

      <div className="md:hidden px-6 pt-2 pb-24 space-y-12">
        {tabs.map(({ key: tabKey, label: tabLabel, icon, tiers }) => (
          <div key={tabKey}>
            {/* Category label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#f0c93a] flex items-center justify-center flex-shrink-0 text-[#0d0d0d]">
                {icon}
              </div>
              <span className="syne text-[22px] font-bold tracking-[-0.02em] leading-none text-[#0d0d0d]">
                {tabLabel}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {tiers.map(({ key, name, price, desc, features, visibleFeatureCount }) => {
                const visibleFeatures = features.slice(0, visibleFeatureCount);
                const hiddenFeatures = features.slice(visibleFeatureCount);
                const isOpen = openAccordions.has(key);

                return (
                  <div key={key} className="bg-white p-6 rounded-2xl">
                    {/* Name + price */}
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-bold text-base">{name}</span>
                      <span className="syne text-xl text-[#0d0d0d]">{price}</span>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] text-[#6b6b6b] font-light leading-relaxed mb-4">{desc}</p>

                    {/* Always-visible features */}
                    {visibleFeatures.length > 0 && (
                      <ul className="list-none p-0 m-0">
                        {visibleFeatures.map((f) => (
                          <li key={f} className="flex items-start gap-3 py-2.5 text-sm border-b border-black/10 font-normal">
                            <span className="font-bold flex-shrink-0 mt-0.5">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Accordion for remaining features */}
                    {hiddenFeatures.length > 0 && (
                      <>
                        {isOpen && (
                          <ul className="list-none p-0 m-0">
                            {hiddenFeatures.map((f) => (
                              <li key={f} className="flex items-start gap-3 py-2.5 text-sm border-b border-black/10 font-normal">
                                <span className="font-bold flex-shrink-0 mt-0.5">✓</span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        )}
                        <button
                          onClick={() => toggleAccordion(key)}
                          className="mt-3 text-[12px] font-medium text-[#6b6b6b] border-none bg-transparent cursor-pointer p-0 flex items-center gap-1.5 hover:text-[#0d0d0d] transition-colors"
                        >
                          {isOpen ? (
                            <>Show less <span className="text-[9px] leading-none">▲</span></>
                          ) : (
                            <>+{hiddenFeatures.length} more <span className="text-[9px] leading-none">▼</span></>
                          )}
                        </button>
                      </>
                    )}

                    {/* CTA */}
                    <a
                      href="/#contact"
                      className="mt-5 inline-block px-6 py-3 rounded-full bg-[#0d0d0d] text-[#f5f3ef] font-bold text-[13px] tracking-[0.02em] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] transition-colors"
                    >
                      Get started
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
