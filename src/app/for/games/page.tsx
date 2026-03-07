import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Another Studio | Games & Interactive",
};

export default function GamesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="eyebrow mb-6">Games &amp; Interactive</div>
        <h1 className="syne tracking-[-0.03em] mb-4" style={{ fontSize: "clamp(44px, 6vw, 76px)" }}>
          Coming soon
        </h1>
        <p className="text-[17px] text-[#6b6b6b] font-light max-w-[400px] mx-auto mb-8">
          We&apos;re building something for the games and interactive industry. Get in touch early.
        </p>
        <a
          href="/for/commercial-properties#contact"
          className="inline-block px-8 py-4 rounded-full bg-[#0d0d0d] text-[#f5f3ef] font-bold text-sm tracking-[0.02em] no-underline hover:bg-[#f0c93a] hover:text-[#0d0d0d] transition-colors"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
