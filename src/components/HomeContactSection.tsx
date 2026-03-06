"use client";

import { useState } from "react";

const chips = [
  { label: "Web Package", value: "Web Package" },
  { label: "Print Package", value: "Print Package" },
  { label: "Brand Package", value: "Brand Package" },
  { label: "Not sure yet", value: "Not sure yet" },
];

interface HomeContactSectionProps {
  headline?: React.ReactNode;
  body?: string;
}

export default function HomeContactSection({
  headline = <>Ready to <span className="text-[#f0c93a]">look like the agency you are?</span></>,
  body = "Most agencies are losing instructions to competitors with better-looking brands and websites, and they don't even know it. Whether you're starting from scratch or ready for a refresh, let's fix that. Drop us a message and we'll come back within one working day.",
}: HomeContactSectionProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleChip(value: string) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      interests: selected,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please email us directly.");
    }
  }

  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 py-24 lg:py-32 bg-[#0d0d0d] text-white grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center"
    >
      {/* Grunge texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/Texturelabs_Grunge_316M.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      />
      {/* Left — copy */}
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

      {/* Right — form */}
      {submitted ? (
        <div className="flex flex-col items-center justify-center text-center py-16 fade-up">
          <div className="text-[#f0c93a] syne text-5xl mb-4">✓</div>
          <h3 className="syne text-2xl mb-3">Sent. We&apos;ll be in touch.</h3>
          <p className="text-white/50 text-sm font-light max-w-sm">
            We aim to respond within one working day. Check your inbox.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 fade-up fade-up-delay-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">
                Your name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Jane Smith"
                required
                className="bg-white/6 border border-white/12 text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors placeholder:text-white/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">
                Company
              </label>
              <input
                type="text"
                name="company"
                placeholder="Acme Commercial Lettings"
                className="bg-white/6 border border-white/12 text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="jane@smithestates.co.uk"
              required
              className="bg-white/6 border border-white/12 text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors placeholder:text-white/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">
              I&apos;m interested in
            </label>
            <div className="flex flex-wrap gap-2">
              {chips.map(({ label, value }) => {
                const isSelected = selected.includes(value);
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleChip(value)}
                    className={`px-4 py-2 text-[13px] font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#f0c93a] border-[#f0c93a] text-[#0d0d0d] font-bold"
                        : "bg-transparent border-white/18 text-white/60 hover:border-white/50 hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">
              Tell us about your project
            </label>
            <textarea
              name="message"
              placeholder="Briefly describe your agency, your goals, and any timing requirements..."
              rows={4}
              className="bg-white/6 border border-white/12 text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors resize-y placeholder:text-white/20"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="self-start px-10 py-4 bg-[#f0c93a] text-[#0d0d0d] font-bold text-[14px] tracking-[0.05em] uppercase border-none cursor-pointer hover:-translate-y-0.5 hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {loading ? "Sending..." : "Send enquiry →"}
          </button>
        </form>
      )}
    </section>
  );
}
