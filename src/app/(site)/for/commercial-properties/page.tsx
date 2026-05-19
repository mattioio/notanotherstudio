import type { Metadata } from "next";
import type { PackagesConfig } from "@/components/PackagesSection";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Commercial Letting Agencies",
  description:
    "Websites, letting brochures and brand identities built exclusively for commercial letting agencies. Property CMS, lead capture and print — from £300.",
  alternates: { canonical: "/for/commercial-properties" },
  openGraph: {
    title: "Commercial Letting Agencies — Not Another Studio",
    description:
      "Websites, letting brochures and brand identities built exclusively for commercial letting agencies.",
    url: "/for/commercial-properties",
  },
};

const marqueeItems = [
  "Web Packages", "Letting Agency Sites", "Property CMS", "Letting Brochures",
  "Business Cards", "Brand Identity", "Brand Refresh", "Commercial Lettings",
  "Web Packages", "Letting Agency Sites", "Property CMS", "Letting Brochures",
  "Business Cards", "Brand Identity", "Brand Refresh", "Commercial Lettings",
];

const services = [
  {
    slug: "web",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <rect x="2" y="3" width="20" height="14" rx="0" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    name: "Web & Email",
    desc: "Custom sites with a property CMS your team can manage. Built to win instructions and capture enquiries—no developer needed.",
    from: "£1,000+",
    features: ["Landing pages", "Full property sites", "Email marketing", "Hosting included"],
  },
  {
    slug: "print",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <path d="M14 2H4v20h16V8z" fill="none" /><polyline points="14 2 14 8 20 8" fill="none" /><line x1="7" y1="13" x2="17" y2="13" /><line x1="7" y1="17" x2="17" y2="17" />
      </svg>
    ),
    name: "Print & Marketing",
    desc: "Brochures, packs, and stationery that sell. Professional design that stands out from template work.",
    from: "£300+",
    features: ["Letting brochures", "Investor presentations", "Business cards & stationery"],
  },
  {
    slug: "brand",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    name: "Brand Design",
    desc: "Distinctive branding that builds trust and makes you memorable. Complete identity system to stand out.",
    from: "£1,000+",
    features: ["Logo design", "Brand guidelines", "Digital assets", "Refresh options"],
  },
];

const packages: PackagesConfig = {
  heading: "Packages built for letting agencies",
  subheading: "Fixed prices. Fast turnarounds. No account managers, no bloated agency markup. Just great work delivered by people who understand your industry.",
  tabs: [
    {
      key: "web",
      label: "Web & Email",
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
          key: "web-starter",
          name: "1 Page Website",
          price: "£1,000+",
          desc: "A sharp single-page site, ideal for individual agents, new developments, or a quick professional presence.",
          note: "One-off project fee. Hosting from £40/mo.",
          features: ["Single page, fully custom design", "Mobile-first, accessibility-compliant build", "SEO foundations & Google Analytics setup", "Enquiry form with email notifications", "Map integration & transport links", "2 rounds of revisions included", "30-day post-launch support"],
          visibleFeatureCount: 4,
        },
        {
          key: "web-pro",
          name: "Full CMS",
          price: "£2,500+",
          desc: "Full agency site plus a self-managed property CMS: list commercial units, update availability, and capture leads in real time.",
          note: "One-off project fee. Hosting from £60/mo.",
          features: ["Multi-page site, fully custom design", "Self-managed property listings CMS", "Unit availability & status management", "Enquiry management & lead capture", "SEO-optimised listing pages", "2 rounds of revisions included", "3 months post-launch support"],
          visibleFeatureCount: 4,
        },
        {
          key: "web-full",
          name: "Full CMS + Email",
          price: "£3,000+",
          desc: "Everything in Full CMS plus a branded email marketing setup: newsletters, campaigns, and automated enquiry follow-ups.",
          note: "One-off project fee. Hosting from £60/mo.",
          features: ["Everything in Full CMS", "Branded email template design", "Newsletter & campaign setup", "Automated enquiry follow-up emails", "Mailing list integration", "Email analytics & reporting setup", "3 months post-launch support"],
          visibleFeatureCount: 3,
        },
      ],
    },
    {
      key: "print",
      label: "Print & Marketing",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="3" y="1" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="6" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="6" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      tiers: [
        {
          key: "print-brochure",
          name: "Letting Brochure",
          price: "£300+",
          desc: "A polished PDF brochure for a single unit or development, ready to send or print.",
          note: "Includes print-ready PDF + editable source file.",
          features: ["Custom layout design", "Floor plan integration & specification tables", "Location maps & transport links", "Agent contact page & enquiry details", "Print-ready PDF to your print spec", "Editable source file for future updates", "2 rounds of revisions included"],
          visibleFeatureCount: 3,
        },
        {
          key: "print-landlord",
          name: "Landlord Pack",
          price: "£800+",
          desc: "A professional pack to win landlord instructions: credentials, case studies, and service overview in one document.",
          note: "PDF + editable source files delivered.",
          features: ["Agency credentials & track record section", "Case studies & testimonial layouts", "Service overview & fee structure pages", "Professional cover & divider design", "Print-ready PDF & digital version", "Editable source files included", "2 rounds of revisions included"],
          visibleFeatureCount: 3,
        },
        {
          key: "print-shopping",
          name: "Shopping Centre Pack",
          price: "£1,000+",
          desc: "A comprehensive print suite for retail destinations: brochure, floor plans, unit schedule, and presentation deck.",
          note: "Full suite: all files print-ready + editable.",
          features: ["Retail destination brochure design", "Floor plan & unit schedule layouts", "Footfall & catchment data pages", "Retailer mix & case studies", "Development presentation deck", "All print-ready + editable files", "3 rounds of revisions included"],
          visibleFeatureCount: 3,
        },
      ],
    },
    {
      key: "brand",
      label: "Brand Design",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1.5L16.5 9L9 16.5L1.5 9L9 1.5Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 5L13 9L9 13L5 9L9 5Z" fill="currentColor"/>
        </svg>
      ),
      tiers: [
        {
          key: "brand-refresh",
          name: "Brand Refresh",
          price: "£1,000+",
          desc: "Evolve an existing brand, modernising visuals and updating assets while preserving recognition.",
          note: "Modernised visuals, preserved recognition.",
          features: ["Brand audit & review session", "Logo evolution (not replacement)", "Updated colour palette & typefaces", "Refreshed brand guidelines", "Updated asset library", "Side-by-side before/after presentation", "3 rounds of refinement"],
          visibleFeatureCount: 3,
        },
        {
          key: "brand-full",
          name: "Full Brand",
          price: "£4,000+",
          desc: "A complete identity system: logo, colour, typography, guidelines, and a full digital asset kit.",
          note: "The complete identity system.",
          features: ["Logo design (3 concepts, unlimited revisions)", "Full colour palette & typography system", "Comprehensive brand guidelines (30+ pages)", "All file formats & sizes", "Stationery suite (cards, letterhead, email)", "Digital asset kit (social, web, email)", "Brand pattern & illustration style"],
          visibleFeatureCount: 4,
        },
      ],
    },
  ],
};

