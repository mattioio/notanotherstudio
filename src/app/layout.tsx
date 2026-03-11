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

const BASE_URL = "https://notanotherstudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Not Another Studio | Web, Print & Brand for Commercial Letting Agencies",
    template: "%s | Not Another Studio",
  },
  description:
    "We design and build websites, print materials and brand identities exclusively for commercial letting agencies. Fixed prices, fast turnarounds, no fluff.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Not Another Studio",
    title: "Not Another Studio | Web, Print & Brand for Commercial Letting Agencies",
    description:
      "We design and build websites, print materials and brand identities exclusively for commercial letting agencies. Fixed prices, fast turnarounds, no fluff.",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Not Another Studio | Web, Print & Brand for Commercial Letting Agencies",
    description:
      "We design and build websites, print materials and brand identities exclusively for commercial letting agencies. Fixed prices, fast turnarounds, no fluff.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#0d0d0d",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Not Another Studio",
              url: "https://notanotherstudio.com",
              description:
                "We design and build websites, print materials and brand identities. Fixed prices, fast turnarounds, no fluff.",
              foundingDate: "2021",
              areaServed: "GB",
              serviceType: [
                "Web Design",
                "Brand Identity",
                "Print Design",
                "UX Design",
                "Product Design",
              ],
            }),
          }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
