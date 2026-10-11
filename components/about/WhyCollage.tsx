"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import s from "./Why.module.css";

type Item = {
    /** Положение левого верхнего угла, % от экрана */
    x: number;
    y: number;
    /** Глубина: насколько быстро элемент «пролетает» мимо при раскрытии */
    depth: number;
    /** Скрыть на мобилке — там меньше места (подписи наезжали бы на «окно») */
    wide?: boolean;
} & ({ src: string; w: number; h: number; size: number } | { text: string });

/** Фото и подписи, разбросанные вокруг центрального «окна» (фото самой секции) */
const ITEMS: Item[] = [
    { src: "/about/do.png", w: 1125, h: 690, size: 14, x: 5, y: 9, depth: 1.1 },
    { src: "/home/about.png", w: 1090, h: 1443, size: 7, x: 40, y: 3, depth: 0.7, wide: true },
    { src: "/about/story-sm.png", w: 600, h: 600, size: 10, x: 71, y: 7, depth: 1 },
    { src: "/home/modular.png", w: 1374, h: 1145, size: 13, x: 82, y: 44, depth: 1.3 },
    { src: "/about/system.jpg", w: 1170, h: 1454, size: 8, x: 23, y: 56, depth: 0.8 },
    { src: "/about/story.png", w: 1125, h: 888, size: 11, x: 4, y: 68, depth: 1.2 },
    { src: "/home/find.png", w: 1320, h: 1191, size: 9, x: 62, y: 74, depth: 0.9 },
    { src: "/about/form.png", w: 1125, h: 1548, size: 7, x: 89, y: 78, depth: 1.1, wide: true },
    { text: "DESIGN AROUND LIFE", x: 22, y: 30, depth: 0.6, wide: true },
    { text: "ADAPT TO PLACE", x: 66, y: 32, depth: 0.7, wide: true },
    { text: "BUILT WITH INTENTION", x: 6, y: 47, depth: 0.5, wide: true },
    { text: "READY TO EVOLVE", x: 70, y: 64, depth: 0.6, wide: true },
    { text: "/03", x: 48, y: 88, depth: 0.4 },
];

function CollageItem({ item, intro, enter }: { item: Item; intro: MotionValue<number>; enter: MotionValue<number> }) {
    // Направление «от центра экрана»: при раскрытии элемент улетает в ту же сторону
    const dx = item.x + ("src" in item ? item.size / 2 : 6) - 50;
    const dy = item.y + 4 - 50;
    const x = useTransform(intro, [0, 1], ["0vw", `${dx * 1.6 * item.depth}vw`]);
    // Пока секция подъезжает — лёгкий параллакс по глубине; при раскрытии — разлёт
    const y = useTransform([intro, enter], ([i, e]: number[]) =>
        `${dy * 1.6 * item.depth * i + (1 - e) * 18 * item.depth}vh`,
    );
    const scale = useTransform(intro, [0, 1], [1, 1 + 0.6 * item.depth]);
    const opacity = useTransform(intro, [0.45, 0.9], [1, 0]);
    const filter = useTransform(intro, [0.3, 0.9], ["blur(0px)", "blur(6px)"]);

    return (
        <motion.div
            className={`${s.collageItem} ${item.wide ? s.collageWide : ""}`}
            style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                x,
                y,
                scale,
                opacity,
                filter,
                ...("src" in item ? { width: `calc(${item.size} * var(--collage-unit))` } : {}),
            }}
        >
            {"src" in item ? (
                <Image src={item.src} alt="" width={item.w} height={item.h} sizes="20vw" className={s.collageImg} />
            ) : (
                <span className={s.collageText}>{item.text}</span>
            )}
        </motion.div>
    );
}

export default function WhyCollage({ intro, enter }: { intro: MotionValue<number>; enter: MotionValue<number> }) {
    return (
        <div className={s.collage} aria-hidden="true">
            {ITEMS.map((item, i) => (
                <CollageItem key={i} item={item} intro={intro} enter={enter} />
            ))}
        </div>
    );
}
