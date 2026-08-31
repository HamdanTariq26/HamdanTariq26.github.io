"use client";

import Image from "next/image";
import { profile } from "@/data/profile";
import Reveal from "./Reveal";

function scrollToId(id: string) {
  if (typeof window !== "undefined") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function About() {
  const { about } = profile;

  return (
    <section
      id="about"
      className="scroll-mt-16 relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-36 bg-[hsl(var(--background))]"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section rule eyebrow */}
        <Reveal>
          <div className="section-rule flex items-center justify-between pt-4">
            <span className="eyebrow">01 / orientation</span>
            <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
              QUETTA, PAKISTAN / NUST
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          {/* Left: portrait + display heading */}
          <Reveal>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end lg:block">
              {/* Portrait with gold offset shadow */}
              <div
                className="portrait-frame relative w-28 shrink-0 lg:mb-10 sm:w-36 bg-[hsl(var(--foreground))]"
              >
                <Image
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  width={200}
                  height={250}
                  className="h-40 w-full object-cover object-top sm:h-48 grayscale-[15%]"
                />
                <span
                  className="absolute -bottom-6 left-0 mono text-[9px] text-[hsl(var(--muted-foreground))]"
                >
                  HAMDAN / 2026
                </span>
              </div>

              {/* Display heading */}
              <h2
                className="display max-w-[480px] text-6xl leading-[0.85] sm:text-8xl"
              >
                Curiosity,<br />
                with a{" "}
                <em className="text-[#E05470]">feedback loop.</em>
              </h2>
            </div>
          </Reveal>

          {/* Right: text block */}
          <Reveal delay="delay-1">
            <div className="max-w-[760px]">
              <p className="text-2xl leading-snug tracking-tight sm:text-4xl">
                {about.intro}
              </p>

              <div className="mt-8 max-w-[620px]">
                <p className="text-sm font-semibold uppercase tracking-wider mono mb-3 text-[hsl(var(--muted-foreground))]">
                  My interests include:
                </p>
                <ul className="space-y-1.5">
                  {about.interests.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F5A623]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {about.closing}
                </p>
              </div>

              <button
                onClick={() => scrollToId("systems")}
                className="group mt-9 flex items-center gap-3 text-sm font-semibold"
              >
                How I work
                <span
                  className="grid h-7 w-7 place-items-center border border-[hsl(var(--foreground)/0.3)] transition group-hover:bg-[hsl(var(--foreground))] group-hover:text-[hsl(var(--background))]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* Three principles */}
        <div
          className="mt-24 grid gap-8 py-7 sm:grid-cols-3 sm:gap-0 border-y border-[hsl(var(--foreground)/0.18)]"
        >
          {[
            ["01", "Observe", "Start with the environment, not the algorithm."],
            ["02", "Make legible", "Choose baselines and metrics people can inspect."],
            ["03", "Put it in motion", "Move from notebook to a system that can respond."],
          ].map(([number, title, copy], index) => (
            <Reveal key={number} delay={index === 0 ? "delay-1" : index === 1 ? "delay-2" : "delay-3"}>
              <div
                className={`sm:px-7 ${index < 2 ? "border-b pb-7 sm:border-b-0 sm:border-r sm:pb-0" : ""} border-[hsl(var(--foreground)/0.15)]`}
              >
                <span className="mono text-[10px] text-[#E05470]">{number}</span>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-2 max-w-[230px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
