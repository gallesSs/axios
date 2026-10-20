import ApproachList from "@/components/home/ApproachList"
import BlurReveal from "@/components/motion/BlurReveal"
import FlipLetters from "@/components/motion/FlipLetters"
import LouverImage from "@/components/motion/LouverImage"
import ScrambleText from "@/components/motion/ScrambleText"
import s from "./Do.module.css"

const STEPS = [
    {
        title: "01 / DESIGN",
        text: "Architecture shaped around your needs.",
    },
    {
        title: "02 / CONFIGURE",
        text: "Modules combined around your lifestyle and site.",
    },
    {
        title: "03 / BUILD",
        text: "Precise production and efficient assembly.",
    },
]

export default function Do() {
    return (
        <div className={`container ${s.container}`}>
            <div className={s.top}>
                <ScrambleText text="/02" className={s.tag} />
                <FlipLetters text="WHAT WE DO" className={s.title} />
            </div>
            <LouverImage className={s.image} src="/about/do.webp" alt="Modular home from above" />
            <div className={s.info}>
                <BlurReveal className={s.boldText}>We create modular homes designed around the way you live and the place they belong to.</BlurReveal>
                <BlurReveal className={s.text} delay={0.15}>From the first configuration to the final build, we bring architecture, modular construction and thoughtful design together in one system.</BlurReveal>
            </div>
            <div className={s.dropdowns}>
                <ApproachList steps={STEPS} withIcon />
            </div>
        </div>
    )
}
