"use client";

import { motion } from "framer-motion";

export function FloatingShapes() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Top Left - Large Purple */}
            <motion.div
                className="absolute -top-[10%] -left-[10%] w-64 h-64 md:w-96 md:h-96 bg-purple-500/40 rounded-full blur-3xl opacity-60 animate-blob dark:bg-purple-600/30"
                animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Top Right - Large Blue */}
            <motion.div
                className="absolute top-[5%] -right-[5%] w-60 h-60 md:w-80 md:h-80 bg-blue-500/40 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000 dark:bg-blue-600/30"
                animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Bottom Left - Cyan */}
            <motion.div
                className="absolute -bottom-[10%] left-[10%] w-60 h-60 md:w-80 md:h-80 bg-cyan-500/40 rounded-full blur-3xl opacity-60 animate-blob animation-delay-4000 dark:bg-cyan-600/30"
                animate={{ x: [0, 50, 0], y: [0, -100, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Center Right - Orange Accent */}
            <motion.div
                className="absolute top-[40%] right-[10%] w-48 h-48 md:w-64 md:h-64 bg-orange-400/30 rounded-full blur-3xl opacity-50 animate-blob animation-delay-6000 dark:bg-orange-500/20"
                animate={{ x: [0, -50, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 22, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Center Left - Pink Accent */}
            <motion.div
                className="absolute top-[30%] left-[5%] w-48 h-48 md:w-72 md:h-72 bg-pink-400/30 rounded-full blur-3xl opacity-50 animate-blob animation-delay-8000 dark:bg-pink-500/20"
                animate={{ x: [0, 50, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 28, repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Bottom Right - Violet */}
            <motion.div
                className="absolute -bottom-[5%] -right-[10%] w-64 h-64 md:w-96 md:h-96 bg-violet-500/40 rounded-full blur-3xl opacity-60 animate-blob animation-delay-1000 dark:bg-violet-600/30"
                animate={{ x: [0, -60, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 32, repeat: Infinity, repeatType: "reverse" }}
            />
        </div>
    );
}
