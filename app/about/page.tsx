import Built from "@/components/about/Built";
import Do from "@/components/about/Do";
import Form from "@/components/about/Form";
import Hero from "@/components/about/Hero";
import Story from "@/components/about/Story";
import System from "@/components/about/System";
import Why from "@/components/about/Why";


export default function About() {
    return (
        <main>
            <section className="mb">
                <Hero />
            </section>
            <section className="mb">
                <Do />
            </section>
            <section className="mb">
                <Why />
            </section>
            <section className="mb">
                <System />
            </section>
            <section className="mb">
                <Story />
            </section>
            <section className="mb">
                <Built />
            </section>
            <section >
                <Form />
            </section>
        </main>
    )
}