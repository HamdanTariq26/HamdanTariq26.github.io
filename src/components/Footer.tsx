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
      className="relative scroll-mt-14 overflow-hidden border-t border-slate-800 py-20 lg:py-24 text-white"
      style={{
        backgroundImage: "url('/images/connect-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ── Dark overlay so text stays readable over the image ── */}
      <div className="absolute inset-0 bg-slate-950/70 pointer-events-none select-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section Heading */}
        <AnimateIn animation="fade-up">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Let&apos;s Connect
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">
              Open to robotics research collaborations, autonomous systems engineering opportunities, and perception/AI initiatives.
            </p>
          </div>
        </AnimateIn>

        {/* Contact Layout: Classic Form + All Socials Sidebar */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ── Left Column (7 cols): Classic Contact Form ── */}
          <AnimateIn animation="fade-up" delay={100} className="lg:col-span-7">
            <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                Send a Message
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Send a direct email inquiry regarding projects, collaborations, or engineering roles.
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
                      className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-blue-400 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
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
                      className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-blue-400 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
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
                    className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-blue-400 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
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
                    className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-400 transition-all duration-200 focus:border-blue-400 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                  >
                    <span>Send Message</span>
                    <IconSend className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>

                  {submitted && (
                    <span className="text-xs text-blue-300 font-medium">
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
              <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-5">
                <h3 className="font-semibold text-blue-400 uppercase tracking-wider text-[11px] font-mono">
                  Direct Contact
                </h3>

                <div className="space-y-4 text-xs">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-md border border-blue-500/30 bg-blue-500/10 p-2 text-blue-400 flex-shrink-0">
                      <IconMail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${profile.email}`}
                        className="font-medium text-white hover:text-blue-400 transition-colors break-all"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-md border border-blue-500/30 bg-blue-500/10 p-2 text-blue-400 flex-shrink-0">
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
                  <h4 className="font-semibold text-blue-400 uppercase tracking-wider text-[11px] font-mono">
                    Profiles & Documents
                  </h4>

                  <div className="space-y-2">
                    {/* LinkedIn */}
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/50 px-3.5 py-2.5 transition-all duration-200 hover:border-blue-500/40 hover:bg-slate-800 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconLinkedin className="h-4 w-4 text-slate-400 transition-colors group-hover:text-blue-400" />
                        <span className="font-medium text-slate-200 group-hover:text-white">
                          LinkedIn Profile
                        </span>
                      </div>
                      <IconExternalLink className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:text-blue-400 group-hover:translate-x-0.5" />
                    </a>

                    {/* GitHub */}
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/50 px-3.5 py-2.5 transition-all duration-200 hover:border-blue-500/40 hover:bg-slate-800 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconGithub className="h-4 w-4 text-slate-400 transition-colors group-hover:text-blue-400" />
                        <span className="font-medium text-slate-200 group-hover:text-white">
                          GitHub Repositories
                        </span>
                      </div>
                      <IconExternalLink className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:text-blue-400 group-hover:translate-x-0.5" />
                    </a>

                    {/* CV */}
                    <a
                      href={profile.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/50 px-3.5 py-2.5 transition-all duration-200 hover:border-blue-500/40 hover:bg-slate-800 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <IconFileText className="h-4 w-4 text-slate-400 transition-colors group-hover:text-blue-400" />
                        <span className="font-medium text-slate-200 group-hover:text-white">
                          Curriculum Vitae (PDF)
                        </span>
                      </div>
                      <IconExternalLink className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:text-blue-400 group-hover:translate-x-0.5" />
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
