"use client";

import { motion } from "motion/react";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "./config";

const COLS = 5;
const ROWS = 4;

type Props = { src: string; alt?: string; className?: string };

/**
 * Картинка «собирается из модулей»: сетка плашек цвета фона
 * схлопывается и проворачивается по диагонали, открывая кадр.
 */
export default function ModularImage({ src, alt = "", className }: Props) {
  return (
    <motion.div
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ width: "100%" }}
        variants={{
          hidden: { scale: 1.25 },
          visible: { scale: 1, transition: { duration: 2.2, ease: EASE_OUT_EXPO } },
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          return (
            <motion.span
              key={i}
              // Перехлёст закрывает субпиксельные щели между плашками
              style={{ margin: -0.5, background: "var(--Primary-02, #fff)" }}
              variants={{
                hidden: { scale: 1, rotate: 0 },
                visible: {
                  scale: 0,
                  rotate: 90,
                  transition: { duration: 0.9, ease: EASE_IN_OUT, delay: (col + row) * 0.07 },
                },
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
