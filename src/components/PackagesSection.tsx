"use client";

import { useState } from "react";

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
}

const tierDetails: Record<TierKey, TierDetail> = {
  "web-starter": {
    name: "1 Page Website", price: "£1,000+", note: "One-off project fee. Hosting from £40/mo.",
    features: ["Single page, fully custom design", "Mobile-first, accessibility-compliant build", "SEO foundations & Google Analytics setup", "Enquiry form with email notifications", "Map integration & transport links", "2 rounds of revisions included", "30-day post-launch support"],
  },
  "web-pro": {
    name: "Full CMS", price: "£2,500+", note: "One-off project fee. Hosting from £60/mo.",
    features: ["Multi-page site, fully custom design", "Self-managed property listings CMS", "Unit availability & status management", "Enquiry management & lead capture", "SEO-optimised listing pages", "2 rounds of revisions included", "3 months post-launch support"],
  },
  "web-full": {
    name: "Full CMS + Email", price: "£3,000+", note: "One-off project fee. Hosting from £60/mo.",
    features: ["Everything in Full CMS", "Branded email template design", "Newsletter & campaign setup", "Automated enquiry follow-up emails", "Mailing list integration", "Email analytics & reporting setup", "3 months post-launch support"],
  },
  "print-brochure": {
    name: "Letting Brochure", price: "£300+", note: "Includes print-ready PDF + editable source file.",
    features: ["Custom layout design", "Floor plan integration & specification tables", "Location maps & transport links", "Agent contact page & enquiry details", "Print-ready PDF to your print spec", "Editable source file for future updates", "2 rounds of revisions included"],
  },
  "print-landlord": {
    name: "Landlord Pack", price: "£800+", note: "PDF + editable source files delivered.",
    features: ["Agency credentials & track record section", "Case studies & testimonial layouts", "Service overview & fee structure pages", "Professional cover & divider design", "Print-ready PDF & digital version", "Editable source files included", "2 rounds of revisions included"],
  },
  "print-shopping": {
    name: "Shopping Centre Pack", price: "£1,000+", note: "Full suite: all files print-ready + editable.",
    features: ["Retail destination brochure design", "Floor plan & unit schedule layouts", "Footfall & catchment data pages", "Retailer mix & case studies", "Development presentation deck", "All print-ready + editable files", "3 rounds of revisions included"],
  },
  "brand-light": {
    name: "Light Touch", price: "£1,500+", note: "Perfect for new agencies launching quickly.",
    features: ["Logo design (2 concepts, 3 revisions)", "Primary colour palette & typography selection", "Basic brand usage guidelines (PDF)", "Logo files in all formats (SVG, PNG, EPS)", "Social media profile assets", "Email signature template"],
  },
  "brand-full": {
    name: "Full Brand", price: "£4,000+", note: "The complete identity system.",
    features: ["Logo design (3 concepts, unlimited revisions)", "Full colour palette & typography system", "Comprehensive brand guidelines (30+ pages)", "All file formats & sizes", "Stationery suite (cards, letterhead, email)", "Digital asset kit (social, web, email)", "Brand pattern & illustration style"],
  },
  "brand-refresh": {
    name: "Brand Refresh", price: "£1,000+", note: "Modernised visuals, preserved recognition.",
    features: ["Brand audit & review session", "Logo evolution (not replacement)", "Updated colour palette & typefaces", "Refreshed brand guidelines", "Updated asset library", "Side-by-side before/after presentation", "3 rounds of refinement"],
  },
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "web", label: "Web Packages" },
  { key: "print", label: "Print Packages" },
  { key: "brand", label: "Brand Packages" },
];

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

  function handleTabChange(tab: TabKey) {
    setActiveTab(tab);
    setActiveTier(defaultTierByTab[tab]);
  }

  const detail = tierDetails[activeTier];

  return (
    <section id="packages" className="px-6 md:px-12 py-24 bg-[#f0ede6]">
      {/* Header */}
      <div className="text-center mb-16 fade-up">
        <h2 className="syne text-[clamp(36px,4vw,56px)] tracking-[-0.03em] leading-[1.05] mb-4">
          Packages built for letting agencies
        </h2>
        <p className="text-[16px] text-[#6b6b6b] max-w-[480px] mx-auto font-light">
          Fixed prices. Fast turnarounds. No account managers, no bloated agency markup. Just great work delivered by people who understand your industry.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-1 mb-12 border-b border-black/12">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleTabChange(key)}
            className={`px-7 py-3 text-[13px] font-bold tracking-[0.05em] uppercase border-none cursor-pointer transition-colors duration-200 border-b-2 -mb-px ${
              activeTab === key
                ? "text-[#0d0d0d] border-[#0d0d0d] bg-transparent"
                : "text-[#6b6b6b] border-transparent bg-transparent hover:text-[#0d0d0d]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        {/* Tier list */}
        <div className="flex flex-col gap-[3px]">
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
                  <span
                    className={`syne text-xl ${isActive ? "text-[#f0c93a]" : "text-[#0d0d0d] group-hover:text-[#f0c93a]"}`}
                  >
                    {price}
                  </span>
                </div>
                <p
                  className={`text-[13px] leading-relaxed font-light ${
                    isActive ? "text-white/50" : "text-[#6b6b6b] group-hover:text-white/50"
                  }`}
                >
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
              <li
                key={f}
                className="flex items-start gap-3 py-3 text-sm border-b border-black/10 font-normal"
              >
                <span className="font-bold flex-shrink-0 mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <a
            href="/#contact"
            className="inline-block px-8 py-4 bg-[#0d0d0d] text-[#f5f3ef] font-bold text-[14px] tracking-[0.02em] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] transition-colors"
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
}
