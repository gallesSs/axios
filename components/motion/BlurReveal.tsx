"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO } from "./config";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "p" | "span" | "div";
};

/** Блок проявляется из размытия с лёгким подъёмом при попадании во вьюпорт. */
export default function BlurReveal({ children, className, delay = 0, as = "p" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </Tag>
  );
}
