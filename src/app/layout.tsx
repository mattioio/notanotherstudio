import type { Metadata } from "next";
import {
  Syne,
  Plus_Jakarta_Sans,
  Space_Grotesk,
  Instrument_Serif,
  Unbounded,
  Bricolage_Grotesque,
  Bebas_Neue,
  Fraunces,
  DM_Serif_Display,
  Playfair_Display,
  Big_Shoulders,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FontToggle from "@/components/FontToggle";

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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["800"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["800"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["900"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["900"],
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
      <body className={[
        syne.variable,
        jakarta.variable,
        spaceGrotesk.variable,
        instrumentSerif.variable,
        unbounded.variable,
        bricolage.variable,
        bebasNeue.variable,
        fraunces.variable,
        dmSerifDisplay.variable,
        playfair.variable,
        bigShoulders.variable,
      ].join(" ")}>
        <Nav />
        <main>{children}</main>
        <Footer />
        <FontToggle />
      </body>
    </html>
  );
}
