import type { Metadata } from "next";
import ScrollAnimations from "@/components/ScrollAnimations";
import PackagesSection from "@/components/PackagesSection";
import HomeContactSection from "@/components/HomeContactSection";
import HeroCarousel from "@/components/HeroCarousel";
import WorkSection from "@/components/WorkSection";
import ScrollBadge from "@/components/ScrollBadge";
import SectionNav from "@/components/SectionNav";

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
  {
    num: "01",
    title: "Discovery Call",
    body: "We learn about your agency, your clients, and your goals. Usually 30 minutes. No prep required.",
  },
  {
    num: "02",
    title: "Proposal & Quote",
    body: "You receive a clear scope, fixed price, and timeline. No surprises, no scope creep.",
  },
  {
    num: "03",
    title: "Design & Build",
    body: "We handle everything. You review and give feedback at two structured checkpoints. Nothing more.",
  },
  {
    num: "04",
    title: "Launch & Handover",
    body: "We go live, train your team on any CMS, and hand over all files so you're completely self-sufficient from day one.",
  },
];

export default function CommercialPropertiesPage() {
  return (
    <>
      <ScrollAnimations />

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col-reverse lg:flex-row"
      >
        {/* Left — text */}
        <div className="relative z-10 flex items-center px-6 md:px-12 py-12 lg:py-0 lg:w-[38%] flex-shrink-0">
          <div className="max-w-[480px]">
            <div className="eyebrow fade-up visible mb-6">For Commercial Letting Agencies</div>
            <h1
              className="syne leading-[1.0] tracking-[-0.03em] mb-7 fade-up visible fade-up-delay-1"
              style={{ fontSize: "clamp(44px, 6vw, 76px)" }}
            >
              The agency behind your agency
            </h1>
            <p className="text-[17px] text-[#6b6b6b] font-light leading-[1.6] max-w-[400px] mb-11 fade-up visible fade-up-delay-2">
              We build your website, brand and print to win instructions upfront. Professional, distinctive, and built to work from day one.
            </p>
            <div className="flex flex-wrap items-center gap-7 fade-up visible fade-up-delay-3">
              <a
                href="#packages"
                className="inline-block px-8 py-4 rounded-full bg-[#0d0d0d] text-[#f5f3ef] font-bold text-sm tracking-[0.02em] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] hover:-translate-y-0.5 transition-all"
              >
                View Packages
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d0d0d] no-underline border-b border-[#0d0d0d] pb-0.5 hover:text-[#6b6b6b] hover:border-[#6b6b6b] transition-colors"
              >
                See our work →
              </a>
            </div>
          </div>
        </div>

        {/* Right — full-bleed carousel, 62% of width */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            height: 'clamp(40vh, 100vh, 100vh)',
            minHeight: '40vh',
          }}
        >
          <HeroCarousel images={[
            "/images/commercial-property/banner1.jpeg",
            "/images/commercial-property/banner2.jpeg",
            "/images/commercial-property/banner3.jpeg",
            "/images/commercial-property/banner4.jpeg",
          ]} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="relative bg-[#0d0d0d] text-white py-4 overflow-hidden whitespace-nowrap">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/Texturelabs_Grunge_316M.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div className="inline-flex marquee-animate">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-8 text-[12px] font-bold tracking-[0.12em] uppercase after:content-['✦'] after:text-[#f0c93a] after:text-[10px]"
            >
              {item}
            </span>
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
            <a
              key={slug}
              href="#packages"
              className={`group relative overflow-hidden block bg-[#f0ede6] hover:bg-[#0d0d0d] p-12 no-underline text-[#0d0d0d] hover:text-white transition-colors duration-300 cursor-pointer fade-up ${i === 1 ? "fade-up-delay-1" : i === 2 ? "fade-up-delay-2" : ""}`}
            >
              {/* Grunge texture — fades in on hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.2] transition-opacity duration-300"
                style={{
                  backgroundImage: "url('/images/Texturelabs_Grunge_316M.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* Icon */}
              <div className="w-11 h-11 bg-[#0d0d0d] group-hover:bg-[#f0c93a] text-white group-hover:text-[#0d0d0d] flex items-center justify-center mb-7 transition-colors duration-300">
                {icon}
              </div>
              {/* Name */}
              <div className="syne text-[22px] tracking-[-0.02em] mb-4">{name}</div>
              {/* Desc */}
              <p className="text-sm text-[#6b6b6b] group-hover:text-white/60 leading-[1.7] mb-7 font-light transition-colors duration-300">
                {desc}
              </p>
              {/* Price */}
              <div className="mb-7 pb-6 border-b border-black/12 group-hover:border-white/12 transition-colors duration-300">
                <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6b6b6b] group-hover:text-white/50 transition-colors duration-300">
                  Starting from
                </div>
                <div className="syne text-[32px] tracking-[-0.03em]">{from}</div>
              </div>
              {/* Features */}
              <ul className="list-none p-0 m-0 mb-8">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-[13px] py-2 border-b border-black/12 group-hover:border-white/8 transition-colors duration-300 font-normal"
                  >
                    <span className="opacity-50 text-xs">→</span>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.05em] uppercase border-b border-current pb-[3px]">
                View packages →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── WORK ── */}
      <WorkSection />

      {/* ── PACKAGES ── */}
      <PackagesSection />

      {/* ── PROCESS ── */}
      <section id="process" className="px-6 md:px-12 py-24 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
        <div>
          <div className="section-label mb-14 fade-up">How we work</div>
          <h2
            className="syne leading-[1.05] tracking-[-0.03em] mb-5 fade-up"
            style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
          >
            Simple process, no agency jargon
          </h2>
          <p className="text-base text-[#6b6b6b] leading-[1.7] mb-10 font-light fade-up">
            We know you&apos;re busy running an agency, not managing a design project. So we handle everything: one brief, two check-ins, one launch. Most projects are live and generating enquiries within 2–6 weeks.
          </p>
          <div className="flex flex-col">
            {steps.map(({ num, title, body }, i) => (
              <div
                key={num}
                className={`grid gap-5 py-7 border-b border-black/12 first:border-t first:border-black/12 fade-up ${i > 0 ? `fade-up-delay-${i}` : ""}`}
                style={{ gridTemplateColumns: "auto 1fr" }}
              >
                <span className="font-bold text-[#6b6b6b] pr-6 leading-none" style={{ fontSize: "clamp(32px, 3vw, 48px)" }}>{num}</span>
                <div>
                  <div className="font-bold text-base mb-1.5">{title}</div>
                  <p className="text-sm text-[#6b6b6b] leading-[1.6] font-light">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div
          className="hidden lg:flex relative h-[500px] items-center justify-center overflow-hidden bg-[#f0ede6] fade-up"
        >
          {/* Grid lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(13,13,13,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.12) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Badge */}
          <ScrollBadge />
        </div>
      </section>
      </div>

      {/* ── CONTACT / CTA ── */}
      <HomeContactSection
        headline={<>Ready to <span className="text-[#f0c93a]">look like the agency you are?</span></>}
        body="Most agencies are losing instructions to competitors with better-looking brands and websites, and they don't even know it. Whether you're starting from scratch or ready for a refresh, let's fix that. Drop us a message and we'll come back within one working day."
      />
    </>
  );
}
