"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "./config";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** true — анимация на монтировании (первый экран), иначе при попадании во вьюпорт */
  onMount?: boolean;
};

/** Строка выезжает снизу из-под маски с лёгким поворотом. */
export default function LineReveal({ children, className, delay = 0, onMount }: Props) {
  return (
    // Видимость отслеживаем на маске: сам текст спрятан за overflow,
    // и IntersectionObserver считает его невидимым.
    // Запас снизу под выносные элементы компенсирован отрицательным отступом —
    // на раскладку маска не влияет, строки стоят как в макете.
    <motion.span
      style={{ display: "block", overflow: "hidden", paddingBottom: "0.08em", marginBottom: "-0.08em" }}
      initial="hidden"
      {...(onMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, amount: 0.6 } })}
    >
      <motion.span
        className={className}
        style={{ display: "block", transformOrigin: "0% 100%" }}
        variants={{
          hidden: { y: "115%", rotate: 6 },
          visible: { y: "0%", rotate: 0 },
        }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
