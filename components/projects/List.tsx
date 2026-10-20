import { projects } from "@/data/projects"
import Card from "./Card"
import s from "./List.module.css"

export default function List() {
    return (
        <ul className={s.list}>
            {projects.map((pr, i) => (
                <li key={pr.id}>
                    <Card tag={pr.id} title={pr.title} text={pr.description} images={pr.images} slug={pr.slug} eager={i === 0} />
                </li>
            ))}
        </ul>
    )
}
