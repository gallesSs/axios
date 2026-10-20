import type { Metadata } from "next";
import Hero from "@/components/projects/Hero";

export const metadata: Metadata = {
    title: "Projects — AXIS",
};

export default function ProjectsPage() {
    return (
        <main>
            <section className="mb">
                <Hero />
            </section>
        </main>
    )
}
