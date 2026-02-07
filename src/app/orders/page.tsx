"use client";

import { useDeliveryStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Truck, Package, AlertTriangle } from "lucide-react";
import { OrderStatus } from "@/types";
import { useEffect, useState } from "react";
import { StaggerList, ScaleHover, slideUp } from "@/components/ui/animation-wrappers";
import { motion } from "framer-motion";

const STATUS_STEPS: OrderStatus[] = ['REQUESTED', 'ASSIGNED', 'PICKED_UP', 'DELIVERED'];

export default function OrdersPage() {
    const { orders, items, partners, locations, updateOrderStatus } = useDeliveryStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="p-8">Loading...</div>;

    if (orders.length === 0) {
        return (
            <div className="container py-12 text-center text-muted-foreground">
                <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h2 className="text-xl font-semibold">No orders yet</h2>
                <p>Go to the Items page to request a delivery!</p>
            </div>
        );
    }

    return (
        <div className="container py-8 px-4">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Your Orders</h1>
            <StaggerList className="space-y-6">
                {orders.map((order) => {
                    const item = items.find((i) => i.id === order.itemId);
                    const partner = partners.find((p) => p.id === order.partnerId);
                    const pickupLoc = locations.find(l => l.id === order.pickupLocationId);
                    const dropLoc = locations.find(l => l.id === order.dropLocationId);
                    const currentStepIndex = STATUS_STEPS.indexOf(order.status);

                    return (
                        <motion.div variants={slideUp} key={order.id}>
                            <Card className="overflow-hidden border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="bg-muted/40 pb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                {item?.name || "Unknown Item"}
                                                {order.quantity > 1 && <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">x{order.quantity}</span>}
                                            </CardTitle>
                                            <CardDescription className="flex gap-2 items-center">
                                                <span>Order ID: <span className="font-mono text-xs">{order.id}</span></span>
                                                {item?.fragile && <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">Fragile</Badge>}
                                            </CardDescription>
                                        </div>
                                        <Badge variant={order.status === 'DELIVERED' ? 'default' : 'secondary'} className="uppercase">
                                            {order.status.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Details */}
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-medium">Pickup</p>
                                                    <p className="text-sm text-muted-foreground">{pickupLoc?.name || order.pickupLocationId}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-medium">Drop-off</p>
                                                    <p className="text-sm text-muted-foreground">{dropLoc?.name || order.dropLocationId}</p>
                                                </div>
                                            </div>
                                            {partner && (
                                                <div className="flex items-start gap-3 bg-secondary/10 p-3 rounded-lg mt-2 border border-secondary/20">
                                                    <Truck className="h-5 w-5 text-secondary-foreground mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium text-secondary-foreground">Delivery Partner</p>
                                                        <p className="text-sm text-foreground">{partner.name}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Stepper Status */}
                                        <div className="relative flex flex-col justify-center pl-4 md:pl-0">
                                            {STATUS_STEPS.map((step, index) => {
                                                const isCompleted = index <= currentStepIndex;
                                                const isCurrent = index === currentStepIndex;

                                                return (
                                                    <div key={step} className="flex gap-4 pb-6 last:pb-0 relative">
                                                        {/* Line */}
                                                        {index !== STATUS_STEPS.length - 1 && (
                                                            <div className={`absolute left-[9px] top-6 bottom-0 w-[2px] ${index < currentStepIndex ? 'bg-primary' : 'bg-muted'}`} />
                                                        )}

                                                        <div className={`z-10 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isCompleted
                                                            ? 'bg-primary border-primary text-primary-foreground'
                                                            : 'bg-background border-muted text-muted-foreground'
                                                            }`}>
                                                            {isCompleted && <CheckCircle2 className="h-3 w-3" />}
                                                        </div>
                                                        <div className={isCurrent ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                                                            <p className="text-sm leading-none uppercase tracking-wide">{step.replace('_', ' ')}</p>
                                                            {isCurrent && (
                                                                step === 'DELIVERED' ? (
                                                                    <span className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                                                                        Delivered Successfully <CheckCircle2 className="h-3 w-3" />
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-xs text-primary animate-pulse">In Progress...</span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </CardContent>
                                {order.status !== 'DELIVERED' && (
                                    <div className="bg-muted/20 p-4 border-t flex justify-end">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const nextIndex = currentStepIndex + 1;
                                                if (nextIndex < STATUS_STEPS.length) {
                                                    updateOrderStatus(order.id, STATUS_STEPS[nextIndex]);
                                                }
                                            }}
                                        >
                                            Simulate: Advance State
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    );
                })}
            </StaggerList>
        </div>
    );
}
