"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import LineReveal from "@/components/motion/LineReveal";
import { EASE_IN_OUT, EASE_OUT_EXPO, INTRO_DELAY } from "@/components/motion/config";
import s from "./Hero.module.css";

const TITLE = "AXIS";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className={`container ${s.hero}`} data-header-theme="hero">
      {/* Фон раскрывается «диафрагмой» из точки под заголовком */}
      <motion.div
        className={s.bg}
        style={{ y: bgY }}
        initial={{ clipPath: "circle(0% at 50% 78%)", scale: 1.35 }}
        animate={{ clipPath: "circle(150% at 50% 78%)", scale: 1 }}
        transition={{
          clipPath: { duration: 1.6, ease: EASE_IN_OUT, delay: INTRO_DELAY },
          scale: { duration: 2.4, ease: EASE_OUT_EXPO, delay: INTRO_DELAY },
        }}
      />

      <motion.div className={s.content} style={{ y: contentY, opacity: contentOpacity }}>
        <div className={s.textWrapper}>
          <LineReveal className={s.span} onMount delay={INTRO_DELAY + 0.7}>
            WE BUILD DIFFERENT.
          </LineReveal>
          <LineReveal className={s.text} onMount delay={INTRO_DELAY + 0.8}>
            Architectural homes, built around the way you live.
          </LineReveal>
        </div>
        <h1 className={s.title} aria-label={TITLE}>
          {Array.from(TITLE).map((char, i) => (
            <Letter key={i} char={char} index={i} progress={scrollYProgress} />
          ))}
        </h1>
      </motion.div>
    </div>
  );
}

/**
 * Буквы въезжают из-под маски попеременно сверху и снизу,
 * а при скролле разлетаются в стороны от центра.
 */
function Letter({
  char,
  index,
  progress,
}: {
  char: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const fromCenter = index - (TITLE.length - 1) / 2;
  const x = useTransform(progress, [0, 1], [0, fromCenter * 60]);
  const fromTop = index % 2 === 1;

  return (
    <span className={s.letterMask} aria-hidden="true">
      <motion.span className={s.letter} style={{ x }}>
        <motion.span
          className={s.letter}
          initial={{ y: fromTop ? "-110%" : "110%", rotate: fromTop ? -12 : 12 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{
            duration: 1.3,
            ease: EASE_OUT_EXPO,
            delay: INTRO_DELAY + 0.35 + index * 0.08,
          }}
        >
          {char}
        </motion.span>
      </motion.span>
    </span>
  );
}
