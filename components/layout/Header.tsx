'use client'
import Image from "next/image";
import BurgerButton from "./BurgerButton";
import BurgerMenu from "./BurgerMenu";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <header className="py-5 fixed top-0 left-0 right-0 z-1 bg-transparent">
            <div className="container  flex justify-between items-center z-11 relative">
                <Image src="/header/logo.svg" alt="logo" width={72} height={13} />
                <BurgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
            <AnimatePresence>
                {isOpen && <BurgerMenu key="burger-menu" />}
            </AnimatePresence>
        </header>
    )
}