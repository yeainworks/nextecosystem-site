"use client";
import { useEffect, useRef } from "react";

interface WordFillProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  colorFrom?: string;
  colorTo?: string;
  /** ms delay between each word */
  wordDelay?: number;
  /** ms for each word's transition */
  wordDuration?: number;
}

/**
 * Splits text into words. When the container enters the viewport,
 * each word animates from faint → full colour with a staggered delay.
 * Uses IntersectionObserver for trigger, CSS transitions for smoothness.
 */
export default function WordFill({
  text,
  className,
  style,
  colorFrom = "rgba(10,10,10,0.15)",
  colorTo = "#555",
  wordDelay = 40,
  wordDuration = 600,
}: WordFillProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = Array.from(container.querySelectorAll<HTMLSpanElement>("[data-word]"));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          spans.forEach((span, i) => {
            setTimeout(() => {
              span.style.color = colorTo;
            }, i * wordDelay);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [colorTo, wordDelay]);

  return (
    <span ref={containerRef} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          data-word
          style={{
            color: colorFrom,
            display: "inline",
            transition: `color ${wordDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        >
          {word}{" "}
        </span>
      ))}
    </span>
  );
}
