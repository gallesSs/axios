import raw from "./projects.json";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Превью для списка проектов (4 шт.) */
  images: ProjectImage[];
  /** Обложка страницы проекта; mobilePosition — кадрирование на мобилке (из макета) */
  hero?: ProjectImage & { mobilePosition?: string };
  /** Галерея страницы проекта; если не задана — используются превью */
  gallery?: ProjectImage[];
};

export const projects: Project[] = raw;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
