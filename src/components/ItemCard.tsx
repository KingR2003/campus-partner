"use client";

import { Item } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Weight, AlertTriangle, IndianRupee } from "lucide-react";

interface ItemCardProps {
    item: Item;
    locationName?: string;
    onRequest: (item: Item) => void;
}

export function ItemCard({ item, locationName, onRequest }: ItemCardProps) {
    return (
        <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group border-muted hover:border-primary/50 relative">
            <div className="relative h-48 w-full bg-muted overflow-hidden">
                {item.image ? (
                    <div className="relative w-full h-full">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                        <span className="text-4xl font-bold opacity-20">{item.name[0]}</span>
                    </div>
                )}

                <div className="absolute top-2 right-2 flex gap-1 flex-col items-end z-10">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur shadow-sm">
                        {item.category}
                    </Badge>
                    {item.fragile && (
                        <Badge variant="destructive" className="flex gap-1 items-center shadow-sm">
                            <AlertTriangle className="h-3 w-3" /> Fragile
                        </Badge>
                    )}
                </div>

                {/* Price Tag - INR */}
                <div className="absolute bottom-2 right-2 z-10">
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700 shadow-md text-base px-3 py-1">
                        {item.price && item.price > 0 ? (
                            <span className="flex items-center">
                                <IndianRupee className="h-3 w-3 mr-0.5" />
                                {item.price.toLocaleString('en-IN')}
                            </span>
                        ) : (
                            "Free"
                        )}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-2 relative">
                <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{item.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {locationName || "Unknown Location"}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded-md">
                        <Weight className="h-4 w-4" />
                        <span>{item.weightKg} kg</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-2">
                <Button
                    className="w-full relative overflow-hidden transition-all active:scale-95"
                    onClick={() => onRequest(item)}
                    disabled={!item.available}
                    variant={item.available ? "default" : "secondary"}
                >
                    {item.available ? (
                        <>
                            <span className="relative z-10">Request Delivery</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </>
                    ) : "Unavailable"}
                </Button>
            </CardFooter>
        </Card>
    );
}
