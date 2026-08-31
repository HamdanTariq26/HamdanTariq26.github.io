"use client";

import { profile } from "@/data/profile";
import AnimateIn from "./AnimateIn";

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-14 border-b border-border bg-section-about py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn animation="fade-in">
          <div className="flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-accent" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              About Me
            </h2>
            <div className="h-px flex-1 bg-border/60 max-w-[80px]" aria-hidden />
          </div>
        </AnimateIn>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_290px] lg:gap-14">
          {/* ── Main Narrative: Progressive Typography Reveal ── */}
          <div className="space-y-6 text-base leading-relaxed text-text-secondary">
            {profile.about.map((paragraph, idx) => (
              <div
                key={idx}
                className={
                  idx === 0
                    ? "relative border-l-2 border-accent/40 pl-4 sm:pl-5 text-base sm:text-lg font-medium text-text-primary/95 leading-relaxed"
                    : "text-text-secondary"
                }
              >
                <p>{renderFormattedText(paragraph)}</p>
              </div>
            ))}
          </div>

          {/* ── Academic Profile Snapshot: Anchored Sticky Card with Differential Scroll Depth ── */}
          <div className="lg:sticky lg:top-24">
            <aside className="rounded-2xl border border-border bg-white p-6 text-xs shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent/40 hover:-translate-y-0.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h3 className="font-semibold text-accent uppercase tracking-wider text-[11px] font-mono">
                  Academic Background
                </h3>
              </div>

              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-text-muted font-mono text-[11px] uppercase tracking-wider">Education</dt>
                  <dd className="mt-1 font-semibold text-text-primary text-xs sm:text-sm">
                    BS Artificial Intelligence
                  </dd>
                  <dd className="text-text-secondary mt-0.5">NUST, Balochistan Campus</dd>
                  <dd className="text-text-muted mt-0.5 font-mono text-[11px]">2024–2028 &middot; Quetta, PK</dd>
                </div>

                <div className="border-t border-border/80 pt-3.5">
                  <dt className="text-text-muted font-mono text-[11px] uppercase tracking-wider">Lab Affiliation</dt>
                  <dd className="mt-1 font-semibold text-text-primary text-xs sm:text-sm">
                    Educational Robotics Lab (ER Lab)
                  </dd>
                </div>

                <div className="border-t border-border/80 pt-3.5">
                  <dt className="text-text-muted font-mono text-[11px] uppercase tracking-wider">Core Disciplines</dt>
                  <dd className="mt-1 font-medium text-text-secondary leading-relaxed">
                    AI · Machine Learning · Computer Vision · Robotics · Autonomous Systems
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
