"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "./config";

type Props = {
  lines: string[];
  className?: string;
  /** true — строки не разрываются принудительно, а переносятся по ширине (как слова) */
  inline?: boolean;
};

/** Буквы вырастают из-под маски, растянутые по вертикали, волной от центра строки. */
export default function StretchLetters({ lines, className, inline }: Props) {
  return (
    <motion.h2
      className={className}
      aria-label={lines.join(" ")}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {lines.map((line, row) => (
        <Fragment key={row}>
          {inline && row > 0 && " "}
          <span
            aria-hidden="true"
            style={{ display: inline ? "inline-flex" : "flex", overflow: "hidden" }}
          >
            {Array.from(line).map((char, i) => {
              const fromCenter = Math.abs(i - (line.length - 1) / 2);
              return (
                <motion.span
                  key={i}
                  style={{ display: "inline-block", whiteSpace: "pre", transformOrigin: "50% 100%" }}
                  variants={{
                    hidden: { y: "100%", scaleY: 2.2, opacity: 0 },
                    visible: {
                      y: "0%",
                      scaleY: 1,
                      opacity: 1,
                      transition: {
                        duration: 1.2,
                        ease: EASE_OUT_EXPO,
                        delay: row * 0.12 + fromCenter * 0.05,
                      },
                    },
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        </Fragment>
      ))}
    </motion.h2>
  );
}
