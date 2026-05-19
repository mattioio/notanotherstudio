import type { Metadata } from "next";
import { Krona_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const kronaOne = Krona_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-krona",
});

export const metadata: Metadata = {
  title: "Zento — A meditation in tiles",
  description:
    "A minimal puzzle game designed to quiet your mind. Rotate tiles, find the path, and let everything else fade away. No ads. No timer. No score.",
  alternates: { canonical: "/zento" },
  openGraph: {
    title: "Zento — A meditation in tiles",
    description:
      "A minimal puzzle game designed to quiet your mind. No ads. No timer. No score.",
    url: "/zento",
  },
};

const screenshots = [
  { src: "/zento/02-mid-game.png", alt: "Zento gameplay — find the path through the noise", bg: "#f2c8cb" },
  { src: "/zento/03-themes.png", alt: "Zento themes — pick a palette or let it shuffle", bg: "#d4d1cb" },
  { src: "/zento/04-progress.png", alt: "Zento progress mode — curated levels with increasing complexity", bg: "#e2d3b8" },
  { src: "/zento/05-now-playing.png", alt: "Zento soundtrack — calming piano, no timer, no score", bg: "#dce8d4" },
];

export default function ZentoPage() {
  return (
    <div className={kronaOne.variable}>
      {/* Hero */}
      <section className="min-h-[100svh] flex flex-col items-center justify-center px-6 py-20 text-center bg-[#dce8d4]">
        <h1
          className="text-[clamp(48px,10vw,96px)] tracking-[0.08em] leading-none mb-6"
          style={{ fontFamily: "var(--font-krona), sans-serif" }}
        >
          ZENT<span className="text-[0.92em]">ō</span>
        </h1>
        <p className="text-[clamp(18px,3vw,24px)] text-[#2d3a28] font-light tracking-wide mb-8">
          A meditation in tiles.
        </p>
        <p className="max-w-md text-[#4a5544] font-light leading-relaxed mb-12 text-[15px]">
          A minimal puzzle game designed to quiet your mind. Rotate tiles. Find
          the path. Let everything else fade away.
        </p>
        <div className="flex flex-col items-center gap-5">
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-black text-white rounded-full px-7 py-3.5 text-sm font-medium hover:bg-black/80 transition-colors"
          >
            <svg
              width="20"
              height="24"
              viewBox="0 0 814 1000"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.4-155.5-127.4c-58.1-81.1-105.6-207.1-105.6-326.4 0-186.8 121.5-286 241.2-286 63.5 0 116.4 41.8 156.2 41.8 37.9 0 97-44.3 171-44.3 27.6 0 127 2.6 192.8 97.3zm-271.1-89.1c32.1-38 53.4-90.8 53.4-143.6 0-7.3-.7-14.6-1.9-20.6-50.8 1.9-110.7 33.8-147.1 76.2-27 31.1-53.7 82.5-53.7 136 0 8 1.3 16 1.9 18.6 3.2.6 8.4 1.3 13.6 1.3 45.5 0 102.5-30.5 133.8-67.9z" />
            </svg>
            Download on the App Store
          </a>
          <span className="text-xs text-[#4a5544]/60 font-medium uppercase tracking-widest">
            Free to download · No ads
          </span>
        </div>
      </section>

      {/* Screenshots */}
      {screenshots.map((shot) => (
        <section
          key={shot.src}
          className="flex items-center justify-center px-6 py-16 md:py-24"
          style={{ backgroundColor: shot.bg }}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            width={1290}
            height={2796}
            className="w-full max-w-[320px] md:max-w-[380px] h-auto"
            quality={90}
          />
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-[#dce8d4] px-6 py-12 flex flex-col items-center gap-4 text-center">
        <p
          className="text-lg tracking-[0.08em]"
          style={{ fontFamily: "var(--font-krona), sans-serif" }}
        >
          ZENT<span className="text-[0.92em]">ō</span>
        </p>
        <nav className="flex gap-6 text-sm text-[#4a5544]">
          <Link href="/zento/privacy" className="underline underline-offset-4 hover:text-black transition-colors">
            Privacy
          </Link>
          <Link href="/zento/support" className="underline underline-offset-4 hover:text-black transition-colors">
            Support
          </Link>
        </nav>
      </footer>
    </div>
  );
}
