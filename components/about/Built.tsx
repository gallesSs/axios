"use client";

import { motion } from "motion/react";
import type { PointerEvent } from "react";
import BlurReveal from "@/components/motion/BlurReveal";
import ScrambleText from "@/components/motion/ScrambleText";
import StretchLetters from "@/components/motion/StretchLetters";
import { EASE_OUT_EXPO } from "@/components/motion/config";
import s from "./Built.module.css";

const CARDS = [
    { title: "MODULAR HOMES", text: "Designed around a flexible system of independent modules." },
    { title: "CUSTOM CONFIGURATIONS", text: "Each home is adapted to its site, lifestyle and needs." },
    { title: "PRECISION BUILT", text: "From configuration to production, every element follows a controlled process." },
    { title: "DESIGNED TO LAST", text: "Architecture created for changing needs and long-term living." },
];

/** Блик на ховере следует за курсором: координаты в CSS-переменные карточки */
const spotlight = (e: PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function Built() {
    return (
        <div className={`container ${s.container}`}>
            <div className={s.top}>
                <ScrambleText text="/06" className={s.tag} />
                <StretchLetters lines={["BUILT ON", "EXPERIENCE"]} className={s.title} />
                <BlurReveal className={s.text} delay={0.2}>AXIS brings together architectural thinking, modular systems and a precise approach to every project. From the first configuration to the final detail, we create homes designed to last, adapt and belong to their surroundings.</BlurReveal>
            </div>
            {/* Карточки по очереди «откидываются» к зрителю, как панели модуля */}
            <motion.ul
                className={s.list}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, amount: 0.25 }}
            >
                {CARDS.map((card, i) => (
                    <motion.li
                        key={card.title}
                        className={s.card}
                        onPointerMove={spotlight}
                        variants={{
                            hidden: { rotateX: -80, opacity: 0, y: 40 },
                            shown: {
                                rotateX: 0,
                                opacity: 1,
                                y: 0,
                                transition: { duration: 1.3, ease: EASE_OUT_EXPO, delay: i * 0.12 },
                            },
                        }}
                    >
                        <ScrambleText text={String(i + 1).padStart(2, "0")} className={s.num} />
                        <div className={s.content}>
                            <h3 className={s.cardTitle}>{card.title}</h3>
                            <p className={s.cardText}>{card.text}</p>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
            <div className={s.texts}>
                <BlurReveal className={s.textItem}>
                    We create modular homes that adapt to the people, places and ways of living they are made for. From the first configuration to the smallest detail, every element is carefully considered to balance flexibility, precision and comfort. The result is architecture that feels personal, responds to its surroundings and is designed to evolve with you over time.
                </BlurReveal>
                <BlurReveal className={s.textItem} delay={0.1}>Our system allows spaces to be combined, expanded and reconfigured as life changes. Each configuration is shaped by its site, creating a natural connection between the home and its surroundings. We believe modular architecture should offer freedom without sacrificing quality or character. AXIS turns a flexible system into a home that feels entirely your own.</BlurReveal>
            </div>
        </div>
    )
}
