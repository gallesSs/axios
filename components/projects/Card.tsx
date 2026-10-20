"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "motion/react"
import { EASE_OUT_EXPO } from "@/components/motion/config"
import LineReveal from "@/components/motion/LineReveal"
import ScrambleText from "@/components/motion/ScrambleText"
import type { ProjectImage } from "@/data/projects"
import s from "./Card.module.css"

interface CardProps {
    tag: string;
    title: string;
    /** Описание — на десктопе проявляется под заголовком при ховере строки */
    text: string;
    images: ProjectImage[];
    slug: string;
    /** Первая карточка на первом экране — превью грузим сразу (LCP) */
    eager?: boolean;
}

/** Кадры поднимаются из-под маски «шторкой» каскадом слева направо */
const media: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    visible: (i: number) => ({
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 1.3, ease: EASE_OUT_EXPO, delay: i * 0.1 },
    }),
}

const zoom: Variants = {
    hidden: { scale: 1.4 },
    visible: (i: number) => ({
        scale: 1,
        transition: { duration: 1.8, ease: EASE_OUT_EXPO, delay: i * 0.1 },
    }),
}

export default function Card({ tag, title, text, images, slug, eager }: CardProps) {
    const href = `/projects/${slug}`
    const textRef = useRef<HTMLDivElement>(null)

    // Высота строки задана кадрами, текст под заголовком не должен её растягивать:
    // обрезаем по числу целых строк, которые помещаются в оставшееся место (с многоточием)
    useEffect(() => {
        const el = textRef.current
        if (!el) return
        const ro = new ResizeObserver(() => {
            const lh = parseFloat(getComputedStyle(el.firstElementChild ?? el).lineHeight)
            el.style.setProperty("--lines", String(Math.max(1, Math.floor(el.clientHeight / lh))))
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    return (
        <article className={s.container}>
            <div className={s.left}>
                {/* Обёртка: ScrambleText задаёт display инлайном, а на десктопе номер скрыт */}
                <span className={s.tagWrap}>
                    <ScrambleText text={`/${tag}`} className={s.tag} />
                </span>
                <h2 className={s.title}>
                    {/* Ховер: подчёркивание прочерчивается слева */}
                    <Link href={href} className={s.link} aria-label={title}>
                        {/* Мобилка — каждое слово с новой строки, десктоп — в строку */}
                        {title.split(" ").map((word, i) => (
                            <LineReveal key={i} delay={i * 0.08}>{word}</LineReveal>
                        ))}
                    </Link>
                </h2>
                {/* Внешний блок — место под описание (его меряем), абзац внутри обрезается по строкам */}
                <div ref={textRef} className={s.textBox}>
                    <p className={s.text}>{text}</p>
                </div>
            </div>
            <motion.ul
                className={s.list}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {images.map((img, i) => (
                    <li key={img.src} className={s.item}>
                        {/* Дубль ссылки заголовка — только для мыши/тача, из таб-порядка убран */}
                        <Link href={href} className={s.media} tabIndex={-1} aria-hidden="true">
                            <motion.div className={s.mask} custom={i} variants={media}>
                                <motion.div className={s.zoom} custom={i} variants={zoom}>
                                    <Image
                                        fill
                                        sizes="(min-width: 1024px) 15vw, 260px"
                                        alt={img.alt}
                                        src={img.src}
                                        className={s.image}
                                        loading={eager ? "eager" : "lazy"}
                                        draggable={false}
                                    />
                                </motion.div>
                            </motion.div>
                        </Link>
                    </li>
                ))}
            </motion.ul>
        </article>
    )
}
