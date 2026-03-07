"use client";

import React, { useState, useEffect, useRef } from "react";

type TabKey = "web" | "print" | "brand";
type TierKey =
  | "web-starter" | "web-pro" | "web-full"
  | "print-brochure" | "print-landlord" | "print-shopping"
  | "brand-light" | "brand-full" | "brand-refresh";

interface TierDetail {
  name: string;
  price: string;
  note: string;
  features: string[];
  // Features shown on mobile before the "View more" accordion — edit per package below
  visibleFeatureCount: number;
}

const tierDetails: Record<TierKey, TierDetail> = {
  "web-starter": {
    name: "1 Page Website", price: "£1,000+", note: "One-off project fee. Hosting from £40/mo.",
    features: ["Single page, fully custom design", "Mobile-first, accessibility-compliant build", "SEO foundations & Google Analytics setup", "Enquiry form with email notifications", "Map integration & transport links", "2 rounds of revisions included", "30-day post-launch support"],
    visibleFeatureCount: 4,
  },
  "web-pro": {
    name: "Full CMS", price: "£2,500+", note: "One-off project fee. Hosting from £60/mo.",
    features: ["Multi-page site, fully custom design", "Self-managed property listings CMS", "Unit availability & status management", "Enquiry management & lead capture", "SEO-optimised listing pages", "2 rounds of revisions included", "3 months post-launch support"],
    visibleFeatureCount: 4,
  },
  "web-full": {
    name: "Full CMS + Email", price: "£3,000+", note: "One-off project fee. Hosting from £60/mo.",
    features: ["Everything in Full CMS", "Branded email template design", "Newsletter & campaign setup", "Automated enquiry follow-up emails", "Mailing list integration", "Email analytics & reporting setup", "3 months post-launch support"],
    visibleFeatureCount: 3,
  },
  "print-brochure": {
    name: "Letting Brochure", price: "£300+", note: "Includes print-ready PDF + editable source file.",
    features: ["Custom layout design", "Floor plan integration & specification tables", "Location maps & transport links", "Agent contact page & enquiry details", "Print-ready PDF to your print spec", "Editable source file for future updates", "2 rounds of revisions included"],
    visibleFeatureCount: 3,
  },
  "print-landlord": {
    name: "Landlord Pack", price: "£800+", note: "PDF + editable source files delivered.",
    features: ["Agency credentials & track record section", "Case studies & testimonial layouts", "Service overview & fee structure pages", "Professional cover & divider design", "Print-ready PDF & digital version", "Editable source files included", "2 rounds of revisions included"],
    visibleFeatureCount: 3,
  },
  "print-shopping": {
    name: "Shopping Centre Pack", price: "£1,000+", note: "Full suite: all files print-ready + editable.",
    features: ["Retail destination brochure design", "Floor plan & unit schedule layouts", "Footfall & catchment data pages", "Retailer mix & case studies", "Development presentation deck", "All print-ready + editable files", "3 rounds of revisions included"],
    visibleFeatureCount: 3,
  },
  "brand-light": {
    name: "Light Touch", price: "£1,500+", note: "Perfect for new agencies launching quickly.",
    features: ["Logo design (2 concepts, 3 revisions)", "Primary colour palette & typography selection", "Basic brand usage guidelines (PDF)", "Logo files in all formats (SVG, PNG, EPS)", "Social media profile assets", "Email signature template"],
    visibleFeatureCount: 3,
  },
  "brand-full": {
    name: "Full Brand", price: "£4,000+", note: "The complete identity system.",
    features: ["Logo design (3 concepts, unlimited revisions)", "Full colour palette & typography system", "Comprehensive brand guidelines (30+ pages)", "All file formats & sizes", "Stationery suite (cards, letterhead, email)", "Digital asset kit (social, web, email)", "Brand pattern & illustration style"],
    visibleFeatureCount: 4,
  },
  "brand-refresh": {
    name: "Brand Refresh", price: "£1,000+", note: "Modernised visuals, preserved recognition.",
    features: ["Brand audit & review session", "Logo evolution (not replacement)", "Updated colour palette & typefaces", "Refreshed brand guidelines", "Updated asset library", "Side-by-side before/after presentation", "3 rounds of refinement"],
    visibleFeatureCount: 3,
  },
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "web", label: "Web Packages" },
  { key: "print", label: "Print Packages" },
  { key: "brand", label: "Brand Packages" },
];

const categoryIcons: Record<TabKey, React.ReactNode> = {
  web: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="3" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="1" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="3.5" cy="5" r="0.8" fill="currentColor"/>
      <circle cx="6" cy="5" r="0.8" fill="currentColor"/>
    </svg>
  ),
  print: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="1" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="6" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="6" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  brand: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5L16.5 9L9 16.5L1.5 9L9 1.5Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 5L13 9L9 13L5 9L9 5Z" fill="currentColor"/>
    </svg>
  ),
};

