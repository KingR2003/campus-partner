"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Text that drops in character by character with a staggered delay.
 */
export function DroppingText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
    const letters = text.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100
            }
        },
        hidden: {
            opacity: 0,
            y: -20,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <motion.span
            className={`inline-block whitespace-nowrap ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index} className="inline-block">
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.span>
    );
}

/**
 * Text where characters are magnetically attracted to the cursor position.
 */
export function MagneticText({ text, className = "" }: { text: string; className?: string }) {
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.8 // Wait for the first line to finish dropping
            }
        }
    };

    return (
        <motion.div
            className={`flex flex-wrap justify-center ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {text.split(" ").map((word, i) => (
                <div key={i} className="flex whitespace-nowrap">
                    {word.split("").map((char, j) => (
                        <MagneticChar key={j}>{char}</MagneticChar>
                    ))}
                    <span className="inline-block">&nbsp;</span>
                </div>
            ))}
        </motion.div>
    );
}

function MagneticChar({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLSpanElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));

        // Only activate if close enough (magnetic field)
        if (distance < 100) {
            const moveX = (clientX - centerX) * 0.3; // Attraction strength
            const moveY = (clientY - centerY) * 0.3;
            x.set(moveX);
            y.set(moveY);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Entry animation variants
    const dropIn = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <motion.span
            variants={dropIn}
            className="inline-block"
        >
            <motion.span
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x: mouseX, y: mouseY }}
                className="inline-block cursor-default relative z-10 font-extrabold"
            >
                {children}
            </motion.span>
        </motion.span>
    );
}
