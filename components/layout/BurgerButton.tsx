"use client";

import styles from "./BurgerButton.module.css";

interface BurgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

/** Три линии; в открытом состоянии крайние складываются в крестик, средняя схлопывается. */
export default function BurgerButton({ isOpen, onClick }: BurgerButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${styles.button} ${isOpen ? styles.open : ""}`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
        >
            <span className={styles.line} />
            <span className={styles.line} />
            <span className={styles.line} />
        </button>
    );
}
