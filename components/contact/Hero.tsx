"use client"

import { Fragment, useRef } from "react"
import { getImageProps } from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/components/motion/config"
import { introDelay } from "@/components/motion/intro"
import LineReveal from "@/components/motion/LineReveal"
import MaskLetters from "@/components/motion/MaskLetters"
import RollLink from "@/components/motion/RollLink"
import Form from "./Form"
import s from "./Hero.module.css"

const TITLE = "Contact us"

const CONTACTS = [
    { text: "projects@axis.studio", href: "mailto:projects@axis.studio" },
    { text: "+1 (212) 555-0148", href: "tel:+12125550148" },
    { text: "Copenhagen, Denmark" },
    { text: "Mon — Fri / 09:00–18:00 CET" },
]

// Арт-дирекшн: на десктопе в макете другой кадр (909×242), на мобилке — 335×220
const alt = "Woman on a terrace of a concrete house overlooking the hills"
const { props: { srcSet: desktop } } = getImageProps({
    alt, src: "/contact/image-desktop.jpg", width: 1568, height: 418, sizes: "50vw",
})
const { props: { srcSet: mobile, ...img } } = getImageProps({
    alt, src: "/contact/image.webp", width: 1005, height: 660, sizes: "100vw",
})

/**
 * Мобилка (макет 375): заголовок на 76 от верха, 60 → контакты + фото, 60 → форма.
 * Десктоп (макет 1920): заголовок 240 на 100 от верха, 100 → две колонки 909 / 910:
 * слева контакты и фото (тянется до высоты формы), справа форма.
 */
export default function Hero() {
    const delay = introDelay()
    const mediaRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

    return (
        <div className={`container ${s.container}`}>
            {/* Пока заголовок под шапкой — она прозрачная */}
            <div className={s.head} data-header-theme="hero">
                <h1 className={s.title} aria-label={TITLE}>
                    {TITLE.split(" ").map((word, i) => (
                        <Fragment key={i}>
                            {i > 0 && " "}
                            <span className={s.word}>
                                <MaskLetters text={word} delay={delay + 0.1 + i * 0.15} />
                            </span>
                        </Fragment>
                    ))}
                </h1>
            </div>
            <div className={s.content}>
                <div className={s.details}>
                    <ul className={s.list}>
                        {CONTACTS.map(({ text, href }, i) => (
                            <li key={text} className={s.item}>
                                <LineReveal delay={i * 0.06}>
                                    {href ? <RollLink href={href}>{text}</RollLink> : text}
                                </LineReveal>
                            </li>
                        ))}
                    </ul>
                    {/* Кадр поднимается шторкой и отъезжает из зума; при скролле — лёгкий параллакс.
                        Триггер — внешний блок без clip-path: IntersectionObserver учитывает clip-path */}
                    <motion.div
                        ref={mediaRef}
                        className={s.media}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div
                            className={s.mask}
                            variants={{
                                hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                                visible: { clipPath: "inset(0% 0% 0% 0%)" },
                            }}
                            transition={{ duration: 1.4, ease: EASE_IN_OUT }}
                        >
                            <motion.div
                                className={s.zoom}
                                style={{ y }}
                                variants={{ hidden: { scale: 1.3 }, visible: { scale: 1 } }}
                                transition={{ duration: 2, ease: EASE_OUT_EXPO }}
                            >
                                <picture>
                                    <source media="(min-width: 1024px)" srcSet={desktop} />
                                    <source srcSet={mobile} />
                                    <img {...img} alt={alt} className={s.img} />
                                </picture>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
                <Form />
            </div>
        </div>
    )
}
