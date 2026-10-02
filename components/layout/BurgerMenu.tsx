'use client'

import { usePathname } from "next/navigation"
import { motion, type Variants } from "motion/react"
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/components/motion/config"
import styles from "./BurgerMenu.module.css"

// Панель опускается «шторкой» сверху, на закрытии сначала уезжают ссылки, потом шторка
const panelVariants: Variants = {
    hidden: { clipPath: "inset(0% 0% 100% 0%)" },
    visible: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 0.7, ease: EASE_IN_OUT, staggerChildren: 0.07, delayChildren: 0.25 },
    },
    exit: {
        clipPath: "inset(0% 0% 100% 0%)",
        transition: { duration: 0.6, ease: EASE_IN_OUT, delay: 0.2, staggerChildren: 0.04, staggerDirection: -1 },
    },
}

// Ссылки выезжают из-под маски с лёгким поворотом — как LineReveal
const itemVariants: Variants = {
    hidden: { y: "115%", rotate: 6 },
    visible: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
    exit: { y: "-115%", rotate: -3, transition: { duration: 0.4, ease: EASE_IN_OUT } },
}

const LINKS = [
    { href: "/", label: "HOME" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
]

export default function BurgerMenu() {
    const pathname = usePathname()
    return (
        <motion.div
            className={styles.menu}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <nav>
                <motion.ul className={styles.list}>
                    {LINKS.map(({ href, label }, i) => (
                        <li key={href} className={styles.item}>
                            <motion.a
                                className={`${styles.link} ${pathname === href ? styles.active : ''}`}
                                href=""
                                variants={itemVariants}
                            >
                                <span>{String(i + 1).padStart(2, '0')}</span>{'   '}<span>/</span>{'   '}<span>{label}</span>
                            </motion.a>
                        </li>
                    ))}
                </motion.ul>
            </nav>
        </motion.div>
    )
}
