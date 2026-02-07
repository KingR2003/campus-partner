"use client";

import { useDeliveryStore } from "@/lib/store";
import { Item } from "@/types";
import { ItemCard } from "@/components/ItemCard";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { slideUp } from "@/components/ui/animation-wrappers";
import { Hero } from "@/components/layout/Hero";
import { StaggerList, FadeIn, ScaleHover } from "@/components/ui/animation-wrappers";
import { motion } from "framer-motion";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { IndianRupee } from "lucide-react"; // Imported icon

export default function Home() {
  // Add a small client-side hydration fix
  const { items, locations, createOrder } = useDeliveryStore();
  const [mounted, setMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [dropLocationId, setDropLocationId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRequest = (item: Item) => {
    setSelectedItem(item);
    setDropLocationId("");
    setQuantity(1); // Reset quantity
  };

  const confirmRequest = () => {
    if (selectedItem && dropLocationId) {
      createOrder(selectedItem.id, dropLocationId, quantity);

      // Animations
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#d946ef', '#06b6d4']
      });

      toast.success(`Order placed for ${selectedItem.name}!`, {
        description: "Checking for nearby partners...",
        duration: 4000,
      });

      setSelectedItem(null);
      setTimeout(() => router.push("/orders"), 1500); // Small delay to see confetti
    }
  };

  if (!mounted) return <div className="p-8 text-center animate-pulse">Loading amazing things...</div>;

  return (
    <div>
      <Hero />

      <div id="items-grid" className="container py-8 px-4">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Campus Items</h2>
          <p className="text-muted-foreground">
            Browse items available for immediate delivery to your location.
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const loc = locations.find(l => l.id === item.pickupLocationId);
            return (
              <motion.div variants={slideUp} key={item.id}>
                <ScaleHover className="h-full">
                  <ItemCard item={item} locationName={loc?.name} onRequest={handleRequest} />
                </ScaleHover>
              </motion.div>
            );
          })}
        </StaggerList>

        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Request Delivery</DialogTitle>
              <DialogDescription>
                Where should we deliver your <strong>{selectedItem?.name}</strong>?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Drop Location
                </Label>
                <div className="col-span-3">
                  <Select value={dropLocationId} onValueChange={setDropLocationId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {loc.name} <span className="text-xs text-muted-foreground">({loc.type})</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <div className="col-span-3">
                  <Select
                    value={quantity.toString()}
                    onValueChange={(v) => setQuantity(parseInt(v))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedItem && (
                <div className="flex justify-between items-center pt-2 border-t mt-2">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-xl text-green-600 flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {((selectedItem.price || 0) * quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {selectedItem?.fragile && (
                <div className="bg-orange-50 text-orange-800 p-3 rounded-md text-sm flex items-center gap-2 border border-orange-200">
                  <span>⚠️ This item is <strong>Fragile</strong>. We will assign a certified handler.</span>
                </div>
              )}
              {selectedItem && selectedItem.weightKg > 2.0 && (
                <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm flex items-center gap-2 border border-blue-200">
                  <span>⚖️ Heavy Item ({selectedItem.weightKg}kg). Checking partner capacity...</span>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" onClick={confirmRequest} disabled={!dropLocationId} className="w-full sm:w-auto">
                Confirm Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
