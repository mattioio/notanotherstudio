import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zento — Privacy Policy",
  description:
    "Privacy policy for Zento. Learn what anonymous data we collect, how we use it, and your choices.",
  alternates: { canonical: "/zento/privacy" },
  robots: { index: true, follow: true },
};

export default function ZentoPrivacyPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="syne text-[clamp(36px,5vw,56px)] tracking-[-0.03em] leading-[1.05] mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#999] mb-16 uppercase tracking-widest font-medium">
          Last updated: February 8, 2026
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#999] mb-4">
              What we collect
            </h2>
            <div className="space-y-3 text-[#333] font-light leading-relaxed">
              <p>
                Anonymous gameplay events (mode started, board
                started/completed, level number for progress mode).
              </p>
              <p>
                Device and app context (viewport size, device pixel ratio,
                browser, OS, PWA install status).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#999] mb-4">
              How we use it
            </h2>
            <div className="space-y-3 text-[#333] font-light leading-relaxed">
              <p>Improve balance, performance, and device support.</p>
              <p>Understand mode usage and level completion rates.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#999] mb-4">
              Your choices
            </h2>
            <div className="space-y-3 text-[#333] font-light leading-relaxed">
              <p>
                Analytics are off by default. Opt in or out anytime in Settings.
              </p>
              <p>
                Clearing site data in your browser removes stored analytics
                identifiers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#999] mb-4">
              Processors
            </h2>
            <div className="space-y-3 text-[#333] font-light leading-relaxed">
              <p>
                We use PostHog to process anonymous analytics events after you
                opt in.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
