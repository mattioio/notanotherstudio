import type { Metadata } from "next";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Not Another Studio | Product Design",
};

const marqueeItems = [
  "UX Design", "Product Design", "App Interfaces", "Design Systems",
  "User Research", "Prototyping", "Brand Identity", "Digital Products",
  "UX Design", "Product Design", "App Interfaces", "Design Systems",
  "User Research", "Prototyping", "Brand Identity", "Digital Products",
];

const services = [
  {
    slug: "ux",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    name: "UX & Interface",
    desc: "Custom app and product interfaces built from real user research. Every screen designed to convert, retain and delight.",
    from: "£2,000+",
    features: ["UX research & mapping", "Interface design", "Interactive prototypes", "Handoff-ready files"],
  },
  {
    slug: "systems",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <rect x="2" y="2" width="8" height="8"/><rect x="14" y="2" width="8" height="8"/><rect x="2" y="14" width="8" height="8"/><rect x="14" y="14" width="8" height="8"/>
      </svg>
    ),
    name: "Design Systems",
    desc: "Scalable component libraries and design tokens that keep your product consistent, on-brand and easy to build on as you grow.",
    from: "£3,000+",
    features: ["Component library", "Design tokens", "Documentation", "Dev handoff"],
  },
  {
    slug: "brand",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    name: "Brand & Identity",
    desc: "Distinctive branding for products that need to stand out in crowded markets. Logo, guidelines and a full asset kit.",
    from: "£1,500+",
    features: ["Logo design", "Brand guidelines", "Digital asset kit", "Refresh options"],
  },
];

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
    images: ["/images/product-design/work-orchid1.jpg", "/images/product-design/work-orchid2.jpg"],
  },
  {
    num: "03",
    client: "104 Impact",
    location: "UK",
    services: ["Brand", "Presentation"],
    images: ["/images/product-design/work-striing1.jpg", "/images/product-design/work-striing2.jpg"],
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
    location: "We have space for one new client",
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
      workProjects={workProjects}
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
