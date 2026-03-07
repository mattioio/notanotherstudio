import type { Metadata } from "next";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Not Another Studio | Web, Print & Brand for Commercial Letting Agencies",
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
    images: ["/images/commercial-property/work-jenkins1.jpeg", "/images/commercial-property/work-jenkins2.jpeg"],
  },
  {
    num: "02",
    client: "Neill Mylroie Real Estate",
    location: "Manchester",
    services: ["Web", "Brand"],
    images: ["/images/commercial-property/work-neill1.jpeg", "/images/commercial-property/work-neill2.jpeg"],
  },
  {
    num: "03",
    client: "Market Place Hounslow",
    location: "London",
    services: ["Brand", "Web", "Print"],
    images: ["/images/commercial-property/work-marketplace1.jpeg", "/images/commercial-property/work-marketplace2.jpeg"],
  },
  {
    num: "04",
    client: "Kingsland Dalston",
    location: "London",
    services: ["Web", "Brand"],
    images: ["/images/commercial-property/work-marketplace1.jpeg", "/images/commercial-property/work-marketplace2.jpeg"],
  },
  {
    num: "05",
    client: "Your project here",
    location: "We have space for one new client",
    services: [],
    images: ["/images/commercial-property/work-yourproject.jpeg"],
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
          "/images/commercial-property/banner1.jpeg",
          "/images/commercial-property/banner2.jpeg",
          "/images/commercial-property/banner3.jpeg",
          "/images/commercial-property/banner4.jpeg",
        ],
      }}
      marqueeItems={marqueeItems}
      services={services}
      workProjects={workProjects}
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
