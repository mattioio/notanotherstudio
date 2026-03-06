import type { Metadata } from "next";
import HomeContactSection from "@/components/HomeContactSection";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      <HomeContactSection />
    </div>
  );
}
