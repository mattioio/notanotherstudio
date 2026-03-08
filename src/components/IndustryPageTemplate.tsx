import ScrollAnimations from "@/components/ScrollAnimations";
import PackagesSection, { type PackagesConfig } from "@/components/PackagesSection";
import HomeContactSection from "@/components/HomeContactSection";
import HeroCarousel from "@/components/HeroCarousel";
import HeroPanel from "@/components/HeroPanel";
import ServicesSection from "@/components/ServicesSection";
import WorkSection, { type Project } from "@/components/WorkSection";
import ScrollBadge from "@/components/ScrollBadge";
import SectionNav from "@/components/SectionNav";
import ProcessTimeline from "@/components/ProcessTimeline";

interface Service {
  slug: string;
  icon: React.ReactNode;
  name: string;
  desc: string;
  from: string;
  features: string[];
}

interface Step {
  num: string;
  title: string;
  body: string;
}

export interface IndustryPageProps {
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    images: string[];
  };
  marqueeItems: string[];
  services: Service[];
  servicesHeading?: string;
  workProjects: Project[];
  steps: Step[];
  process: {
    heading: string;
    description: string;
  };
  packages: PackagesConfig;
  contact: {
    headline: React.ReactNode;
    body: string;
  };
}

export default function IndustryPageTemplate({
  hero,
  marqueeItems,
  services,
  servicesHeading,
  workProjects,
  packages,
  steps,
  process,
  contact,
}: IndustryPageProps) {
  return (
    <>
      <ScrollAnimations />

      {/* ── HERO ── */}
      {(() => {
        const cardContent = (
          <>
            <div className="eyebrow fade-up visible mb-3 md:mb-5 text-[11px] md:text-[13px]">{hero.eyebrow}</div>
            <h1
              className="syne leading-[1.0] tracking-[-0.03em] mb-3 md:mb-6 fade-up visible fade-up-delay-1"
              style={{ fontSize: "clamp(26px, 5vw, 64px)" }}
            >
              {hero.headline}
            </h1>
            <p className="text-[14px] md:text-[16px] text-[#4a4a4a] font-light leading-[1.6] max-w-[400px] mb-5 md:mb-9 fade-up visible fade-up-delay-2">
              {hero.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 md:gap-6 fade-up visible fade-up-delay-3">
              <a
                href="#packages"
                className="inline-block px-5 md:px-7 py-2.5 md:py-3.5 rounded-full bg-[#0d0d0d] text-[#f5f3ef] font-bold text-xs md:text-sm tracking-[0.02em] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] hover:-translate-y-0.5 transition-all"
              >
                View Packages
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-[#0d0d0d] no-underline border-b border-[#0d0d0d] pb-0.5 hover:text-[#6b6b6b] hover:border-[#6b6b6b] transition-colors"
              >
                See our work →
              </a>
            </div>
          </>
        );
        return (
          <>
            <section id="home" className="relative min-h-[55vh] md:min-h-screen overflow-hidden">
              {/* Full-bleed image carousel behind everything */}
              <div className="absolute inset-0">
                <HeroCarousel images={hero.images} />
              </div>

              {/* Desktop: card inside hero, bottom-left */}
              <div className="hidden md:flex relative z-10 min-h-screen items-end p-8">
                <HeroPanel>{cardContent}</HeroPanel>
              </div>
            </section>

            {/* Mobile: card sits below hero, overlapping image by 24px */}
            <div className="md:hidden relative z-10 -mt-6">
              <HeroPanel>{cardContent}</HeroPanel>
            </div>
          </>
        );
      })()}

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
        <ServicesSection services={services} heading={servicesHeading} />

        <WorkSection projects={workProjects} />
        <PackagesSection config={packages} />

        {/* ── PROCESS ── */}
        <section id="process" className="px-6 md:px-12 py-24 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
          <div>
            <div className="section-label mb-14 fade-up">Our process</div>
            <h2
              className="syne leading-[1.05] tracking-[-0.03em] mb-5 fade-up"
              style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
            >
              {process.heading}
            </h2>
            <p className="text-base text-[#6b6b6b] leading-[1.7] mb-10 font-light fade-up">
              {process.description}
            </p>
            <ProcessTimeline steps={steps} />
          </div>
          <div className="hidden lg:flex relative h-[500px] items-center justify-center overflow-hidden bg-[#f0ede6] fade-up">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(13,13,13,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.12) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <ScrollBadge />
          </div>
        </section>
      </div>

      <HomeContactSection headline={contact.headline} body={contact.body} />
    </>
  );
}
