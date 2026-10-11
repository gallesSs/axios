"use client";

import {
    AnimatePresence,
    easeInOut,
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
    type Variants,
} from "motion/react";
import { useLenis } from "lenis/react";
import { useLayoutEffect, useRef, useState } from "react";
import ScrambleText from "../motion/ScrambleText";
import WhyCollage from "./WhyCollage";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "../motion/config";
import s from "./Why.module.css";

const SLIDES = [
    {
        title: "DESIGN AROUND LIFE",
        text: "We design modular homes around the way people actually live. Every space is considered for comfort, function and the everyday moments that make a house feel personal.\nThe layout follows your routines rather than forcing you to adapt. Open spaces create room to gather, while private areas provide a sense of calm. Natural light and considered proportions shape the atmosphere of every room. Materials are selected to feel timeless and tactile. The result is a home that feels personal from the very beginning.",
    },
    {
        title: "ADAPT TO PLACE",
        text: "Every AXIS home responds to its surroundings. Modules can be configured to work with different landscapes, views, climates and ways of living.\nThe site becomes part of the architecture. Each configuration considers the direction of light, existing landscape and surrounding views. Homes can sit quietly within nature or create a stronger architectural presence. Different modules allow the system to respond to different conditions. No two sites need to be approached in exactly the same way.",
    },
    {
        title: "BUILT WITH INTENTION",
        text: "We combine precise modular construction with thoughtful architectural details. Every element is designed to work together as part of one considered system.\nPrecision begins long before a module reaches the site. Each component is developed with a clear purpose and relationship to the whole. Controlled production helps maintain consistency and quality. Honest materials give every home a distinctive character. Construction becomes a balance between efficiency, craftsmanship and architectural expression.",
    },
    {
        title: "READY TO EVOLVE",
        text: "Life changes, and a home should be able to change with it. Our modular system allows spaces to adapt, expand and evolve as your needs grow.\nA home does not have to remain fixed forever. Additional modules can create new possibilities as your lifestyle changes. Spaces can be reconfigured for work, family, guests or moments of retreat. The system allows the architecture to respond without losing its original character. What begins as one configuration can become something entirely different over time.",
    },
];

const LAST = SLIDES.length - 1;
const TITLE = "WHY AXIS";
/** Страховка: если анимация текста по какой-то причине не завершилась, скролл всё равно разблокируется */
const UNLOCK_FALLBACK = 2500;

/** Слова новой текстовки поднимаются из размытия с лёгким наклоном, старые улетают вверх и тают */
const word: Variants = {
    hidden: { opacity: 0, y: "70%", rotate: 4, filter: "blur(8px)" },
    shown: {
        opacity: 1,
        y: "0%",
        rotate: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: EASE_OUT_EXPO },
    },
    exit: {
        opacity: 0,
        y: "-60%",
        filter: "blur(6px)",
        transition: { duration: 0.35, ease: "easeIn" },
    },
};

/** Таб гаснет до 0.4 (как в макете) по мере удаления от текущей позиции скролла */
function Tab({ title, index, pos }: { title: string; index: number; pos: MotionValue<number> }) {
    const opacity = useTransform(pos, (v) => 1 - 0.6 * Math.min(1, Math.abs(v - index)));
    return (
        <motion.li className={s.tab} style={{ opacity }}>
            {title}
        </motion.li>
    );
}

function Slide({ text, onShown }: { text: string; onShown: () => void }) {
    return (
        <motion.p
            className={s.slide}
            initial="hidden"
            animate="shown"
            exit="exit"
            onAnimationComplete={(def) => def === "shown" && onShown()}
            variants={{
                shown: { transition: { staggerChildren: 0.006 } },
                exit: { transition: { staggerChildren: 0.002 } },
            }}
        >
            {text.split("\n").map((line, l) => (
                <span key={l} className={s.line}>
                    {line.split(" ").map((w, i) => (
                        <span key={i}>
                            <motion.span className={s.word} variants={word}>
                                {w}
                            </motion.span>{" "}
                        </span>
                    ))}
                </span>
            ))}
        </motion.p>
    );
}

