import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zento — Support",
  description:
    "Get help with Zento. Contact us for bug reports, feature requests, or any questions.",
  alternates: { canonical: "/zento/support" },
  robots: { index: true, follow: true },
};

export default function ZentoSupportPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="syne text-[clamp(36px,5vw,56px)] tracking-[-0.03em] leading-[1.05] mb-6">
          Support
        </h1>
        <div className="space-y-4 text-[#333] font-light leading-relaxed">
          <p>
            For bug reports, feature requests, or any questions about Zento,
            get in touch at{" "}
            <a
              href="mailto:hello@notanother.studio"
              className="text-black font-medium underline underline-offset-4"
            >
              hello@notanother.studio
            </a>
          </p>
          <p>We aim to respond within one working day.</p>
        </div>
      </div>
    </div>
  );
}
