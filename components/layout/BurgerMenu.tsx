'use client'

import { usePathname } from "next/navigation"
import { motion } from "motion/react"

const EASE = [0.65, 0, 0.35, 1] as const

const panelVariants = {
    hidden: { opacity: 0, y: -24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: EASE, staggerChildren: 0.06, delayChildren: 0.1 },
    },
    exit: { opacity: 0, y: -24, transition: { duration: 0.3, ease: EASE } },
}

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
}

export default function BurgerMenu() {
    const pathname = usePathname()
    return (
        <motion.div
            className="fixed top-0 pt-22.5 px-5 pb-5 right-0 w-full bg-[rgba(22,22,22,0.5)] backdrop-blur-[10px] z-10"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <nav>
                <motion.ul className="flex flex-col gap-6">
                    <motion.li variants={itemVariants}>
                        <a className={`text-white text-[32px] font-medium uppercase ${pathname === "/" ? 'opacity-100' : 'opacity-50'}`} href=""><span>01</span> <span>/</span> <span>HOME</span></a>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                        <a className={`text-white text-[32px] font-medium uppercase ${pathname === "/projects" ? 'opacity-100' : 'opacity-50'}`} href=""><span>02</span> <span>/</span> <span>PROJECTS</span></a>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                        <a className={`text-white text-[32px] font-medium uppercase ${pathname === "/about" ? 'opacity-100' : 'opacity-50'}`} href=""><span>03</span> <span>/</span> <span>ABOUT</span></a>
                    </motion.li>
                    <motion.li variants={itemVariants}>
                        <a className={`text-white text-[32px] font-medium uppercase ${pathname === "/contact" ? 'opacity-100' : 'opacity-50'}`} href=""><span>04</span> <span>/</span> <span>CONTACT</span></a>
                    </motion.li>
                </motion.ul>
            </nav>
        </motion.div>
    )
}