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
    images: ["/images/work3.jpeg"],
  },
  {
    num: "02",
    client: "Neill Mylroie Real Estate",
    location: "Manchester",
    services: ["Web", "Brand"],
    images: ["/images/work2.jpeg"],
  },
  {
    num: "03",
    client: "Market Place Hounslow",
    location: "London",
    services: ["Brand", "Web", "Print"],
    images: ["/images/work1.jpeg", "/images/work4.jpeg"],
  },
];

function EyeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 22 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      style={{
        color: active ? "#f0c93a" : "rgba(255,255,255,0.18)",
        transform: active ? "scale(1.2)" : "scale(1)",
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

  // Auto-advance carousel only when the active project has multiple images
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

      {/* ── Body ── */}
      <div className="flex flex-col lg:flex-row">

        {/* Left — project list */}
        <div className="flex-1 flex flex-col">
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

              <div className="px-6 md:px-12 py-9 flex items-center justify-between gap-8">
                <div className="flex items-start gap-6 min-w-0">
                  {/* Number */}
                  <span
                    className="syne flex-shrink-0 transition-all duration-300 leading-none"
                    style={{
                      fontSize: active === i ? "clamp(36px, 3.5vw, 52px)" : "clamp(13px, 1.2vw, 16px)",
                      color: active === i ? "#f0c93a" : "rgba(255,255,255,0.25)",
                      marginTop: active === i ? "2px" : "6px",
                    }}
                  >
                    {num}
                  </span>

                  {/* Info */}
                  <div className="min-w-0">
                    <div
                      className="syne tracking-[-0.02em] leading-tight transition-colors duration-300 truncate"
                      style={{
                        fontSize: "clamp(20px, 2vw, 28px)",
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
                      {/* Carousel dot indicators — only for multi-image projects when active */}
                      {images.length > 1 && active === i && (
                        <span className="flex items-center gap-1 ml-1">
                          {images.map((_, idx) => (
                            <span
                              key={idx}
                              style={{
                                display: "inline-block",
                                width: idx === carouselIdx ? "14px" : "5px",
                                height: "5px",
                                background: idx === carouselIdx ? "#f0c93a" : "rgba(255,255,255,0.25)",
                                transition: "all 0.3s ease",
                              }}
                            />
                          ))}
                        </span>
                      )}
                    </div>
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
              </div>
            </div>
          ))}

          {/* Your project here */}
          <div className="border-b border-white/8 px-6 md:px-12 py-9 flex items-center justify-between gap-6">
            <div className="flex items-start gap-6 min-w-0">
              <span className="syne text-[13px] text-white/25 flex-shrink-0 mt-1">04</span>
              <div>
                <div className="syne text-[clamp(20px,2vw,28px)] tracking-[-0.02em] text-white/50">
                  Your project here
                </div>
                <div className="text-[11px] text-white/35 mt-2 uppercase tracking-widest font-medium">
                  We have space for one new client
                </div>
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

        {/* Right — sticky image panel (desktop only) */}
        <div className="hidden lg:block relative w-[52%] flex-shrink-0">
          <div className="sticky top-[72px] h-[calc(100vh-72px)]">
            {projects.map(({ images, client }, i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  opacity: active === i ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              >
                {/* Each image in this project's carousel */}
                {images.map((src, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0"
                    style={{
                      opacity: idx === carouselIdx ? 1 : 0,
                      transition: "opacity 0.8s ease",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={client} className="w-full h-full object-cover" />
                  </div>
                ))}
                {/* Left vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to right, rgba(13,13,13,0.45) 0%, transparent 28%)" }}
                />
              </div>
            ))}

            {/* Counter */}
            <div className="absolute bottom-8 right-8 z-10">
              <div className="syne text-[11px] tracking-[0.15em] uppercase text-white/30">
                {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
