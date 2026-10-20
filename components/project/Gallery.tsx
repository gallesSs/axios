"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/components/motion/config";
import type { ProjectImage } from "@/data/projects";
import s from "./Gallery.module.css";

export default function Gallery({ images }: { images: ProjectImage[] }) {
  return (
    <ul className={s.gallery}>
      {images.map((img, i) => (
        <li key={img.src} className={s.item}>
          <Photo image={img} index={i} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Кадр поднимается из-под маски снизу вверх косым срезом (наклон чередуется по колонкам, каскад),
 * картинка отъезжает из зума, а при скролле медленно уплывает внутри маски.
 */
function Photo({ image, index }: { image: ProjectImage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const delay = (index % 3) * 0.12;
  // Верхняя кромка маски стартует с наклоном и выравнивается к концу
  const [left, right] = index % 2 ? [130, 100] : [100, 130];

  return (
    // Триггер — блок без clip-path: IntersectionObserver учитывает clip-path
    <motion.div
      ref={ref}
      className={s.frame}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className={s.mask}
        variants={{
          hidden: { clipPath: `polygon(0% ${left}%, 100% ${right}%, 100% 100%, 0% 100%)` },
          visible: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        }}
        transition={{ duration: 1.3, ease: EASE_IN_OUT, delay }}
      >
        <motion.div className={s.parallax} style={{ y }}>
          <motion.div
            className={s.zoom}
            variants={{ hidden: { scale: 1.35 }, visible: { scale: 1 } }}
            transition={{ duration: 2, ease: EASE_OUT_EXPO, delay }}
          >
            <Image
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 100vw, 100vw"
              src={image.src}
              alt={image.alt}
              className={s.img}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
