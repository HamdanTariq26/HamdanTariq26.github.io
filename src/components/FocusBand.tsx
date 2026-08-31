"use client";

import { useState } from "react";
import { focusItems, type FocusItem } from "@/data/profile";
import Reveal from "./Reveal";

type Category = "all" | "vision" | "robotics" | "ml" | "systems";

const categoryMap: Record<string, Category> = {
  "Autonomous Drone": "robotics",
  "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation": "ml",
  "Gesture-Controlled Drone": "vision",
  "Gesture-Controlled Robotic Hand": "robotics",
  "Animal Detection System": "vision",
  "Chat-Me": "systems",
};

const indexMap: Record<string, string> = {
  "Autonomous Drone": "01",
  "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation": "02",
  "Gesture-Controlled Drone": "03",
  "Gesture-Controlled Robotic Hand": "04",
  "Animal Detection System": "05",
  "Chat-Me": "06",
};

const accentMap: Record<string, "gold" | "rose" | "teal"> = {
  "Autonomous Drone": "gold",
  "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation": "rose",
  "Gesture-Controlled Drone": "teal",
  "Gesture-Controlled Robotic Hand": "gold",
  "Animal Detection System": "rose",
  "Chat-Me": "teal",
};

const statusMap: Record<string, string> = {
  "Autonomous Drone": "Research build",
  "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation": "Model study",
  "Gesture-Controlled Drone": "Interactive prototype",
  "Gesture-Controlled Robotic Hand": "Hardware prototype",
  "Animal Detection System": "Deployed experiment",
  "Chat-Me": "Complete",
};

