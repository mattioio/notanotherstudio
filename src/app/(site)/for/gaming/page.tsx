import type { Metadata } from "next";
import type { PackagesConfig } from "@/components/PackagesSection";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Gaming",
  description:
    "Studio branding, key art, Steam assets and launch marketing for game studios and developers. Press kits, social media and brand identity packages.",
  alternates: { canonical: "/for/gaming" },
  openGraph: {
    title: "Gaming — Not Another Studio",
    description:
      "Studio branding, key art, Steam assets and launch marketing for game studios and developers.",
    url: "/for/gaming",
  },
};

const marqueeItems = [
  "Studio Branding", "Game Marketing", "Key Art", "Steam Assets",
  "Press Kits", "Social Media", "Brand Identity", "Launch Design",
  "Studio Branding", "Game Marketing", "Key Art", "Steam Assets",
  "Press Kits", "Social Media", "Brand Identity", "Launch Design",
];

const services = [
  {
    slug: "brand",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    name: "Studio Branding",
    desc: "A memorable studio identity that builds recognition across platforms, communities and press — from logo to full brand system.",
    from: "£1,500+",
    features: ["Logo design", "Brand guidelines", "Digital asset kit", "Social presence"],
  },
  {
    slug: "marketing",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <rect x="3" y="3" width="18" height="18" rx="0"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    name: "Game Marketing",
    desc: "Key art, store assets, trailers and press kits designed to drive wishlists, reviews and launch-day sales.",
    from: "£800+",
    features: ["Key art & cover design", "Steam / App Store assets", "Press kit design", "Launch collateral"],
  },
  {
    slug: "web",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <rect x="2" y="3" width="20" height="14" rx="0"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    name: "Digital Presence",
    desc: "Websites and community-ready social presence that builds momentum and excitement before and after launch.",
    from: "£1,000+",
    features: ["Studio or game website", "Social media assets", "Discord branding", "Hosting included"],
  },
];

const packages: PackagesConfig = {
  heading: "Packages built for game studios",
  subheading: "Fixed prices. Fast turnarounds. No account managers, no bloated agency markup. Just great work delivered by people who understand your industry.",
  tabs: [
    {
      key: "brand",
      label: "Studio Branding",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1.5L16.5 9L9 16.5L1.5 9L9 1.5Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 5L13 9L9 13L5 9L9 5Z" fill="currentColor"/>
        </svg>
      ),
      tiers: [
        {
          key: "brand-light",
          name: "Light Touch",
          price: "£1,500+",
          desc: "A sharp studio identity for teams launching quickly — logo, colours and core assets ready for socials and storefronts.",
          note: "Perfect for studios launching their first title.",
          features: ["Logo design (2 concepts, 3 revisions)", "Primary colour palette & typography", "Basic brand usage guidelines (PDF)", "Logo files in all formats (SVG, PNG, EPS)", "Social media profile assets", "Email signature template"],
          visibleFeatureCount: 3,
        },
        {
          key: "brand-full",
          name: "Full Brand",
          price: "£4,000+",
          desc: "A complete studio identity system — logo, typography, colour, guidelines and a full asset kit for every platform.",
          note: "The complete identity system.",
          features: ["Logo design (3 concepts, unlimited revisions)", "Full colour palette & typography system", "Comprehensive brand guidelines (30+ pages)", "All file formats & sizes", "Stationery suite (cards, letterhead, email)", "Digital asset kit (social, web, store)", "Brand pattern & illustration style"],
          visibleFeatureCount: 4,
        },
        {
          key: "brand-refresh",
          name: "Brand Refresh",
          price: "£1,000+",
          desc: "Modernise an existing studio brand — updated visuals, refreshed assets and new guidelines without losing recognition.",
          note: "Modernised visuals, preserved recognition.",
          features: ["Brand audit & review session", "Logo evolution (not replacement)", "Updated colour palette & typefaces", "Refreshed brand guidelines", "Updated asset library", "Side-by-side before/after presentation", "3 rounds of refinement"],
          visibleFeatureCount: 3,
        },
      ],
    },
    {
      key: "marketing",
      label: "Game Marketing",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="2" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="2" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="6" y1="2" x2="6" y2="16" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      tiers: [
        {
          key: "marketing-launch",
          name: "Launch Kit",
          price: "£800+",
          desc: "Key art, store assets and social graphics — everything you need for a polished storefront on launch day.",
          note: "All files delivered in platform-required formats.",
          features: ["Key art / cover design", "Steam capsule assets (all sizes)", "Social media launch graphics", "Storefront screenshots template", "Platform-specific file formats", "1 round of revisions"],
          visibleFeatureCount: 3,
        },
        {
          key: "marketing-press",
          name: "Press Kit",
          price: "£500+",
          desc: "A professional digital press kit that makes journalists' jobs easy — screenshots, logos, factsheet and boilerplate ready to go.",
          note: "Hosted online + downloadable ZIP.",
          features: ["Branded presskit page design", "Screenshot selection & formatting", "Logo & asset package", "Factsheet & boilerplate copy", "Hosted online (presskit.html)", "Downloadable ZIP for press", "1 round of revisions"],
          visibleFeatureCount: 3,
        },
        {
          key: "marketing-full",
          name: "Full Campaign",
          price: "£2,000+",
          desc: "Complete marketing suite: key art, store assets, press kit, social templates and event collateral — all on-brand.",
          note: "Full marketing suite for a major launch.",
          features: ["Everything in Launch Kit", "Everything in Press Kit", "Trailer end-card design", "Event banner / booth graphics", "Community update templates", "3 rounds of revisions", "30-day post-launch support"],
          visibleFeatureCount: 4,
        },
      ],
    },
    {
      key: "web",
      label: "Digital Presence",
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
          key: "web-landing",
          name: "Game Landing Page",
          price: "£1,000+",
          desc: "A single-page site for your game — trailer embed, screenshots, wishlist CTA and press quotes in one polished page.",
          note: "One-off project fee. Hosting from £40/mo.",
          features: ["Single page, fully custom design", "Trailer embed & screenshot gallery", "Wishlist / buy now CTA buttons", "Press quote section", "Social links & community join", "2 rounds of revisions included", "30-day post-launch support"],
          visibleFeatureCount: 4,
        },
        {
          key: "web-studio",
          name: "Studio Website",
          price: "£2,500+",
          desc: "A multi-page studio site with a game portfolio, team section and news blog — all manageable via CMS.",
          note: "One-off project fee. Hosting from £60/mo.",
          features: ["Multi-page site, fully custom design", "Game portfolio with CMS", "Team & about section", "News / devlog blog", "Press & media page", "2 rounds of revisions included", "3 months post-launch support"],
          visibleFeatureCount: 4,
        },
        {
          key: "web-full",
          name: "Studio + Community",
          price: "£3,000+",
          desc: "Everything in Studio Website plus Discord branding, community assets and email newsletter setup.",
          note: "One-off project fee. Hosting from £60/mo.",
          features: ["Everything in Studio Website", "Discord server branding & assets", "Community badge & role icons", "Email newsletter setup", "Mailing list integration", "Social media template suite", "3 months post-launch support"],
          visibleFeatureCount: 3,
        },
      ],
    },
  ],
};

