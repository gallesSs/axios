import BlurReveal from "@/components/motion/BlurReveal"
import RollButton from "@/components/motion/RollButton"
import StretchLetters from "@/components/motion/StretchLetters"
import s from "./Cta.module.css"

function Cta() {
    return <div className={s.cta}>
        <div className={`container ${s.wrapper}`}>
            <StretchLetters lines={["FIND", "YOUR AXIS."]} className={s.title} />
            <BlurReveal className={s.text} delay={0.2}>Tell us about your site, your needs and the way you want to live. We&apos;ll help you find the right configuration.</BlurReveal>
            <RollButton
                className={s.button}
                text="START A PROJECT"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12.25 7L7.875 2.625L7.25813 3.24187L10.5744 6.5625L1.75 6.5625V7.4375L10.5744 7.4375L7.25813 10.7581L7.875 11.375L12.25 7Z" fill="currentColor" />
                </svg>}
            />
        </div>
    </div>
}

export default Cta
