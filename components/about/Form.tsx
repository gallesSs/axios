"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import BlurReveal from "@/components/motion/BlurReveal";
import RollButton from "@/components/motion/RollButton";
import ScrambleText from "@/components/motion/ScrambleText";
import StretchLetters from "@/components/motion/StretchLetters";
import s from "./Form.module.css";

const TITLE = "MAKE SPACE FOR YOUR WAY OF LIVING.";

export default function Form() {
    const ref = useRef<HTMLDivElement>(null);
    // Въезд: фон «вырастает» из рамки до краёв экрана
    const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
    const clipPath = useTransform(enter, (p) => {
        const k = 1 - Math.min(1, Math.max(0, p));
        return `inset(0% ${6 * k}% 0% ${6 * k}%)`;
    });
    // Параллакс фото на всём проходе секции
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(enter, [0, 1], [1.2, 1]);

    return (
        <div ref={ref} className={s.wrapper}>
            <motion.div className={s.frame} style={{ clipPath }} aria-hidden="true">
                <motion.div className={s.bg} style={{ y, scale }} />
            </motion.div>
            <div className={`container ${s.container}`}>
                <div className={s.heading}>
                    {/* Слова — отдельные строки: переносятся по ширине, вырастают по очереди */}
                    <StretchLetters lines={TITLE.split(" ")} className={s.title} inline />
                    <ScrambleText text="/07" className={s.tag} />
                </div>
                <div className={s.content}>
                    <BlurReveal className={s.text}>Every home begins with a place, a need and a way of living. We turn these starting points into architecture — carefully considered, precisely built and designed to belong.</BlurReveal>
                    <RollButton
                        href=""
                        className={s.btn}
                        text="START A PROJECT"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12.25 7L7.875 2.625L7.25813 3.24187L10.5744 6.5625L1.75 6.5625V7.4375L10.5744 7.4375L7.25813 10.7581L7.875 11.375L12.25 7Z" fill="currentColor" />
                        </svg>}
                    />
                </div>
            </div>
        </div>
    )
}
