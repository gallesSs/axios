"use client";

interface BurgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

const LINE_STYLE = {
    transformBox: "view-box" as const,
    transformOrigin: "0 0",
    transition: "transform 400ms cubic-bezier(0.65, 0, 0.35, 1), opacity 300ms ease",
};

const TOP_LINE_OPEN = "matrix(0.3267, 0.2742, -0.2742, 0.3267, 23.818, -0.2834)";
const BOTTOM_LINE_OPEN = "matrix(0.3267, -0.2742, 0.2742, 0.3267, 17.8044, 13.3194)";

export default function BurgerButton({ isOpen, onClick }: BurgerButtonProps) {

    return (
        <button
            type="button"
            onClick={onClick}
            className="shrink-0 cursor-pointer"
        >
            <svg width="69" height="20" viewBox="0 0 69 20" fill="none" aria-hidden="true">
                <line
                    y1="2"
                    x2="69"
                    y2="2"
                    stroke="white"
                    style={{
                        ...LINE_STYLE,
                        transform: isOpen ? TOP_LINE_OPEN : "none",
                    }}
                />
                <line
                    y1="10"
                    x2="69"
                    y2="10"
                    stroke="white"
                    style={{
                        ...LINE_STYLE,
                        transformOrigin: "center",
                        transform: isOpen ? "scaleX(0)" : "scaleX(1)",
                        opacity: isOpen ? 0 : 1,
                    }}
                />
                <line
                    y1="18"
                    x2="69"
                    y2="18"
                    stroke="white"
                    style={{
                        ...LINE_STYLE,
                        transform: isOpen ? BOTTOM_LINE_OPEN : "none",
                    }}
                />
            </svg>
        </button>
    );
}
