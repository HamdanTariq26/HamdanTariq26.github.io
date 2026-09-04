"use client";

import Reveal from "./Reveal";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="scroll-mt-16 px-5 pt-12 pb-24 sm:px-8 sm:pt-16 sm:pb-28 lg:px-12 lg:pt-16 lg:pb-32 bg-[hsl(var(--background))]"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section rule eyebrow — Structural Separation matching Sections 03 & 05 */}
        <Reveal>
          <div className="section-rule flex items-center justify-between pt-4">
            <span className="eyebrow">06 / proof of work &middot; certifications</span>
            <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
              VERIFIED CREDENTIALS
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:items-center">
          {/* Left Column: Heading & Context */}
          <Reveal>
            <div>
              <h2
                className="display leading-[0.85] text-[hsl(var(--foreground))]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
              >
                The details<br />
                behind the{" "}
                <em className="text-[#E05470]">signal.</em>
              </h2>
              <p className="mt-6 max-w-[400px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                Formal technical certifications and specialized workshop credentials verifying competencies across artificial intelligence, neural architectures, and biomedical engineering systems.
              </p>
            </div>
          </Reveal>

          {/* Right Column: Reference-style Cards */}
          <Reveal delay="delay-1">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Card 1: HCIA-AI */}
              <a
                href="/certificates/hcia-ai.pdf"
                target="_blank"
                rel="noreferrer"
                className="card-lift block p-7 sm:p-8 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))] transition duration-300 hover:border-[#E05470] hover:shadow-[12px_12px_0_rgba(224,84,112,0.08)]"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E05470"
                  strokeWidth="1.4"
                >
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>

                <span className="eyebrow mt-10 block text-[hsl(var(--muted-foreground))]">
                  Certification
                </span>

                <h3 className="mt-3 text-2xl font-semibold text-[hsl(var(--foreground))]">
                  HCIA-AI
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  Huawei Certified ICT Associate &mdash; Artificial Intelligence.
                </p>

                <span className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E05470]">
                  View certificate
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </a>

              {/* Card 2: BCI */}
              <a
                href="/certificates/bci-workshop.pdf"
                target="_blank"
                rel="noreferrer"
                className="card-lift block p-7 sm:p-8 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))] transition duration-300 hover:border-[#F5A623] hover:shadow-[12px_12px_0_rgba(245,166,35,0.08)]"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F5A623"
                  strokeWidth="1.4"
                >
                  <path d="M9 12l2 2 4-4M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" />
                </svg>

                <span className="eyebrow mt-10 block text-[hsl(var(--muted-foreground))]">
                  Workshop &middot; Technical Training
                </span>

                <h3 className="mt-3 text-2xl font-semibold text-[hsl(var(--foreground))]">
                  BCI Healthcare Control Systems
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  Biomedical instrumentation and healthcare control systems in BCI (SMME-NUST &amp; Brock University).
                </p>

                <span className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5A623]">
                  View certificate
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
