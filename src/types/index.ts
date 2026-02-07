export type ItemCategory = string; // Flexible based on input

export interface Location {
  id: string;
  name: string;
  type: string;
}

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  pickupLocationId: string;
  weightKg: number;
  fragile: boolean;
  maxQuantity: number;
  available: boolean;
  image: string; // Added for UI
  price?: number;
}

export interface Partner {
  id: string;
  name: string;
  currentLocationId: string;
  maxCarryWeightKg: number;
  canHandleFragile: boolean;
  available: boolean; // This corresponds to 'available' in JSON working as status
  currentOrderId?: string; // Track which order they are doing
  avatar: string; // UI addition
}

export type OrderStatus = 'REQUESTED' | 'ASSIGNED' | 'PICKED_UP' | 'DELIVERED';

export interface Order {
  id: string;
  itemId: string;
  partnerId?: string;
  status: OrderStatus;
  pickupLocationId: string;
  dropLocationId: string;
  quantity: number; // Added quantity
  createdAt: string;
  updatedAt: string;
}
