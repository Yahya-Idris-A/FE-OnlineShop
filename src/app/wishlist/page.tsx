'use client';

import { useWishlistStore } from '@/store/useWishlistStore';
import ProductCard from '@/components/product/ProductCard';
import { HeartCrack } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  return (
    <div className="pt-4 tablet:pt-8 px-2 tablet:px-0 min-h-[70vh]">
      <h1 className="text-xl tablet:text-2xl font-bold text-zinc-900 mb-6 tracking-tight">
        My Wishlist
      </h1>

      {items.length === 0 ? (
        // UI Jika Wishlist Kosong
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-white/60 backdrop-blur-xl border border-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <HeartCrack className="w-8 h-8 text-zinc-300" />
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">No favorites yet</h2>
          <p className="text-zinc-500 mb-6 text-sm max-w-xs">
            Save items you love to your wishlist and review them anytime.
          </p>
          <Link href="/" className="px-6 py-2.5 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-all active:scale-95 text-sm">
            Explore Products
          </Link>
        </div>
      ) : (
        // Grid Produk (Memakai ProductCard yang sudah ada)
        <div className="grid grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-5 gap-3 tablet:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              merchantName={product.merchantName}
            />
          ))}
        </div>
      )}
    </div>
  );
}