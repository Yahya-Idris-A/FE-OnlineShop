'use client';

import { Heart } from 'lucide-react';
import { useWishlistStore, WishlistItem } from '@/store/useWishlistStore';
import { useEffect, useState } from 'react';

interface WishlistButtonProps {
  product: WishlistItem;
  className?: string;
}

export default function WishlistButton({ product, className = "p-2.5" }: WishlistButtonProps) {
  // State untuk mengakali Hydration Error
  const [isMounted, setIsMounted] = useState(false);
  
  // Pantau array items secara langsung agar reaktif (langsung berubah warna)
  const items = useWishlistStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Jika belum mount (masih di render server), tampilkan tombol abu-abu polos
  if (!isMounted) {
    return (
      <div className={`flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 z-20 ${className}`}>
        <Heart className="w-5 h-5 text-zinc-500" />
      </div>
    );
  }

  // Cek status wishlist dari array items
  const isWished = items.some((i) => i.id === product.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        toggleWishlist(product);
      }}
      className={`flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white/50 transition-all active:scale-95 z-20 hover:bg-white ${className}`}
      aria-label="Toggle Wishlist"
    >
      <Heart 
        className={`w-5 h-5 transition-all duration-300 ${
          isWished 
            ? 'fill-pink-500 text-pink-500 scale-110' 
            : 'text-zinc-500 hover:text-pink-400'
        }`} 
      />
    </button>
  );
}