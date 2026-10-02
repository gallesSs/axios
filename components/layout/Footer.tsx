import BlurReveal from "@/components/motion/BlurReveal"
import FlipLetters from "@/components/motion/FlipLetters"
import LineReveal from "@/components/motion/LineReveal"
import s from "./Footer.module.css"

const LINKS = ["HOME", "PROJECTS", "ABOUT", "CONTACT"]
const TEXT_MOBILE = ["MODULAR", "ARCHITECTURE FOR", "MODERN LIVING."]
const TEXT_DESKTOP = ["MODULAR", "ARCHITECTURE", "FOR MODERN", "LIVING."]

function Footer() {
    return <footer className={s.footer}>
        <div className={`container ${s.wrapper}`}>
            <nav>
                <ul className={s.list}>
                    {LINKS.map((label, i) => (
                        <li key={label} className={s.item}>
                            <LineReveal delay={i * 0.06}>
                                {/* Ховер: текст перекатывается, подчёркивание прочерчивается слева и уходит вправо */}
                                <a className={s.link} href="">
                                    <span className={s.linkText} data-text={label}>{label}</span>
                                </a>
                            </LineReveal>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={s.content}>
                <FlipLetters text="AXIS" as="span" className={s.tag} />
                {/* Разбивка на строки в мобильном и десктопном макетах разная */}
                {[TEXT_MOBILE, TEXT_DESKTOP].map((lines, v) => (
                    <p key={v} className={`${s.text} ${v ? s.textDesktop : s.textMobile}`}>
                        {lines.map((line, i) => (
                            <LineReveal key={line} delay={i * 0.08}>{line}</LineReveal>
                        ))}
                    </p>
                ))}
            </div>
            <BlurReveal className={s.last}>© 2026 AXIS</BlurReveal>
        </div>
    </footer>
}

export default Footer
