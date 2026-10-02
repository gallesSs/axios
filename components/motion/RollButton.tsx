"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "./config";
import s from "./RollButton.module.css";

type Props = {
  text: string;
  icon: ReactNode;
  /** Внешний вид кнопки (цвета, отступы, шрифт). Цвета ховера — через --roll-fill / --roll-color */
  className?: string;
};

/**
 * Появление: кнопка раскрывается от центра в стороны.
 * Ховер: заливка поднимается волной, текст перекатывается, стрелка пролетает насквозь.
 */
export default function RollButton({ text, icon, className }: Props) {
  return (
    // Триггер — обёртка без clip-path
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 1 }}>
      <motion.button
        type="button"
        className={`${s.button} ${className ?? ""}`}
        variants={{
          hidden: { clipPath: "inset(0% 50% 0% 50%)" },
          visible: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
      >
        <span className={s.label}>
          <span className={s.text} data-text={text}>
            {text}
          </span>
        </span>
        <span className={s.icon} aria-hidden="true">
          {icon}
          {icon}
        </span>
      </motion.button>
    </motion.div>
  );
}
