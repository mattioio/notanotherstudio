"use client";

import { FooterCompass } from "./Footer";
import ContactForm from "./ContactForm";

interface HomeContactSectionProps {
  headline?: React.ReactNode;
  body?: string;
}

export default function HomeContactSection({
  headline = <>Ready to <span className="text-[#f0c93a]">look like the agency you are?</span></>,
  body = "Most agencies are losing instructions to competitors with better-looking brands and websites, and they don't even know it. Whether you're starting from scratch or ready for a refresh, let's fix that. Drop us a message and we'll come back within one working day.",
}: HomeContactSectionProps) {
  return (
    <section
      id="contact"
      className="relative bg-[#0d0d0d] text-white"
    >
      <FooterCompass />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/Texturelabs_Grunge_316M.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
          zIndex: 2,
        }}
      />

      <div className="relative z-10 px-6 md:px-12 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div>
          <h2
            className="syne leading-[1.0] tracking-[-0.03em] mb-5 fade-up"
            style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
          >
            {headline}
          </h2>
          <p className="text-white/50 text-base font-light leading-[1.7] fade-up fade-up-delay-1">
            {body}
          </p>
        </div>

        <ContactForm
          className="scroll-reveal"
          textareaPlaceholder="Briefly describe your agency, your goals, and any timing requirements..."
        />
      </div>
    </section>
  );
}
