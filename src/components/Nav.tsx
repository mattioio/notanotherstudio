"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const ctaHref = pathname === "/" ? "#contact" : "/for/commercial-properties#contact";

  return (
    <header className="relative z-50 bg-[#f5f3ef] border-b border-black/10">
      <div className="flex items-center justify-between px-6 md:px-12 h-[72px]">
        {/* Logo */}
        <a
          href="/"
          className="text-[#0d0d0d] no-underline leading-none whitespace-nowrap"
          style={{
            fontSize:      "clamp(22px, 2.5vw, 30px)",
            fontFamily:    "var(--heading-font)",
            fontWeight:    "var(--heading-weight)" as React.CSSProperties["fontWeight"],
            letterSpacing: "var(--heading-tracking)",
          }}
        >
          Not Another Studio
        </a>

        {/* Work with us CTA */}
        <a
          href={ctaHref}
          className="inline-flex items-center px-4 lg:px-[22px] py-2.5 lg:py-3 bg-[#0d0d0d] text-[#f5f3ef] font-bold text-[11px] lg:text-[13px] tracking-[0.02em] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] transition-colors"
        >
          Work with us
        </a>
      </div>
    </header>
  );
}
