"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/components/motion/config";
import { introDelay } from "@/components/motion/intro";
import MaskLetters from "@/components/motion/MaskLetters";
import type { Project } from "@/data/projects";
import s from "./Hero.module.css";

export default function Hero({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const delay = introDelay();
  const image = project.hero ?? project.images[0];
  const words = project.title.split(" ");

  return (
    <div
      ref={ref}
      className={s.hero}
      data-header-theme="hero"
      style={{ "--pos-m": project.hero?.mobilePosition ?? "50% 50%" } as CSSProperties}
    >
      {/* Кадр раскрывается из «окна» по центру и отъезжает из зума; при скролле уплывает вниз */}
      <motion.div className={s.parallax} style={{ y: bgY }}>
        <motion.div
          className={s.media}
          initial={{ clipPath: "inset(18% 22% 18% 22%)", scale: 1.3 }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          transition={{
            clipPath: { duration: 1.4, ease: EASE_IN_OUT, delay },
            scale: { duration: 2.2, ease: EASE_OUT_EXPO, delay },
          }}
        >
          <Image
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            src={image.src}
            alt={image.alt}
            className={s.img}
          />
        </motion.div>
      </motion.div>

      {/* Плашка прочерчивается слева направо, затем в ней волной собираются буквы */}
      <motion.div className={s.titleWrap} style={{ y: titleY, opacity: titleOpacity }}>
        <motion.h1
          className={s.title}
          aria-label={project.title}
          initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, ease: EASE_IN_OUT, delay: delay + 0.6 }}
        >
          {words.map((word, i) => (
            <Fragment key={i}>
              {i > 0 && " "}
              <span className={s.word}>
                <MaskLetters text={word} delay={delay + 1 + i * 0.15} />
              </span>
            </Fragment>
          ))}
        </motion.h1>
      </motion.div>
    </div>
  );
}
