import BlurReveal from "@/components/motion/BlurReveal";
import ModularImage from "@/components/motion/ModularImage";
import RevealImage from "@/components/motion/RevealImage";
import RollButton from "@/components/motion/RollButton";
import ScrambleText from "@/components/motion/ScrambleText";
import ScrollWords from "@/components/motion/ScrollWords";
import StretchLetters from "@/components/motion/StretchLetters";
import s from "./Story.module.css";

export default function Story() {
    return (
        <div className={s.wrapper}>
            <div className={`container ${s.top}`}>
                <ScrambleText text="/05" className={s.tag} />
                <StretchLetters lines={["OUR", "STORY"]} className={s.title} inline />
            </div>
            <RevealImage className={s.image} alt="Modular home terrace" src="/about/story.webp" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div className={`container ${s.content}`}>
                <ScrollWords className={s.text} text="We create modular homes that bring together thoughtful design, precise construction and a strong connection to place. Instead of treating a home as a fixed structure, we see it as a system that can evolve — responding to different landscapes, lifestyles and stages of life." />
                <BlurReveal className={s.subtext}>Our approach combines the flexibility of modular architecture with the character and permanence of a carefully designed home. Every configuration begins with the same principle: make space for the life that happens inside it.</BlurReveal>
            </div>
            <div className={`container ${s.bottom}`}>
                <ModularImage className={s.imageSm} alt="Concrete modular home" src="/about/story-sm.webp" srcDesktop="/about/story-sm-desktop.webp" />
                <div className={s.btnWrap}>
                    <RollButton
                        href="/#approach"
                        className={s.btn}
                        text="SEE OUR APPROACH"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M12.25 7L7.875 2.625L7.25813 3.24187L10.5744 6.5625L1.75 6.5625V7.4375L10.5744 7.4375L7.25813 10.7581L7.875 11.375L12.25 7Z" fill="currentColor" />
                        </svg>}
                    />
                </div>
            </div>
        </div>
    )
}
