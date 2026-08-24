"use client";

import { useEffect, useRef, ReactNode, ElementType } from "react";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right";
  delay?: number; // ms, must match a data-delay value in globals.css
  threshold?: number;
  as?: ElementType;
}

/**
 * Wraps children in an element that fades/slides in once it enters the viewport.
 * Uses IntersectionObserver + CSS classes — no external animation library needed.
 */
export default function AnimateIn({
  children,
  className = "",
  animation = "fade-up",
  delay,
  threshold = 0.08,
  as: Tag = "div",
}: AnimateInProps) {
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
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-animate={animation}
      {...(delay !== undefined ? { "data-delay": String(delay) } : {})}
      className={className}
    >
      {children}
    </Tag>
  );
}
