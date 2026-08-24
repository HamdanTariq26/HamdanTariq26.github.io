import Image from "next/image";
import { profile } from "@/data/profile";
import { IconGithub, IconLinkedin, IconMail, IconFileText, IconArrowRight } from "./icons";
import AnimateIn from "./AnimateIn";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-14 overflow-hidden border-b border-slate-700 py-16 sm:py-20 lg:py-28"
      style={{
        backgroundImage: "url('/images/hero.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ── Gradient overlay for readability ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-900/50 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">

          {/* ── Left: Personal Identity — slides in from left ── */}
          <AnimateIn animation="slide-left" className="space-y-0">
            {/* Eyebrow */}
            <p className="text-xs font-mono font-medium uppercase tracking-widest text-blue-300/80">
              {profile.eyebrow}
            </p>

            {/* Name */}
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl drop-shadow-sm">
              {profile.name}
            </h1>

            {/* Headline */}
            <p className="mt-5 text-lg leading-relaxed text-slate-200 sm:text-xl font-medium">
              {profile.headline}
            </p>

            {/* Short introduction */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
              {profile.intro}
            </p>

            {/* ── Dedicated Action Buttons ── */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                aria-label="View CV (PDF)"
              >
                <IconFileText className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                <span>View CV</span>
              </a>

              <a
                href="#projects"
                className="group inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                <span>Selected Projects</span>
                <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Understated social & contact links */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                aria-label="GitHub"
              >
                <IconGithub className="h-4 w-4" />
                <span>GitHub</span>
              </a>

              <span className="text-white/30" aria-hidden>·</span>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <IconLinkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>

              <span className="text-white/30" aria-hidden>·</span>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                aria-label="Email"
              >
                <IconMail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </div>
          </AnimateIn>

          {/* ── Right: Portrait Photograph — slides in from right ── */}
          <AnimateIn animation="slide-right" delay={150} className="flex justify-center lg:justify-end">
            <figure className="w-full max-w-[240px] lg:max-w-none group">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-1.5 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-400/40 group-hover:-translate-y-1">
                <Image
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  width={560}
                  height={700}
                  priority
                  className="aspect-[4/5] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <figcaption className="mt-2.5 text-center text-[11px] font-mono text-slate-400 tracking-wide transition-colors duration-200 group-hover:text-slate-300">
                {profile.photo.caption}
              </figcaption>
            </figure>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
}
