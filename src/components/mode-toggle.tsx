"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative flex h-9 w-16 cursor-pointer items-center rounded-full border-2 border-primary bg-background shadow-md p-1 transition-all hover:scale-105 hover:bg-background/80"
        >
            <span className="sr-only">Toggle theme</span>
            <div className={`absolute left-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-sm transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}>
                {theme === "dark" ? (
                    <Moon className="h-4 w-4 text-blue-500" />
                ) : (
                    <Sun className="h-4 w-4 text-orange-500" />
                )}
            </div>
            <div className="flex w-full justify-between px-1.5">
                <div className="h-4 w-4" /> {/* Spacer */}
                <div className="h-4 w-4" /> {/* Spacer */}
            </div>
        </div>
    )
}
