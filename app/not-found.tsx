"use client"

import BlurReveal from "@/components/motion/BlurReveal"
import MaskLetters from "@/components/motion/MaskLetters"
import RollButton from "@/components/motion/RollButton"
import { introDelay } from "@/components/motion/intro"
import s from "./not-found.module.css"

/** 404 в стилистике contact: тёмный экран, крупный номер собирается по буквам. */
export default function NotFound() {
    const delay = introDelay()
    return (
        <main className={s.page} data-header-theme="hero">
            <div className={`container ${s.container}`}>
                <h1 className={s.title} aria-label="404">
                    <MaskLetters text="404" delay={delay + 0.1} stagger={0.08} />
                </h1>
                <div className={s.content}>
                    <BlurReveal className={s.text} delay={delay + 0.4}>
                        This page doesn’t exist — or it has moved to a new site.
                    </BlurReveal>
                    <RollButton
                        href="/"
                        className={s.btn}
                        text="BACK TO HOME"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12.25 7L7.875 2.625L7.25813 3.24187L10.5744 6.5625L1.75 6.5625V7.4375L10.5744 7.4375L7.25813 10.7581L7.875 11.375L12.25 7Z" fill="currentColor" />
                        </svg>}
                    />
                </div>
            </div>
        </main>
    )
}