const steps = [
  { num: "01", title: "Discovery Call", body: "We learn about your studio, your game and your goals. Usually 30 minutes. No prep required." },
  { num: "02", title: "Proposal & Quote", body: "You receive a clear scope, fixed price and timeline. No surprises, no scope creep." },
  { num: "03", title: "Design & Build", body: "We handle everything. You review at two structured checkpoints. Nothing more." },
  { num: "04", title: "Launch & Handover", body: "We deliver all final files and assets — ready for upload, press and community sharing from day one." },
];

const workProjects = [
  {
    num: "01",
    client: "Mobile Games",
    location: "UK",
    services: ["Brand", "Marketing"],
    images: ["/images/work-mobilegames1.jpeg", "/images/work-mobilegames2.jpeg"],
  },
  {
    num: "02",
    client: "Project Solaris",
    location: "UK",
    services: ["Brand", "Key Art"],
    images: ["/images/work-solaris1.jpeg", "/images/work-solaris2.jpeg"],
  },
  {
    num: "03",
    client: "Your project here",
    location: "",
    services: [],
    images: ["/images/work-yourproject.jpeg"],
  },
];

export default function GamingPage() {
  return (
    <IndustryPageTemplate
      hero={{
        eyebrow: "For Game Studios & Developers",
        headline: "The creative behind your game",
        description: "We design studio branding, marketing materials and digital presence for game studios and indie developers who want to build something memorable.",
        images: [
          "/images/gaming/banner1.jpeg",
          "/images/gaming/banner2.jpeg",
          "/images/gaming/banner3.jpeg",
          "/images/gaming/banner4.jpeg",
        ],
      }}
      marqueeItems={marqueeItems}
      services={services}
      servicesHeading="Brand, market and launch — all in one place"
      workProjects={workProjects}
      packages={packages}
      steps={steps}
      process={{
        heading: "Simple process, no agency jargon",
        description: "You're building the game. We'll handle the brand. One brief, two check-ins, one launch — so you can stay focused on what matters.",
      }}
      contact={{
        headline: <>Ready to build <span className="text-[#f0c93a]">something worth playing?</span></>,
        body: "Great games deserve great branding. Whether you're a solo dev or a growing studio, we'll build the visual identity your game needs to stand out. Drop us a message — we'll come back within one working day.",
      }}
    />
  );
}
