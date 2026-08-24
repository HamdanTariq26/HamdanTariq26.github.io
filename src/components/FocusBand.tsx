import { focusItems } from "@/data/profile";
import { IconGithub, IconExternalLink } from "./icons";
import AnimateIn from "./AnimateIn";

export default function FocusBand() {
  return (
    <section id="projects" className="scroll-mt-14 border-b border-section-projects-border bg-section-projects py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn animation="fade-up">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Selected Projects
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-text-secondary">
              Selected work across artificial intelligence, computer vision, robotics, autonomous systems, and software engineering.
            </p>
          </div>
        </AnimateIn>

        {/* Projects Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {focusItems.map((item, idx) => {
            // Stagger: 100, 150, 200, 250, 300, 350 for up to 6 cards
            const delays = [100, 150, 200, 250, 300, 350] as const;
            const delay = delays[idx] ?? 350;
            return (
              <AnimateIn key={item.label} animation="fade-up" delay={delay}>
                <div className="group flex h-full flex-col justify-between rounded-xl border border-section-projects-border bg-white p-6 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-lg hover:-translate-y-1">
                  <div>
                    {/* Top: Period & GitHub link */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-text-muted">
                        {item.period}
                      </span>
                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-muted transition-all duration-200 hover:text-text-primary hover:scale-110"
                          aria-label="GitHub Repository"
                        >
                          <IconGithub className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-base font-bold text-text-primary transition-colors duration-200 group-hover:text-accent">
                      {item.label}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom: Tags & Repo Link */}
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-border bg-surface-muted px-2 py-0.5 font-mono text-[11px] text-text-secondary transition-colors duration-150 hover:bg-slate-200/70"
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
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-all duration-200 hover:underline hover:translate-x-0.5"
                      >
                        <span>View Repository</span>
                        <IconExternalLink className="h-3 w-3" />
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
