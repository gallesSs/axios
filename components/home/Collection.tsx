"use client";

import { useState, type CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Parallax } from "swiper/modules";
import { motion, type Variants } from "motion/react";
import { EASE_OUT_EXPO } from "@/components/motion/config";
import RollButton from "@/components/motion/RollButton";
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

/** С этой ширины слайдер работает в десктопном режиме: активная карточка крупнее и по центру */
const DESKTOP = 1024;
/** На десктопе по макету активна третья карточка — по две видны с каждой стороны */
const DESKTOP_INITIAL = 2;

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
  const [active, setActive] = useState(0);

  return (
    <div className={`container ${s.wrapper}`}>
      <div className={s.heading}>
        <ScrambleText text="/03" className={s.tag} />
        <ScatterLetters text="the COLLECTION" className={s.title} />
      </div>

      {/* Обёртка-триггер: карточки появляются каскадом, когда слайдер попадает в кадр */}
      <motion.div
        className={s.slider}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}>
      {/* Десктоп: резерв места под подпись активной карточки — все подписи в одной ячейке,
          высота = самая длинная. Подписи в слайдах абсолютные, и смена слайда не двигает секцию */}
      <div className={s.bodySizer} aria-hidden="true">
        {ITEMS.map((item) => (
          <div key={item.title} className={s.cardBody}>
            <p className={s.cardTitle}>{item.title}</p>
            <p className={s.cardText}>{item.text}</p>
          </div>
        ))}
      </div>
      <Swiper
        className={s.swiper}
        // Индекс активной карточки — для расчёта сдвига ленты на десктопе (см. CSS)
        style={{ "--active": active } as CSSProperties}
        modules={[Parallax, Keyboard, A11y]}
        parallax
        grabCursor
        keyboard
        speed={900}
        // Ширина/высота ленты меняются вместе с карточками; ResizeObserver Swiper'а на это
        // делает мгновенный пересчёт и обрывает анимацию — слушаем только ресайз окна
        resizeObserver={false}
        slidesPerView={1.12}
        spaceBetween={12}
        breakpoints={{
          768: { slidesPerView: 2.2, spaceBetween: 16 },
          // Карточки разной ширины, и активная меняет размер на лету — Swiper такую ленту
          // не посчитает, поэтому сдвиг задаётся в CSS от --active, а Swiper только ведёт индекс
          [DESKTOP]: {
            slidesPerView: "auto",
            spaceBetween: 20,
            centeredSlides: true,
            slideToClickedSlide: true,
            virtualTranslate: true,
            // Лента не следует за пальцем/мышью (сдвиг в CSS), свайп лишь переключает слайд
            grabCursor: false,
          },
        }}
        onSwiper={(sw) => {
          if (window.innerWidth >= DESKTOP) sw.slideTo(DESKTOP_INITIAL, 0);
          setActive(sw.activeIndex);
        }}
        onSlideChange={(sw) => setActive(sw.activeIndex)}>
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

      <RollButton
        className={s.button}
        text="VIEW all HOUSEs"
        icon={
          <svg
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
        }
      />
    </div>
  );
}

export default Collection;
