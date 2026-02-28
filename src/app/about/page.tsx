import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      <section className="px-6 md:px-12 py-20 lg:py-28 bg-[#f0ede6]">
        <div className="eyebrow mb-6">About us</div>
        <h1 className="syne text-[clamp(44px,6vw,72px)] tracking-[-0.03em] leading-[1.0] max-w-3xl mb-6">
          Built by people who know the lettings industry
        </h1>
        <p className="text-[17px] text-[#6b6b6b] font-light max-w-xl leading-[1.6]">
          Not Another Studio exists because letting agencies kept getting sold generic websites by agencies who didn&apos;t understand the property market. We set out to change that.
        </p>
      </section>

      <section className="px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 border-b border-black/10">
        <div>
          <h2 className="syne text-[clamp(28px,3.5vw,44px)] tracking-[-0.03em] leading-[1.05] mb-6">How we started</h2>
          <div className="space-y-5 text-[#6b6b6b] font-light leading-relaxed">
            <p>Our founder spent nearly a decade working inside a commercial letting agency before transitioning into design. The frustration was simple: every web agency tried to sell the same thing: a template with no understanding of how letting agencies actually acquire clients.</p>
            <p>When he moved into the industry, he started quietly taking on letting agency clients. Word spread. The results were measurably better because the approach was fundamentally different, starting from a deep understanding of the sector.</p>
            <p>Today, Not Another Studio works exclusively with letting agencies across the UK, from two-person independents to regional brands with multiple offices.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[2px]">
          {[
            { v: "2021", l: "Founded" },
            { v: "40+", l: "Agencies served" },
            { v: "98%", l: "Client retention" },
            { v: "UK only", l: "We know your market" },
          ].map(({ v, l }) => (
            <div key={l} className="bg-[#f0ede6] p-8">
              <div className="syne text-[40px] text-[#f0c93a] leading-none tracking-[-0.03em]">{v}</div>
              <div className="text-xs text-[#6b6b6b] mt-2 font-medium uppercase tracking-widest">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20">
        <div className="section-label mb-14">How we work</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
          {[
            { num: "01", title: "Sector focus over generalism", desc: "We only work with letting agencies. That means we know your challenges before you've even explained them." },
            { num: "02", title: "Transparency in everything", desc: "No hidden costs, no vague timelines. Every project comes with a clear scope, a fixed price, and regular updates." },
            { num: "03", title: "Results, not deliverables", desc: "A website is only valuable if it does something for your business. We measure success in enquiries and instructions." },
            { num: "04", title: "Long-term relationships", desc: "Most of our clients have been with us for years. We think that says more about how we work than any case study." },
          ].map(({ num, title, desc }) => (
            <div key={num} className="bg-[#f0ede6] p-10">
              <div className="syne text-[64px] text-black/8 leading-none mb-4">{num}</div>
              <h3 className="font-bold text-lg mb-3">{title}</h3>
              <p className="text-sm text-[#6b6b6b] font-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 bg-[#0d0d0d] text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div>
          <h2 className="syne text-[clamp(28px,3.5vw,44px)] tracking-[-0.03em] mb-3">Work with a team who gets it</h2>
          <p className="text-white/50 font-light max-w-lg">We know what letting agencies need from a website because we&apos;ve spent years working alongside them.</p>
        </div>
        <a href="/#contact" className="flex-shrink-0 inline-block px-8 py-4 bg-[#f0c93a] text-[#0d0d0d] font-bold text-sm tracking-[0.02em] no-underline hover:-translate-y-0.5 transition-transform">
          Start a Conversation →
        </a>
      </section>
    </div>
  );
}
