"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "./config";

const SLATS = 8;

type Props = {
  src: string;
  alt?: string;
  className?: string;
  /** Цвет ламелей — цвет фона под картинкой */
  cover?: string;
};

/**
 * Картинка открывается «жалюзи»: горизонтальные ламели цвета фона
 * по очереди схлопываются к верхнему краю, кадр приближается из лёгкого зума,
 * а при скролле медленно уплывает внутри маски.
 */
export default function LouverImage({ src, alt = "", className, cover = "var(--Primary-02, #fff)" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div style={{ position: "absolute", inset: "-9% 0", y }}>
        <motion.img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", maxWidth: "none", objectFit: "cover" }}
          variants={{
            hidden: { scale: 1.3 },
            visible: { scale: 1, transition: { duration: 2, ease: EASE_OUT_EXPO } },
          }}
        />
      </motion.div>
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}
      >
        {Array.from({ length: SLATS }, (_, i) => (
          <motion.span
            key={i}
            // Перехлёст закрывает субпиксельные щели между ламелями
            style={{ flex: 1, margin: "-0.5px 0", background: cover, transformOrigin: "50% 0%" }}
            variants={{
              hidden: { scaleY: 1 },
              visible: {
                scaleY: 0,
                transition: { duration: 0.9, ease: EASE_IN_OUT, delay: 0.1 + i * 0.06 },
              },
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
