"use client";

import { motion } from "motion/react";
import ScrambleText from "@/components/motion/ScrambleText";
import { EASE_IN_OUT, EASE_OUT_EXPO, INTRO_DELAY } from "@/components/motion/config";
import s from "./Hero.module.css";

const TEXT = "Thoughtful modular homes, shaped by place, purpose and the way you live.";
const TAGS = ["MODULAR ARCHITECTURE", "ADAPTABLE SPACES", "PRECISION BUILT"];

/** Буквы по одной выезжают из-под маски, чередуя наклон — строка «собирается» волной. */
function Letters({ text, delay }: { text: string; delay: number }) {
    return Array.from(text).map((ch, i) => (
        <span key={i} className={s.mask} aria-hidden="true">
            <motion.span
                className={s.letter}
                initial={{ y: "105%", rotate: i % 2 ? -8 : 8 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: delay + i * 0.035 }}
            >
                {ch}
            </motion.span>
        </span>
    ));
}

export default function Hero() {
    return (
        <div className={`container ${s.container}`}>
            <div className={s.heroTop}>
                <ScrambleText text="/about us" className={s.tag} delay={INTRO_DELAY + 0.1} />
                <h1 className={s.titleWrapper} aria-label="ARCHITECTURE THAT BELONGS.">
                    <span className={s.title}>
                        <Letters text="ARCHITECTURE" delay={INTRO_DELAY + 0.15} />
                    </span>
                    {/* Плашка «прочерчивается» слева направо, затем в ней проявляются буквы */}
                    <motion.span
                        className={s.titleBlack}
                        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        transition={{ duration: 1.1, ease: EASE_IN_OUT, delay: INTRO_DELAY + 0.45 }}
                    >
                        <Letters text="THAT BELONGS." delay={INTRO_DELAY + 0.9} />
                    </motion.span>
                </h1>
            </div>

            <motion.p
                className={s.text}
                initial="hidden"
                animate="shown"
                transition={{ staggerChildren: 0.03, delayChildren: INTRO_DELAY + 0.8 }}
            >
                {TEXT.split(" ").map((w, i) => (
                    <span key={i}>
                        <motion.span
                            className={s.word}
                            variants={{
                                hidden: { opacity: 0, y: "40%", filter: "blur(8px)" },
                                shown: { opacity: 1, y: "0%", filter: "blur(0px)" },
                            }}
                            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
                        >
                            {w}
                        </motion.span>{" "}
                    </span>
                ))}
            </motion.p>

            <ul className={s.list}>
                {TAGS.map((tag, i) => (
                    <li key={tag} className={s.item}>
                        {/* Подписи разъезжаются из центра к своим местам */}
                        <motion.span
                            className={s.itemInner}
                            initial={{ opacity: 0, x: `${(1 - i) * 60}%`, filter: "blur(6px)" }}
                            animate={{ opacity: 1, x: "0%", filter: "blur(0px)" }}
                            transition={{ duration: 1.3, ease: EASE_OUT_EXPO, delay: INTRO_DELAY + 1.1 }}
                        >
                            {tag}
                        </motion.span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
