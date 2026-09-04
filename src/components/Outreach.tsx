"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { outreachActivities, type OutreachPhoto } from "@/data/profile";
import Reveal from "./Reveal";

export default function Outreach() {
  const [activePhoto, setActivePhoto] = useState<OutreachPhoto | null>(null);

  return (
    <section
      id="outreach"
      className="scroll-mt-16 px-5 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-20 lg:px-12 lg:pt-32 lg:pb-20 bg-[hsl(var(--background))]"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section rule eyebrow */}
        <Reveal>
          <div className="section-rule flex items-center justify-between pt-4">
            <span className="eyebrow">05 / engagement &middot; outreach &amp; stem</span>
            <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
              COMMUNITY &amp; EDUCATION
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          {/* Left Column: Context & Philosophy */}
          <Reveal>
            <div>
              <h2
                className="display max-w-[500px] leading-[0.82]"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 6rem)" }}
              >
                Sharing knowledge,<br />
                <em className="text-[#E05470]">inspiring builders.</em>
              </h2>
              <p
                className="mt-8 max-w-[400px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
              >
                Beyond university labs and codebases, I actively participate in initiatives that bring robotics, computer vision, AI, and aerial systems into schools and communities—fostering curiosity and practical skills in the next generation.
              </p>

              <div className="mt-8 pt-6 border-t border-[hsl(var(--foreground)/0.15)]">
                <p className="mono text-[10px] text-[#F5A623] uppercase tracking-wider font-semibold">
                  Core Outreach Pillars
                </p>
                <ul className="mt-3 space-y-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E05470]" />
                    <span>Hands-on STEM &amp; Humanoid Robotics Workshops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623]" />
                    <span>Applied AgriTech &amp; Aerial Sensing Demonstrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#459e99]" />
                    <span>Demystifying AI &amp; Engineering for School Students</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Outreach Activities */}
          <div className="space-y-10">
            {outreachActivities.map((item, index) => (
              <Reveal key={item.id} delay={index === 0 ? "delay-1" : index === 1 ? "delay-2" : "delay-3"}>
                <article
                  className="card-lift p-6 sm:p-8 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))] transition duration-300 hover:border-[hsl(var(--foreground)/0.5)] hover:shadow-[14px_14px_0_rgba(24,44,48,0.06)]"
                >
                  {/* Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[hsl(var(--foreground)/0.12)] pb-4">
                    <div>
                      <span className="mono text-[10px] text-[#E05470] tracking-wider uppercase font-semibold">
                        {item.type}
                      </span>
                      {item.program && (
                        <p className="mono text-[10px] text-[hsl(var(--muted-foreground))] mt-0.5">
                          {item.program}
                        </p>
                      )}
                    </div>
                    <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="mt-5 text-xl sm:text-2xl font-semibold text-[hsl(var(--foreground))]">
                    {item.title}
                  </h3>

                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                    <span className="font-medium text-[hsl(var(--foreground)/0.85)]">
                      {item.organization}
                    </span>
                    {item.location && (
                      <>
                        <span>&middot;</span>
                        <span>{item.location}</span>
                      </>
                    )}
                  </div>

                  {item.partner && (
                    <p className="mt-1 text-xs text-[#459e99] font-medium">
                      {item.partner}
                    </p>
                  )}

                  {/* Summary */}
                  <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {item.summary}
                  </p>

                  {/* Photo Gallery Grid */}
                  {item.photos && item.photos.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <p className="mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))] font-semibold">
                          Event Photography:
                        </p>
                        <span className="mono text-[9px] text-[#F5A623]">
                          {item.photos.length} Photos
                        </span>
                      </div>
                      <div className={`grid gap-3 ${item.photos.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
                        {item.photos.map((photo, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setActivePhoto(photo)}
                            className="group/photo relative aspect-[4/3] w-full overflow-hidden border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--foreground)/0.05)] text-left focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                            title={photo.caption || photo.alt}
                          >
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              sizes="(max-width: 640px) 50vw, 250px"
                              className="object-cover transition-transform duration-500 group-hover/photo:scale-105"
                            />
                            <div className="absolute inset-0 bg-[hsl(var(--foreground)/0)] transition-colors group-hover/photo:bg-[hsl(var(--foreground)/0.25)] flex items-end p-2">
                              <span className="mono text-[8px] text-[hsl(var(--background))] bg-[hsl(var(--foreground)/0.85)] px-1.5 py-0.5 opacity-0 group-hover/photo:opacity-100 transition-opacity">
                                Enlarge
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Links Bar */}
                  <div className="mt-7 pt-4 border-t border-[hsl(var(--foreground)/0.12)] flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={`/outreach/${item.id}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[hsl(var(--foreground))] hover:text-[#F5A623] transition-colors"
                    >
                      <span>Read full outreach story &amp; details</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                    </Link>

                    {item.fileUrl && (
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E05470] hover:underline"
                      >
                        <span>View Certificate PDF</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Full-screen Photo Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center p-4 sm:p-8 backdrop-blur-md bg-[hsl(var(--foreground)/0.85)]"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[90vh] max-w-[900px] w-full overflow-hidden border border-[hsl(var(--foreground))] bg-[hsl(var(--background))] p-4 sm:p-6 shadow-[18px_18px_0_#F5A623]">
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center border border-[hsl(var(--foreground)/0.3)] bg-[hsl(var(--background))] transition hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]"
              aria-label="Close photo preview"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            {/* Image display */}
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-[hsl(var(--foreground)/0.15)] bg-black/5">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="(max-width: 900px) 95vw, 900px"
                className="object-contain"
              />
            </div>

            {/* Caption */}
            {activePhoto.caption && (
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-[hsl(var(--foreground)/0.15)]">
                <p className="text-xs sm:text-sm font-medium text-[hsl(var(--foreground))]">
                  {activePhoto.caption}
                </p>
                <span className="mono text-[9px] text-[hsl(var(--muted-foreground))]">
                  FIELD PHOTOGRAPHY
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
