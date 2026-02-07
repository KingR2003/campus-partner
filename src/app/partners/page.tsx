"use client";

import { useDeliveryStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Weight, ShieldCheck, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { StaggerList, ScaleHover, slideUp } from "@/components/ui/animation-wrappers";
import { motion } from "framer-motion";

export default function PartnersPage() {
    const { partners, orders, locations } = useDeliveryStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="p-8">Loading...</div>;

    return (
        <div className="container py-8 px-4">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Delivery Partners</h1>

            <StaggerList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {partners.map((partner) => {
                    const currentOrder = partner.currentOrderId ? orders.find(o => o.id === partner.currentOrderId) : null;
                    const currentLocation = locations.find(l => l.id === partner.currentLocationId);

                    return (
                        <motion.div variants={slideUp} key={partner.id}>
                            <ScaleHover className="h-full">
                                <Card className="overflow-hidden h-full flex flex-col border-t-4 border-t-transparent hover:border-t-primary transition-all">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                                            <AvatarImage src={partner.avatar} />
                                            <AvatarFallback>{partner.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{partner.name}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant={partner.available ? 'default' : 'secondary'}
                                                    className={partner.available ? 'bg-green-600 hover:bg-green-700' : ''}>
                                                    {partner.available ? 'AVAILABLE' : 'BUSY'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-2 flex-1">
                                        <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1 bg-secondary/10 p-1.5 rounded text-secondary-foreground font-medium">
                                                <Weight className="h-3 w-3" />
                                                <span>Max: {partner.maxCarryWeightKg}kg</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-secondary/10 p-1.5 rounded text-secondary-foreground font-medium">
                                                <ShieldCheck className="h-3 w-3" />
                                                <span>{partner.canHandleFragile ? 'Fragile OK' : 'No Fragile'}</span>
                                            </div>
                                        </div>

                                        {currentLocation && (
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                                <MapPin className="h-3 w-3" />
                                                <span>Current: {currentLocation.name}</span>
                                            </div>
                                        )}

                                        {!partner.available && currentOrder ? (
                                            <div className="bg-muted p-3 rounded-md text-sm mt-auto">
                                                <p className="font-medium mb-1">Delivering Order:</p>
                                                <p className="text-muted-foreground truncate">#{currentOrder.id}</p>
                                            </div>
                                        ) : (
                                            <div className="p-3 text-sm text-muted-foreground italic mt-auto">
                                                Waiting for assignments...
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </ScaleHover>
                        </motion.div>
                    );
                })}
            </StaggerList>
        </div>
    );
}
