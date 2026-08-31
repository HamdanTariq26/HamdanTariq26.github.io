import { focusItems } from "@/data/profile";
import { IconGithub, IconExternalLink, IconArrowRight } from "./icons";
import AnimateIn from "./AnimateIn";

export default function FocusBand() {
  const featuredProject = focusItems[0]; // Autonomous Drone
  const supportingProjects = focusItems.slice(1);

  return (
    <section
      id="projects"
      className="scroll-mt-14 border-b border-section-projects-border bg-section-projects py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn animation="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-accent/15 border border-accent/25 text-accent font-mono text-[11px] font-semibold uppercase tracking-wider mb-2">
                Technical Systems & Code
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Selected Projects
              </h2>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-text-secondary">
                Selected engineering work across autonomous drones, perception models, medical imaging, and embedded robotics.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* ── 1. Prominent Featured Project: Large Editorial Spotlight ── */}
        {featuredProject && (
          <div className="mt-10">
            <AnimateIn animation="scale-up" delay={100}>
              <div className="group relative overflow-hidden rounded-2xl border-2 border-accent/40 bg-white p-7 sm:p-9 shadow-md card-hover-lift hover:border-accent hover:shadow-2xl transition-all duration-300">
                {/* Accent top stripe with gradient glow */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent via-blue-500 to-indigo-600" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-md border border-accent-border bg-accent-subtle px-3 py-1 text-xs font-semibold text-accent font-mono">
                        Featured Robotics Project
                      </span>
                      <span className="font-mono text-xs font-medium text-text-muted bg-surface-muted px-2.5 py-0.5 rounded border border-border">
                        {featuredProject.period}
                      </span>
                    </div>

                    <h3 className="mt-3.5 font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors duration-200">
                      {featuredProject.label}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-text-secondary">
                      {featuredProject.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {featuredProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-accent-border/60 bg-accent-subtle/70 px-2.5 py-1 font-mono text-xs font-medium text-accent transition-colors group-hover:bg-accent-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-between h-full border-t lg:border-t-0 lg:border-l border-border/80 pt-4 lg:pt-0 lg:pl-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-semibold block">
                        Architecture & Pipeline
                      </span>
                      <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                        ROS2 Node Stack &middot; ORB-SLAM3 Tracking &middot; Monocular Scale Recovery &middot; Occupancy Mapping
                      </p>
                    </div>

                    {featuredProject.href && (
                      <div className="mt-6">
                        <a
                          href={featuredProject.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex w-full items-center justify-between gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md active:scale-98"
                        >
                          <span>Explore Repository</span>
                          <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        )}

        {/* ── 2. Supporting Projects Grid with Tactile Hover Interactions ── */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {supportingProjects.map((item, idx) => {
            const delays = [150, 225, 300, 375, 450] as const;
            const delay = delays[idx] ?? 350;
            return (
              <AnimateIn key={item.label} animation="fade-up" delay={delay}>
                <div className="group relative flex h-full flex-col justify-between rounded-xl border border-section-projects-border bg-white p-6 shadow-sm card-hover-lift hover:border-accent hover:shadow-xl transition-all duration-300">
                  <div>
                    {/* Top: Period & GitHub link */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-medium text-text-muted bg-surface-muted px-2.5 py-0.5 rounded border border-border/80">
                        {item.period}
                      </span>
                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-muted transition-all duration-200 hover:text-accent hover:scale-115 p-1"
                          aria-label="GitHub Repository"
                        >
                          <IconGithub className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-3.5 font-[family-name:var(--font-display)] text-base font-bold text-text-primary transition-colors duration-200 group-hover:text-accent">
                      {item.label}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-text-secondary font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom: Tags & Repo Link */}
                  <div className="mt-6 border-t border-border/80 pt-4">
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-border bg-surface-muted px-2 py-0.5 font-mono text-[11px] text-text-secondary transition-colors duration-150 group-hover:border-accent-border/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {item.href && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-all duration-200 hover:underline"
                      >
                        <span>View Repository</span>
                        <IconExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
