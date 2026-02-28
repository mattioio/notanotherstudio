export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-white px-6 md:px-12 pt-10 pb-8 border-t border-white/8">
      <div className="flex flex-wrap items-center justify-between gap-5 pb-6 border-b border-white/8">
        <a href="/#home" className="syne text-white no-underline text-xl tracking-[-0.03em] leading-none">
          Not Another Studio
        </a>
        <nav className="flex flex-wrap gap-7">
          {[
            { label: "Services", href: "/#services" },
            { label: "Our Work", href: "/#work" },
            { label: "Packages", href: "/#packages" },
            { label: "Process", href: "/#process" },
            { label: "Contact us", href: "/#contact" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-[13px] text-white/50 hover:text-white transition-colors no-underline"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <p className="text-xs text-white/30 mt-5">
        &copy; Copyright {new Date().getFullYear()} &mdash; Not Another Studio LTD
      </p>
    </footer>
  );
}
