import type { Metadata } from "next";
import {
  Syne,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";


const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Not Another Studio | Web, Print & Brand for Commercial Letting Agencies",
    template: "%s | Not Another Studio",
  },
  description:
    "We design and build websites, print materials and brand identities exclusively for commercial letting agencies. Fixed prices, fast turnarounds, no fluff.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${jakarta.variable}`}>
        {/* Global SVG filter for rough highlight edges */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <filter id="nas-rough" x="-8%" y="-30%" width="116%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="8" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
