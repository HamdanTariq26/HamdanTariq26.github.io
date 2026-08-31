"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const navItems = [
  { label: "About", id: "about" },
  { label: "Capabilities", id: "systems" },
  { label: "Projects", id: "work" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
];

function scrollToId(id: string, onClose?: () => void) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  onClose?.();
}

export default function Nav() {
  const [activeSection, setActiveSection] = useState("top");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Check if user is at the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection("contact");
        return;
      }

      // Ordered list of section IDs from bottom to top
      const sectionIds = ["contact", "journey", "work", "systems", "about", "top"];
      const scrollPosition = window.scrollY + 180; // Offset to detect section when it approaches viewport top

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 dark-panel transition-shadow duration-300 border-b border-[hsl(var(--foreground)/0.18)] ${scrolled ? "shadow-lg" : ""}`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
        {/* Logo mark + Name */}
        <button
          onClick={() => scrollToId("top", () => setMobileOpen(false))}
          className="group flex items-center gap-3 text-left"
        >
          <span
            className="mono grid h-9 w-9 place-items-center border border-[#F5A623] text-[#F5A623] text-[10px] font-bold transition group-hover:bg-[#F5A623] group-hover:text-[#182C30]"
          >
            HT
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block text-[hsl(var(--background))]">
            {profile.name}
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className={`nav-link group relative py-2 text-xs transition-colors text-[hsl(var(--background))] ${
                activeSection === item.id
                  ? "is-active font-semibold text-[#F5A623]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <span className="mono mr-1 text-[9px] text-[#F5A623]/80">
                0{index + 1}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* CV link */}
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.12em] transition sm:flex border border-[hsl(var(--background)/0.32)] text-[hsl(var(--background))] hover:border-[#F5A623] hover:text-[#F5A623]"
          >
            View CV
          </a>

          {/* Mobile hamburger */}
          <button
            className="grid h-10 w-10 place-items-center lg:hidden text-[hsl(var(--background))]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="dark-panel border-t border-[hsl(var(--background)/0.17)] px-5 py-5 lg:hidden"
        >
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id, () => setMobileOpen(false))}
              className={`flex w-full items-center justify-between border-b border-[hsl(var(--background)/0.15)] py-4 text-left text-lg text-[hsl(var(--background))] ${
                activeSection === item.id ? "text-[#F5A623]" : ""
              }`}
            >
              <span>
                <span className="mono mr-3 text-[10px] text-[#F5A623]">
                  0{index + 1}
                </span>
                {item.label}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </button>
          ))}
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center gap-2 text-sm text-[#F5A623]"
          >
            Open curriculum vitae
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        </div>
      )}
    </header>
  );
}
