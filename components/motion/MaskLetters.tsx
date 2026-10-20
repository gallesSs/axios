"use client";

import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "./config";

type Props = {
  text: string;
  /** Задержка первой буквы, сек */
  delay?: number;
  /** Шаг каскада между буквами, сек */
  stagger?: number;
};

/**
 * Буквы по одной выезжают из-под маски, чередуя наклон — строка «собирается» волной.
 * Анимация на монтировании (первый экран). Трекинг задаётся через --tracking у родителя:
 * letter-spacing обрезался бы маской справа.
 */
export default function MaskLetters({ text, delay = 0, stagger = 0.035 }: Props) {
  return Array.from(text).map((ch, i) => (
    <span
      key={i}
      aria-hidden="true"
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "top",
        // Запас под выносные элементы, на раскладку не влияет
        paddingBottom: "0.06em",
        marginBottom: "-0.06em",
        marginRight: "var(--tracking, 0)",
      }}
    >
      <motion.span
        style={{ display: "inline-block", whiteSpace: "pre", transformOrigin: "0% 100%" }}
        initial={{ y: "105%", rotate: i % 2 ? -8 : 8 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: delay + i * stagger }}
      >
        {ch}
      </motion.span>
    </span>
  ));
}
