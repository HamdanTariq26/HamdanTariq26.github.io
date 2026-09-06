"use client";

import Reveal from "./Reveal";

const capabilities = [
  {
    label: "Computer vision",
    copy: "Detection, segmentation, visual inspection, and the discipline of working with imperfect images.",
    tone: "gold",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    label: "Machine learning",
    copy: "Multimodal modelling, evaluation, medical imaging, and interpretable baselines.",
    tone: "rose",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/>
      </svg>
    ),
  },
  {
    label: "Robotics + autonomy",
    copy: "ROS2, mapping, controls, sensor fusion, and systems that have to act in real time.",
    tone: "teal",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="5" y="2" width="14" height="10" rx="2"/><path d="M12 12v4M8 22h8M8 16h8v6H8z"/><circle cx="9" cy="7" r="1.2" fill="currentColor"/><circle cx="15" cy="7" r="1.2" fill="currentColor"/>
      </svg>
    ),
  },
];

const tools = [
  "Python",
  "C++",
  "PyTorch",
  "TensorFlow",
  "LLMs",
  "RAG",
  "NLP",
  "OpenCV",
  "ROS2",
  "Qt",
  "Linux",
  "Git",
  "ORB-SLAM3",
  "Arduino",
];

export default function Systems() {
  return (
    <section
      id="systems"
      className="scroll-mt-16 dark-panel px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="flex items-center justify-between">
            <span className="eyebrow text-[#F5A623]">02 / working range</span>
            <span className="mono text-[10px] text-[hsl(var(--background)/0.42)]">TOOLS ARE MEANS, NOT IDENTITY</span>
          </div>
        </Reveal>

        <Reveal delay="delay-1">
          <h2
            className="display mt-12 max-w-[880px] leading-[0.82] text-[hsl(var(--background))]"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            From raw signal<br />
            to <em className="text-[#F5A623]">useful action.</em>
          </h2>
        </Reveal>

        {/* Capability cards */}
        <div
          className="mt-20 grid gap-px md:grid-cols-3 border border-[hsl(var(--background)/0.21)] bg-[hsl(var(--background)/0.21)]"
        >
          {capabilities.map(({ label, copy, tone, icon }, index) => (
            <Reveal
              key={label}
              delay={
                index === 0
                  ? "delay-1"
                  : index === 1
                  ? "delay-2"
                  : "delay-3"
              }
            >
              <div
                className="group relative h-full p-7 transition-colors lg:p-9 bg-[hsl(var(--foreground))] hover:bg-[#152e33]"
              >
                {/* Icon badge */}
                <div
                  className={`mb-16 grid h-12 w-12 place-items-center ${
                    tone === "gold"
                      ? "bg-[#F5A623] text-[#182C30]"
                      : tone === "rose"
                      ? "bg-[#E05470] text-[#EDE8DC]"
                      : "bg-[#459e99] text-[#182C30]"
                  }`}
                >
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold text-[hsl(var(--background))]">
                  {label}
                </h3>
                <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-[hsl(var(--background)/0.57)]">
                  {copy}
                </p>
                <span
                  className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-[hsl(var(--background)/0.35)] transition group-hover:translate-x-1"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.8">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tool tags */}
        <Reveal delay="delay-2">
          <div className="mt-5 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="mono px-3 py-2 text-[10px] border border-[hsl(var(--background)/0.22)] text-[hsl(var(--background)/0.6)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
