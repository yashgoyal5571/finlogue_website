"use client";

import React, { useEffect, useRef, useState } from "react";
import { observeElement } from "@/lib/observer-pool";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  direction?: "up" | "fade";
  as?: "div" | "section" | "article" | "header" | "ul" | "span";
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  style,
  delay = 0,
  direction = "up",
  as: Component = "div",
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  once = true,
}: ScrollRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const domRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // If prefers-reduced-motion is active, reveal immediately
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    const currentRef = domRef.current;
    if (!currentRef) return;

    const unobserve = observeElement(
      currentRef,
      (entry) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin, once }
    );

    return () => {
      unobserve();
    };
  }, [threshold, rootMargin, once]);

  const baseClass = direction === "fade" ? "reveal-fade" : "reveal-init";
  const revealedClass = isRevealed ? "is-revealed" : "";

  return React.createElement(
    Component,
    {
      ref: domRef,
      className: `${baseClass} ${revealedClass} ${className}`.trim(),
      style: {
        ...style,
        ...(delay ? { transitionDelay: `${delay}ms` } : {}),
      },
    },
    children
  );
}
