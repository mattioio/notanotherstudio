import type { Metadata } from "next";
import type { PackagesConfig } from "@/components/PackagesSection";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Not Another Studio | Food & Hospitality",
};

const marqueeItems = [
  "Menu Design", "Brand Identity", "Restaurant Websites", "Signage Design",
  "Packaging", "Social Assets", "Print Marketing", "Venue Branding",
  "Menu Design", "Brand Identity", "Restaurant Websites", "Signage Design",
  "Packaging", "Social Assets", "Print Marketing", "Venue Branding",
];

const services = [
  {
    slug: "web",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <rect x="2" y="3" width="20" height="14" rx="0"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    name: "Web & Email",
    desc: "Custom websites with booking integration and a CMS your team can manage. Built to drive reservations and keep guests coming back.",
    from: "£1,000+",
    features: ["Venue websites", "Booking integration", "Email marketing", "Hosting included"],
  },
  {
    slug: "print",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <path d="M14 2H4v20h16V8z" fill="none"/><polyline points="14 2 14 8 20 8" fill="none"/><line x1="7" y1="13" x2="17" y2="13"/><line x1="7" y1="17" x2="17" y2="17"/>
      </svg>
    ),
    name: "Print & Marketing",
    desc: "Menus, signage, loyalty cards and marketing materials crafted to match your brand and impress every guest.",
    from: "£300+",
    features: ["Menu design", "Table cards & signage", "Loyalty cards", "Event collateral"],
  },
  {
    slug: "brand",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    name: "Brand Design",
    desc: "A distinctive identity that attracts your ideal customers and reflects the quality of your food and service.",
    from: "£1,000+",
    features: ["Logo design", "Brand guidelines", "Digital assets", "Refresh options"],
  },
];

const packages: PackagesConfig = {
  heading: "Packages built for food & hospitality",
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
          desc: "A beautiful single-page site for your restaurant, café or venue — with menus, gallery and booking links.",
          note: "One-off project fee. Hosting from £40/mo.",
          features: ["Single page, fully custom design", "Mobile-first, accessibility-compliant build", "Menu display & PDF download", "Booking link / reservation integration", "Google Maps & opening hours", "2 rounds of revisions included", "30-day post-launch support"],
          visibleFeatureCount: 4,
        },
        {
          key: "web-pro",
          name: "Full CMS",
          price: "£2,500+",
          desc: "A multi-page site with a CMS so your team can update menus, events and specials without a developer.",
          note: "One-off project fee. Hosting from £60/mo.",
          features: ["Multi-page site, fully custom design", "Self-managed menu & events CMS", "Online booking integration", "Gallery & Instagram feed", "SEO-optimised pages", "2 rounds of revisions included", "3 months post-launch support"],
          visibleFeatureCount: 4,
        },
        {
          key: "web-full",
          name: "Full CMS + Email",
          price: "£3,000+",
          desc: "Everything in Full CMS plus branded email marketing — newsletters, event announcements and loyalty campaigns.",
          note: "One-off project fee. Hosting from £60/mo.",
          features: ["Everything in Full CMS", "Branded email template design", "Newsletter & campaign setup", "Event announcement templates", "Mailing list integration", "Email analytics & reporting setup", "3 months post-launch support"],
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
          key: "print-menu",
          name: "Menu Design",
          price: "£300+",
          desc: "A beautifully designed menu that matches your brand — print-ready and easy to update.",
          note: "Includes print-ready PDF + editable source file.",
          features: ["Custom menu layout design", "Food & drink categorisation", "Dietary & allergen icon system", "Print-ready PDF to your spec", "Editable source file for updates", "QR code version for tables", "2 rounds of revisions included"],
          visibleFeatureCount: 3,
        },
        {
          key: "print-collateral",
          name: "Brand Collateral",
          price: "£800+",
          desc: "Menus, table cards, loyalty cards, signage and stationery — a complete print suite for your venue.",
          note: "All files print-ready + editable.",
          features: ["Menu design (food & drinks)", "Table tent / specials cards", "Loyalty card design", "Business cards & stationery", "Window signage & A-boards", "All print-ready + editable files", "2 rounds of revisions included"],
          visibleFeatureCount: 3,
        },
        {
          key: "print-full",
          name: "Full Marketing Suite",
          price: "£1,000+",
          desc: "Everything your venue needs to market itself — from menus and flyers to seasonal promotions and event collateral.",
          note: "Full suite: all files print-ready + editable.",
          features: ["Everything in Brand Collateral", "Seasonal promotion templates", "Event flyer & poster design", "Social media print assets", "Gift voucher design", "All print-ready + editable files", "3 rounds of revisions included"],
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
          desc: "Evolve your existing brand with updated visuals, modernised assets and refreshed guidelines.",
          note: "Modernised visuals, preserved recognition.",
          features: ["Brand audit & review session", "Logo evolution (not replacement)", "Updated colour palette & typefaces", "Refreshed brand guidelines", "Updated asset library", "Side-by-side before/after presentation", "3 rounds of refinement"],
          visibleFeatureCount: 3,
        },
        {
          key: "brand-full",
          name: "Full Brand",
          price: "£4,000+",
          desc: "A complete identity system from scratch — logo, colours, typography, guidelines and a full asset kit for your venue.",
          note: "The complete identity system.",
          features: ["Logo design (3 concepts, unlimited revisions)", "Full colour palette & typography system", "Comprehensive brand guidelines (30+ pages)", "All file formats & sizes", "Stationery suite (cards, letterhead, email)", "Digital asset kit (social, web, email)", "Brand pattern & illustration style"],
          visibleFeatureCount: 4,
        },
      ],
    },
  ],
};

