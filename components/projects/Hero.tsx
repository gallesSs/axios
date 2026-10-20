"use client"

import ScrambleText from "@/components/motion/ScrambleText"
import { introDelay } from "@/components/motion/intro"
import s from "./Hero.module.css"
import List from "./List"

export default function Hero() {
    return (
        <div className={`container ${s.container}`}>
            <h1 className={s.title}>
                <ScrambleText text="/our PROJECTS" delay={introDelay() + 0.1} />
            </h1>
            <List />
        </div>
    )
}
