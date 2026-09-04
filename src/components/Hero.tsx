"use client";

import Reveal from "./Reveal";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** SVG orbit/perception diagram — right side of hero */
function OrbitGraphic() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[480px] overflow-hidden p-5 sm:p-8 border border-[hsl(var(--background)/0.2)] bg-[#1c373d] text-[hsl(var(--background))]"
    >
      {/* Scanline sweep */}
      <div className="scanline pointer-events-none absolute inset-0" />
      {/* Inner border */}
      <div
        className="absolute inset-5 sm:inset-8 border border-[hsl(var(--background)/0.14)]"
      />

      <div className="relative flex h-full flex-col justify-between">
        {/* Top labels */}
        <div className="flex items-start justify-between">
          <span className="eyebrow text-[#F5A623]">
            field log / 26.01
          </span>
          <span className="mono flex items-center gap-2 text-[10px] text-[hsl(var(--background)/0.54)]">
            <span
              className="h-3 w-3 rounded-full bg-[#F5A623] inline-block"
            />
            Quetta / PK
          </span>
        </div>

        {/* Orbit circles */}
        <div
          className="relative mx-auto my-6 grid aspect-square w-[62%] place-items-center rounded-full border border-[hsl(var(--background)/0.25)]"
        >
          <div
            className="absolute inset-[12%] rounded-full border border-dashed border-[#F5A623]/75"
          />
          <div
            className="absolute inset-[29%] rounded-full border border-[hsl(var(--background)/0.2)]"
          />
          <div
            className="absolute inset-[41%] rounded-full bg-[#F5A623] shadow-[0_0_0_18px_rgba(245,166,35,0.09)]"
          />
          {/* Cross lines */}
          <div
            className="absolute h-px w-[150%] -rotate-[28deg] bg-[#E05470]"
          />
          <div
            className="absolute h-[150%] w-px rotate-[28deg] bg-[hsl(var(--background)/0.15)]"
          />
          {/* Brain icon (SVG inline) */}
          <svg
            className="relative z-10 h-8 w-8 text-[hsl(var(--background))]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
          <span
            className="absolute -right-6 top-[16%] h-2 w-2 rounded-full bg-[#E05470]"
          />
          <span
            className="absolute -bottom-2 left-[19%] h-2 w-2 rounded-full bg-[#F5A623]"
          />
        </div>

        {/* Bottom data row */}
        <div
          className="grid grid-cols-3 gap-2 pt-4 border-t border-[hsl(var(--background)/0.18)]"
        >
          {[["INPUT", "stereo + IMU"], ["MODEL", "ORB-SLAM3"], ["OUTPUT", "map / act"]].map(
            ([label, value]) => (
              <div key={label}>
                <p
                  className="mono text-[8px] tracking-[0.11em] text-[hsl(var(--background)/0.45)]"
                >
                  {label}
                </p>
                <p className="mt-1 text-[11px] text-[hsl(var(--background))]">
                  {value}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="dark-panel grid-texture relative flex min-h-[760px] items-center overflow-hidden pt-[72px]"
    >
      {/* Decorative rings */}
      <div
        className="pointer-events-none absolute -right-32 top-28 h-[430px] w-[430px] rounded-full border border-[#F5A623]/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-44 h-[270px] w-[270px] rounded-full border border-dashed border-[#E05470]/30"
        aria-hidden
      />

      <div className="mx-auto grid w-full max-w-[1200px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
        <div className="relative z-10">
          {/* Eyebrow */}
          <Reveal>
            <div className="eyebrow mb-8 flex items-center gap-3 text-[#F5A623]">
              <span className="h-px w-8 bg-[#F5A623]" />
              AI undergraduate
            </div>
          </Reveal>

          {/* Display heading */}
          <Reveal delay="delay-1">
            <h1
              className="display max-w-[820px] leading-[0.82] text-[hsl(var(--background))]"
              style={{
                fontSize: "clamp(3.8rem, 9vw, 8.5rem)",
              }}
            >
              Systems<br />
              <em className="text-[#F5A623]">that sense.</em>
            </h1>
          </Reveal>

          {/* Intro */}
          <Reveal delay="delay-2">
            <p
              className="mt-10 max-w-[540px] text-lg leading-relaxed sm:text-xl text-[hsl(var(--background)/0.68)]"
            >
              I build intelligent systems that bring AI, computer vision, robotics, and machine learning into the real world.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay="delay-3">
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToId("work")}
                className="button-sheen group flex items-center gap-4 px-5 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 bg-[#F5A623] text-[#182C30]"
              >
                See the work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-hover:translate-y-1">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </button>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-2 py-3 text-sm transition text-[hsl(var(--background)/0.72)] hover:text-[#F5A623]"
              >
                Download CV
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>
            </div>
          </Reveal>

          {/* Metadata */}
          <Reveal delay="delay-4">
            <div
              className="mt-16 flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-[hsl(var(--background)/0.18)]"
            >
              <span className="mono text-[9px] text-[hsl(var(--background)/0.5)]">
                BASED IN{" "}
                <b className="font-normal text-[hsl(var(--background))]">QUETTA, PK</b>
              </span>
              <span className="mono text-[9px] text-[hsl(var(--background)/0.5)]">
                FOCUS{" "}
                <b className="font-normal text-[hsl(var(--background))]">VISION × AUTONOMY</b>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Orbit diagram */}
        <Reveal delay="delay-2" className="lg:justify-self-end">
          <OrbitGraphic />
        </Reveal>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 right-8 hidden items-center gap-3 lg:flex"
        aria-hidden
      >
        <span className="mono text-[9px] tracking-[0.18em] text-[hsl(var(--background)/0.42)]">
          SCROLL TO EXPLORE
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
