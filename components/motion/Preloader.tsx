"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useLenis } from "lenis/react";
import { EASE_IN_OUT, INTRO_DELAY } from "./config";
import s from "./Preloader.module.css";

const COLUMNS = 5;
const COUNT_DURATION = INTRO_DELAY - 0.1;

export default function Preloader() {
  const [done, setDone] = useState(false);
  const lenis = useLenis();
  const count = useMotionValue(0);
  const label = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const controls = animate(count, 100, {
      duration: COUNT_DURATION,
      ease: EASE_IN_OUT,
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [count]);

  useEffect(() => {
    if (!lenis) return;
    if (done) lenis.start();
    else lenis.stop();
  }, [lenis, done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div key="preloader" className={s.preloader} aria-hidden="true">
          {Array.from({ length: COLUMNS }, (_, i) => (
            <motion.div
              key={i}
              className={s.column}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.9, ease: EASE_IN_OUT, delay: i * 0.07 }}
            />
          ))}
          <motion.span
            className={s.label}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Axis — loading
          </motion.span>
          <span className={s.counter}>
            <motion.span
              style={{ display: "block" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: EASE_IN_OUT }}
            >
              {label}
            </motion.span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
