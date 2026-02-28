import type { Metadata } from "next";

export const metadata: Metadata = { title: "Our Work" };

const projects = [
  {
    num: "01", client: "Market Place Hounslow", location: "London", sector: "Retail & Leisure Destination",
    services: ["Brand Identity", "Website", "Print"],
    challenge: "A major shopping and leisure destination needed a full rebrand and new website to reposition itself for a post-pandemic retail market and attract premium tenants.",
    approach: "We developed a new visual identity that balanced the centre's heritage with a modern, aspirational feel. The website featured an interactive unit finder and automated vacancy feed connected to the letting team's CRM.",
    results: [{ v: "217%", l: "Increase in online enquiries" }, { v: "#1", l: "Google ranking, local search" }, { v: "3 mo", l: "Time to first-page rankings" }, { v: "£0", l: "Additional ad spend" }],
  },
  {
    num: "02", client: "Neill Mylroie Real Estate", location: "Manchester", sector: "Commercial Lettings",
    services: ["Website", "Brand"],
    challenge: "A new commercial letting agency entering the Manchester market needed a brand and website that could compete credibly with established firms from day one.",
    approach: "Clean, minimal brand identity with a strong typographic system. The website was built to rank locally from launch and positioned the agency as a premium, knowledgeable operator.",
    results: [{ v: "12", l: "Instructions in month one" }, { v: "4.9★", l: "Google rating, 6 months" }, { v: "3×", l: "Above forecast enquiries" }, { v: "14 days", l: "From brief to launch" }],
  },
  {
    num: "03", client: "Jenkins Law", location: "London", sector: "Legal Services",
    services: ["Website", "Brand"],
    challenge: "A specialist property law firm needed a site that communicated expertise and built trust with commercial landlords and investors.",
    approach: "Authoritative visual identity and a content-led website structured around the firm's key practice areas, with case studies and client testimonials driving conversion.",
    results: [{ v: "400%", l: "Organic traffic increase" }, { v: "18", l: "First-page rankings" }, { v: "67%", l: "Bounce rate reduction" }, { v: "6 wks", l: "Brief to launch" }],
  },
];

export default function PortfolioPage() {
  return (
    <div className="pt-[72px]">
      <section className="px-6 md:px-12 py-20 bg-[#0d0d0d] text-white">
        <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/40 flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-white/40 flex-shrink-0" />
          Our Work
        </div>
        <h1 className="syne text-[clamp(44px,6vw,72px)] tracking-[-0.03em] leading-[1.0] max-w-3xl mb-5">
          Work that wins business
        </h1>
        <p className="text-white/50 font-light text-lg max-w-lg leading-[1.6]">
          Real projects for real agencies. Every case study shows measurable, meaningful results.
        </p>
      </section>

      {projects.map(({ num, client, location, sector, services, challenge, approach, results }) => (
        <article key={num} className="px-6 md:px-12 py-20 border-b border-black/10 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-1">
            <div className="syne text-[11px] tracking-[0.1em] text-[#6b6b6b] mb-1">{num}</div>
            <h2 className="syne text-xl tracking-[-0.02em] mb-1">{client}</h2>
            <div className="text-sm text-[#6b6b6b] mb-5">{location}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] mb-1">Sector</div>
            <div className="text-sm mb-4">{sector}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] mb-2">Services</div>
            <div className="flex flex-wrap gap-1.5">
              {services.map((s) => (
                <span key={s} className="text-[11px] font-medium px-2.5 py-1 bg-[#f0ede6]">{s}</span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[2px]">
              {results.map(({ v, l }) => (
                <div key={l} className="bg-[#f0ede6] p-6">
                  <div className="syne text-[28px] tracking-[-0.03em] leading-tight">{v}</div>
                  <div className="text-xs text-[#6b6b6b] mt-1 font-medium">{l}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#6b6b6b] mb-3">The Challenge</div>
              <p className="text-[#6b6b6b] font-light leading-relaxed">{challenge}</p>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#6b6b6b] mb-3">Our Approach</div>
              <p className="text-[#6b6b6b] font-light leading-relaxed">{approach}</p>
            </div>
          </div>
        </article>
      ))}

      <section className="px-6 md:px-12 py-16 bg-[#f0c93a]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="syne text-[clamp(24px,3vw,36px)] tracking-[-0.03em]">Want results like these?</h2>
            <p className="text-[#0d0d0d]/60 mt-1 font-light">Start with a free consultation. No commitment.</p>
          </div>
          <a href="/#contact" className="flex-shrink-0 inline-block px-8 py-4 bg-[#0d0d0d] text-white font-bold text-sm tracking-[0.02em] no-underline hover:opacity-80 transition-opacity">
            Get in Touch →
          </a>
        </div>
      </section>
    </div>
  );
}
