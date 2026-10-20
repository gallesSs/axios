"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { EASE_IN_OUT } from "./config";
import s from "./Preloader.module.css";

const COLUMNS = 5;

/**
 * Переход между страницами: новая страница открывается из-под колонок,
 * которые уезжают вверх каскадом — как в конце прелоадера.
 * На первом заходе не играет (там прелоадер).
 */
export default function PageTransition() {
  const pathname = usePathname();
  const [{ path, run }, setState] = useState({ path: pathname, run: 0 });

  // Сверяем адрес прямо в рендере: шторка встаёт в том же коммите, что и новая страница, — без вспышки
  if (path !== pathname) setState({ path: pathname, run: run + 1 });

  if (!run) return null;

  return (
    <div key={run} className={s.preloader} aria-hidden="true">
      {Array.from({ length: COLUMNS }, (_, i) => (
        <motion.div
          key={i}
          className={s.column}
          initial={{ y: "0%" }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE_IN_OUT, delay: 0.05 + i * 0.05 }}
        />
      ))}
    </div>
  );
}
