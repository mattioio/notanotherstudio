"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#work" },
  { label: "Packages", href: "/#packages" },
  { label: "Process", href: "/#process" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#f5f3ef] border-b border-black/10 transition-shadow duration-300"
      style={{ boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none" }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 h-[72px]">
        {/* Logo */}
        <a
          href="/#home"
          className="syne text-[#0d0d0d] no-underline leading-none tracking-[-0.03em] whitespace-nowrap"
          style={{ fontSize: "clamp(22px, 2.5vw, 30px)" }}
        >
          Not Another Studio
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-9 list-none m-0 p-0 flex-shrink">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-[13px] lg:text-sm font-medium text-[#0d0d0d] opacity-70 hover:opacity-100 transition-opacity no-underline whitespace-nowrap"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#contact"
              className="inline-flex items-center px-4 lg:px-[22px] py-2.5 lg:py-3 bg-[#0d0d0d] text-[#f5f3ef] font-bold text-[11px] lg:text-[13px] tracking-[0.02em] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] transition-colors flex-shrink-0"
            >
              Work with us
            </a>
          </li>
        </ul>

        {/* Mobile CTA only */}
        <a
          href="/#contact"
          className="md:hidden inline-flex items-center px-4 py-2.5 bg-[#0d0d0d] text-[#f5f3ef] font-bold text-[13px] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] transition-colors"
        >
          Work with us
        </a>
      </div>
    </header>
  );
}
