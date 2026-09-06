"use client";

import { useState } from "react";
import Link from "next/link";
import { focusItems, type FocusItem } from "@/data/profile";
import Reveal from "./Reveal";

type Category = "all" | "vision" | "robotics" | "ml" | "systems";

const idMap: Record<string, string> = {
  "Autonomous Drone": "autonomous-drone",
  "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation": "mri-synthesis",
  "Gesture-Controlled Drone": "gesture-drone",
  "Gesture-Controlled Robotic Hand": "robotic-hand",
  "Animal Detection System": "animal-detection",
  "Chat-Me": "chat-me",
  "Project Kisan": "project-kisan",
};

const categoryMap: Record<string, Category> = {
  "Autonomous Drone": "robotics",
  "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation": "ml",
  "Gesture-Controlled Drone": "vision",
  "Gesture-Controlled Robotic Hand": "robotics",
  "Animal Detection System": "vision",
  "Chat-Me": "systems",
  "Project Kisan": "ml",
};

const indexMap: Record<string, string> = {
  "Autonomous Drone": "01",
  "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation": "02",
  "Gesture-Controlled Drone": "03",
  "Gesture-Controlled Robotic Hand": "04",
  "Animal Detection System": "05",
  "Chat-Me": "06",
  "Project Kisan": "07",
};

const accentMap: Record<string, "gold" | "rose" | "teal"> = {
  "Autonomous Drone": "gold",
  "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation": "rose",
  "Gesture-Controlled Drone": "teal",
  "Gesture-Controlled Robotic Hand": "gold",
  "Animal Detection System": "rose",
  "Chat-Me": "teal",
  "Project Kisan": "gold",
};

const statusMap: Record<string, string> = {
  "Autonomous Drone": "Research build",
  "Conditional Multimodal MRI Synthesis & Brain Tumor Segmentation": "Model study",
  "Gesture-Controlled Drone": "Interactive prototype",
  "Gesture-Controlled Robotic Hand": "Hardware prototype",
  "Animal Detection System": "Open source · Deployed",
  "Chat-Me": "Complete",
  "Project Kisan": "Open source · Research demo",
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

function ProjectCard({ item }: { item: FocusItem }) {
  const accent = accentMap[item.label] ?? "gold";
  const accentClass = accent === "gold" ? "bg-[#F5A623]" : accent === "rose" ? "bg-[#E05470]" : "bg-[#459e99]";
  const category = categoryMap[item.label] ?? "systems";
  const projectId = idMap[item.label] ?? "autonomous-drone";

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
        <Link href={`/projects/${projectId}`} className="my-7 block">
          <ProjectArt category={category} />
        </Link>

        <div className="mt-auto">
          <Link href={`/projects/${projectId}`} className="hover:text-[#F5A623] transition-colors block">
            <h3 className="display text-3xl leading-none">{item.label}</h3>
          </Link>
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

        <Link
          href={`/projects/${projectId}`}
          className="group/link mt-7 flex items-center gap-2 self-start text-sm font-semibold hover:text-[#F5A623] transition-colors"
        >
          <span>Learn more</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition group-hover/link:translate-x-1 group-hover/link:-translate-y-1">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function FocusBand() {
  const [filter, setFilter] = useState<Category>("all");

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
      className="scroll-mt-16 px-5 py-24 sm:px-8 lg:px-12 lg:py-32 bg-[hsl(var(--background))]"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section rule eyebrow */}
        <Reveal>
          <div className="section-rule flex items-center justify-between pt-4">
            <span className="eyebrow">03 / selected work</span>
            <span className="mono text-[10px] text-[hsl(var(--muted-foreground))]">
              SIX ACTIVE THREADS
            </span>
          </div>
        </Reveal>

        {/* Section heading + filter tabs */}
        <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2
              className="display leading-[0.82]"
              style={{ fontSize: "clamp(3rem, 7vw, 7.5rem)" }}
            >
              Small systems.<br />
              <em className="text-[#E05470]">Real constraints.</em>
            </h2>
          </Reveal>

          {/* Filter pills */}
          <Reveal delay="delay-1">
            <div className="flex flex-wrap gap-2">
              {filters.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`mono px-3 py-1 text-xs uppercase tracking-wider transition ${
                    filter === value
                      ? "bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
                      : "border border-[hsl(var(--foreground)/0.2)] bg-transparent hover:border-[hsl(var(--foreground))]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Project cards grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""}
            >
              <ProjectCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
