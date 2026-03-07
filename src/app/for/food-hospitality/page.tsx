import type { Metadata } from "next";
import ScrollAnimations from "@/components/ScrollAnimations";
import PackagesSection from "@/components/PackagesSection";
import HomeContactSection from "@/components/HomeContactSection";
import HeroCarousel from "@/components/HeroCarousel";
import WorkSection from "@/components/WorkSection";
import ScrollBadge from "@/components/ScrollBadge";
import SectionNav from "@/components/SectionNav";

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
    <>
      <ScrollAnimations />

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex flex-col-reverse lg:flex-row">
        <div className="relative z-10 flex items-center px-6 md:px-12 py-12 lg:py-0 lg:w-[38%] flex-shrink-0">
          <div className="max-w-[480px]">
            <div className="eyebrow fade-up visible mb-6">For Restaurants, Cafés & Venues</div>
            <h1 className="syne leading-[1.0] tracking-[-0.03em] mb-7 fade-up visible fade-up-delay-1" style={{ fontSize: "clamp(44px, 6vw, 76px)" }}>
              The creative behind your venue
            </h1>
            <p className="text-[17px] text-[#6b6b6b] font-light leading-[1.6] max-w-[400px] mb-11 fade-up visible fade-up-delay-2">
              We design menus, brand identities and websites for food businesses that want to attract the right customers and keep them coming back.
            </p>
            <div className="flex flex-wrap items-center gap-7 fade-up visible fade-up-delay-3">
              <a href="#packages" className="inline-block px-8 py-4 rounded-full bg-[#0d0d0d] text-[#f5f3ef] font-bold text-sm tracking-[0.02em] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] hover:-translate-y-0.5 transition-all">
                View Packages
              </a>
              <a href="#work" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d0d0d] no-underline border-b border-[#0d0d0d] pb-0.5 hover:text-[#6b6b6b] hover:border-[#6b6b6b] transition-colors">
                See our work →
              </a>
            </div>
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden" style={{ height: "clamp(40vh, 100vh, 100vh)", minHeight: "40vh" }}>
          <HeroCarousel images={[
            "/images/food/banner1.jpg",
            "/images/food/banner2.jpg",
            "/images/food/banner3.jpg",
          ]} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="relative bg-[#0d0d0d] text-white py-4 overflow-hidden whitespace-nowrap">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url('/images/Texturelabs_Grunge_316M.jpg')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />
        <div className="inline-flex marquee-animate">
          {marqueeItems.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8 text-[12px] font-bold tracking-[0.12em] uppercase after:content-['✦'] after:text-[#f0c93a] after:text-[10px]">{item}</span>
          ))}
        </div>
      </div>

      {/* Wrapper stops sticky SectionNav before the contact/footer area */}
      <div>
      <SectionNav />

      {/* ── SERVICES ── */}
      <section id="services" className="px-6 md:px-12 py-24 mx-auto max-w-7xl">
        <div className="section-label mb-14 fade-up">What we do</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
          {services.map(({ slug, icon, name, desc, from, features }, i) => (
            <a key={slug} href="#packages"
              className={`group relative overflow-hidden block bg-[#f0ede6] hover:bg-[#0d0d0d] p-12 no-underline text-[#0d0d0d] hover:text-white transition-colors duration-300 cursor-pointer fade-up ${i === 1 ? "fade-up-delay-1" : i === 2 ? "fade-up-delay-2" : ""}`}>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.2] transition-opacity duration-300" style={{ backgroundImage: "url('/images/Texturelabs_Grunge_316M.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
              <div className="w-11 h-11 bg-[#0d0d0d] group-hover:bg-[#f0c93a] text-white group-hover:text-[#0d0d0d] flex items-center justify-center mb-7 transition-colors duration-300">{icon}</div>
              <div className="syne text-[22px] tracking-[-0.02em] mb-4">{name}</div>
              <p className="text-sm text-[#6b6b6b] group-hover:text-white/60 leading-[1.7] mb-7 font-light transition-colors duration-300">{desc}</p>
              <div className="mb-7 pb-6 border-b border-black/12 group-hover:border-white/12 transition-colors duration-300">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6b6b6b] group-hover:text-white/50 transition-colors duration-300">Starting from</div>
                <div className="syne text-[32px] tracking-[-0.03em]">{from}</div>
              </div>
              <ul className="list-none p-0 m-0 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[13px] py-2 border-b border-black/12 group-hover:border-white/8 transition-colors duration-300 font-normal">
                    <span className="opacity-50 text-xs">→</span>{f}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.05em] uppercase border-b border-current pb-[3px]">View packages →</span>
            </a>
          ))}
        </div>
      </section>

      <WorkSection projects={workProjects} />
      <PackagesSection />

      {/* ── PROCESS ── */}
      <section id="process" className="px-6 md:px-12 py-24 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
        <div>
          <div className="section-label mb-14 fade-up">How we work</div>
          <h2 className="syne leading-[1.05] tracking-[-0.03em] mb-5 fade-up" style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>
            Simple process, brilliant results
          </h2>
          <p className="text-base text-[#6b6b6b] leading-[1.7] mb-10 font-light fade-up">
            Running a venue is busy enough. We handle the creative so you don&apos;t have to — one brief, two check-ins, one launch.
          </p>
          <div className="flex flex-col">
            {steps.map(({ num, title, body }, i) => (
              <div key={num} className={`grid gap-5 py-7 border-b border-black/12 first:border-t first:border-black/12 fade-up ${i > 0 ? `fade-up-delay-${i}` : ""}`} style={{ gridTemplateColumns: "auto 1fr" }}>
                <span className="font-bold text-[#6b6b6b] pr-6 leading-none" style={{ fontSize: "clamp(32px, 3vw, 48px)" }}>{num}</span>
                <div>
                  <div className="font-bold text-base mb-1.5">{title}</div>
                  <p className="text-sm text-[#6b6b6b] leading-[1.6] font-light">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex relative h-[500px] items-center justify-center overflow-hidden bg-[#f0ede6] fade-up">
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(13,13,13,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.12) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <ScrollBadge />
        </div>
      </section>
      </div>

      <HomeContactSection
        headline={<>Ready to attract <span className="text-[#f0c93a]">more of the right guests?</span></>}
        body="Great venues deserve great design. Whether you're opening a new restaurant or refreshing an existing brand, we'll make it something your guests remember. Drop us a message — we'll come back within one working day."
      />
    </>
  );
}
