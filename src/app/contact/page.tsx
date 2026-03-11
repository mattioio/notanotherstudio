import type { Metadata } from "next";
import HomeContactSection from "@/components/HomeContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project and we'll come back to you within one working day. Fixed-price quotes for web, print and brand.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Not Another Studio",
    description:
      "Tell us about your project and we'll come back to you within one working day. Fixed-price quotes for web, print and brand.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      <HomeContactSection />
    </div>
  );
}
