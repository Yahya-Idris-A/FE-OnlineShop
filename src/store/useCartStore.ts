import { create } from 'zustand';

// Tipe data disesuaikan dengan response backend kamu nanti (MerchantCartGroup)
type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  merchantName: string;
};

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (item) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        items: state.items.map((i) => 
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      };
    }
    return { items: [...state.items, { ...item, qty: 1 }] };
  }),
  getCartTotal: () => get().items.reduce((total, item) => total + (item.price * item.qty), 0),
  getCartCount: () => get().items.reduce((count, item) => count + item.qty, 0),
}));