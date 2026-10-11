"use client";

import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import BlurReveal from "../motion/BlurReveal";
import ScrambleText from "../motion/ScrambleText";
import StretchLetters from "../motion/StretchLetters";
import { EASE_OUT_EXPO } from "../motion/config";
import s from "./System.module.css";

const CARDS = [
    {
        title: "MODULAR ARCHITECTURE",
        text: "A precise system of living, sleeping, kitchen, bathroom and service modules designed to work together as one complete home.",
        image: "/about/system.jpg",
    },
    {
        title: "ADAPTABLE LIVING",
        text: "Each home can respond to its site, scale and lifestyle. Modules can be combined, expanded and reconfigured as your needs change.",
        image: "/about/system.jpg",
    },
    {
        title: "PRECISION BUILT",
        text: "From the first configuration to the final detail, every element is developed with clarity, control and architectural precision.",
        image: "/about/system.jpg",
    },
    {
        title: "YOUR HOME, YOUR AXIS",
        text: "A modular home should feel personal, not predetermined. We create spaces that belong to the place, the people and the way they live.",
        image: "/about/system.jpg",
    },
];

const LAST = CARDS.length - 1;

type CardProps = {
    card: (typeof CARDS)[number];
    active: boolean;
    index: number;
    onHover: () => void;
};

function Card({ card, active, index, onHover }: CardProps) {
    const state = active ? "shown" : "hidden";

    return (
        <motion.li
            className={s.card}
            onPointerEnter={(e) => e.pointerType === "mouse" && onHover()}
            // Появление: «шторка» снизу вверх по очереди (триггер — список)
            variants={{
                out: { clipPath: "inset(100% 0% 0% 0%)" },
                in: {
                    clipPath: "inset(0% 0% 0% 0%)",
                    transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay: index * 0.08 },
                },
            }}
        >
            {/* Фото карточки в макете — 50% прозрачности */}
            <motion.div
                className={s.media}
                initial="hidden"
                animate={state}
                variants={{
                    hidden: { opacity: 0, scale: 1.12 },
                    shown: { opacity: 0.5, scale: 1 },
                }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
                aria-hidden="true"
            >
                <Image src={card.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 300px, 240px" className={s.img} />
            </motion.div>

            <motion.p
                className={s.cardText}
                initial="hidden"
                animate={state}
                variants={{
                    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                    shown: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: active ? 0.1 : 0 }}
            >
                {card.text}
            </motion.p>
            <h3 className={s.cardTitle}>{card.title}</h3>
        </motion.li>
    );
}

export default function System() {
    const trackRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLUListElement>(null);
    const [active, setActive] = useState(0);
    // step — ширина карточки, max — насколько ряд шире экрана
    const [size, setSize] = useState({ step: 0, max: 0 });

    // Пока секция закреплена, вертикальный скролл листает карточки
    const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
    // Центр отрезка i-й карточки (progress = (i + 0.5) / N) соответствует позиции i
    const pos = useSpring(
        useTransform(scrollYProgress, (p) => Math.min(LAST, Math.max(0, p * CARDS.length - 0.5))),
        { stiffness: 120, damping: 24, mass: 0.4 },
    );
    // Текущая карточка встаёт к левому краю, пока ряду есть куда ехать
    const x = useTransform(pos, (v) => -Math.min(size.max, v * size.step));

    // Десктоп: все карточки в ряд, секция не закреплена — активная (как в макете, сначала первая) меняется по ховеру
    const [desktop, setDesktop] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        if (!desktop) setActive(Math.min(LAST, Math.max(0, Math.floor(p * CARDS.length))));
    });

    useLayoutEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const sync = () => setDesktop(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    useLayoutEffect(() => {
        const row = rowRef.current;
        if (!row) return;
        const measure = () => {
            const first = row.firstElementChild as HTMLElement | null;
            const last = row.lastElementChild as HTMLElement | null;
            // Справа в конце оставляем такой же отступ, как слева
            const gutter = parseFloat(getComputedStyle(row).paddingLeft) || 0;
            const end = last ? last.offsetLeft + last.offsetWidth + gutter : 0;
            setSize({
                step: first?.offsetWidth ?? 0,
                max: Math.max(0, end - row.clientWidth),
            });
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(row);
        return () => ro.disconnect();
    }, []);

    return (
        <div ref={trackRef} className={s.track}>
            <div className={s.wrapper}>
                <div className={`container ${s.container}`}>
                    <div className={s.top}>
                        <ScrambleText text="/04" className={s.tag} />
                        <StretchLetters lines={["THE AXIS", "SYSTEM"]} className={s.title} inline />
                        <BlurReveal className={s.text} delay={0.2}>
                            A modular system designed to create homes that adapt to different sites, lifestyles and ways of living — without compromising on architecture or quality.
                        </BlurReveal>
                    </div>
                </div>
                <div className={s.viewport}>
                    <motion.ul
                        ref={rowRef}
                        className={s.cards}
                        style={{ x }}
                        initial="out"
                        whileInView="in"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {CARDS.map((card, i) => (
                            <Card
                                key={card.title}
                                card={card}
                                index={i}
                                active={i === active}
                                onHover={() => desktop && setActive(i)}
                            />
                        ))}
                    </motion.ul>
                </div>
            </div>
        </div>
    )
}
