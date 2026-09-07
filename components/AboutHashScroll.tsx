"use client";

import { useEffect } from "react";

export default function AboutHashScroll() {
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const rawHash = window.location.hash.replace("#", "");
      if (rawHash) {
        setTimeout(() => {
          const el = document.getElementById(rawHash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.classList.add("highlight-active-card");
            setTimeout(() => {
              el.classList.remove("highlight-active-card");
            }, 3000);
          }
        }, 150);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return null;
}
