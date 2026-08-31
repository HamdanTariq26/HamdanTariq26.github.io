"use client";

import { useState, FormEvent } from "react";
import { profile } from "@/data/profile";
import {
  IconMail,
  IconGithub,
  IconLinkedin,
  IconFileText,
  IconMapPin,
  IconSend,
  IconExternalLink,
} from "./icons";
import AnimateIn from "./AnimateIn";

export default function Footer() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { name, subject, message } = formState;

    const mailtoSubject = encodeURIComponent(
      subject || (name ? `Inquiry from ${name}` : "Portfolio Inquiry")
    );
    const mailtoBody = encodeURIComponent(
      name ? `${message}\n\nBest regards,\n${name}` : message
    );

    window.location.href = `mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <footer
      id="contact"
      className="relative scroll-mt-14 overflow-hidden pt-20 pb-16 lg:pt-24 lg:pb-20 text-white"
      style={{
        background: "linear-gradient(135deg, #0A1B35 0%, #122F5A 50%, #18427C 100%)",
      }}
    >
      {/* ── Large Ambient Blur Shapes for Deep Visual Depth ── */}
      <div
        aria-hidden="true"
        className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-15%] left-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-500/15 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section Heading */}
        <AnimateIn animation="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 font-mono text-xs font-medium uppercase tracking-wider mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span>Get In Touch</span>
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let&apos;s Connect
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-slate-300 leading-relaxed">
              Open to robotics research collaborations, autonomous systems engineering roles, and perception/AI initiatives.
            </p>
          </div>
        </AnimateIn>

        {/* Contact Layout: Classic Form + All Socials Sidebar */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ── Left Column (7 cols): Classic Contact Form ── */}
          <AnimateIn animation="fade-up" delay={100} className="lg:col-span-7">
            <div className="rounded-2xl border border-white/20 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                Send a Direct Message
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Fill out the fields below to initiate communication directly via email.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[11px] font-mono font-medium text-slate-300 uppercase tracking-wider"
                    >
                      Your Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. Dr. Jane Smith"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800/85 px-3.5 py-2.5 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-blue-400 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[11px] font-mono font-medium text-slate-300 uppercase tracking-wider"
                    >
                      Your Email <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="name@institution.edu"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800/85 px-3.5 py-2.5 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-blue-400 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[11px] font-mono font-medium text-slate-300 uppercase tracking-wider"
                  >
                    Subject <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    placeholder="e.g. Robotics Collaboration / Research Inquiry"
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800/85 px-3.5 py-2.5 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-blue-400 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-mono font-medium text-slate-300 uppercase tracking-wider"
                  >
                    Message <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Details about the research topic, engineering problem, or collaboration..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800/85 px-3.5 py-2.5 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-blue-400 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-950/40 transition-all duration-200 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-900/50 hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Send Message</span>
                    <IconSend className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>

                  {submitted && (
                    <span className="text-xs text-blue-300 font-medium animate-fade-in">
                      ✓ Preparing message in your email client...
                    </span>
                  )}
                </div>
              </form>
            </div>
          </AnimateIn>

          {/* ── Right Column (5 cols): Socials & Direct Contact Info ── */}
          <AnimateIn animation="fade-up" delay={200} className="lg:col-span-5">
            <div className="space-y-6">
              {/* Direct Info Card */}
              <div className="rounded-2xl border border-white/20 bg-slate-900/80 p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-5">
                <h3 className="font-semibold text-blue-300 uppercase tracking-wider text-[11px] font-mono">
                  Direct Contact
                </h3>

                <div className="space-y-4 text-xs">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-md border border-blue-500/30 bg-blue-500/15 p-2 text-blue-400 flex-shrink-0">
                      <IconMail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${profile.email}`}
                        className="font-medium text-white hover:text-blue-300 transition-colors break-all"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-md border border-blue-500/30 bg-blue-500/15 p-2 text-blue-400 flex-shrink-0">
                      <IconMapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Location
                      </span>
                      <p className="font-medium text-white">
                        {profile.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profiles & Documents */}
                <div className="border-t border-slate-800 pt-5 space-y-3">
                  <h4 className="font-semibold text-blue-300 uppercase tracking-wider text-[11px] font-mono">
                    Profiles & Documents
                  </h4>

                  <div className="space-y-2">
                    {/* LinkedIn */}
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/60 px-3.5 py-2.5 transition-all duration-200 hover:border-blue-400/40 hover:bg-slate-800 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconLinkedin className="h-4 w-4 text-slate-400 transition-colors group-hover:text-blue-300" />
                        <span className="font-medium text-slate-200 group-hover:text-white">
                          LinkedIn Profile
                        </span>
                      </div>
                      <IconExternalLink className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:text-blue-300 group-hover:translate-x-0.5" />
                    </a>

                    {/* GitHub */}
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/60 px-3.5 py-2.5 transition-all duration-200 hover:border-blue-400/40 hover:bg-slate-800 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconGithub className="h-4 w-4 text-slate-400 transition-colors group-hover:text-blue-300" />
                        <span className="font-medium text-slate-200 group-hover:text-white">
                          GitHub Repositories
                        </span>
                      </div>
                      <IconExternalLink className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:text-blue-300 group-hover:translate-x-0.5" />
                    </a>

                    {/* CV */}
                    <a
                      href={profile.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/60 px-3.5 py-2.5 transition-all duration-200 hover:border-blue-400/40 hover:bg-slate-800 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconFileText className="h-4 w-4 text-slate-400 transition-colors group-hover:text-blue-300" />
                        <span className="font-medium text-slate-200 group-hover:text-white">
                          Curriculum Vitae (PDF)
                        </span>
                      </div>
                      <IconExternalLink className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:text-blue-300 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Bottom Academic Metadata */}
        <AnimateIn animation="fade-in" delay={300}>
          <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-slate-800/80 pt-6 text-xs text-slate-400 sm:flex-row font-mono">
            <span>&copy; {new Date().getFullYear()} {profile.name}</span>
            <span>BS Artificial Intelligence &middot; NUST, Balochistan Campus &middot; Quetta, PK</span>
          </div>
        </AnimateIn>
      </div>
    </footer>
  );
}
