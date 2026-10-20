import type { Metadata } from "next"
import Hero from "@/components/contact/Hero"
import s from "./page.module.css"

export const metadata: Metadata = {
    title: "Contact — AXIS",
    description: "Start a project with AXIS — modular architecture studio in Copenhagen.",
}

export default function ContactPage() {
    return (
        <main className={s.page}>
            <section className={s.section}>
                <Hero />
            </section>
        </main>
    )
}
