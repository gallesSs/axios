import BlurReveal from "@/components/motion/BlurReveal"
import FlipLetters from "@/components/motion/FlipLetters"
import LineReveal from "@/components/motion/LineReveal"
import RollLink from "@/components/motion/RollLink"
import s from "./Footer.module.css"

const LINKS = [
    { href: "/", label: "HOME" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
]
const TEXT_MOBILE = ["MODULAR", "ARCHITECTURE FOR", "MODERN LIVING."]
const TEXT_DESKTOP = ["MODULAR", "ARCHITECTURE", "FOR MODERN", "LIVING."]

function Footer() {
    return <footer className={s.footer}>
        <div className={`container ${s.wrapper}`}>
            <nav>
                <ul className={s.list}>
                    {LINKS.map(({ href, label }, i) => (
                        <li key={href} className={s.item}>
                            <LineReveal delay={i * 0.06}>
                                <RollLink href={href} className={s.link}>{label}</RollLink>
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
