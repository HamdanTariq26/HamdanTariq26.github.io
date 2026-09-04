"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type OutreachItem, type OutreachPhoto, outreachActivities } from "@/data/profile";

export default function OutreachDetailView({ item }: { item: OutreachItem }) {
  const [selectedPhoto, setSelectedPhoto] = useState<OutreachPhoto | null>(null);

  // Other outreach stories for navigation at the bottom
  const otherStories = outreachActivities.filter((other) => other.id !== item.id);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 dark-panel border-b border-[hsl(var(--foreground)/0.18)]">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Link
            href="/#outreach"
            className="group flex items-center gap-3 text-xs font-semibold tracking-tight text-[hsl(var(--background))] hover:text-[#F5A623] transition-colors"
          >
            <span className="grid h-8 w-8 place-items-center border border-[#F5A623] text-[#F5A623] text-[10px] font-bold transition group-hover:bg-[#F5A623] group-hover:text-[#182C30]">
              &larr;
            </span>
            <span>Back to Portfolio</span>
          </Link>

          <span className="mono text-[10px] text-[#F5A623] tracking-widest uppercase hidden sm:block">
            Field Log &middot; Outreach Detail
          </span>

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] transition sm:flex border border-[hsl(var(--background)/0.32)] text-[hsl(var(--background))] hover:border-[#F5A623] hover:text-[#F5A623]"
          >
            View CV
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
        {/* Eyebrow & Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[hsl(var(--foreground)/0.18)] pb-4">
          <div className="flex items-center gap-3">
            <span className="mono text-xs font-semibold text-[#E05470] tracking-wider uppercase">
              {item.type}
            </span>
            {item.program && (
              <>
                <span className="text-[hsl(var(--muted-foreground))]">&middot;</span>
                <span className="mono text-xs text-[hsl(var(--muted-foreground))]">
                  {item.program}
                </span>
              </>
            )}
          </div>
          <span className="mono text-xs text-[hsl(var(--muted-foreground))]">
            {item.period}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-8 max-w-[980px]">
          <h1
            className="display leading-[0.88] text-[hsl(var(--foreground))]"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 6.2rem)" }}
          >
            {item.title}
          </h1>

          {item.subtitle && (
            <p className="mt-6 text-xl sm:text-2xl text-[hsl(var(--muted-foreground))] leading-relaxed">
              {item.subtitle}
            </p>
          )}
        </div>

        {/* Quick Facts / Metadata Bar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 border border-[hsl(var(--foreground)/0.18)] bg-[hsl(var(--card))]">
          <div>
            <p className="mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Institution / Host
            </p>
            <p className="mt-1 text-sm font-semibold text-[hsl(var(--foreground))]">
              {item.organization}
            </p>
          </div>
          <div>
            <p className="mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Location
            </p>
            <p className="mt-1 text-sm font-semibold text-[hsl(var(--foreground))]">
              {item.location}
            </p>
          </div>
          <div>
            <p className="mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Duration / Timeline
            </p>
            <p className="mt-1 text-sm font-semibold text-[hsl(var(--foreground))]">
              {item.duration || item.period}
            </p>
          </div>
          <div>
            <p className="mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Collaboration &amp; Support
            </p>
            <p className="mt-1 text-sm font-semibold text-[#459e99]">
              {item.partner || "Educational Robotics Lab (NUST)"}
            </p>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        {item.photos && item.photos.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between border-b border-[hsl(var(--foreground)/0.18)] pb-3">
              <h2 className="mono text-xs uppercase tracking-widest text-[#F5A623] font-semibold">
                Event Photography &amp; Field Records
              </h2>
              <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
                Click any photo to enlarge
              </span>
            </div>

            <div className={`mt-6 grid gap-5 ${item.photos.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {item.photos.map((photo, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-[16/11] w-full overflow-hidden border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))] text-left transition hover:border-[#F5A623] hover:shadow-[10px_10px_0_rgba(24,44,48,0.08)]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--foreground)/0.8)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <p className="text-xs text-[hsl(var(--background))] font-medium">
                      {photo.caption || photo.alt}
                    </p>
                    <span className="mono text-[9px] text-[#F5A623] mt-1 inline-flex items-center gap-1">
                      View full size &rarr;
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* In-depth Narrative / Story */}
        <section className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="eyebrow text-[#E05470]">01 / The Mission</span>
            <h2 className="display text-4xl sm:text-5xl mt-3 leading-tight">
              Taking intelligent systems beyond university walls.
            </h2>

            <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-[hsl(var(--foreground)/0.85)]">
              {item.fullStory.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>

            {/* Official Certificate Verification Banner */}
            {item.fileUrl && (
              <div className="mt-10 p-6 sm:p-8 border border-[#E05470]/40 bg-[hsl(var(--card))]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="mono text-[10px] text-[#E05470] uppercase tracking-wider font-semibold">
                      Verified Credential &middot; Certificate of Participation
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-[hsl(var(--foreground))]">
                      Official Institutional Recognition
                    </h3>
                    <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                      Issued by {item.organization} acknowledging participation and technical contributions.
                    </p>
                  </div>
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 px-4 py-2.5 text-xs font-semibold transition bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[#E05470]"
                  >
                    Open Certificate PDF &rarr;
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Modules or Demonstrated Systems */}
          <div className="space-y-8">
            {item.demonstrations && item.demonstrations.length > 0 && (
              <div className="p-6 sm:p-8 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))]">
                <span className="eyebrow text-[#F5A623]">Featured Technologies</span>
                <h3 className="text-2xl font-semibold mt-2">Demonstrated Systems</h3>
                <div className="mt-6 space-y-5">
                  {item.demonstrations.map((demo, dIdx) => (
                    <div key={dIdx} className="border-l-2 border-[#F5A623] pl-4">
                      <h4 className="font-semibold text-base text-[hsl(var(--foreground))]">
                        {demo.name}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                        {demo.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.modules && item.modules.length > 0 && (
              <div className="p-6 sm:p-8 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))]">
                <span className="eyebrow text-[#E05470]">Curriculum &middot; Hands-on Topics</span>
                <h3 className="text-2xl font-semibold mt-2">Workshop Modules</h3>
                <div className="mt-6 space-y-4">
                  {item.modules.map((mod, mIdx) => (
                    <div key={mIdx} className="pb-4 border-b border-[hsl(var(--foreground)/0.1)] last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className="mono text-[10px] text-[#E05470]">0{mIdx + 1}</span>
                        <h4 className="font-semibold text-sm sm:text-base text-[hsl(var(--foreground))]">
                          {mod.title}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] leading-relaxed pl-5">
                        {mod.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights list */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="p-6 sm:p-8 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))]">
                <span className="eyebrow text-[#459e99]">Core Takeaways</span>
                <h3 className="text-xl font-semibold mt-2">Key Outcomes &amp; Skills</h3>
                <ul className="mt-4 space-y-2.5">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#459e99]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Team & Supervision */}
            {(item.supervisors || item.team) && (
              <div className="p-6 sm:p-8 border border-[hsl(var(--foreground)/0.15)] bg-[hsl(var(--background))]">
                {item.supervisors && item.supervisors.length > 0 && (
                  <div>
                    <p className="mono text-[9px] uppercase tracking-wider text-[#E05470] font-semibold">
                      Supervision &amp; Mentorship
                    </p>
                    <ul className="mt-2.5 space-y-2 text-xs">
                      {item.supervisors.map((s, sIdx) => {
                        const parts = s.split(" — ");
                        return (
                          <li key={sIdx} className="leading-snug">
                            {parts.length > 1 ? (
                              <>
                                <span className="font-semibold text-[hsl(var(--foreground))]">{parts[0]}</span>
                                <span className="text-[hsl(var(--muted-foreground))]"> &mdash; {parts.slice(1).join(" — ")}</span>
                              </>
                            ) : (
                              <span className="font-medium text-[hsl(var(--foreground))]">{s}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {item.team && item.team.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-[hsl(var(--foreground)/0.1)]">
                    <p className="mono text-[9px] uppercase tracking-wider text-[#F5A623] font-semibold">
                      Internees &amp; Presentation Team
                    </p>
                    <ul className="mt-2.5 space-y-2 text-xs">
                      {item.team.map((t, tIdx) => {
                        const parts = t.split(" — ");
                        return (
                          <li key={tIdx} className="leading-snug">
                            {parts.length > 1 ? (
                              <>
                                <span className="font-semibold text-[hsl(var(--foreground))]">{parts[0]}</span>
                                <span className="text-[hsl(var(--muted-foreground))]"> &mdash; {parts.slice(1).join(" — ")}</span>
                              </>
                            ) : (
                              <span className="font-medium text-[hsl(var(--muted-foreground))]">{t}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Other Outreach Stories Navigation */}
        <section className="mt-24 pt-12 border-t border-[hsl(var(--foreground)/0.18)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="eyebrow text-[#F5A623]">Explore More Outreach</span>
              <h3 className="display text-3xl sm:text-4xl mt-1">Other Community &amp; STEM Initiatives</h3>
            </div>
            <Link
              href="/#outreach"
              className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))] hover:text-[#F5A623] transition-colors"
            >
              Back to Overview &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {otherStories.map((other) => (
              <Link
                key={other.id}
                href={`/outreach/${other.id}`}
                className="group card-lift p-6 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))] transition duration-300 hover:border-[#F5A623] block"
              >
                <span className="mono text-[9px] uppercase tracking-wider text-[#E05470] font-semibold">
                  {other.type}
                </span>
                <h4 className="mt-2 text-xl font-semibold text-[hsl(var(--foreground))] group-hover:text-[#F5A623] transition-colors">
                  {other.title}
                </h4>
                <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] line-clamp-2">
                  {other.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--foreground))] group-hover:translate-x-1 transition-transform">
                  Read full story &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Full-screen Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center p-4 sm:p-8 backdrop-blur-md bg-[hsl(var(--foreground)/0.85)]"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[92vh] max-w-[950px] w-full overflow-hidden border border-[hsl(var(--foreground))] bg-[hsl(var(--background))] p-4 sm:p-6 shadow-[18px_18px_0_#F5A623]">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center border border-[hsl(var(--foreground)/0.3)] bg-[hsl(var(--background))] transition hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]"
              aria-label="Close photo preview"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden border border-[hsl(var(--foreground)/0.15)] bg-black/5">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                sizes="(max-width: 950px) 95vw, 950px"
                className="object-contain"
              />
            </div>

            {selectedPhoto.caption && (
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-[hsl(var(--foreground)/0.15)]">
                <p className="text-xs sm:text-sm font-medium text-[hsl(var(--foreground))]">
                  {selectedPhoto.caption}
                </p>
                <span className="mono text-[9px] text-[hsl(var(--muted-foreground))]">
                  DOCUMENTED RECORD
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
