"use client";

import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "./config";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "span";
};

/** Буквы переворачиваются из плоскости экрана (rotateX) с размытием и каскадом. */
export default function FlipLetters({ text, className, as = "h2" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      aria-label={text}
      style={{ perspective: 600, display: "flex" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      transition={{ staggerChildren: 0.06 }}
    >
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{ display: "inline-block", transformOrigin: "50% 100% -20px", whiteSpace: "pre" }}
          variants={{
            hidden: { rotateX: -100, opacity: 0, filter: "blur(10px)" },
            visible: {
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 1, ease: EASE_OUT_EXPO },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}
