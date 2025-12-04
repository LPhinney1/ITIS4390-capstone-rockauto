"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    const handleClick = () => {
        if (typeof window !== "undefined" && window.history.length > 2) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="mb-6 text-black hover:text-gray-700"
            aria-label="Back"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className="h-12 w-12"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="38" y1="25" x2="14" y2="25" />
                <polyline points="22 17 14 25 22 33" />
            </svg>
        </button>
    );
}
