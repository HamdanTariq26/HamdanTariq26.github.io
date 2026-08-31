"use client";

import { certifications } from "@/data/profile";
import Reveal from "./Reveal";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[hsl(var(--background))]"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:items-center">
        <Reveal>
          <div>
            <span className="eyebrow">05 / proof of work</span>
            <h2
              className="display mt-6 leading-[0.85]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
            >
              The details<br />
              behind the{" "}
              <em className="text-[#E05470]">signal.</em>
            </h2>
          </div>
        </Reveal>

        <Reveal delay="delay-1">
          <div className="grid gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <a
                key={cert.id}
                href={cert.fileUrl}
                target="_blank"
                rel="noreferrer"
                className={`card-lift block p-6 transition border border-[hsl(var(--foreground)/0.2)] ${
                  cert.featured
                    ? "hover:border-[#E05470]"
                    : "hover:border-[#F5A623]"
                }`}
              >
                {/* Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={cert.featured ? "#E05470" : "#F5A623"}
                  strokeWidth="1.4"
                >
                  {cert.featured ? (
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  ) : (
                    <path d="M9 12l2 2 4-4M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" />
                  )}
                </svg>

                <span
                  className="eyebrow mt-10 block text-[hsl(var(--muted-foreground))]"
                >
                  {cert.type}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{cert.id === "hcia-ai" ? "HCIA-AI" : "BCI healthcare control systems"}</h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
                >
                  {cert.summary.slice(0, 90)}…
                </p>

                <span
                  className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${
                    cert.featured ? "text-[#E05470]" : "text-[#F5A623]"
                  }`}
                >
                  View certificate PDF
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
