"use client";

import { useContactForm } from "@/hooks/useContactForm";

interface ContactFormProps {
  className?: string;
  textareaPlaceholder?: string;
}

export default function ContactForm({
  className = "",
  textareaPlaceholder = "Briefly describe your business and what you need...",
}: ContactFormProps) {
  const { selected, submitted, loading, error, toggleChip, handleSubmit } = useContactForm();

  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center text-center py-16 relative bg-[#1a1a24]/70 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-white/[0.1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)] ${className}`}>
        <div className="text-[#f0c93a] syne text-5xl mb-4">✓</div>
        <h3 className="syne text-2xl mb-3">Sent. We&apos;ll be in touch.</h3>
        <p className="text-white/50 text-sm font-light max-w-sm">
          We aim to respond within one working day. Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 relative bg-[#1a1a24]/70 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 border border-white/[0.1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)] ${className}`}>
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
            className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-xl text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors placeholder:text-white/20"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">
            Company
          </label>
          <input
            type="text"
            name="company"
            placeholder="Your company"
            className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-xl text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors placeholder:text-white/20"
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
          placeholder="you@company.co.uk"
          required
          className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-xl text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors placeholder:text-white/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/40">
          Tell us about your project
        </label>
        <textarea
          name="message"
          placeholder={textareaPlaceholder}
          required
          rows={4}
          className="bg-white/8 backdrop-blur-xl border border-white/12 rounded-xl text-white px-4 py-3.5 text-[15px] font-light outline-none focus:border-[#f0c93a] transition-colors resize-y placeholder:text-white/20"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="self-start px-10 py-4 rounded-full bg-[#f0c93a] text-[#0d0d0d] font-bold text-[14px] tracking-[0.05em] uppercase border-none cursor-pointer hover:-translate-y-0.5 hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {loading ? "Sending..." : "Send enquiry →"}
      </button>
    </form>
  );
}
