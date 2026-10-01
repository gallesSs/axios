"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE_OUT_EXPO } from "./config";

type Props = { src: string; alt?: string; className?: string };

/**
 * Картинка раскрывается из маленькой «капсулы» в полный кадр,
 * а внутри маски медленно уплывает (параллакс).
 */
export default function RevealImage({ src, alt = "", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    // Триггер — внешний блок без clip-path: IntersectionObserver учитывает
    // clip-path, и «капсула» никогда не набрала бы нужный процент видимости.
    <motion.div
      ref={ref}
      className={className}
      style={{ position: "relative" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div
        style={{ position: "absolute", inset: 0, overflow: "hidden" }}
        variants={{
          hidden: { clipPath: "inset(38% 30% 38% 30% round 999px)" },
          visible: { clipPath: "inset(0% 0% 0% 0% round 0px)" },
        }}
        transition={{ duration: 1.6, ease: EASE_OUT_EXPO }}
      >
        <motion.div
          style={{ position: "absolute", inset: "-14% 0", y }}
          variants={{
            hidden: { scale: 1.5, rotate: -4 },
            visible: { scale: 1, rotate: 0 },
          }}
          transition={{ duration: 2, ease: EASE_OUT_EXPO }}
        >
          <img
            src={src}
            alt={alt}
            style={{ width: "100%", height: "100%", maxWidth: "none", objectFit: "cover" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
