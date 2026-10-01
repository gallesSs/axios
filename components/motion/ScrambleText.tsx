"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#*+<>";

type Props = { text: string; className?: string; duration?: number };

/** Текст «расшифровывается» из случайных символов слева направо. */
export default function ScrambleText({ text, className, duration = 900 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const resolved = Math.floor(progress * text.length);
      setOutput(
        Array.from(text, (ch, i) =>
          i < resolved || ch === " "
            ? ch
            : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        ).join(""),
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, text, duration]);

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      style={{ display: "inline-block", opacity: inView ? 1 : 0, fontVariantNumeric: "tabular-nums" }}
    >
      {output}
    </span>
  );
}
