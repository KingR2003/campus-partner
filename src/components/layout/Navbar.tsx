"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Truck, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const routes = [
        {
            href: "/",
            label: "Items",
            icon: Package,
            active: pathname === "/",
        },
        {
            href: "/orders",
            label: "Orders / Tracking",
            icon: Truck,
            active: pathname === "/orders",
        },
        {
            href: "/partners",
            label: "Partners",
            icon: Users,
            active: pathname === "/partners",
        },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 shadow-sm dark:border-white/5"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="container relative flex h-16 items-center place-content-between px-4">
                <div className="mr-8 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <motion.div
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                            className="bg-primary/10 p-1.5 rounded-lg text-primary"
                        >
                            <Truck className="h-6 w-6" />
                        </motion.div>
                        <span className="hidden font-bold sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 text-2xl tracking-tight">
                            Campus Grabber
                        </span>
                    </Link>
                    <div className="flex gap-1">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className="relative group px-4 py-2"
                            >
                                <motion.span
                                    className={`relative z-10 text-sm font-medium transition-colors ${route.active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {route.label}
                                </motion.span>
                                {route.active && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute inset-0 bg-primary/10 rounded-full -z-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-primary rounded-t-full shadow-[0_-2px_8px_var(--color-primary)]" />
                                    </motion.div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="flex flex-1 items-center justify-between md:hidden">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                            <Truck className="h-6 w-6" />
                        </div>
                        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 text-xl">Campus Grabber</span>
                    </Link>
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0 border-r-primary/10">
                            <SheetTitle className="mb-4 text-left font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 text-xl">Campus Grabber</SheetTitle>
                            <div className="flex flex-col space-y-1">
                                <AnimatePresence>
                                    {isOpen && routes.map((route, index) => (
                                        <motion.div
                                            key={route.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={route.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 text-lg font-medium transition-all rounded-r-full ${route.active
                                                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                    }`}
                                            >
                                                <route.icon className="h-5 w-5" />
                                                {route.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center justify-end space-x-2">
                    <ModeToggle />
                    {/* Placeholders for auth or notifications if needed */}
                </div>
            </div >
        </motion.nav >
    );
}
