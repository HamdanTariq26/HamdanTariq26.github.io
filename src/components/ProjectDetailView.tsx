"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { type ProjectDetail, type ProjectPhoto, projects } from "@/data/projects";

export default function ProjectDetailView({ project }: { project: ProjectDetail }) {
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectPhoto | null>(null);
  const [activeSubsystem, setActiveSubsystem] = useState(0);
  const [showAllSubsystems, setShowAllSubsystems] = useState(false);

  // Reset activeSubsystem when project changes
  useEffect(() => {
    setActiveSubsystem(0);
    setShowAllSubsystems(false);
  }, [project.id]);

  // Other projects for bottom navigation (show 3 other projects)
  const otherProjects = projects.filter((other) => other.id !== project.id);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Top Sticky Header (Exact matching OutreachDetailView) */}
      <header className="sticky top-0 z-40 dark-panel border-b border-[hsl(var(--foreground)/0.18)]">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Link
            href="/#work"
            className="group flex items-center gap-3 text-xs font-semibold tracking-tight text-[hsl(var(--background))] hover:text-[#F5A623] transition-colors"
          >
            <span className="grid h-8 w-8 place-items-center border border-[#F5A623] text-[#F5A623] text-[10px] font-bold transition group-hover:bg-[#F5A623] group-hover:text-[#182C30]">
              &larr;
            </span>
            <span>Back to Selected Work</span>
          </Link>

          <span className="mono text-[10px] text-[#F5A623] tracking-widest uppercase hidden sm:block">
            Project Brief &middot; {project.index}
          </span>

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] transition sm:flex border border-[hsl(var(--background)/0.32)] text-[hsl(var(--background))] hover:border-[#F5A623] hover:text-[#F5A623]"
            >
              GitHub Repo &rarr;
            </a>
          ) : project.repoStatus ? (
            <span className="hidden items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] sm:flex border border-[#F5A623]/60 text-[#F5A623]">
              {project.repoStatus}
            </span>
          ) : (
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] transition sm:flex border border-[hsl(var(--background)/0.32)] text-[hsl(var(--background))] hover:border-[#F5A623] hover:text-[#F5A623]"
            >
              View CV
            </a>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
        {/* Eyebrow & Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[hsl(var(--foreground)/0.18)] pb-4">
          <div className="flex items-center gap-3">
            <span className="mono text-xs font-semibold text-[#E05470] tracking-wider uppercase">
              {project.categoryLabel}
            </span>
            <span className="text-[hsl(var(--muted-foreground))]">&middot;</span>
            <span className="mono text-xs text-[hsl(var(--muted-foreground))]">
              PROJECT {project.index}
            </span>
            <span className="text-[hsl(var(--muted-foreground))]">&middot;</span>
            <span className="mono text-xs font-medium text-[#F5A623]">
              {project.status}
            </span>
          </div>
          <span className="mono text-xs text-[hsl(var(--muted-foreground))]">
            {project.timeline}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-8 max-w-[980px]">
          <h1
            className="display leading-[0.88] text-[hsl(var(--foreground))]"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 6.2rem)" }}
          >
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="mt-6 text-xl sm:text-2xl text-[hsl(var(--muted-foreground))] leading-relaxed">
              {project.subtitle}
            </p>
          )}

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="mono px-2.5 py-1 text-[9px] uppercase tracking-wider bg-[hsl(var(--card))] border border-[hsl(var(--foreground)/0.15)] text-[hsl(var(--foreground))]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Facts / Metadata Bar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 border border-[hsl(var(--foreground)/0.18)] bg-[hsl(var(--card))]">
          <div>
            <p className="mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Project Domain
            </p>
            <p className="mt-1 text-sm font-semibold text-[hsl(var(--foreground))]">
              {project.categoryLabel}
            </p>
          </div>
          <div>
            <p className="mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Execution Stage
            </p>
            <p className="mt-1 text-sm font-semibold text-[hsl(var(--foreground))]">
              {project.status}
            </p>
          </div>
          <div>
            <p className="mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Timeline / Year
            </p>
            <p className="mt-1 text-sm font-semibold text-[hsl(var(--foreground))]">
              {project.timeline}
            </p>
          </div>
          <div>
            <p className="mono text-[9px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Repository &amp; Code
            </p>
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#459e99] hover:underline"
              >
                GitHub Repository &rarr;
              </a>
            ) : project.repoStatus ? (
              <p className="mt-1 text-sm font-semibold text-[#F5A623]">
                {project.repoStatus}
              </p>
            ) : (
              <p className="mt-1 text-sm font-semibold text-[hsl(var(--muted-foreground))]">
                Proprietary / Academic
              </p>
            )}
          </div>
        </div>

        {/* Photo Gallery Grid (Small pics with click-to-enlarge modal) */}
        {project.photos && project.photos.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between border-b border-[hsl(var(--foreground)/0.18)] pb-3">
              <h2 className="mono text-xs uppercase tracking-widest text-[#F5A623] font-semibold">
                Visual Documentation &amp; Artifacts
              </h2>
              <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
                Click any photo to enlarge
              </span>
            </div>

            <div className={`mt-6 grid gap-5 ${project.photos.length <= 2 ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
              {project.photos.map((photo, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-[16/10] w-full overflow-hidden border border-[hsl(var(--foreground)/0.2)] bg-[#0f1a1c] text-left transition hover:border-[#F5A623] hover:shadow-[10px_10px_0_rgba(24,44,48,0.08)]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--foreground)/0.85)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
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

        {/* In-depth Narrative & Structured Details (2-Column Grid matching OutreachDetailView) */}
        <section className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Full Technical Narrative & Deep Dives */}
          <div>
            <span className="eyebrow text-[#E05470]">01 / Overview &amp; Systems Architecture</span>
            <h2 className="display text-4xl sm:text-5xl mt-3 leading-tight">
              Engineering with real-world constraints.
            </h2>

            {/* Overview Paragraphs */}
            <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-[hsl(var(--foreground)/0.85)]">
              {project.overview.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>

            {/* Motivation / Problem Statement Section */}
            {project.problemStatement && (
              <div className="mt-12 pt-8 border-t border-[hsl(var(--foreground)/0.15)]">
                <span className="eyebrow text-[#F5A623]">02 / Motivation</span>
                <h3 className="display text-3xl sm:text-4xl mt-3 leading-tight">
                  {project.problemStatement.heading}
                </h3>
                <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[hsl(var(--foreground)/0.85)]">
                  {project.problemStatement.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Deep Dive Breakdown — Interactive Architecture Navigator */}
            {project.deepDiveSections && project.deepDiveSections.length > 0 && (
              <div className="mt-14 pt-10 border-t border-[hsl(var(--foreground)/0.15)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[hsl(var(--foreground)/0.15)] pb-4">
                  <div>
                    <span className="eyebrow text-[#459e99]">03 / System Architecture &amp; Mechanics</span>
                    <h3 className="display text-3xl sm:text-4xl mt-1 leading-tight">
                      Component Deep Dives
                    </h3>
                  </div>
                  {project.deepDiveSections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setShowAllSubsystems((prev) => !prev)}
                      className="mono text-[10px] uppercase tracking-wider px-3 py-1.5 border border-[hsl(var(--foreground)/0.25)] hover:border-[#F5A623] hover:text-[#F5A623] transition-colors"
                    >
                      {showAllSubsystems ? "✦ Switch to Interactive Navigator" : "☰ Expand All Subsystems"}
                    </button>
                  )}
                </div>

                {/* System Architecture Dataflow Diagram */}
                {project.architectureDiagram && (
                  <div className="mt-8 overflow-hidden border border-[hsl(var(--foreground)/0.2)] bg-[#182C30] text-[#EDE8DC] shadow-[10px_10px_0_rgba(24,44,48,0.1)]">
                    <div className="flex items-center justify-between border-b border-white/15 bg-black/25 px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#E05470]" />
                        <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
                        <span className="h-2 w-2 rounded-full bg-[#459e99]" />
                        <span className="mono text-[10px] uppercase tracking-widest text-white/70 ml-2 font-semibold">
                          System Topology &amp; Pipeline
                        </span>
                      </div>
                      <span className="mono text-[9px] text-[#F5A623] font-semibold tracking-wider">
                        DATAFLOW
                      </span>
                    </div>
                    <pre className="p-5 font-mono text-[11px] sm:text-xs leading-relaxed text-[#EDE8DC]/95 overflow-x-auto">
                      {project.architectureDiagram}
                    </pre>
                  </div>
                )}

                {/* Interactive Subsystem Navigator */}
                {!showAllSubsystems ? (
                  <div className="mt-8">
                    {/* Subsystem Select Tabs */}
                    <div className="flex flex-wrap gap-2">
                      {project.deepDiveSections.map((sec, idx) => {
                        const shortName = sec.heading.split("—")[0].trim().replace(/^Phase \d+\s*—\s*/, "");
                        const isActive = activeSubsystem === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveSubsystem(idx)}
                            className={`mono text-xs px-3.5 py-2 transition-all flex items-center gap-2 border ${
                              isActive
                                ? "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] border-[hsl(var(--foreground))] shadow-[4px_4px_0_#F5A623]"
                                : "bg-[hsl(var(--card))] border-[hsl(var(--foreground)/0.2)] text-[hsl(var(--foreground))] hover:border-[#F5A623]"
                            }`}
                          >
                            <span className={isActive ? "text-[#F5A623] font-bold" : "text-[#E05470]"}>
                              0{idx + 1}
                            </span>
                            <span className="font-medium">{shortName}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Subsystem Card */}
                    {(() => {
                      const activeSec = project.deepDiveSections[activeSubsystem] || project.deepDiveSections[0];
                      return (
                        <div className="mt-6 p-6 sm:p-8 border border-[hsl(var(--foreground)/0.22)] bg-[hsl(var(--card))] shadow-[8px_8px_0_rgba(24,44,48,0.06)]">
                          <div className="flex items-center justify-between border-b border-[hsl(var(--foreground)/0.12)] pb-3">
                            <span className="mono text-[10px] uppercase tracking-wider text-[#E05470] font-semibold">
                              Subsystem 0{activeSubsystem + 1} of 0{project.deepDiveSections.length}
                            </span>
                            <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
                              TECHNICAL BRIEF
                            </span>
                          </div>

                          <h4 className="display text-2xl sm:text-3xl mt-4 text-[hsl(var(--foreground))]">
                            {activeSec.heading}
                          </h4>

                          <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-[hsl(var(--foreground)/0.88)]">
                            {activeSec.paragraphs.map((p, pIdx) => (
                              <p key={pIdx}>{p}</p>
                            ))}
                          </div>

                          {/* Navigation Stepper */}
                          <div className="mt-8 pt-5 border-t border-[hsl(var(--foreground)/0.12)] flex items-center justify-between">
                            <button
                              type="button"
                              disabled={activeSubsystem === 0}
                              onClick={() => setActiveSubsystem((prev) => Math.max(0, prev - 1))}
                              className="mono text-xs inline-flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            >
                              &larr; Previous Component
                            </button>
                            <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
                              {activeSubsystem + 1} / {project.deepDiveSections.length}
                            </span>
                            <button
                              type="button"
                              disabled={activeSubsystem === project.deepDiveSections.length - 1}
                              onClick={() => setActiveSubsystem((prev) => Math.min(project.deepDiveSections!.length - 1, prev + 1))}
                              className="mono text-xs inline-flex items-center gap-1.5 text-[#F5A623] hover:underline font-medium disabled:opacity-30 disabled:pointer-events-none transition-colors"
                            >
                              Next Component &rarr;
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* Expanded Continuous View */
                  <div className="mt-8 space-y-8">
                    {project.deepDiveSections.map((sec, sIdx) => (
                      <div key={sIdx} className="p-6 sm:p-7 border-l-4 border-l-[#E05470] border border-[hsl(var(--foreground)/0.15)] bg-[hsl(var(--card))]">
                        <div className="flex items-center gap-2">
                          <span className="mono text-xs font-bold text-[#E05470]">0{sIdx + 1}</span>
                          <h4 className="display text-xl sm:text-2xl text-[hsl(var(--foreground))]">
                            {sec.heading}
                          </h4>
                        </div>
                        <div className="mt-4 space-y-3 text-sm sm:text-base text-[hsl(var(--foreground)/0.85)] leading-relaxed">
                          {sec.paragraphs.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Official GitHub Repository Banner Card or Open Source In-Progress Notice */}
            {project.repoUrl ? (
              <div className="mt-12 p-6 sm:p-8 border border-[#F5A623]/40 bg-[hsl(var(--card))]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <span className="mono text-[10px] text-[#F5A623] uppercase tracking-wider font-semibold">
                      Open Source Repository &middot; Code &amp; Docs
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-[hsl(var(--foreground))]">
                      Explore Full Codebase on GitHub
                    </h3>
                    <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                      Includes complete source code, installation instructions, launch files, and documentation.
                    </p>
                  </div>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 px-4 py-2.5 text-xs font-semibold transition bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[#F5A623] hover:text-[#182C30]"
                  >
                    View Repository &rarr;
                  </a>
                </div>
              </div>
            ) : project.repoStatus ? (
              <div className="mt-12 p-6 sm:p-8 border border-[#F5A623]/30 bg-[hsl(var(--card))]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <span className="mono text-[10px] text-[#F5A623] uppercase tracking-wider font-semibold">
                      Open Source Project &middot; Codebase
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-[hsl(var(--foreground))]">
                      Open Source — GitHub Release in Progress
                    </h3>
                    <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                      This project is open source. The complete codebase, architecture scripts, and setup documentation are currently being finalized for public release on GitHub.
                    </p>
                  </div>
                  <div className="shrink-0 px-3 py-2 border border-[#F5A623]/60 mono text-[10px] font-semibold uppercase tracking-wider text-[#F5A623]">
                    Coming Soon to GitHub
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Column: Structured Cards (Small char size, neat lists, pipeline) */}
          <div className="space-y-8">
            {/* Quantitative Results & Performance Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="p-6 sm:p-8 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))]">
                <span className="eyebrow text-[#F5A623]">Benchmark &middot; Results</span>
                <h3 className="text-2xl font-semibold mt-2">Quantitative Metrics</h3>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="border-l-2 border-[#F5A623] pl-3 py-1">
                      <p className="display text-3xl font-normal leading-none text-[hsl(var(--foreground))]">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-[hsl(var(--foreground))]">
                        {metric.label}
                      </p>
                      {metric.detail && (
                        <p className="mt-0.5 text-[10px] text-[hsl(var(--muted-foreground))] leading-snug">
                          {metric.detail}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Pipeline (Exact 6 Phases for MoE / Animal Detection) */}
            {project.phases && project.phases.length > 0 && (
              <div className="p-6 sm:p-8 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))]">
                <span className="eyebrow text-[#E05470]">Execution Pipeline</span>
                <h3 className="text-2xl font-semibold mt-2">Phased Architecture</h3>
                <div className="mt-6 space-y-4">
                  {project.phases.map((phase, phIdx) => (
                    <div key={phIdx} className="pb-4 border-b border-[hsl(var(--foreground)/0.1)] last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className="mono text-[10px] font-bold text-[#E05470]">
                          {phase.step}
                        </span>
                        <h4 className="font-semibold text-sm sm:text-base text-[hsl(var(--foreground))]">
                          {phase.title}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] leading-relaxed pl-5">
                        {phase.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Capabilities & Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="p-6 sm:p-8 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))]">
                <span className="eyebrow text-[#459e99]">Core Engineering</span>
                <h3 className="text-2xl font-semibold mt-2">Key Capabilities</h3>
                <div className="mt-6 space-y-4">
                  {project.keyFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="pb-4 border-b border-[hsl(var(--foreground)/0.1)] last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#459e99]" />
                        <h4 className="font-semibold text-sm sm:text-base text-[hsl(var(--foreground))]">
                          {feat.title}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] leading-relaxed pl-3.5">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Stack Breakdown */}
            <div className="p-6 sm:p-8 border border-[hsl(var(--foreground)/0.15)] bg-[hsl(var(--background))]">
              <span className="mono text-[9px] uppercase tracking-wider text-[#F5A623] font-semibold">
                Technologies &amp; Frameworks
              </span>
              <ul className="mt-4 space-y-2 text-xs">
                {project.tags.map((tag, tIdx) => (
                  <li key={tIdx} className="flex items-center gap-2 text-[hsl(var(--foreground))]">
                    <span className="mono text-[9px] text-[hsl(var(--muted-foreground))]">
                      [{String(tIdx + 1).padStart(2, "0")}]
                    </span>
                    <span className="font-medium">{tag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Other Projects Navigation (Matching OutreachDetailView bottom navigation) */}
        <section className="mt-24 pt-12 border-t border-[hsl(var(--foreground)/0.18)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="eyebrow text-[#F5A623]">Explore More Projects</span>
              <h3 className="display text-3xl sm:text-4xl mt-1">Other Selected Works</h3>
            </div>
            <Link
              href="/#work"
              className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))] hover:text-[#F5A623] transition-colors"
            >
              Back to Overview &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.slice(0, 3).map((other) => (
              <Link
                key={other.id}
                href={`/projects/${other.id}`}
                className="group card-lift p-6 border border-[hsl(var(--foreground)/0.2)] bg-[hsl(var(--card))] transition duration-300 hover:border-[#F5A623] block"
              >
                <span className="mono text-[9px] uppercase tracking-wider text-[#E05470] font-semibold">
                  {other.categoryLabel}
                </span>
                <h4 className="mt-2 text-xl font-semibold text-[hsl(var(--foreground))] group-hover:text-[#F5A623] transition-colors">
                  {other.title}
                </h4>
                <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] line-clamp-2">
                  {other.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[hsl(var(--foreground))] group-hover:translate-x-1 transition-transform">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Full-screen Photo Lightbox Modal (Matching OutreachDetailView exact modal with gold shadow) */}
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
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
