import type { Metadata } from "next";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <div className="pt-[72px]">
      <section className="px-6 md:px-12 py-20 lg:py-28 bg-[#f0ede6]">
        <div className="eyebrow mb-6">Services</div>
        <h1 className="syne text-[clamp(44px,6vw,72px)] tracking-[-0.03em] leading-[1.0] max-w-3xl mb-6">
          Everything a letting agency needs online
        </h1>
        <p className="text-[17px] text-[#6b6b6b] font-light max-w-xl leading-[1.6]">
          We offer three focused service areas, all built exclusively for the commercial letting sector.
        </p>
      </section>

      {[
        {
          num: "01", title: "Web Packages", from: "£1,000+",
          desc: "A website built for the property market, not a generic template with your logo on it.",
          details: ["Custom design tailored to your brand", "Mobile-first, accessibility-compliant build", "Built on Next.js for best-in-class performance", "Property CMS your team can manage", "Integrated contact forms and lead capture", "Google Analytics and conversion tracking", "30-day post-launch support"],
          highlight: "Most agency websites are launched within 14 days.",
        },
        {
          num: "02", title: "Print Packages", from: "£300+",
          desc: "When you're sitting in front of a landlord, your print materials are doing the selling.",
          details: ["Letting brochures & floor plan layouts", "Investor & development presentations", "Business cards & stationery", "Print-ready PDFs + editable source files", "Shopping centre packs", "Landlord instruction packs"],
          highlight: "Delivered within 5–7 working days.",
        },
        {
          num: "03", title: "Brand Packages", from: "£1,000+",
          desc: "Landlords choose agents they trust. A strong, consistent brand builds that trust before you've even picked up the phone.",
          details: ["Logo design (multiple concepts)", "Colour palette & typography system", "Brand guidelines document", "Digital asset kit (social, web, email)", "Stationery suite", "Brand refresh options available"],
          highlight: "Full rebrand to brand refresh: options at every budget.",
        },
      ].map(({ num, title, from, desc, details, highlight }) => (
        <section key={num} className="px-6 md:px-12 py-20 border-b border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl">
            <div>
              <div className="syne text-[80px] leading-none text-black/8 mb-3">{num}</div>
              <h2 className="syne text-[clamp(28px,3.5vw,44px)] tracking-[-0.03em] leading-[1.05] mb-4">{title}</h2>
              <p className="text-[#6b6b6b] font-light leading-relaxed mb-6">{desc}</p>
              <div className="border-l-2 border-[#f0c93a] pl-4 py-1 text-sm font-medium bg-[#f0ede6]">
                {highlight}
              </div>
            </div>
            <div className="bg-[#f0ede6] p-8">
              <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#6b6b6b] mb-5">
                What&apos;s included
              </div>
              <ul className="list-none p-0 m-0 mb-6">
                {details.map((d) => (
                  <li key={d} className="flex items-start gap-3 py-3 text-sm border-b border-black/10 font-normal">
                    <span className="text-[#f0c93a] font-bold flex-shrink-0 mt-0.5">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
              <div className="syne text-[28px] tracking-[-0.02em]">From {from}</div>
            </div>
          </div>
        </section>
      ))}

      <section className="px-6 md:px-12 py-20 bg-[#0d0d0d] text-white text-center">
        <h2 className="syne text-[clamp(32px,4vw,52px)] tracking-[-0.03em] mb-4">
          Not sure what you need?
        </h2>
        <p className="text-white/50 font-light mb-8 max-w-md mx-auto">
          Tell us about your agency and we&apos;ll put together a free recommendation.
        </p>
        <a
          href="/#contact"
          className="inline-block px-8 py-4 bg-[#f0c93a] text-[#0d0d0d] font-bold text-sm tracking-[0.02em] no-underline hover:-translate-y-0.5 transition-transform"
        >
          Get a Free Recommendation →
        </a>
      </section>
    </div>
  );
}
