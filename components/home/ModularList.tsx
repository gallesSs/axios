"use client";

import { motion, type Variants } from "motion/react";
import ScrambleText from "@/components/motion/ScrambleText";
import { EASE_OUT_EXPO } from "@/components/motion/config";
import s from "./Modular.module.css";

type Item = { title: string; text: string };

const line: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.4, ease: EASE_OUT_EXPO } },
};

const title: Variants = {
  hidden: { y: "115%", rotate: 4 },
  visible: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.15 } },
};

const text: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.3 },
  },
};

/** Линия прочерчивается слева направо, заголовок выезжает из-под маски,
 *  номер «расшифровывается», описание проявляется из размытия. */
export default function ModularList({ items }: { items: Item[] }) {
  return (
    <ul className={s.list}>
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          className={s.item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.span className={s.line} aria-hidden="true" variants={line} />
          <span className={s.topMask}>
            <motion.span className={s.top} variants={title}>
              <ScrambleText text={`${String(i + 1).padStart(2, "0")} —`} className={s.topTag} />
              {item.title}
            </motion.span>
          </span>
          <motion.p className={s.text} variants={text}>
            {item.text}
          </motion.p>
        </motion.li>
      ))}
    </ul>
  );
}
