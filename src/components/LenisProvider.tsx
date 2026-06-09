"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis smooth scroll — the same library Zentto uses.
 * Lenis smoothly interpolates window.scrollTo(), so CSS scroll-driven
 * animations (animation-timeline: view()) automatically feel buttery.
 */
export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
