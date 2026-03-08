"use client";

import { type ReactNode } from "react";

interface Service {
  slug: string;
  icon: ReactNode;
  name: string;
  desc: string;
  from: string;
  features: string[];
}

export default function ServicesSection({ services, heading }: { services: Service[]; heading?: string }) {
  return (
    <section id="services" className="px-6 md:px-12 py-24 mx-auto max-w-7xl">
      <div className="section-label mb-6 fade-up">What we do</div>
      {heading && (
        <h2
          className="syne leading-[1.05] tracking-[-0.03em] mb-14 fade-up max-w-2xl"
          style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
        >
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map(({ slug, icon, name, desc }, i) => (
          <a
            key={slug}
            href={`#packages-${slug}`}
            onClick={(e) => {
              e.preventDefault();
              history.replaceState(null, "", `#packages-${slug}`);
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            }}
            className={`group block no-underline rounded-2xl p-10 cursor-pointer hover:-translate-y-1 transition-all duration-300 fade-up ${i === 1 ? "fade-up-delay-1" : i === 2 ? "fade-up-delay-2" : ""}`}
            style={{
              background: "#0d0d0d",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-[#f0c93a] text-[#0d0d0d] flex items-center justify-center mb-8">
              {icon}
            </div>
            <h3 className="syne text-[24px] text-white tracking-[-0.02em] mb-4">{name}</h3>
            <p className="text-[14px] text-white/50 font-light leading-[1.7] mb-8">{desc}</p>
            <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#f0c93a] group-hover:text-white transition-colors duration-300">
              View packages →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
