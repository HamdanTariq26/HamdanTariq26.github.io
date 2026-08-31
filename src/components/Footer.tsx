"use client";

import { useState, FormEvent } from "react";
import { profile } from "@/data/profile";
import Reveal from "./Reveal";

export default function Footer() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", message: "" });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || "Project conversation");
    const body = encodeURIComponent(`From: ${form.name}\n\n${form.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard?.writeText(profile.email);
    } finally {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <>
      <section
        id="contact"
        className="scroll-mt-16 dark-panel px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
      >
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[#F5A623]">06 / open channel</span>
              <span className="mono text-[10px] text-[hsl(var(--background)/0.43)]">
                RESPONSE TIME: 1–3 DAYS
              </span>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28">
            {/* Left: headline + contact info */}
            <Reveal>
              <div>
                <h2
                  className="display leading-[0.78] text-[hsl(var(--background))]"
                  style={{
                    fontSize: "clamp(3.5rem, 8vw, 8rem)",
                  }}
                >
                  Have a hard<br />
                  <em className="text-[#F5A623]">problem?</em>
                </h2>
                <p
                  className="mt-10 max-w-[430px] text-lg leading-relaxed text-[hsl(var(--background)/0.65)]"
                >
                  I'm interested in research conversations, thoughtful engineering teams, and projects where the system has to work beyond the demo.
                </p>

                <div className="mt-10 space-y-5">
                  {/* Email copy */}
                  <button
                    onClick={copyEmail}
                    className="group flex items-center gap-3 text-sm transition text-[hsl(var(--background))] hover:text-[#F5A623]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    {copied ? "Copied to clipboard" : profile.email}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  </button>

                  {/* Social links */}
                  <div className="flex flex-wrap items-center gap-5">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm transition text-[hsl(var(--background)/0.68)] hover:text-[#F5A623]"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      GitHub
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm transition text-[hsl(var(--background)/0.68)] hover:text-[#F5A623]"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                      LinkedIn
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: contact form */}
            <Reveal delay="delay-1">
              <form
                onSubmit={submit}
                className="p-6 sm:p-8 border border-[hsl(var(--background)/0.24)] bg-[hsl(var(--background)/0.05)]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="eyebrow text-[hsl(var(--background)/0.55)]">New message</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.8">
                    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                  </svg>
                </div>

                {/* Name */}
                <label className="block">
                  <span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background)/0.55)]">
                    Your name
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="How should I address you?"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-3 w-full bg-transparent px-0 py-3 text-sm outline-none border-b border-[hsl(var(--background)/0.25)] text-[hsl(var(--background))] focus:border-[#F5A623]"
                  />
                </label>

                {/* Subject */}
                <label className="mt-7 block">
                  <span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background)/0.55)]">
                    Subject
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="Research, role, collaboration…"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="mt-3 w-full bg-transparent px-0 py-3 text-sm outline-none border-b border-[hsl(var(--background)/0.25)] text-[hsl(var(--background))] focus:border-[#F5A623]"
                  />
                </label>

                {/* Message */}
                <label className="mt-7 block">
                  <span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--background)/0.55)]">
                    Message
                  </span>
                  <textarea
                    required
                    rows={4}
                    placeholder="Give me the useful context…"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-3 w-full resize-none bg-transparent px-0 py-3 text-sm outline-none border-b border-[hsl(var(--background)/0.25)] text-[hsl(var(--background))] focus:border-[#F5A623]"
                  />
                </label>

                <button
                  type="submit"
                  className="button-sheen mt-9 flex items-center gap-3 px-5 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 bg-[#F5A623] text-[#182C30]"
                >
                  {sent ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      <span className="relative z-10">Draft opened</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Send message</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="relative z-10"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </>
                  )}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer
        className="dark-panel px-5 py-7 sm:px-8 lg:px-12 border-t border-[hsl(var(--background)/0.15)]"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="mono text-[10px] text-[hsl(var(--background)/0.45)]">
            © 2026 {profile.name} / built from first principles
          </span>
          <div className="mono flex items-center gap-2 text-[10px] text-[hsl(var(--background)/0.45)]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Quetta, Pakistan
            <span className="mx-2">·</span>
            <span className="text-[#F5A623]">available for a good problem</span>
          </div>
        </div>
      </footer>
    </>
  );
}