const steps = [
  { num: "01", title: "Discovery Call", body: "We learn about your agency, your clients, and your goals. Usually 30 minutes. No prep required." },
  { num: "02", title: "Proposal & Quote", body: "You receive a clear scope, fixed price, and timeline. No surprises, no scope creep." },
  { num: "03", title: "Design & Build", body: "We handle everything. You review and give feedback at two structured checkpoints. Nothing more." },
  { num: "04", title: "Launch & Handover", body: "We go live, train your team on any CMS, and hand over all files so you're completely self-sufficient from day one." },
];

const workProjects = [
  {
    num: "01",
    client: "Jenkins Law",
    location: "London",
    services: ["Web", "Print"],
    images: ["/images/commercial-property/work-jenkins1.jpg", "/images/commercial-property/work-jenkins2.jpg"],
  },
  {
    num: "02",
    client: "Neill Mylroie Real Estate",
    location: "Manchester",
    services: ["Web", "Brand"],
    images: ["/images/commercial-property/work-neill1.jpg", "/images/commercial-property/work-neill2.jpg"],
  },
  {
    num: "03",
    client: "Kingsland Dalston",
    location: "London",
    services: ["Web", "Brand"],
    images: ["/images/commercial-property/work-kingsland1.jpg", "/images/commercial-property/work-kingsland2.jpg"],
  },
  {
    num: "04",
    client: "Your project here",
    location: "",
    services: [],
    images: ["/images/work-yourproject.jpeg"],
  },
];

export default function CommercialPropertiesPage() {
  return (
    <IndustryPageTemplate
      hero={{
        eyebrow: "For Commercial Letting Agencies",
        headline: "The agency behind your agency",
        description: "We build your website, brand and print to win instructions upfront. Professional, distinctive, and built to work from day one.",
        images: [
          "/images/commercial-property/banner1.jpg",
          "/images/commercial-property/banner2.jpg",
          "/images/commercial-property/banner3.jpg",
          "/images/commercial-property/banner4.jpg",
        ],
      }}
      marqueeItems={marqueeItems}
      services={services}
      servicesHeading="Everything your agency needs, nothing it doesn't"
      workProjects={workProjects}
      packages={packages}
      steps={steps}
      process={{
        heading: "Simple process, no agency jargon",
        description: "We know you're busy running an agency, not managing a design project. So we handle everything: one brief, two check-ins, one launch. Most projects are live and generating enquiries within 2–6 weeks.",
      }}
      contact={{
        headline: <>Ready to <span className="text-[#f0c93a]">look like the agency you are?</span></>,
        body: "Most agencies are losing instructions to competitors with better-looking brands and websites, and they don't even know it. Whether you're starting from scratch or ready for a refresh, let's fix that. Drop us a message and we'll come back within one working day.",
      }}
    />
  );
}
