import { certifications, outreachActivities } from "@/data/profile";
import AnimateIn from "./AnimateIn";
import { IconExternalLink, IconFileText } from "./icons";

export default function Certifications() {
  const hcia = certifications.find((c) => c.id === "hcia-ai");
  const otherCerts = certifications.filter((c) => c.id !== "hcia-ai");

  return (
    <section
      id="certifications"
      className="scroll-mt-14 border-b border-border bg-section-certifications py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Heading */}
        <AnimateIn animation="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent font-mono text-[11px] font-semibold uppercase tracking-wider mb-2">
                Credentials & Accreditation
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                Certifications & Professional Training
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-text-secondary">
              Formal technical certifications and specialized engineering training across artificial intelligence and healthcare control systems.
            </p>
          </div>
        </AnimateIn>

        {/* Certifications List */}
        <div className="mt-10 space-y-6">
          {/* 1. Formal Certification: Huawei HCIA-AI */}
          {hcia && (
            <AnimateIn animation="fade-up" delay={100}>
              <div className="group relative overflow-hidden rounded-xl border-2 border-accent/35 bg-white p-6 sm:p-8 shadow-xs card-hover-lift hover:border-accent">
                {/* Blue top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent" />

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Document badge */}
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-accent-border bg-accent-subtle px-2.5 py-0.5 text-xs font-semibold text-accent font-mono">
                        <IconFileText className="h-3.5 w-3.5" />
                        <span>{hcia.type}</span>
                      </span>
                      {hcia.hours && (
                        <span className="rounded-md border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-mono text-text-muted">
                          {hcia.hours}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3.5 font-[family-name:var(--font-display)] text-xl font-bold text-text-primary sm:text-2xl transition-colors group-hover:text-accent">
                      {hcia.title}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-text-secondary">
                      {hcia.organization}
                    </p>

                    {hcia.partner && (
                      <p className="text-xs text-text-muted mt-0.5">
                        {hcia.partner}
                      </p>
                    )}
                  </div>

                  <span className="rounded-md border border-border bg-surface-muted px-3 py-1 font-mono text-xs text-text-muted">
                    {hcia.period}
                  </span>
                </div>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-text-secondary">
                  {hcia.summary}
                </p>

                <div className="mt-6 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  {hcia.signatories && (
                    <div className="text-xs text-text-muted space-y-0.5">
                      <span className="font-semibold uppercase tracking-wider text-[10px] text-text-dim font-mono">
                        Instructors:
                      </span>
                      <p className="text-text-secondary font-medium">
                        {hcia.signatories.join(" · ")}
                      </p>
                    </div>
                  )}

                  <a
                    href={hcia.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-1.5 flex-shrink-0 whitespace-nowrap self-start sm:self-auto rounded-lg border border-border bg-page-subtle px-4 py-2 text-xs font-semibold text-text-secondary transition-all duration-200 hover:border-accent-border hover:bg-accent-subtle hover:text-accent hover:shadow-sm active:scale-95"
                  >
                    <span>View Certificate PDF</span>
                    <IconExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </AnimateIn>
          )}

          {/* 2. Other Certifications (BCI, etc.) */}
          {otherCerts.map((item, idx) => (
            <AnimateIn key={item.id} animation="fade-up" delay={200 + idx * 100}>
              <div className="group relative overflow-hidden rounded-xl border-2 border-accent/35 bg-white p-6 sm:p-8 shadow-xs card-hover-lift hover:border-accent">
                {/* Blue top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent" />

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Document badge */}
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-accent-border bg-accent-subtle px-2.5 py-0.5 text-xs font-semibold text-accent font-mono">
                        <IconFileText className="h-3.5 w-3.5" />
                        <span>{item.type}</span>
                      </span>
                      {item.hours && (
                        <span className="rounded-md border border-border bg-page-subtle px-2.5 py-0.5 text-xs font-mono text-text-muted">
                          {item.hours}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3.5 font-[family-name:var(--font-display)] text-lg font-bold text-text-primary sm:text-xl transition-colors group-hover:text-accent">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-text-secondary font-medium">
                      {item.organization}
                    </p>

                    {item.partner && (
                      <p className="text-xs text-text-muted mt-0.5">
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

                <div className="mt-6 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  {item.referenceId ? (
                    <div className="text-xs text-text-muted font-mono">
                      <span>Ref: </span>
                      <span className="text-text-secondary font-medium">{item.referenceId}</span>
                    </div>
                  ) : <div />}

                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-1.5 flex-shrink-0 whitespace-nowrap self-start sm:self-auto rounded-lg border border-border bg-page-subtle px-4 py-2 text-xs font-semibold text-text-secondary transition-all duration-200 hover:border-accent-border hover:bg-accent-subtle hover:text-accent hover:shadow-sm active:scale-95"
                  >
                    <span>View Certificate PDF</span>
                    <IconExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* ── Separate Subsection: Technical Outreach ── */}
        <div className="mt-16 sm:mt-20 border-t border-border pt-12">
          <AnimateIn animation="fade-up">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                Technical Outreach & Engagement
              </h3>
              <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-text-secondary">
                Communicating robotics concepts, engaging school students, and conducting practical engineering demonstrations.
              </p>
            </div>
          </AnimateIn>

          <div className="mt-8">
            {outreachActivities.map((act) => (
              <AnimateIn key={act.id} animation="fade-up" delay={150}>
                <div className="group relative overflow-hidden rounded-xl border-2 border-accent/35 bg-white p-6 sm:p-7 shadow-xs card-hover-lift hover:border-accent">
                  {/* Blue top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent" />

                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Document badge */}
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-accent-border bg-accent-subtle px-2.5 py-0.5 text-xs font-semibold text-accent font-mono">
                          <IconFileText className="h-3.5 w-3.5" />
                          <span>{act.type}</span>
                        </span>
                        <span className="rounded-md border border-border bg-page-subtle px-2.5 py-0.5 text-xs font-mono text-text-muted">
                          {act.location}
                        </span>
                      </div>

                      <h4 className="mt-3 font-[family-name:var(--font-display)] text-base font-bold text-text-primary sm:text-lg transition-colors group-hover:text-accent">
                        {act.title}
                      </h4>

                      <p className="mt-1 text-xs sm:text-sm text-text-secondary font-medium">
                        {act.organization} &middot; {act.location}
                      </p>
                    </div>

                    <span className="rounded-md border border-border bg-surface-muted px-3 py-1 font-mono text-xs text-text-muted">
                      {act.period}
                    </span>
                  </div>

                  <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-text-secondary">
                    {act.summary}
                  </p>

                  <div className="mt-5 flex items-center justify-end border-t border-border pt-3.5">
                    <a
                      href={act.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center justify-center gap-1.5 flex-shrink-0 whitespace-nowrap rounded-lg border border-border bg-page-subtle px-4 py-2 text-xs font-semibold text-text-secondary transition-all duration-200 hover:border-accent-border hover:bg-accent-subtle hover:text-accent hover:shadow-sm active:scale-95"
                    >
                      <span>View Certificate PDF</span>
                      <IconExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
