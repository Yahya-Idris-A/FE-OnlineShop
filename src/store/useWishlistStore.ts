import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  merchantName: string;
  imageUrl: string;
};

interface WishlistStore {
  items: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      // Fungsi untuk menambah jika belum ada, atau menghapus jika sudah ada
      toggleWishlist: (item) => set((state) => {
        const exists = state.items.some((i) => i.id === item.id);
        if (exists) {
          return { items: state.items.filter((i) => i.id !== item.id) };
        }
        return { items: [...state.items, item] };
      }),
      
      // Cek apakah item ada di wishlist (untuk menentukan warna tombol love)
      isInWishlist: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: 'wishlist-storage', // Key di localStorage
    }
  )
);