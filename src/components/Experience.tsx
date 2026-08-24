import { experience } from "@/data/profile";
import AnimateIn from "./AnimateIn";
import { IconExternalLink } from "./icons";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-14 border-b border-border bg-section-experience py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateIn animation="fade-up">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Experience
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-text-secondary">
              Practical experience across applied AI, robotics, data science, and engineering collaborations.
            </p>
          </div>
        </AnimateIn>

        {/* Experience List */}
        <div className="mt-10 space-y-6">
          {experience.map((item, idx) => (
            <AnimateIn key={idx} animation="fade-up" delay={idx === 0 ? 100 : 200}>
              <div className="relative overflow-hidden rounded-xl border-2 border-accent/40 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-lg hover:-translate-y-0.5">
                {/* Blue top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Blue accent badge */}
                      <span className="rounded-md border border-accent-border bg-accent-subtle px-2.5 py-0.5 text-xs font-semibold text-accent">
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
                      <p className="mt-1 text-sm text-text-secondary">
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
                      <span className="font-semibold uppercase tracking-wider text-text-muted text-[11px]">
                        Supervisors:
                      </span>
                      <ul className="mt-1 space-y-1 text-text-secondary">
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
                      className="inline-flex items-center justify-center gap-1.5 flex-shrink-0 whitespace-nowrap self-start sm:self-auto rounded-lg border border-border bg-page-subtle px-3.5 py-1.5 text-xs font-medium text-text-secondary transition-all duration-200 hover:border-accent-border hover:bg-accent-subtle hover:text-accent hover:shadow-sm active:scale-95"
                    >
                      <span>View Certificate</span>
                      <IconExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
