"use client";

import { experience } from "@/data/profile";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section
      id="journey"
      className="scroll-mt-16 px-5 py-24 sm:px-8 lg:px-12 lg:py-32 muted-panel"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="flex items-center justify-between">
            <span className="eyebrow">04 / trajectory &middot; experience</span>
            <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
              PROFESSIONAL &amp; RESEARCH INTERNSHIPS
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-16 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal>
            <div>
              <h2
                className="display max-w-[520px] leading-[0.82]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)" }}
              >
                Learning in public,<br />
                <em className="text-[#E05470]">building in private.</em>
              </h2>
              <p
                className="mt-8 max-w-[390px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
              >
                Practical engineering and research internships focused on robotics, machine learning, data science, and applied systems.
              </p>
            </div>
          </Reveal>

          <Reveal delay="delay-1">
            <div className="border-t border-[hsl(var(--foreground)/0.25)]">
              {experience.map((item, index) => (
                <div
                  key={`exp-${index}-${item.period}`}
                  className="grid gap-4 py-7 sm:grid-cols-[160px_1fr_24px] border-b border-[hsl(var(--foreground)/0.25)]"
                >
                  <span className="mono text-[10px] text-[#E05470]">
                    {item.period}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.organization}</h3>
                    {item.role && (
                      <p className="mono text-[11px] text-[hsl(var(--foreground)/0.7)] mt-0.5">
                        {item.role}
                      </p>
                    )}
                    <p
                      className="mt-2 max-w-[540px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
                    >
                      {item.summary}
                    </p>
                    {item.fileUrl && (
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--foreground))] hover:text-[#E05470] transition-colors"
                      >
                        View certificate
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </a>
                    )}
                  </div>
                  <span
                    className="hidden mono text-right text-[10px] text-[hsl(var(--muted-foreground))] sm:block"
                  >
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
