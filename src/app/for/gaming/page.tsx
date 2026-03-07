import type { Metadata } from "next";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Not Another Studio | Gaming",
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
    location: "We have space for one new client",
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
      workProjects={workProjects}
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
