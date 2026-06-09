"use client";
import { useEffect } from "react";

/**
 * Scans for [data-anim] elements and reveals them with smooth transitions
 * as they scroll into view. Elements already visible on load are left alone
 * (no flash of hidden content). Below-fold elements start hidden and
 * animate in one by one.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const MARGIN = 60; // px from viewport bottom where trigger fires

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-anim]")
    );

    const observers: IntersectionObserver[] = [];

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight - MARGIN && rect.bottom > 0;

      if (alreadyVisible) {
        // Already in view on page load — skip animation entirely
        return;
      }

      // Set initial hidden state
      el.setAttribute("data-anim-state", "hidden");

      const delay = parseInt(el.dataset.animDelay ?? "0", 10);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const tid = setTimeout(() => {
              el.setAttribute("data-anim-state", "visible");
            }, delay);
            observer.disconnect();
            observers.splice(observers.indexOf(observer), 1);
            // Store timeout cleanup
            el.dataset.animTid = String(tid);
          }
        },
        {
          threshold: 0.08,
          rootMargin: `0px 0px -${MARGIN}px 0px`,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
      // Clear any pending timeouts
      elements.forEach((el) => {
        if (el.dataset.animTid) clearTimeout(Number(el.dataset.animTid));
      });
    };
  }, []);

  return null;
}
