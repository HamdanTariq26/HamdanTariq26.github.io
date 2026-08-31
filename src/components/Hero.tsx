"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { IconGithub, IconLinkedin, IconMail, IconFileText, IconArrowRight } from "./icons";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative scroll-mt-14 overflow-hidden pt-20 pb-14 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 text-white"
      style={{
        background: "linear-gradient(135deg, #0D2242 0%, #143767 50%, #1A4988 100%)",
      }}
    >
      {/* ── Large Abstract Soft Ambient Shapes with Subtle Scroll Parallax ── */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 h-[540px] w-[540px] rounded-full bg-blue-500/15 blur-3xl pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-24 h-[440px] w-[440px] rounded-full bg-indigo-500/15 blur-3xl pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translate3d(0, ${-scrollY * 0.07}px, 0)` }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_260px] lg:gap-16">

          {/* ── Left: Strong Typographic Sequence on Initial Load ── */}
          <div className="space-y-0">
            {/* 1. Eyebrow badge */}
            <div
              className="hero-animate-text inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-medium text-blue-200 backdrop-blur-sm shadow-xs"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>{profile.eyebrow}</span>
            </div>

            {/* 2. Name */}
            <h1
              className="hero-animate-text mt-5 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-sm"
              style={{ animationDelay: "0.28s" }}
            >
              {profile.name}
            </h1>

            {/* 3. Headline */}
            <p
              className="hero-animate-text mt-5 text-lg leading-relaxed text-blue-100/95 sm:text-xl font-medium max-w-xl"
              style={{ animationDelay: "0.46s" }}
            >
              {profile.headline}
            </p>

            {/* 4. Short introduction */}
            <p
              className="hero-animate-text mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-slate-300 font-normal"
              style={{ animationDelay: "0.64s" }}
            >
              {profile.intro}
            </p>

            {/* 5. Dedicated Action Buttons */}
            <div
              className="hero-animate-text mt-8 flex flex-wrap items-center gap-3.5"
              style={{ animationDelay: "0.82s" }}
            >
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-all duration-300 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-900/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                aria-label="View CV (PDF)"
              >
                <IconFileText className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span>View CV</span>
              </a>

              <a
                href="#projects"
                className="group inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                <span>Selected Projects</span>
                <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* 6. Understated social & contact links */}
            <div
              className="hero-animate-text mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300"
              style={{ animationDelay: "0.98s" }}
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-all duration-300 hover:-translate-y-0.5 font-medium"
                aria-label="GitHub"
              >
                <IconGithub className="h-4 w-4 text-blue-300" />
                <span>GitHub</span>
              </a>

              <span className="text-white/25" aria-hidden>·</span>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-all duration-300 hover:-translate-y-0.5 font-medium"
                aria-label="LinkedIn"
              >
                <IconLinkedin className="h-4 w-4 text-blue-300" />
                <span>LinkedIn</span>
              </a>

              <span className="text-white/25" aria-hidden>·</span>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-all duration-300 hover:-translate-y-0.5 font-medium"
                aria-label="Email"
              >
                <IconMail className="h-4 w-4 text-blue-300" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* ── Right: Simple, Elegant & Human Portrait Card ── */}
          <div
            className="hero-animate-photo flex justify-center lg:justify-end"
            style={{
              transform: `translate3d(0, ${-scrollY * 0.03}px, 0)`,
            }}
          >
            <figure className="relative w-full max-w-[220px] sm:max-w-[235px] lg:max-w-[245px] group">
              {/* Subtle ambient soft blue depth behind the portrait */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-3xl bg-blue-400/10 blur-xl pointer-events-none"
              />

              {/* Single clean rounded portrait container */}
              <div className="relative overflow-hidden rounded-2xl border border-white/25 bg-slate-900/40 p-1.5 shadow-2xl shadow-slate-950/40 backdrop-blur-xs transition-all duration-500 group-hover:border-white/40 group-hover:-translate-y-1">
                <Image
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  width={560}
                  height={700}
                  priority
                  className="aspect-[4/5] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                />
              </div>

              {/* Clean sans-serif name & affiliation caption */}
              <figcaption className="mt-3.5 text-center">
                <p className="font-sans font-semibold text-sm text-white tracking-normal">
                  {profile.name}
                </p>
                <p className="font-sans text-xs text-blue-200/80 mt-0.5">
                  Artificial Intelligence · NUST
                </p>
              </figcaption>
            </figure>
          </div>

        </div>
      </div>

      {/* ── Bottom Organic Architectural Curve into About ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 40"
          className="relative block w-full h-8 sm:h-10 text-section-about fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C480,40 960,40 1440,0 L1440,40 L0,40 Z" />
        </svg>
      </div>
    </section>
  );
}
