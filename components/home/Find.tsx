"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import BlurReveal from "@/components/motion/BlurReveal";
import LineReveal from "@/components/motion/LineReveal";
import RollButton from "@/components/motion/RollButton";
import ScrambleText from "@/components/motion/ScrambleText";
import { EASE_OUT_EXPO } from "@/components/motion/config";
import s from "./Find.module.css";

function Find() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      className={s.find}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Фон медленно уплывает при скролле и «отъезжает» из увеличения при появлении */}
      <motion.div
        className={s.bg}
        aria-hidden="true"
        style={{ y: bgY }}
        variants={{
          hidden: { scale: 1.25 },
          visible: { scale: 1, transition: { duration: 2.2, ease: EASE_OUT_EXPO } },
        }}
      />
      <div className={`container ${s.wrapper}`}>
        <ScrambleText text="/05" className={s.tag} />
        <div className={s.content}>
          <h2 className={s.title}>
            <LineReveal>Find a home</LineReveal>
            <LineReveal delay={0.1}>that feels like yours.</LineReveal>
          </h2>
          <BlurReveal className={s.text} delay={0.2}>
            Explore our collection of modular homes or tell us what you are
            looking to build.
          </BlurReveal>
        </div>
        <RollButton
          className={s.button}
          text="EXPLORE THE COLLECTION"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none">
              <path
                d="M12.25 7L7.875 2.625L7.25813 3.24187L10.5744 6.5625L1.75 6.5625V7.4375L10.5744 7.4375L7.25813 10.7581L7.875 11.375L12.25 7Z"
                fill="currentColor"
              />
            </svg>
          }
        />
      </div>
    </motion.div>
  );
}

export default Find;
