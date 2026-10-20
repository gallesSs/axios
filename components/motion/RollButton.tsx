"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "./config";
import s from "./RollButton.module.css";

const MotionLink = motion.create(Link);

type Props = {
  text: string;
  icon: ReactNode;
  /** Внешний вид кнопки (цвета, отступы, шрифт). Цвета ховера — через --roll-fill / --roll-color */
  className?: string;
  /** Если задан — рендерится ссылка вместо кнопки (внутренние адреса — через next/link) */
  href?: string;
  /** Тип кнопки (без href) */
  type?: "button" | "submit";
};

/**
 * Появление: кнопка раскрывается от центра в стороны.
 * Ховер: заливка поднимается волной, текст перекатывается, стрелка пролетает насквозь.
 */
export default function RollButton({ text, icon, className, href, type = "button" }: Props) {
  const Tag = href === undefined ? motion.button : href.startsWith("/") ? MotionLink : motion.a;
  return (
    // Триггер — обёртка без clip-path
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 1 }}>
      <Tag
        {...(href === undefined ? { type } : { href })}
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
      </Tag>
    </motion.div>
  );
}