const steps = [
  { num: "01", title: "Discovery Call", body: "We learn about your venue, your guests and your goals. Usually 30 minutes. No prep required." },
  { num: "02", title: "Proposal & Quote", body: "You receive a clear scope, fixed price and timeline. No surprises, no scope creep." },
  { num: "03", title: "Design & Build", body: "We handle everything. You review at two structured checkpoints. Nothing more." },
  { num: "04", title: "Launch & Handover", body: "We go live and hand over all files so you're completely self-sufficient from day one." },
];

const workProjects = [
  {
    num: "01",
    client: "Market Place",
    location: "London",
    services: ["Brand", "Web", "Print"],
    images: ["/images/food/work-marketplace1.jpg", "/images/food/work-marketplace2.jpg"],
  },
  {
    num: "02",
    client: "Chelo",
    location: "London",
    services: ["Brand", "Print"],
    images: ["/images/food/work-chelo1.jpg", "/images/food/work-chelo2.jpg"],
  },
  {
    num: "03",
    client: "Rusto",
    location: "UK",
    services: ["Brand", "Web"],
    images: ["/images/food/work-rusto1.jpg"],
  },
  {
    num: "04",
    client: "Your project here",
    location: "",
    services: [],
    images: ["/images/work-yourproject.jpeg"],
  },
];

export default function FoodPage() {
  return (
    <IndustryPageTemplate
      hero={{
        eyebrow: "For Restaurants, Cafés & Venues",
        headline: "The creative behind your brand",
        description: "We design menus, brand identities and websites for food businesses that want to attract the right customers and keep them coming back.",
        images: [
          "/images/food/banner1.jpg",
          "/images/food/banner2.jpg",
          "/images/food/banner3.jpg",
        ],
      }}
      marqueeItems={marqueeItems}
      services={services}
      servicesHeading="Design that fills tables and builds loyalty"
      workProjects={workProjects}
      packages={packages}
      steps={steps}
      process={{
        heading: "Simple process, brilliant results",
        description: "Running a venue is busy enough. We handle the creative so you don't have to — one brief, two check-ins, one launch.",
      }}
      contact={{
        headline: <>Ready to attract <span className="text-[#f0c93a]">more of the right guests?</span></>,
        body: "Great venues deserve great design. Whether you're opening a new restaurant or refreshing an existing brand, we'll make it something your guests remember. Drop us a message — we'll come back within one working day.",
      }}
    />
  );
}
