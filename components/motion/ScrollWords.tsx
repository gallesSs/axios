"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type Props = { text: string; className?: string };

/** Слова проявляются (из размытия и прозрачности) синхронно со скроллом. */
export default function ScrollWords({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Заканчиваем у низа экрана, чтобы текст в конце страницы успевал проявиться целиком
    offset: ["start 0.95", "end 0.95"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const filter = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <>
      <motion.span aria-hidden="true" style={{ display: "inline-block", opacity, filter, y }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
