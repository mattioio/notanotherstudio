"use client";

import { useEffect, useRef } from "react";
import HeroCarousel from "./HeroCarousel";
import HeroPanel from "./HeroPanel";

interface StickyHeroProps {
  images: string[];
  children: React.ReactNode;
}

/**
 * Desktop: hero carousel stays sticky while the lower-third panel
 * scrolls away horizontally. Once the scroll phase ends, everything
 * releases and the page continues normally.
 *
 * Mobile: standard layout — hero image then card below.
 */
export default function StickyHero({ images, children }: StickyHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    if (!wrapper || !panel) return;

    let raf: number;
    const tick = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollRoom = wrapper.offsetHeight - window.innerHeight;
      if (scrollRoom <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // progress: 0 at top, 1 when sticky is about to release
      const progress = Math.max(0, Math.min(1, -rect.top / scrollRoom));

      // Slide panel out to the left with eased curve
      // Using `left` instead of `transform` to preserve backdrop-filter on HeroPanel
      const eased = progress * progress; // ease-in for snappy exit
      panel.style.left = `${-eased * 120}%`;
      panel.style.opacity = `${Math.max(0, 1 - progress * 1.8)}`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div id="home">
      {/* Desktop: scroll-locked hero */}
      <div
        ref={wrapperRef}
        className="hidden md:block relative"
        style={{ height: "170vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Full-bleed carousel */}
          <div className="absolute inset-0">
            <HeroCarousel images={images} />
          </div>

          {/* Panel — driven by scroll progress */}
          <div className="relative z-10 h-full flex items-end p-8 pointer-events-none">
            <div ref={panelRef} className="pointer-events-auto relative">
              <HeroPanel>{children}</HeroPanel>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: standard layout */}
      <section className="md:hidden relative min-h-[55vh] overflow-hidden">
        <div className="absolute inset-0">
          <HeroCarousel images={images} />
        </div>
      </section>
      <div className="md:hidden relative z-10 -mt-6">
        <HeroPanel>{children}</HeroPanel>
      </div>
    </div>
  );
}
