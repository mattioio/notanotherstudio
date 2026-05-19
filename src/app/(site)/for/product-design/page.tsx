import type { Metadata } from "next";
import type { PackagesConfig } from "@/components/PackagesSection";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Product Design",
  description:
    "UX research, interface design and brand for product teams and startups. Fixed-price packages with fast turnarounds — no bloated agency markup.",
  alternates: { canonical: "/for/product-design" },
  openGraph: {
    title: "Product Design — Not Another Studio",
    description:
      "UX research, interface design and brand for product teams and startups. Fixed-price packages with fast turnarounds.",
    url: "/for/product-design",
  },
};

const marqueeItems = [
  "UX Design", "Product Design", "App Interfaces", "Pitch Decks",
  "User Research", "Prototyping", "Brand Identity", "Digital Products",
  "UX Design", "Product Design", "App Interfaces", "Pitch Decks",
  "User Research", "Prototyping", "Brand Identity", "Digital Products",
];

const services = [
  {
    slug: "uiux",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    name: "UI & UX",
    desc: "Custom app and product interfaces built from real user research. Every screen designed to convert, retain and delight.",
    from: "£800+",
    features: ["UX audits", "Interface design", "Design systems", "Developer handoff"],
  },
  {
    slug: "pitch",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <rect x="2" y="2" width="20" height="20" rx="0"/><path d="M2 8h20M8 2v20"/>
      </svg>
    ),
    name: "Pitch Decks",
    desc: "Investor-ready decks designed to close rounds. Clear narrative, sharp data visualisation and professional layouts.",
    from: "£500+",
    features: ["Startup decks", "Investor presentations", "One-pagers", "Leave-behinds"],
  },
  {
    slug: "marketing",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <rect x="2" y="3" width="20" height="14" rx="0"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    name: "Marketing Material",
    desc: "Web, social and email assets that drive signups and build momentum — from launch campaigns to ongoing content.",
    from: "£400+",
    features: ["Landing pages", "Social templates", "Email campaigns", "Sales collateral"],
  },
];

const packages: PackagesConfig = {
  heading: "Packages built for product teams",
  subheading: "Fixed prices. Fast turnarounds. No account managers, no bloated agency markup. Just great work delivered by people who understand your product.",
  tabs: [
    {
      key: "uiux",
      label: "UI & UX",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      ),
      tiers: [
        {
          key: "ux-audit",
          name: "UX Audit",
          price: "£800+",
          desc: "A focused review of your existing product — identifying friction points, quick wins and UX improvements.",
          note: "Delivered as a prioritised report with actionable recommendations.",
          features: ["Heuristic usability review", "User flow analysis", "Competitor benchmarking", "Prioritised recommendations report", "30-min walkthrough call", "Quick-win implementation notes"],
          visibleFeatureCount: 3,
        },
        {
          key: "ui-design",
          name: "Full UI/UX Design",
          price: "£2,500+",
          desc: "End-to-end design for a product, app or feature — from user research through to developer handoff.",
          note: "Includes all source files, prototypes and handoff documentation.",
          features: ["User research & journey mapping", "Wireframes & information architecture", "High-fidelity interface design", "Interactive prototype", "Developer handoff (Figma)", "2 rounds of revisions", "30-day post-handoff support"],
          visibleFeatureCount: 4,
        },
      ],
    },
    {
      key: "pitch",
      label: "Pitch Decks",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="2" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="2" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="6" y1="2" x2="6" y2="16" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      tiers: [
        {
          key: "pitch-starter",
          name: "Startup Deck",
          price: "£500+",
          desc: "A clean, investor-ready pitch deck up to 15 slides — perfect for early-stage fundraising.",
          note: "Delivered as editable Keynote/PowerPoint + PDF.",
          features: ["Custom slides", "Narrative structure & flow", "Data visualisation", "Editable source file", "PDF export for sharing", "1 round of revisions"],
          visibleFeatureCount: 3,
        },
        {
          key: "pitch-investor",
          name: "Investor Deck",
          price: "£1,200+",
          desc: "A full narrative deck with financial layouts, data viz and appendix — designed to close rounds.",
          note: "Keynote/PowerPoint + PDF + one-pager.",
          features: ["Up to 30 custom slides", "Financial model visualisation", "Market sizing & competitive slides", "Appendix section", "Matching one-pager (PDF)", "Editable source files", "2 rounds of revisions"],
          visibleFeatureCount: 4,
        },
        {
          key: "pitch-suite",
          name: "Full Pitch Suite",
          price: "£2,000+",
          desc: "Everything investors need: deck, one-pager, executive summary and leave-behind — all on-brand.",
          note: "Complete fundraising collateral set.",
          features: ["Everything in Investor Deck", "Executive summary document", "Branded leave-behind PDF", "Teaser deck (5-slide version)", "Print-ready versions", "3 rounds of revisions", "Template for future updates"],
          visibleFeatureCount: 4,
        },
      ],
    },
    {
      key: "marketing",
      label: "Marketing Material",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="3" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="1" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="3.5" cy="5" r="0.8" fill="currentColor"/>
          <circle cx="6" cy="5" r="0.8" fill="currentColor"/>
        </svg>
      ),
      tiers: [
        {
          key: "marketing-social",
          name: "Social Kit",
          price: "£400+",
          desc: "Branded templates for Instagram, LinkedIn, Twitter and more — ready to use across all major platforms.",
          note: "Editable templates in Figma or Canva.",
          features: ["Platform-specific templates", "Story & post formats", "Brand-consistent layouts", "Editable source files", "Asset export guide", "1 round of revisions"],
          visibleFeatureCount: 3,
        },
        {
          key: "marketing-web",
          name: "Web & Social Pack",
          price: "£1,000+",
          desc: "A landing page plus social media template suite — everything you need for a product launch or campaign.",
          note: "One-off project fee. Hosting from £40/mo.",
          features: ["Custom landing page design & build", "Social media template suite", "Email announcement template", "Open Graph & meta images", "Hosting setup included", "2 rounds of revisions"],
          visibleFeatureCount: 4,
        },
        {
          key: "marketing-full",
          name: "Full Marketing Suite",
          price: "£2,000+",
          desc: "Complete marketing collateral: website, social assets, email templates and sales materials — all on-brand.",
          note: "One-off project fee. Hosting from £40/mo.",
          features: ["Everything in Web & Social Pack", "Email campaign templates", "Sales deck / case study template", "Blog post header templates", "Brand asset library", "3 rounds of revisions", "30-day post-launch support"],
          visibleFeatureCount: 4,
        },
      ],
    },
  ],
};

