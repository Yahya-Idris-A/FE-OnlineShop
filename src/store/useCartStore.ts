import { create } from "zustand";

// Tipe data disesuaikan dengan response backend kamu nanti (MerchantCartGroup)
export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  merchantName: string;
  imageUrl?: string;
  selected?: boolean;
};

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  toggleSelectItem: (id: string) => void;
  removeSelectedItems: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
          ),
        };
      }
      const newItem = {
        ...item,
        imageUrl:
          item.imageUrl ||
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        selected: true,
      };
      return { items: [...state.items, { ...newItem, qty: 1 }] };
    }),

  // Fungsi untuk menambah/mengurangi qty
  updateQty: (id, qty) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, qty: qty } : i)),
    })),

  toggleSelectItem: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, selected: !i.selected } : i,
      ),
    })),

  // Fungsi untuk menghapus barang dari keranjang
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  removeSelectedItems: () =>
    set((state) => ({
      items: state.items.filter((item) => !item.selected),
    })),

  // Hanya menghitung item yang selected === true
  getCartTotal: () =>
    get()
      .items.filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.qty, 0),

  // Hanya menghitung jumlah item yang selected === true
  getCartCount: () =>
    get()
      .items.filter((item) => item.selected)
      .reduce((count, item) => count + item.qty, 0),
}));