/** Inline SVG art for each project category */
function ProjectArt({ category }: { category: Category }) {
  return (
    <div
      className="project-art relative grid aspect-[1.4] place-items-center overflow-hidden border border-[hsl(var(--foreground)/0.13)]"
    >
      {category === "robotics" && (
        <div className="relative h-32 w-32 rotate-45 border border-[#F5A623]/80">
          <div className="absolute -inset-6 rounded-full border border-dashed border-[#E05470]/80" />
          <div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5A623]"
          />
        </div>
      )}
      {category === "ml" && (
        <div className="relative h-[68%] w-[72%]">
          <div
            className="absolute left-[12%] top-[58%] h-2.5 w-2.5 rounded-full bg-[#E05470] shadow-[34px_-22px_0_#F5A623,68px_-7px_0_#E05470,102px_-38px_0_#EDE8DC,136px_-17px_0_#F5A623]"
          />
          <div className="absolute inset-x-0 top-1/2 h-px bg-[hsl(var(--background)/0.2)]" />
          <div className="absolute inset-y-0 left-1/3 w-px bg-[hsl(var(--background)/0.18)]" />
        </div>
      )}
      {category === "vision" && (
        <div className="relative h-[55%] w-[56%] border-2 border-[hsl(var(--background)/0.68)]">
          <span className="absolute -left-2 -top-2 h-5 w-5 border-l-2 border-t-2 border-[#E05470]" />
          <span className="absolute -bottom-2 -right-2 h-5 w-5 border-r-2 border-b-2 border-[#F5A623]" />
          <div className="absolute left-[38%] top-[34%] h-8 w-8 rounded-full bg-[#F5A623]" />
        </div>
      )}
      {category === "systems" && (
        <div className="relative h-[60%] w-[68%] p-3 border border-[hsl(var(--background)/0.55)]">
          <div className="h-full border border-[hsl(var(--background)/0.18)]">
            <div className="flex gap-1 p-2 border-b border-[hsl(var(--background)/0.18)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E05470]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623]" />
            </div>
            <div className="p-3">
              <div className="h-1 w-2/3 bg-[hsl(var(--background)/0.65)]" />
              <div className="mt-3 h-1 w-1/2 bg-[hsl(var(--background)/0.3)]" />
              <div className="mt-8 ml-auto h-5 w-1/3 border border-[#F5A623]/80" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ item, onOpen }: { item: FocusItem; onOpen: (item: FocusItem) => void }) {
  const accent = accentMap[item.label] ?? "gold";
  const accentClass = accent === "gold" ? "bg-[#F5A623]" : accent === "rose" ? "bg-[#E05470]" : "bg-[#459e99]";
  const category = categoryMap[item.label] ?? "systems";

  return (
    <article
      className="group flex h-full flex-col card-lift border border-[hsl(var(--foreground)/0.19)] bg-[hsl(var(--card))] transition duration-300 hover:border-[hsl(var(--foreground)/0.52)] hover:shadow-[14px_14px_0_rgba(24,44,48,0.08)]"
    >
      {/* Colored top stripe */}
      <div className={`h-2 ${accentClass}`} />

      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
            PROJECT / {indexMap[item.label] ?? "—"}
          </span>
          <span className="mono text-[9px] text-[hsl(var(--muted-foreground))]">
            {statusMap[item.label] ?? item.period}
          </span>
        </div>

        {/* SVG project art */}
        <div className="my-7">
          <ProjectArt category={category} />
        </div>

        <div className="mt-auto">
          <h3 className="display text-3xl leading-none">{item.label}</h3>
          <p className="mt-3 max-w-[360px] text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
            {item.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="mono px-2 py-1 text-[9px] bg-[hsl(var(--muted))]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onOpen(item)}
          className="group/link mt-7 flex items-center gap-2 self-start text-sm font-semibold"
        >
          Read the brief
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </button>
      </div>
    </article>
  );
}

/** Project brief modal */
function BriefModal({ item, onClose }: { item: FocusItem; onClose: () => void }) {
  const index = indexMap[item.label] ?? "—";
  const status = statusMap[item.label] ?? item.period;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center p-5 backdrop-blur-sm bg-[hsl(var(--foreground)/0.78)]"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90dvh] w-full max-w-[650px] overflow-y-auto p-7 sm:p-10 border border-[hsl(var(--foreground))] bg-[hsl(var(--background))] shadow-[18px_18px_0_#F5A623]"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 grid h-8 w-8 place-items-center transition border border-[hsl(var(--foreground)/0.2)] hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        <span className="eyebrow text-[#E05470]">
          Project brief / {index}
        </span>
        <h3 className="display mt-7 max-w-[520px] text-5xl leading-[0.82] sm:text-6xl">{item.label}</h3>
        <p className="mt-7 text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
          {item.description}
        </p>

        <div className="mt-8 py-5 border-y border-[hsl(var(--foreground)/0.2)]">
          <p className="eyebrow text-[hsl(var(--muted-foreground))]">Stack</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="mono px-2 py-1 text-[9px] bg-[hsl(var(--muted))]">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
            {status} · {item.period}
          </p>
        </div>

        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold transition bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[#F5A623] hover:text-[#182C30]"
          >
            View on GitHub
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default function FocusBand() {
  const [filter, setFilter] = useState<Category>("all");
  const [selected, setSelected] = useState<FocusItem | null>(null);

  const visible = filter === "all"
    ? focusItems
    : focusItems.filter((item) => categoryMap[item.label] === filter);

  const filters: { label: string; value: Category }[] = [
    { label: "All", value: "all" },
    { label: "Vision", value: "vision" },
    { label: "Robotics", value: "robotics" },
    { label: "ML", value: "ml" },
    { label: "Systems", value: "systems" },
  ];

  return (
    <section
      id="work"
      className="scroll-mt-16 px-5 py-24 sm:px-8 lg:px-12 lg:py-36 bg-[hsl(var(--background))]"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="section-rule flex items-center justify-between pt-4">
            <span className="eyebrow">03 / selected work</span>
            <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
              SIX OPEN THREADS
            </span>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <h2
              className="display max-w-[680px] leading-[0.8]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
            >
              Small systems.<br />
              <em className="text-[#E05470]">Real constraints.</em>
            </h2>
          </Reveal>

          {/* Filter buttons */}
          <Reveal delay="delay-1">
            <div className="flex flex-wrap gap-2">
              {filters.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`mono px-3 py-2 text-[10px] uppercase transition border ${
                    filter === value
                      ? "border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
                      : "border-[hsl(var(--foreground)/0.25)] text-inherit hover:border-[hsl(var(--foreground))]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Project grid */}
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal
              key={item.label}
              delay={
                index % 4 === 0 ? "delay-1"
                  : index % 4 === 1 ? "delay-2"
                  : index % 4 === 2 ? "delay-3"
                  : "delay-4"
              }
            >
              <ProjectCard item={item} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>

        <Reveal delay="delay-2">
          <div
            className="mt-14 flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between border-t border-[hsl(var(--foreground)/0.2)]"
          >
            <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
              More experiments are taking shape in the lab.
            </span>
            <a
              href="https://github.com/HamdanTariq26"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 self-start text-sm font-semibold"
            >
              Ask for the full project list
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
          </div>
        </Reveal>
      </div>

      {selected && <BriefModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
