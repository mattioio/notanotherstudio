"use client";

import { useState, useEffect } from "react";

type Project = {
  num: string;
  client: string;
  location: string;
  services: string[];
  images: string[];
};

const projects: Project[] = [
  {
    num: "01",
    client: "Jenkins Law",
    location: "London",
    services: ["Web", "Print"],
    images: ["/images/work-jenkins1.jpeg", "/images/work-jenkins2.jpeg"],
  },
  {
    num: "02",
    client: "Neill Mylroie Real Estate",
    location: "Manchester",
    services: ["Web", "Brand"],
    images: ["/images/work-neill1.jpeg", "/images/work-neill2.jpeg"],
  },
  {
    num: "03",
    client: "Market Place Hounslow",
    location: "London",
    services: ["Brand", "Web", "Print"],
    images: ["/images/work-marketplace1.jpeg", "/images/work-marketplace2.jpeg"],
  },
];

function EyeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 22 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{
        color: active ? "#f0c93a" : "rgba(255,255,255,0.2)",
        transform: active ? "scale(1.15)" : "scale(1)",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
    >
      <path d="M1 7.5C4.5 1.5 17.5 1.5 21 7.5C17.5 13.5 4.5 13.5 1 7.5Z" />
      <circle cx="11" cy="7.5" r="2.8" />
    </svg>
  );
}

export default function WorkSection() {
  const [active, setActive] = useState(0);
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    const imgs = projects[active].images;
    if (imgs.length <= 1) return;
    const id = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % imgs.length);
    }, 3500);
    return () => clearInterval(id);
  }, [active]);

  const handleMouseEnter = (i: number) => {
    if (i !== active) {
      setCarouselIdx(0);
      setActive(i);
    }
  };

  return (
    <section id="work" className="bg-[#0d0d0d] text-white">
      {/* ── Header ── */}
      <div className="px-6 md:px-12 pt-24 pb-12 flex items-end justify-between gap-6 flex-wrap border-b border-white/10">
        <h2
          className="syne leading-[1.0] tracking-[-0.03em] fade-up"
          style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
        >
          Work that wins<br />business
        </h2>
        <a
          href="/#contact"
          className="inline-block px-8 py-4 bg-[#f0c93a] text-[#0d0d0d] font-bold text-sm tracking-[0.05em] uppercase no-underline hover:bg-white transition-colors fade-up flex-shrink-0"
        >
          Start a project →
        </a>
      </div>

      {/* ── Body: list left + sticky image right ── */}
      <div className="flex flex-col lg:flex-row">

        {/* Left: project list */}
        <div className="lg:w-[48%] flex flex-col">
          {projects.map(({ num, client, location, services, images }, i) => (
            <div
              key={num}
              className="group relative border-b border-white/10 cursor-pointer"
              onMouseEnter={() => handleMouseEnter(i)}
            >
              {/* Active indicator bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300"
                style={{ background: active === i ? "#f0c93a" : "transparent" }}
              />

              <div className="px-6 md:px-12 py-8 flex items-center gap-6 md:gap-10">
                {/* Number */}
                <span
                  className="syne flex-shrink-0 transition-all duration-300 leading-none"
                  style={{
                    fontSize: active === i ? "clamp(32px, 3vw, 48px)" : "clamp(13px, 1.2vw, 16px)",
                    color: active === i ? "#f0c93a" : "rgba(255,255,255,0.25)",
                    minWidth: "48px",
                  }}
                >
                  {num}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div
                    className="syne tracking-[-0.02em] leading-tight transition-colors duration-300"
                    style={{
                      fontSize: "clamp(18px, 1.8vw, 26px)",
                      color: active === i ? "#ffffff" : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {client}
                  </div>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="text-[11px] text-white/30 font-medium tracking-widest uppercase">
                      {location}
                    </span>
                    <span className="text-white/15">·</span>
                    {services.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-bold tracking-[0.12em] uppercase px-2 py-0.5 transition-all duration-300"
                        style={{
                          background: active === i ? "rgba(240,201,58,0.15)" : "rgba(255,255,255,0.06)",
                          color: active === i ? "#f0c93a" : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Eye icon */}
                <EyeIcon active={active === i} />
              </div>

              {/* Mobile: expandable image */}
              <div
                className="lg:hidden relative overflow-hidden"
                style={{ height: active === i ? "220px" : "0", transition: "height 0.4s ease" }}
              >
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0"
                    style={{ opacity: idx === carouselIdx ? 1 : 0, transition: "opacity 0.7s ease" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={client} className="w-full h-full object-cover" />
                  </div>
                ))}
                {/* Mobile carousel indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                    {images.map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: idx === carouselIdx ? "32px" : "8px",
                          height: "3px",
                          background: idx === carouselIdx ? "#f0c93a" : "rgba(255,255,255,0.35)",
                          border: idx === carouselIdx ? "none" : "1px solid rgba(255,255,255,0.25)",
                          flexShrink: 0,
                          transition: "width 0.35s ease, background 0.35s ease",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Your project here */}
          <div className="border-b border-white/8 px-6 md:px-12 py-8 flex items-center gap-6 md:gap-10">
            <span className="syne text-[13px] text-white/20 flex-shrink-0 min-w-[48px]">04</span>
            <div className="flex-1">
              <div className="syne text-[clamp(18px,1.8vw,26px)] tracking-[-0.02em] text-white/45">
                Your project here
              </div>
              <div className="text-[11px] text-white/30 mt-2 uppercase tracking-widest font-medium">
                We have space for one new client
              </div>
            </div>
            <a
              href="/#contact"
              className="flex-shrink-0 text-[11px] font-bold tracking-[0.1em] uppercase no-underline px-4 py-2.5 border border-[#f0c93a]/35 text-[#f0c93a]/60 hover:border-[#f0c93a] hover:text-[#f0c93a] transition-all duration-200 whitespace-nowrap"
            >
              Get in touch →
            </a>
          </div>
        </div>

        {/* Right: sticky full-height image panel */}
        <div
          className="hidden lg:block lg:w-[52%] sticky top-[72px]"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="relative w-full h-full">
            {/* All project images stacked — active one visible */}
            {projects.map(({ client, images }, i) =>
              images.map((src, idx) => (
                <div
                  key={`${i}-${idx}`}
                  className="absolute inset-0"
                  style={{
                    opacity: active === i && carouselIdx === idx ? 1 : 0,
                    transition: "opacity 0.7s ease",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={client} className="w-full h-full object-cover" />
                </div>
              ))
            )}

            {/* Carousel indicators — only when active project has multiple images */}
            {projects[active].images.length > 1 && (
              <div className="absolute bottom-7 right-7 flex items-center gap-2 z-10">
                {projects[active].images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIdx(idx)}
                    aria-label={`Image ${idx + 1}`}
                    style={{
                      width: idx === carouselIdx ? "40px" : "10px",
                      height: "3px",
                      background: idx === carouselIdx ? "#f0c93a" : "rgba(255,255,255,0.35)",
                      border: idx === carouselIdx ? "none" : "1px solid rgba(255,255,255,0.25)",
                      cursor: "pointer",
                      padding: 0,
                      flexShrink: 0,
                      transition: "width 0.35s ease, background 0.35s ease",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
