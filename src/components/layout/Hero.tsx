"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package, Truck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/animation-wrappers";
import { DroppingText, MagneticText } from "@/components/ui/text-animations";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
            <div className="container relative z-10 px-4 text-center">
                <FadeIn delay={0.1}>
                    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                        🚀 Campus Delivery Made Easy
                    </span>
                </FadeIn>

                <div className="mx-auto max-w-4xl min-h-[120px] flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl pb-2 flex flex-col items-center gap-2">
                        <DroppingText
                            text="Anything you need,"
                            className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent"
                            delay={0.2}
                        />
                        <MagneticText
                            text="driven to your dorm."
                            className="text-primary"
                        />
                    </h1>
                </div>

                <FadeIn delay={0.3} className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    Hungry? Need a textbook? Or just moving stuff around?
                    Order from the campus store, library, or canteen and track it in real-time.
                </FadeIn>

                <FadeIn delay={0.4} className="mt-8 flex justify-center gap-4">
                    <Link href="#items-grid">
                        <Button size="lg" className="rounded-full px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                            Browse Items <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/orders">
                        <Button size="lg" variant="outline" className="rounded-full px-8 text-base bg-background/50 backdrop-blur border-primary/20 hover:bg-primary/5">
                            Track Order
                        </Button>
                    </Link>
                </FadeIn>

                <FadeIn delay={0.6} className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
                    {[
                        {
                            icon: Package,
                            title: "Wide Selection",
                            desc: "Books, food, equipment & more.",
                            color: "text-blue-500",
                            bg: "bg-blue-500/10",
                            border: "hover:border-blue-500/50"
                        },
                        {
                            icon: Truck,
                            title: "Fast Delivery",
                            desc: "Optimized routes across campus.",
                            color: "text-green-500",
                            bg: "bg-green-500/10",
                            border: "hover:border-green-500/50"
                        },
                        {
                            icon: Clock,
                            title: "Real-time Tracking",
                            desc: "Know exactly where your order is.",
                            color: "text-orange-500",
                            bg: "bg-orange-500/10",
                            border: "hover:border-orange-500/50"
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className={`flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-background/30 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 ${feature.border}`}
                        >
                            <div className={`h-14 w-14 flex items-center justify-center rounded-xl ${feature.bg} ${feature.color}`}>
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </FadeIn>
            </div>

            {/* Decorative blobs */}
            <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-primary/20 mix-blend-multiply blur-3xl animate-pulse" />
            <div className="absolute top-20 right-1/4 -z-10 h-96 w-96 rounded-full bg-secondary/20 mix-blend-multiply blur-3xl animate-pulse delay-1000" />
        </section>
    );
}
