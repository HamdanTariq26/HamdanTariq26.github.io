"use client";

import { useEffect, useRef, ReactNode, ElementType } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: "delay-1" | "delay-2" | "delay-3" | "delay-4" | "";
  as?: ElementType;
}

/**
 * Wraps children in a reveal div that fades/slides in once it enters the viewport.
 * Uses IntersectionObserver + CSS .reveal / .is-visible classes.
 */
export default function Reveal({
  children,
  className = "",
  delay = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${delay} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
