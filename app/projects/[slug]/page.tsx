import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ScrollWords from "@/components/motion/ScrollWords";
import Gallery from "@/components/project/Gallery";
import Hero from "@/components/project/Hero";
import { getProject, projects } from "@/data/projects";
import s from "@/components/project/Project.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
    const { slug } = await props.params;
    const project = getProject(slug);
    return project ? { title: `${project.title} — AXIS`, description: project.description } : {};
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
    const { slug } = await props.params;
    const project = getProject(slug);
    if (!project) notFound();

    return (
        <main>
            <section className="mb">
                <Hero project={project} />
            </section>
            <section className="mb">
                <div className="container">
                    <ScrollWords className={s.text} text={project.description} />
                </div>
            </section>
            <section className={s.gallerySection}>
                <div className="container">
                    <Gallery images={project.gallery ?? project.images} />
                </div>
            </section>
        </main>
    );
}
