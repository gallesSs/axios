"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef, useState, type PointerEvent, type FocusEvent } from "react";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "../motion/config";
import s from "./Approach.module.css";

type Step = { title: string; text: string };

type ItemProps = Step & {
  index: number;
  withIcon: boolean;
  shown: boolean;
  active: boolean;
  onToggle: (open: boolean) => void;
};

const word: Variants = {
  closed: { opacity: 0, y: "60%", filter: "blur(6px)", transition: { duration: 0.2 } },
  open: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/** Белая заливка растекается кругом из точки входа курсора и стягивается в точку выхода,
 *  буквы заголовка перекатываются в тёмную копию, текст проявляется по словам. */
function ApproachItem({ title, text, index, withIcon, shown, active, onToggle }: ItemProps) {
  const [origin, setOrigin] = useState("0% 0%");

  const track = (e: PointerEvent<HTMLLIElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <motion.li
      className={s.item}
      tabIndex={0}
      initial={false}
      // Второй лейбл — появление: плашки по очереди «стираются» слева направо
      animate={[active ? "open" : "closed", shown ? "shown" : "hidden"]}
      variants={{
        // --open — степень раскрытия для CSS (раскладка About на десктопе)
        closed: { "--open": 0, transition: { duration: 0.5, ease: EASE_IN_OUT } },
        open: { "--open": 1, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
        hidden: { clipPath: "inset(0% 100% 0% 0%)" },
        shown: {
          clipPath: "inset(0% 0% 0% 0%)",
          transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: index * 0.1 },
        },
      }}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        track(e);
        onToggle(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        track(e);
        onToggle(false);
      }}
      // На тач-устройствах ховера нет — открываем по тапу
      onPointerUp={(e) => {
        if (e.pointerType === "mouse") return;
        track(e);
        onToggle(!active);
      }}
      onFocus={() => onToggle(true)}
      onBlur={(e: FocusEvent<HTMLLIElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) onToggle(false);
      }}
    >
      <motion.span
        className={s.fill}
        aria-hidden="true"
        variants={{
          closed: {
            clipPath: `circle(0% at ${origin})`,
            transition: { duration: 0.6, ease: EASE_IN_OUT },
          },
          open: {
            clipPath: `circle(150% at ${origin})`,
            transition: { duration: 0.9, ease: EASE_OUT_EXPO },
          },
        }}
      />

      <span className={s.itemTop}>
        <span className={s.itemHeading}>
          <span className={s.srOnly}>{title}</span>
          {Array.from(title).map((ch, i) => (
            <span key={i} className={s.char} aria-hidden="true">
              <motion.span
                className={s.charInner}
                variants={{
                  closed: { y: "0%", transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: i * 0.012 } },
                  open: { y: "-50%", transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.018 } },
                }}
              >
                <span>{ch}</span>
                <span className={s.charAlt}>{ch}</span>
              </motion.span>
            </span>
          ))}
        </span>

        {/* Иконки из макета: закрыт — белая стрелка, открыт — тёмный крестик */}
        {withIcon && (
          <span className={s.icon} aria-hidden="true">
            <motion.svg
              viewBox="0 0 20 20"
              variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
              transition={{ duration: 0.3 }}
            >
              <path
                d="M17.5 10L11.25 3.75L10.3688 4.63125L15.1063 9.375H2.5V10.625H15.1063L10.3688 15.3687L11.25 16.25L17.5 10Z"
                fill="var(--Primary-02)"
              />
            </motion.svg>
            <motion.svg
              viewBox="0 0 20 20"
              variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
              transition={{ duration: 0.3 }}
            >
              <path
                d="M15.2999 16.4833L9.99994 11.175L4.69993 16.4833L3.5166 15.3L8.82493 10L3.5166 4.7L4.69993 3.51666L9.99994 8.825L15.2999 3.525L16.4749 4.7L11.1749 10L16.4749 15.3L15.2999 16.4833Z"
                fill="var(--Primary-01)"
              />
            </motion.svg>
          </span>
        )}
      </span>

      <motion.div
        className={s.body}
        variants={{
          closed: { height: 0, transition: { duration: 0.5, ease: EASE_IN_OUT } },
          open: { height: "auto", transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
        }}
      >
        <motion.p
          className={s.itemText}
          variants={{
            closed: {},
            open: { transition: { staggerChildren: 0.025, delayChildren: 0.12 } },
          }}
        >
          {text.split(" ").map((w, i) => (
            <span key={i}>
              <motion.span className={s.word} variants={word}>
                {w}
              </motion.span>{" "}
            </span>
          ))}
        </motion.p>
      </motion.div>
    </motion.li>
  );
}

type ListProps = {
  steps: Step[];
  /** Вариант со страницы About: иконка справа и текст m/body */
  withIcon?: boolean;
};

export default function ApproachList({ steps, withIcon = false }: ListProps) {
  const [active, setActive] = useState<number | null>(null);
  // Триггер — сам список: у плашек clip-path, и IntersectionObserver не увидел бы их
  const ref = useRef<HTMLUListElement>(null);
  const shown = useInView(ref, { once: true, amount: 0.3 });

  return (
    <ul ref={ref} className={`${s.list} ${withIcon ? s.withIcon : ""}`}>
      {steps.map((step, i) => (
        <ApproachItem
          key={step.title}
          {...step}
          index={i}
          withIcon={withIcon}
          shown={shown}
          active={active === i}
          onToggle={(open) => setActive((cur) => (open ? i : cur === i ? null : cur))}
        />
      ))}
    </ul>
  );
}
