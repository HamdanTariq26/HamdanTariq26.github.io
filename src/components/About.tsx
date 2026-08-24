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
        <AnimateIn animation="fade-up">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            About Me
          </h2>
        </AnimateIn>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px] lg:gap-14">
          {/* Main Narrative */}
          <div className="space-y-5 text-base leading-relaxed text-text-secondary">
            {profile.about.map((paragraph, idx) => {
              const delays = [100, 200, 300, 400] as const;
              const delay = delays[idx] ?? 400;
              return (
                <AnimateIn key={idx} animation="fade-up" delay={delay}>
                  <p>{renderFormattedText(paragraph)}</p>
                </AnimateIn>
              );
            })}
          </div>

          {/* Academic Profile Snapshot Sidebar */}
          <AnimateIn animation="fade-up" delay={200}>
            <aside className="h-fit rounded-xl border border-border bg-page-subtle p-5 text-xs shadow-sm transition-all duration-300 hover:shadow-md hover:border-border-strong">
              <h3 className="font-semibold text-text-primary uppercase tracking-wider text-[11px] text-accent">
                Academic Background
              </h3>

              <dl className="mt-4 space-y-3.5">
                <div>
                  <dt className="text-text-muted">Education</dt>
                  <dd className="mt-0.5 font-medium text-text-primary">
                    BS Artificial Intelligence — NUST, Balochistan Campus
                  </dd>
                  <dd className="text-text-muted">2024–2028 &middot; Quetta, Pakistan</dd>
                </div>

                <div>
                  <dt className="text-text-muted">Lab Affiliation</dt>
                  <dd className="mt-0.5 font-medium text-text-primary">
                    Educational Robotics Lab (ER Lab)
                  </dd>
                </div>

                <div>
                  <dt className="text-text-muted">Core Areas</dt>
                  <dd className="mt-0.5 font-medium text-text-primary">
                    AI · Machine Learning · Computer Vision · Robotics · Autonomous Systems
                  </dd>
                </div>
              </dl>
            </aside>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