const steps = [
  { num: "01", title: "Discovery & Research", body: "We learn about your product, your users and your goals. We map user journeys and identify the problems worth solving." },
  { num: "02", title: "Proposal & Scope", body: "You receive a clear scope, fixed price and timeline. We agree on deliverables before a single pixel is placed." },
  { num: "03", title: "Design & Iterate", body: "We design, prototype and refine. You review at two structured checkpoints and give focused feedback." },
  { num: "04", title: "Handoff & Support", body: "We deliver dev-ready files, documentation and a 30-day support window so your team can build with confidence." },
];

const workProjects = [
  {
    num: "01",
    client: "Zego",
    location: "London",
    services: ["Presentation", "UI Design", "UX Design"],
    images: ["/images/product-design/work-zego1.jpg", "/images/product-design/work-zego2.jpg"],
  },
  {
    num: "02",
    client: "Orchid ID",
    location: "UK",
    services: ["UI Design", "UX Design"],
    images: ["/images/product-design/work-orchidid1.jpg", "/images/product-design/work-orchidid2.jpg"],
  },
  {
    num: "03",
    client: "104 Impact",
    location: "UK",
    services: ["Brand", "Presentation"],
    images: ["/images/product-design/work-1041.jpg", "/images/product-design/work-1042.jpg"],
  },
  {
    num: "04",
    client: "Deo",
    location: "UK",
    services: ["Presentation"],
    images: ["/images/product-design/work-deo1.jpg", "/images/product-design/work-deo2.jpg"],
  },
  {
    num: "05",
    client: "Your project here",
    location: "",
    services: [],
    images: ["/images/work-yourproject.jpeg"],
  },
];

export default function ProductDesignPage() {
  return (
    <IndustryPageTemplate
      hero={{
        eyebrow: "For Product Teams & Startups",
        headline: "The design team behind your product",
        description: "We design apps, tools and digital products that feel right from day one. UX research, interface design and brand — built to scale with your business.",
        images: [
          "/images/product-design/banner1.jpg",
          "/images/product-design/banner2.jpg",
          "/images/product-design/banner3.jpg",
          "/images/product-design/banner4.jpg",
        ],
      }}
      marqueeItems={marqueeItems}
      services={services}
      servicesHeading="Design, pitch and promote — all in one place"
      workProjects={workProjects}
      packages={packages}
      steps={steps}
      process={{
        heading: "Research first. Then design.",
        description: "We don't guess. Every design decision is grounded in real user behaviour and your business goals. One brief, two checkpoints, one handoff.",
      }}
      contact={{
        headline: <>Ready to build <span className="text-[#f0c93a]">something users love?</span></>,
        body: "Great product design isn't just about how things look — it's about how they work. Drop us a message and we'll come back within one working day.",
      }}
    />
  );
}
