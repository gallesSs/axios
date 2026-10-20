'use client'
import BurgerButton from "./BurgerButton";
import BurgerMenu from "./BurgerMenu";
import Logo from "./Logo";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { EASE_IN_OUT, EASE_OUT_EXPO, INTRO_DELAY } from "@/components/motion/config";
import styles from "./Header.module.css";

/**
 * Над чем сейчас шапка: hero — прозрачная, dark — белая подложка,
 * всё остальное (светлые секции) — тёмно-синяя подложка.
 * Секции помечаются атрибутом data-header-theme="hero" | "dark".
 */
type Theme = "hero" | "light" | "dark"

const PLATE_COLOR: Record<Theme, string> = {
    hero: "rgba(6, 16, 37, 0)",
    light: "rgba(6, 16, 37, 0.86)",
    dark: "rgba(255, 255, 255, 0.86)",
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [theme, setTheme] = useState<Theme>("hero")
    const ref = useRef<HTMLElement>(null)
    const { scrollY } = useScroll()
    const pathname = usePathname()

    // Тему определяем по нижней кромке шапки: подложка появляется, как только hero ушёл из-под неё
    const detect = useCallback(() => {
        const header = ref.current
        if (!header) return
        const probe = header.getBoundingClientRect().bottom
        let next: Theme = "light"
        for (const el of document.querySelectorAll<HTMLElement>("[data-header-theme]")) {
            const r = el.getBoundingClientRect()
            if (r.top <= probe && r.bottom > probe) {
                next = el.dataset.headerTheme === "dark" ? "dark" : "hero"
                break
            }
        }
        setTheme(next)
    }, [])

    useMotionValueEvent(scrollY, "change", detect)

    useEffect(() => {
        window.addEventListener("resize", detect)
        return () => window.removeEventListener("resize", detect)
    }, [detect])

    // Меню закрывается по Escape
    useEffect(() => {
        if (!isOpen) return
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [isOpen])

    // При клиентской навигации скролла может не быть — тему пересчитываем по новой странице
    useEffect(detect, [detect, pathname])

    const plateShown = theme !== "hero" && !isOpen
    // Меню тёмное — поверх него логотип всегда белый
    const inkDark = theme === "dark" && !isOpen

    return (
        <motion.header
            ref={ref}
            className={`${styles.header} ${plateShown ? styles.compact : ""} ${inkDark ? styles.inkDark : ""}`}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: INTRO_DELAY + 0.9 }}
        >
            {/* Подложка опускается шторкой сверху и плавно перекрашивается между темами */}
            <motion.div
                className={styles.plate}
                aria-hidden="true"
                initial={false}
                animate={{
                    clipPath: plateShown ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                    backgroundColor: PLATE_COLOR[theme],
                }}
                transition={{
                    clipPath: { duration: 0.8, ease: EASE_OUT_EXPO },
                    backgroundColor: { duration: 0.6, ease: EASE_IN_OUT },
                }}
            />
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.logoLink} aria-label="AXIS — home" onClick={() => setIsOpen(false)}>
                    <Logo className={styles.logo} />
                </Link>
                <BurgerButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
            </div>
            <AnimatePresence>
                {isOpen && <BurgerMenu key="burger-menu" onNavigate={() => setIsOpen(false)} />}
            </AnimatePresence>
        </motion.header>
    )
}