export default function Why() {
    const trackRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLUListElement>(null);
    const [offsets, setOffsets] = useState<number[]>(() => SLIDES.map(() => 0));
    const [active, setActive] = useState(0);
    const lenis = useLenis();
    const activeRef = useRef(0);
    // Пока идёт переход (доводка скролла + проявление текста) — скролл заблокирован
    const lock = useRef({ on: false, scrolled: false, shown: false, timer: 0 });

    // Прогресс всей «дорожки»: пока секция закреплена, скролл двигает слайдер
    const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
    // Центр отрезка i-го слайда (progress = (i + 0.5) / N) соответствует позиции i
    const pos = useSpring(
        useTransform(scrollYProgress, (p) => Math.min(LAST, Math.max(0, p * SLIDES.length - 0.5))),
        {
        stiffness: 120,
        damping: 24,
        mass: 0.4,
        },
    );

    // Строка табов едет так, чтобы текущий таб вставал к левому краю
    const x = useTransform(pos, (v) => {
        const i = Math.min(Math.floor(v), LAST - 1);
        const t = v - i;
        return -(offsets[i] + (offsets[i + 1] - offsets[i]) * t);
    });
    const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
    const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

    // Интро (как в референсе): секция закреплена, центральное фото-«окно» среди коллажа
    // раскрывается в полный кадр, остальные фото и подписи разлетаются от центра
    const outerRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const narrow = useRef(false);
    const { scrollYProgress: intro } = useScroll({ target: introRef, offset: ["start start", "end end"] });
    const { scrollYProgress: enter } = useScroll({ target: outerRef, offset: ["start end", "start start"] });
    const introEased = useTransform(intro, [0, 0.9], [0, 1], { ease: easeInOut, clamp: true });
    const clipPath = useTransform(introEased, (t) => {
        const k = 1 - t;
        // Стартовое «окно» — размером с фото коллажа: на мобилке шире, на десктопе уже
        const [iy, ix] = narrow.current ? [33, 22] : [31, 39];
        return `inset(${iy * k}% ${ix * k}% ${iy * k}% ${ix * k}%)`;
    });
    const frameScale = useTransform(introEased, [0, 1], [1.5, 1]);
    // Контент проявляется, когда кадр почти раскрылся
    const [revealed, setRevealed] = useState(false);
    useMotionValueEvent(intro, "change", (p) => {
        if (p > 0.8 && !revealed) setRevealed(true);
    });

    useLayoutEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        const sync = () => (narrow.current = mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    const unlock = () => {
        const l = lock.current;
        if (!l.on || !l.scrolled || !l.shown) return;
        l.on = false;
        window.clearTimeout(l.timer);
        lenis?.start();
    };

    /** Переход строго на соседний слайд: доводим скролл до его отрезка и держим, пока текст не проявится */
    const goTo = (step: number) => {
        const track = trackRef.current;
        if (!track) return;
        activeRef.current = step;
        setActive(step);

        const l = lock.current;
        l.on = true;
        l.scrolled = !lenis;
        l.shown = false;
        window.clearTimeout(l.timer);
        l.timer = window.setTimeout(() => {
            l.scrolled = l.shown = true;
            unlock();
        }, UNLOCK_FALLBACK);

        if (!lenis) return;
        const top = track.getBoundingClientRect().top + window.scrollY;
        const distance = track.offsetHeight - window.innerHeight;
        lenis.stop();
        lenis.scrollTo(top + (distance * (step + 0.5)) / SLIDES.length, {
            force: true,
            lock: true,
            duration: 0.8,
            onComplete: () => {
                l.scrolled = true;
                unlock();
            },
        });
    };

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        if (lock.current.on) return;
        const next = Math.min(LAST, Math.max(0, Math.floor(p * SLIDES.length)));
        const cur = activeRef.current;
        if (next !== cur) goTo(cur + Math.sign(next - cur));
    });

    // Ушли со страницы посреди перехода — не оставляем скролл заблокированным
    useLayoutEffect(() => {
        const l = lock.current;
        return () => {
            window.clearTimeout(l.timer);
            if (l.on) lenis?.start();
        };
    }, [lenis]);

    useLayoutEffect(() => {
        const row = tabsRef.current;
        if (!row) return;
        const measure = () => {
            const items = Array.from(row.children) as HTMLElement[];
            const start = items[0]?.offsetLeft ?? 0;
            setOffsets(items.map((el) => el.offsetLeft - start));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(row);
        return () => ro.disconnect();
    }, []);

    return (
        <div ref={outerRef} className={s.track}>
            {/* Отрезки дорожки: интро (раскрытие) и слайдер — по ним считается прогресс */}
            <div ref={introRef} className={s.introRange} aria-hidden="true" />
            <div ref={trackRef} className={s.slidesRange} aria-hidden="true" />

            <div className={s.wrapper}>
                <WhyCollage intro={introEased} enter={enter} />

                <motion.div
                    className={s.stage}
                    style={{ clipPath }}
                    initial="hidden"
                    animate={revealed ? "shown" : "hidden"}
                >
                    <motion.div className={s.frame} style={{ scale: frameScale }} aria-hidden="true">
                        <motion.div className={s.bg} style={{ scale: bgScale, y: bgY }} />
                    </motion.div>

                    {/* Тонкие линии сетки из макета прорисовываются сверху вниз */}
                    {[0, 1].map((i) => (
                        <motion.span
                            key={i}
                            className={`${s.gridLine} ${i ? s.gridLineRight : s.gridLineLeft}`}
                            aria-hidden="true"
                            variants={{
                                hidden: { scaleY: 0 },
                                shown: { scaleY: 1, transition: { duration: 1.6, ease: EASE_IN_OUT, delay: 0.2 + i * 0.15 } },
                            }}
                        />
                    ))}

                    <div className={`container ${s.container}`}>
                        <div className={s.top}>
                            <div className={s.headingWrapper}>
                                <h2 className={s.title} aria-label={TITLE}>
                                    {Array.from(TITLE).map((ch, i) => (
                                        <span key={i} className={s.mask} aria-hidden="true">
                                            <motion.span
                                                className={s.letter}
                                                variants={{
                                                    hidden: { y: "110%" },
                                                    shown: {
                                                        y: "0%",
                                                        transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: i * 0.04 },
                                                    },
                                                }}
                                            >
                                                {ch}
                                            </motion.span>
                                        </span>
                                    ))}
                                </h2>
                                {revealed && <ScrambleText text="/03" className={s.tag} />}
                            </div>
                            <motion.p
                                className={s.text}
                                variants={{
                                    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
                                    shown: {
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)",
                                        transition: { duration: 1, ease: EASE_OUT_EXPO, delay: 0.25 },
                                    },
                                }}
                            >
                                AXIS brings together modular architecture, thoughtful design and precise construction to create homes that feel considered from the first configuration to the smallest detail. Every decision is made to create a balance between the place, the people and the way they live.
                            </motion.p>
                        </div>
                        <div className={s.content}>
                            <motion.div
                                className={s.row}
                                variants={{
                                    hidden: { opacity: 0, x: "12%" },
                                    shown: { opacity: 1, x: "0%", transition: { duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.35 } },
                                }}
                            >
                                <motion.ul ref={tabsRef} className={s.tabs} style={{ x }}>
                                    {SLIDES.map((slide, i) => (
                                        <Tab key={slide.title} title={slide.title} index={i} pos={pos} />
                                    ))}
                                </motion.ul>
                                <motion.span
                                    className={s.progress}
                                    style={{ scaleX: scrollYProgress }}
                                    aria-hidden="true"
                                />
                            </motion.div>

                            <motion.div
                                className={s.slides}
                                variants={{
                                    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                                    shown: {
                                        opacity: 1,
                                        y: 0,
                                        filter: "blur(0px)",
                                        transition: { duration: 1, ease: EASE_OUT_EXPO, delay: 0.55 },
                                    },
                                }}
                            >
                                {/* Невидимые копии задают высоту по самому длинному тексту — без скачков */}
                                {SLIDES.map((slide) => (
                                    <p key={slide.title} className={`${s.slide} ${s.sizer}`} aria-hidden="true">
                                        {slide.text}
                                    </p>
                                ))}
                                <AnimatePresence initial={false}>
                                    <Slide
                                        key={active}
                                        text={SLIDES[active].text}
                                        onShown={() => {
                                            lock.current.shown = true;
                                            unlock();
                                        }}
                                    />
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
