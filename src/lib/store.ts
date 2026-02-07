import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Item, Partner, Order, OrderStatus, Location } from '@/types';

// Data Source
const LOCATIONS: Location[] = [
    { id: "loc_store", name: "Campus Store", type: "Store" },
    { id: "loc_library", name: "Central Library", type: "Library" },
    { id: "loc_lab", name: "Lab Block", type: "Academic" },
    { id: "loc_admin", name: "Admin Office", type: "Administrative" },
    { id: "loc_sports", name: "Sports Complex", type: "Recreation" },
    { id: "loc_hostel", name: "Hostel Area", type: "Residential" },
    { id: "loc_canteen", name: "Main Canteen", type: "Food & Beverage" }
];

// Curated Images from Unsplash
const ITEMS: Item[] = [
    {
        id: "item_001",
        name: "A4 Notebook Bundle",
        category: "Stationery",
        pickupLocationId: "loc_store",
        weightKg: 0.6,
        fragile: false,
        maxQuantity: 5,
        available: true,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNW6zfQvQMCwh0iogIZAYZ3Vb6ywB36ViiBA&s", // User provided Notebook image
        price: 450 // ₹
    },
    {
        id: "item_002",
        name: "Engineering Drawing Kit",
        category: "Stationery",
        pickupLocationId: "loc_store",
        weightKg: 1.1,
        fragile: true,
        maxQuantity: 2,
        available: true,
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80", // Drafting tools
        price: 1250
    },
    {
        id: "item_003",
        name: "Data Structures Textbook",
        category: "Books",
        pickupLocationId: "loc_library",
        weightKg: 1.4,
        fragile: false,
        maxQuantity: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80", // Textbook
        price: 550
    },
    {
        id: "item_004",
        name: "Lab Coat",
        category: "Lab Equipment",
        pickupLocationId: "loc_lab",
        weightKg: 0.9,
        fragile: false,
        maxQuantity: 1,
        available: true,
        image: "https://media.istockphoto.com/id/184109823/photo/smiling-african-ethnicity-female-wearing-lapcoat-hands-in-pockets.jpg?s=612x612&w=0&k=20&c=RyTG9Mj2TxD3rj-wRIiqQk-L34xcd14FGr2sngPJF9Q=", // User provided Lab coat image
        price: 850
    },
    {
        id: "item_005",
        name: "Arduino Starter Kit",
        category: "Electronics",
        pickupLocationId: "loc_lab",
        weightKg: 0.8,
        fragile: true,
        maxQuantity: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80", // Arduino/Circuit
        price: 3500
    },
    {
        id: "item_006",
        name: "Hostel Parcel",
        category: "Parcel",
        pickupLocationId: "loc_admin",
        weightKg: 2.5,
        fragile: false,
        maxQuantity: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80", // Boxes
        price: 200
    },
    {
        id: "item_007",
        name: "Scientific Calculator",
        category: "Electronics",
        pickupLocationId: "loc_store",
        weightKg: 0.3,
        fragile: true,
        maxQuantity: 2,
        available: true,
        image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80", // Calculator, kept same
        price: 950
    },
    {
        id: "item_008",
        name: "Veg Thali",
        category: "Food",
        pickupLocationId: "loc_canteen",
        weightKg: 0.7,
        fragile: true,
        maxQuantity: 10,
        available: true,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", // Indian Food
        price: 120
    },
    {
        id: "item_009",
        name: "Sports Equipment Bag",
        category: "Sports",
        pickupLocationId: "loc_sports",
        weightKg: 3.2,
        fragile: false,
        maxQuantity: 1,
        available: true,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", // Verified Gym Bag/Backpack
        price: 1500
    },
    {
        id: "item_010",
        name: "Project Report Printout",
        category: "Documents",
        pickupLocationId: "loc_admin",
        weightKg: 0.4,
        fragile: true,
        maxQuantity: 3,
        available: true,
        image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&w=800&q=80", // Papers
        price: 50
    }
];

