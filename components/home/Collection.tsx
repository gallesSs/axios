"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Keyboard, Parallax } from "swiper/modules";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { EASE_OUT_EXPO } from "@/components/motion/config";
import ScatterLetters from "@/components/motion/ScatterLetters";
import ScrambleText from "@/components/motion/ScrambleText";
import "swiper/css";
import s from "./Collection.module.css";

const ITEMS = [
  {
    img: "/home/collection/card1.jpg",
    title: "Mountain House",
    text: "A dark timber volume set against a raw mountain landscape, opening the living spaces toward distant views.",
  },
  {
    img: "/home/collection/card2.jpg",
    title: "Pool House",
    text: "A low concrete residence shaped around water, light and privacy. Open interiors extend toward the reflecting pool, creating a seamless connection between architecture and landscape.",
  },
  {
    img: "/home/collection/card3.jpg",
    title: "Rock House",
    text: "A low, sheltered residence embedded in the landscape, built around calm interiors, water and mountain views.",
  },
  {
    img: "/home/collection/card4.jpg",
    title: "Coastal House",
    text: "A concrete structure carved into the rocky coastline, where framed views and warm interiors meet the sea.",
  },
  {
    img: "/home/collection/card5.jpg",
    title: "Alpine House",
    text: "A low, sheltered residence embedded in the landscape, built around calm interiors, water and mountain views.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** Маска карточки поднимается снизу «шторкой», каскадом по слайдам */
const cardMedia: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: (i: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.3, ease: EASE_OUT_EXPO, delay: i * 0.12 },
  }),
};

const cardZoom: Variants = {
  hidden: { scale: 1.4 },
  visible: (i: number) => ({
    scale: 1,
    transition: { duration: 1.8, ease: EASE_OUT_EXPO, delay: i * 0.12 },
  }),
};

const cardText: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.35 + i * 0.12 },
  }),
};

function Collection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  return (
    <div className={`container ${s.wrapper}`}>
      <div className={s.heading}>
        <ScrambleText text="/03" className={s.tag} />
        <ScatterLetters text="the COLLECTION" className={s.title} />
      </div>

      {/* Обёртка-триггер: карточки появляются каскадом, когда слайдер попадает в кадр */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <Swiper
        className={s.swiper}
        modules={[Parallax, Keyboard, A11y]}
        parallax
        grabCursor
        keyboard
        speed={900}
        slidesPerView={1.12}
        spaceBetween={12}
        breakpoints={{
          768: { slidesPerView: 2.2, spaceBetween: 16 },
          1200: { slidesPerView: 3.2, spaceBetween: 20 },
        }}
        onSwiper={(sw) => (swiperRef.current = sw)}
        onSlideChange={(sw) => setActive(sw.activeIndex)}
        onProgress={(_, progress) => {
          // Прогресс-бар двигаем напрямую, без ре-рендера на каждый кадр
          if (barRef.current) {
            const p = Math.min(Math.max(progress, 0), 1);
            barRef.current.style.transform = `scaleX(${0.2 + p * 0.8})`;
          }
        }}>
        {ITEMS.map((item, i) => (
          <SwiperSlide key={item.title} className={s.card}>
            <motion.div className={s.media} custom={i} variants={cardMedia}>
              {/* Отдельный слой под масштаб появления: transform картинки занят параллаксом Swiper */}
              <motion.div className={s.mediaInner} custom={i} variants={cardZoom}>
                {/* Картинка внутри маски уплывает и чуть увеличивается при свайпе */}
                <img
                  src={item.img}
                  alt={item.title}
                  data-swiper-parallax="30%"
                  data-swiper-parallax-scale="1.15"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
            <div
              className={s.cardBody}
              data-swiper-parallax="-40"
              data-swiper-parallax-opacity="0.2">
              <motion.h3 className={s.cardTitle} custom={i} variants={cardText}>
                {item.title}
              </motion.h3>
              <motion.p className={s.cardText} custom={i + 0.5} variants={cardText}>
                {item.text}
              </motion.p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </motion.div>

      {/* <div className={s.controls}>
        <div className={s.counter} aria-live="polite">
          <span className={s.counterWindow}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={active}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}>
                {pad(active + 1)}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className={s.counterTotal}>/ {pad(ITEMS.length)}</span>
        </div>

        <span className={s.progress}>
          <span ref={barRef} className={s.progressBar} />
        </span>

        <div className={s.arrows}>
          <button
            type="button"
            className={s.arrow}
            aria-label="Previous project"
            onClick={() => swiperRef.current?.slidePrev()}>
            ←
          </button>
          <button
            type="button"
            className={s.arrow}
            aria-label="Next project"
            onClick={() => swiperRef.current?.slideNext()}>
            →
          </button>
        </div>
      </div> */}

      {/* Кнопка раскрывается от центра в стороны; триггер — обёртка без clip-path */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 1 }}>
      <motion.button
        type="button"
        className={s.button}
        variants={{
          hidden: { clipPath: "inset(0% 50% 0% 50%)" },
          visible: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}>
        <span className={s.buttonLabel}>
          <span className={s.buttonText} data-text="VIEW all HOUSEs">
            VIEW all HOUSEs
          </span>
        </span>
        <span className={s.buttonIcon} aria-hidden="true">
          {[0, 1].map((i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none">
              <path
                d="M10.5 4.375L6.125 0L5.50813 0.616875L8.82438 3.9375L0 3.9375V4.8125L8.82438 4.8125L5.50813 8.13313L6.125 8.75L10.5 4.375Z"
                fill="currentColor"
              />
            </svg>
          ))}
        </span>
      </motion.button>
      </motion.div>
    </div>
  );
}

export default Collection;
