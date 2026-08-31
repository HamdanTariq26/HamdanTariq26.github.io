"use client";

import { useEffect, useState, useRef } from "react";
import { experience } from "@/data/profile";
import AnimateIn from "./AnimateIn";
import { IconExternalLink } from "./icons";

export default function Experience() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.55;
      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerPoint) {
          setActiveIdx(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="scroll-mt-14 border-b border-section-experience-border bg-section-experience py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn animation="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent font-mono text-[11px] font-semibold uppercase tracking-wider mb-2">
                Professional Engineering
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Experience
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-text-secondary">
              Applied engineering, research internships, and international robotics collaborations.
            </p>
          </div>
        </AnimateIn>

        {/* ── Interactive Vertical Timeline Progression ── */}
        <div className="mt-12 relative border-l-2 border-accent/25 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-9">
          {experience.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={idx}
                ref={(el) => { itemRefs.current[idx] = el; }}
                className="relative"
              >
                {/* Dynamic Interactive Timeline Node Marker */}
                <div
                  aria-hidden="true"
                  className={`timeline-node absolute -left-[31px] sm:-left-[39px] top-6 h-4 w-4 rounded-full border-2 border-accent transition-all duration-300 ${
                    isActive
                      ? "is-active bg-accent ring-4 ring-blue-500/25 scale-125"
                      : "bg-white shadow-sm"
                  }`}
                />

                {/* Card Container with Active State Illumination */}
                <div
                  className={`timeline-card relative overflow-hidden rounded-xl border-2 bg-white p-6 sm:p-8 transition-all duration-300 ${
                    isActive
                      ? "is-active border-accent shadow-md shadow-blue-900/5 -translate-y-0.5"
                      : "border-border/80 shadow-xs hover:border-accent/60"
                  }`}
                >
                  {/* Blue top accent bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 ${
                      isActive ? "bg-accent opacity-100" : "bg-accent/40 opacity-70"
                    }`}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Blue accent badge */}
                        <span className="rounded-md border border-accent-border bg-accent-subtle px-2.5 py-0.5 text-xs font-semibold text-accent font-mono">
                          {item.role}
                        </span>
                        {item.project && (
                          <span className="rounded-md border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-mono text-text-muted">
                            Project: {item.project}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold text-text-primary sm:text-xl">
                        {item.organization}
                      </h3>

                      {item.partner && (
                        <p className="mt-1 text-sm text-text-secondary font-medium">
                          {item.partner}
                        </p>
                      )}
                    </div>

                    <span className="rounded-md border border-border bg-surface-muted px-3 py-1 font-mono text-xs text-text-muted">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-text-secondary">
                    {item.summary}
                  </p>

                  {/* Supervisors & Certificate Action Row */}
                  <div className="mt-6 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                    {item.supervisors ? (
                      <div className="text-xs">
                        <span className="font-semibold uppercase tracking-wider text-text-muted text-[11px] font-mono">
                          Supervisors:
                        </span>
                        <ul className="mt-1.5 space-y-1 text-text-secondary font-medium">
                          {item.supervisors.map((s) => (
                            <li key={s} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : <div />}

                    {item.fileUrl && (
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-1.5 flex-shrink-0 whitespace-nowrap self-start sm:self-auto rounded-lg border border-border bg-page-subtle px-3.5 py-1.5 text-xs font-medium text-text-secondary transition-all duration-200 hover:border-accent-border hover:bg-accent-subtle hover:text-accent hover:shadow-sm active:scale-95"
                      >
                        <span>View Certificate</span>
                        <IconExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
