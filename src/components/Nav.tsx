"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "certifications", label: "Certifications", href: "#certifications" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const sectionIds = ["home", "about", "experience", "certifications", "projects", "contact"];

    const handleScroll = () => {
      // 1. Calculate reading scroll progress percentage (0 - 100%)
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (winScroll / totalHeight) * 100)) : 0;
      setScrollProgress(progress);

      // 2. Active section tracking for navigation highlight
      const scrollPosition = window.scrollY + 140; // navbar height + trigger offset
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of the page: highlight Contact
      if (window.scrollY + windowHeight >= documentHeight - 50) {
        setActiveSection("contact");
        return;
      }

      // Check which section is currently in view
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-page/95 backdrop-blur-md transition-all">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        {/* Name / Home link */}
        <a
          href="#home"
          className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-text-primary transition-colors hover:text-accent"
        >
          {profile.name}
        </a>

        {/* Navigation Links with Borderless Soft Highlight Pill */}
        <ul className="flex items-center gap-1 sm:gap-1.5 text-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`inline-block rounded-lg px-2.5 py-1 text-xs sm:text-sm transition-colors duration-200 ${
                    isActive
                      ? "bg-accent-subtle font-semibold text-accent"
                      : "text-text-secondary hover:bg-slate-100 hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Scroll Progress Line (Grows & shrinks as user scrolls) ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2.5px] w-full bg-accent origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
    </header>
  );
}