const INITIAL_PARTNERS: Partner[] = [
    { id: "dp_001", name: "Aarav", currentLocationId: "loc_hostel", maxCarryWeightKg: 4.0, canHandleFragile: true, available: true, avatar: "https://i.pravatar.cc/150?u=Aarav" },
    { id: "dp_002", name: "Meera", currentLocationId: "loc_library", maxCarryWeightKg: 3.0, canHandleFragile: false, available: true, avatar: "https://i.pravatar.cc/150?u=Meera" },
    { id: "dp_003", name: "Rohan", currentLocationId: "loc_lab", maxCarryWeightKg: 5.0, canHandleFragile: true, available: true, avatar: "https://i.pravatar.cc/150?img=68" }, // Specific male image
    { id: "dp_004", name: "Isha", currentLocationId: "loc_store", maxCarryWeightKg: 2.5, canHandleFragile: true, available: true, avatar: "https://i.pravatar.cc/150?u=Isha" }
];

interface DeliveryState {
    locations: Location[];
    items: Item[];
    partners: Partner[];
    orders: Order[];

    // Actions
    createOrder: (itemId: string, dropLocationId: string, quantity: number) => void;
    assignPartner: (orderId: string) => void;
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    resetStore: () => void;
}

export const useDeliveryStore = create<DeliveryState>()(
    persist(
        (set, get) => ({
            locations: LOCATIONS,
            items: ITEMS,
            partners: INITIAL_PARTNERS,
            orders: [],

            // ... (rest of methods unchanged, but for brevity in replace I need context or target the specific block)
            createOrder: (itemId, dropLocationId, quantity) => {
                const item = get().items.find((i) => i.id === itemId);
                if (!item) return;

                const newOrder: Order = {
                    id: `ord_${Date.now()}`,
                    itemId,
                    status: 'REQUESTED',
                    pickupLocationId: item.pickupLocationId,
                    dropLocationId: dropLocationId,
                    quantity: quantity, // Saved quantity
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                set((state) => ({ orders: [newOrder, ...state.orders] }));

                // Trigger assignment
                setTimeout(() => {
                    get().assignPartner(newOrder.id);
                }, 1500);
            },

            assignPartner: (orderId) => {
                const { partners, orders, items } = get();
                const orderIndex = orders.findIndex((o) => o.id === orderId);
                if (orderIndex === -1) return;

                const order = orders[orderIndex];
                const item = items.find(i => i.id === order.itemId);

                if (!item) return;

                // Enhanced Logic: Find a partner that matches criteria
                const eligiblePartner = partners.find((p) => {
                    if (!p.available) return false;
                    if (p.maxCarryWeightKg < item.weightKg) return false;
                    if (item.fragile && !p.canHandleFragile) return false;
                    return true;
                });

                if (eligiblePartner) {
                    const updatedPartner = { ...eligiblePartner, available: false, currentOrderId: orderId };

                    const updatedPartners = partners.map((p) =>
                        p.id === eligiblePartner.id ? updatedPartner : p
                    );

                    const updatedOrders = [...orders];
                    updatedOrders[orderIndex] = {
                        ...updatedOrders[orderIndex],
                        partnerId: eligiblePartner.id,
                        status: 'ASSIGNED',
                        updatedAt: new Date().toISOString(),
                    };

                    set({ partners: updatedPartners, orders: updatedOrders });
                } else {
                    console.warn("No suitable partner found for item", item.name);
                    // In a real app, we might set status to 'QUEUED' or 'FAILED'
                }
            },

            updateOrderStatus: (orderId, status) => {
                const { orders, partners } = get();
                const orderIndex = orders.findIndex((o) => o.id === orderId);
                if (orderIndex === -1) return;

                const previousStatus = orders[orderIndex].status;

                const updatedOrders = [...orders];
                updatedOrders[orderIndex] = {
                    ...updatedOrders[orderIndex],
                    status,
                    updatedAt: new Date().toISOString(),
                };

                let updatedPartners = partners;

                // If order is delivered, free up the partner
                if (status === 'DELIVERED' && previousStatus !== 'DELIVERED') {
                    const partnerId = orders[orderIndex].partnerId;
                    if (partnerId) {
                        updatedPartners = partners.map(p =>
                            p.id === partnerId ? { ...p, available: true, currentOrderId: undefined } : p
                        );
                    }
                }

                set({ orders: updatedOrders, partners: updatedPartners });
            },

            resetStore: () => {
                set({ items: ITEMS, partners: INITIAL_PARTNERS, orders: [], locations: LOCATIONS });
            }
        }),
        {
            name: 'delivery-store-v10-notebook-img', // Bumped version to v10
        }
    )
);
