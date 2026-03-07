import type { Metadata } from "next";
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
    slug: "brand",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    name: "Brand & Identity",
    desc: "A distinctive identity that attracts your ideal customers and reflects the quality of your food and service.",
    from: "£1,500+",
    features: ["Logo design", "Brand guidelines", "Colour & typography", "Asset kit"],
  },
  {
    slug: "print",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <path d="M14 2H4v20h16V8z" fill="none"/><polyline points="14 2 14 8 20 8" fill="none"/><line x1="7" y1="13" x2="17" y2="13"/><line x1="7" y1="17" x2="17" y2="17"/>
      </svg>
    ),
    name: "Print & Menu Design",
    desc: "Menus, packaging and marketing materials crafted to match your brand and make a lasting impression on every guest.",
    from: "£300+",
    features: ["Menu design", "Specials boards", "Packaging design", "Event collateral"],
  },
  {
    slug: "web",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <rect x="2" y="3" width="20" height="14" rx="0"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    name: "Digital Presence",
    desc: "Websites and social assets that make booking easy, showcase your space and drive footfall through the door.",
    from: "£1,000+",
    features: ["Restaurant website", "Booking integration", "Social media assets", "Hosting included"],
  },
];

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
    images: ["/images/food/work-rusto1.jpg", "/images/food/work-rusto2.jpg"],
  },
  {
    num: "04",
    client: "Your project here",
    location: "We have space for one new client",
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
      workProjects={workProjects}
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
