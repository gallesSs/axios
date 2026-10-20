"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { EASE_OUT_EXPO } from "@/components/motion/config";
import RollButton from "@/components/motion/RollButton";
import LineReveal from "@/components/motion/LineReveal";
import s from "./Form.module.css";

const LOCATIONS = ["Denmark", "Sweden", "Norway", "Germany", "Other Europe", "Outside Europe"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "firstName" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

/** Поля проявляются каскадом: линия прочерчивается слева, подпись поднимается */
const field: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: i * 0.08 },
    }),
};

const line: Variants = {
    hidden: { scaleX: 0 },
    visible: (i: number) => ({
        scaleX: 1,
        transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay: i * 0.08 },
    }),
};

function validate(data: FormData): Errors {
    const errors: Errors = {};
    const get = (key: string) => String(data.get(key) ?? "").trim();
    if (!get("firstName")) errors.firstName = "Required";
    if (!get("email")) errors.email = "Required";
    else if (!EMAIL_RE.test(get("email"))) errors.email = "Invalid email";
    if (!get("message")) errors.message = "Required";
    return errors;
}

const arrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M12.25 7L7.875 2.625L7.25813 3.24187L10.5744 6.5625L1.75 6.5625V7.4375L10.5744 7.4375L7.25813 10.7581L7.875 11.375L12.25 7Z" fill="currentColor" />
    </svg>
);

/**
 * Демо-форма: бэкенда нет — после клиентской валидации показываем «спасибо».
 * Мобилка (макет 375): поля 16px, отступ сверху/снизу 12, между полями 16, кнопка 44 на всю ширину.
 * Десктоп (макет 1920): поля 24px, отступы 16, между полями 24, кнопка 290×66.
 */
