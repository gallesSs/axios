"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "./config";

type Props = { text: string; className?: string };

/** Детерминированный «случайный» порядок, чтобы сервер и клиент совпадали. */
const random = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Буквы проявляются вразнобой — из размытия и увеличения, будто наводится фокус. */
export default function ScatterLetters({ text, className }: Props) {
  const words = text.split(" ");
  return (
    <motion.h2
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {words.map((word, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {Array.from(word).map((char, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block" }}
                variants={{
                  hidden: { opacity: 0, scale: 1.8, y: "-15%", filter: "blur(14px)" },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: "0%",
                    filter: "blur(0px)",
                    transition: {
                      duration: 1.1,
                      ease: EASE_OUT_EXPO,
                      delay: random(w * 31 + i + 1) * 0.7,
                    },
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </Fragment>
      ))}
    </motion.h2>
  );
}