const tiersByTab: Record<TabKey, { key: TierKey; name: string; price: string; desc: string }[]> = {
  web: [
    { key: "web-starter", name: "1 Page Website", price: "£1,000+", desc: "A sharp single-page site, ideal for individual agents, new developments, or a quick professional presence." },
    { key: "web-pro", name: "Full CMS", price: "£2,500+", desc: "Full agency site plus a self-managed property CMS: list commercial units, update availability, and capture leads in real time." },
    { key: "web-full", name: "Full CMS + Email", price: "£3,000+", desc: "Everything in Full CMS plus a branded email marketing setup: newsletters, campaigns, and automated enquiry follow-ups." },
  ],
  print: [
    { key: "print-brochure", name: "Letting Brochure", price: "£300+", desc: "A polished PDF brochure for a single unit or development, ready to send or print." },
    { key: "print-landlord", name: "Landlord Pack", price: "£800+", desc: "A professional pack to win landlord instructions: credentials, case studies, and service overview in one document." },
    { key: "print-shopping", name: "Shopping Centre Pack", price: "£1,000+", desc: "A comprehensive print suite for retail destinations: brochure, floor plans, unit schedule, and presentation deck." },
  ],
  brand: [
    { key: "brand-refresh", name: "Brand Refresh", price: "£1,000+", desc: "Evolve an existing brand, modernising visuals and updating assets while preserving recognition." },
    { key: "brand-full", name: "Full Brand", price: "£4,000+", desc: "A complete identity system: logo, colour, typography, guidelines, and a full digital asset kit." },
  ],
};

const defaultTierByTab: Record<TabKey, TierKey> = {
  web: "web-starter",
  print: "print-brochure",
  brand: "brand-refresh",
};

export default function PackagesSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("web");
  const [activeTier, setActiveTier] = useState<TierKey>("web-starter");
  const [openAccordions, setOpenAccordions] = useState<Set<TierKey>>(new Set());
  const [isStuck, setIsStuck] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      const el = tabBarRef.current;
      if (!el) return;
      // Detect when stuck below the main nav
      setIsStuck(el.getBoundingClientRect().top <= 100);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  function handleTabChange(tab: TabKey) {
    setActiveTab(tab);
    setActiveTier(defaultTierByTab[tab]);
    // Snap content to just below the sticky packages tab bar
    if (contentRef.current && tabBarRef.current) {
      const tabBarH = tabBarRef.current.getBoundingClientRect().height;
      const contentTop = contentRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: contentTop - tabBarH, behavior: "smooth" });
    }
  }

  function toggleAccordion(key: TierKey) {
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const detail = tierDetails[activeTier];

  return (
    <section id="packages" className="bg-[#f0ede6]">
      {/* Header */}
      <div className="px-6 md:px-12 pt-24">
        <div className="text-center mb-16 fade-up">
          <h2 className="syne text-[clamp(36px,4vw,56px)] tracking-[-0.03em] leading-[1.05] mb-4">
            Packages built for letting agencies
          </h2>
          <p className="text-[16px] text-[#6b6b6b] max-w-[480px] mx-auto font-light">
            Fixed prices. Fast turnarounds. No account managers, no bloated agency markup. Just great work delivered by people who understand your industry.
          </p>
        </div>
      </div>

      {/* ── DESKTOP ──────────────────────────────────────────────── */}

      {/* Sticky tab bar — pill style */}
      <div ref={tabBarRef} data-packages-tabbar className="hidden md:flex sticky top-5 z-40 justify-center pb-4">
        <nav className="inline-flex items-center gap-1 bg-white/70 backdrop-blur-xl rounded-full px-1.5 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.10)] border border-white/50">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`px-5 py-2 text-[13px] font-medium border-none rounded-full cursor-pointer transition-all duration-200 ${
                activeTab === key
                  ? "bg-[#0d0d0d] text-white"
                  : "bg-transparent text-[#555] hover:text-[#0d0d0d] hover:bg-black/5"
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
          <div className="flex flex-col gap-[3px] sticky top-[48px] self-start">
            {tiersByTab[activeTab].map(({ key, name, price, desc }) => {
              const isActive = activeTier === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTier(key)}
                  className={`text-left p-8 cursor-pointer border-none transition-colors duration-200 border-l-[3px] ${
                    isActive
                      ? "bg-[#0d0d0d] text-white border-[#f0c93a]"
                      : "bg-white text-[#0d0d0d] border-transparent hover:bg-[#0d0d0d] hover:text-white hover:border-[#f0c93a]"
                  } group`}
                >
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="font-bold text-base">{name}</span>
                    <span className={`syne text-xl ${isActive ? "text-[#f0c93a]" : "text-[#0d0d0d] group-hover:text-[#f0c93a]"}`}>
                      {price}
                    </span>
                  </div>
                  <p className={`text-[13px] leading-relaxed font-light ${isActive ? "text-white/50" : "text-[#6b6b6b] group-hover:text-white/50"}`}>
                    {desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="bg-white p-10">
            <div className="syne text-[28px] tracking-[-0.02em] mb-2">{detail.name}</div>
            <div className="syne text-[42px] tracking-[-0.03em] mb-2">{detail.price}</div>
            <p className="text-[13px] text-[#6b6b6b] mb-8 font-light">{detail.note}</p>
            <ul className="list-none p-0 m-0 mb-8">
              {detail.features.map((f) => (
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
        {tabs.map(({ key: tabKey, label: tabLabel }) => (
          <div key={tabKey}>
            {/* Category label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#f0c93a] flex items-center justify-center flex-shrink-0 text-[#0d0d0d]">
                {categoryIcons[tabKey]}
              </div>
              <span className="syne text-[22px] font-bold tracking-[-0.02em] leading-none text-[#0d0d0d]">
                {tabLabel}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {tiersByTab[tabKey].map(({ key, name, price, desc }) => {
                const d = tierDetails[key];
                const visibleFeatures = d.features.slice(0, d.visibleFeatureCount);
                const hiddenFeatures = d.features.slice(d.visibleFeatureCount);
                const isOpen = openAccordions.has(key);

                return (
                  <div key={key} className="bg-white p-6">
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
                      className="mt-5 inline-block px-6 py-3 bg-[#0d0d0d] text-[#f5f3ef] font-bold text-[13px] tracking-[0.02em] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] transition-colors"
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