export default function Form() {
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
    const ref = useRef<HTMLDivElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status !== "idle") return;
        const form = e.currentTarget;
        const next = validate(new FormData(form));
        setErrors(next);
        const invalid = Object.keys(next)[0];
        if (invalid) {
            form.querySelector<HTMLElement>(`[name="${invalid}"]`)?.focus();
            return;
        }
        // Высота фиксируется, чтобы при замене формы на «спасибо» страница не прыгала
        if (ref.current) ref.current.style.minHeight = `${ref.current.offsetHeight}px`;
        setStatus("sending");
        window.setTimeout(() => setStatus("sent"), 900);
    };

    // Ошибка снимается, как только поле начали исправлять
    const clear = (name: Field) => () => {
        if (!errors[name]) return;
        setErrors((prev) => {
            const next = { ...prev };
            delete next[name];
            return next;
        });
    };

    const fieldProps = (name: Field) => ({
        id: `contact-${name}`,
        name,
        onInput: clear(name),
        "aria-invalid": errors[name] ? true : undefined,
        "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    });

    const error = (name: Field) => (
        <AnimatePresence>
            {errors[name] && (
                <motion.span
                    key={errors[name]}
                    id={`contact-${name}-error`}
                    className={s.error}
                    initial={{ opacity: 0, y: "60%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "-60%" }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                >
                    {errors[name]}
                </motion.span>
            )}
        </AnimatePresence>
    );

    const animated = (className: string, index: number) => ({
        className,
        custom: index,
        variants: field,
    });

    return (
        <div ref={ref} className={s.wrapper}>
            <AnimatePresence mode="wait" initial={false}>
                {status !== "sent" ? (
                    <motion.form
                        key="form"
                        className={s.form}
                        noValidate
                        onSubmit={onSubmit}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        exit={{ opacity: 0, y: -24, filter: "blur(6px)", transition: { duration: 0.5, ease: EASE_OUT_EXPO } }}
                        aria-busy={status === "sending"}
                    >
                        <div className={s.fields}>
                            <div className={s.row}>
                                <motion.div {...animated(s.field, 0)} data-invalid={errors.firstName ? "" : undefined}>
                                    <label htmlFor="contact-firstName" className={s.visuallyHidden}>First name</label>
                                    <input {...fieldProps("firstName")} className={s.input} type="text" placeholder="First name" autoComplete="given-name" maxLength={80} required />
                                    {error("firstName")}
                                    <motion.span className={s.line} custom={0} variants={line} aria-hidden="true" />
                                </motion.div>
                                <motion.div {...animated(s.field, 1)}>
                                    <label htmlFor="contact-lastName" className={s.visuallyHidden}>Last name</label>
                                    <input id="contact-lastName" name="lastName" className={s.input} type="text" placeholder="Last name" autoComplete="family-name" maxLength={80} />
                                    <motion.span className={s.line} custom={1} variants={line} aria-hidden="true" />
                                </motion.div>
                            </div>
                            <motion.div {...animated(s.field, 2)} data-invalid={errors.email ? "" : undefined}>
                                <label htmlFor="contact-email" className={s.visuallyHidden}>Email</label>
                                <input {...fieldProps("email")} className={s.input} type="email" inputMode="email" placeholder="Email" autoComplete="email" maxLength={120} required />
                                {error("email")}
                                <motion.span className={s.line} custom={2} variants={line} aria-hidden="true" />
                            </motion.div>
                            <motion.div {...animated(`${s.field} ${s.selectField}`, 3)}>
                                <label htmlFor="contact-location" className={s.visuallyHidden}>Project location</label>
                                <select id="contact-location" name="location" className={`${s.input} ${s.select}`} defaultValue="">
                                    <option value="" disabled hidden>Project location</option>
                                    {LOCATIONS.map((loc) => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                                <svg className={s.chevron} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M12.9987 5.3265L8.00027 10.1984L3.00183 5.3265C2.91255 5.23955 2.79286 5.19089 2.66824 5.19089C2.54361 5.19089 2.42392 5.23955 2.33464 5.3265C2.29117 5.36873 2.25662 5.41926 2.23302 5.47508C2.20942 5.5309 2.19727 5.59089 2.19727 5.6515C2.19727 5.71211 2.20942 5.7721 2.23302 5.82792C2.25662 5.88375 2.29117 5.93427 2.33464 5.9765L7.65183 11.1593C7.74515 11.25 7.87015 11.3007 8.00027 11.3007C8.13039 11.3007 8.25538 11.25 8.3487 11.1593L13.6659 5.9765C13.7096 5.93424 13.7444 5.88363 13.7681 5.82766C13.7918 5.77169 13.8041 5.71151 13.8041 5.65072C13.8041 5.58992 13.7918 5.52975 13.7681 5.47378C13.7444 5.41781 13.7096 5.36719 13.6659 5.32494C13.5766 5.23799 13.4569 5.18933 13.3323 5.18933C13.2077 5.18933 13.088 5.23799 12.9987 5.32494V5.3265Z" fill="currentColor" />
                                </svg>
                                <motion.span className={s.line} custom={3} variants={line} aria-hidden="true" />
                            </motion.div>
                            <motion.div {...animated(s.field, 4)} data-invalid={errors.message ? "" : undefined}>
                                <label htmlFor="contact-message" className={s.visuallyHidden}>Message</label>
                                <textarea
                                    {...fieldProps("message")}
                                    className={`${s.input} ${s.textarea}`}
                                    placeholder="Message"
                                    rows={1}
                                    maxLength={2000}
                                    required
                                    // Растёт по содержимому: в макете поле однострочное
                                    onChange={(e) => {
                                        const el = e.currentTarget;
                                        el.style.height = "auto";
                                        el.style.height = `${el.scrollHeight}px`;
                                    }}
                                />
                                {error("message")}
                                <motion.span className={s.line} custom={4} variants={line} aria-hidden="true" />
                            </motion.div>
                        </div>
                        <RollButton
                            type="submit"
                            className={s.btn}
                            text={status === "sending" ? "SENDING" : "SUBMIT"}
                            icon={arrow}
                        />
                    </motion.form>
                ) : (
                    <motion.div
                        key="sent"
                        className={s.sent}
                        role="status"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className={s.sentTitle}>
                            <LineReveal onMount>THANK YOU.</LineReveal>
                            <LineReveal onMount delay={0.08}>WE’LL BE IN TOUCH.</LineReveal>
                        </p>
                        <motion.p
                            className={s.sentText}
                            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.3 }}
                        >
                            Our team usually replies within two working days.
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
