'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import WishlistButton from './WishlistButton';
import Link from 'next/link';

// Mendefinisikan tipe data yang dibutuhkan oleh komponen card ini
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  merchantName: string;
}

export default function ProductCard({ id, name, price, imageUrl, merchantName }: ProductCardProps) {
  // Mengambil fungsi addToCart dari Zustand store
  const addToCart = useCartStore((state) => state.addToCart);

  // Fungsi untuk memformat angka menjadi Rupiah
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

return (
    // Card Container: Kaca putih dengan bayangan sangat halus
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white/40 backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] group">
      <Link href={`/product/${id}`} className="absolute inset-0 z-10" aria-label={`View details of ${name}`} />
      {/* Background gambar dibuat abu-abu muda bersih */}
      {/* Area Gambar */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        
        {/* 2. Tambahkan Tombol Wishlist di pojok kanan atas gambar. 
            z-[25] agar posisinya di atas tag Link (z-10) biar bisa diklik */}
        <div className="absolute top-2 left-2 z-25">
          <WishlistButton 
            product={{ id, name, price, merchantName, imageUrl }} 
            className="p-1.5" // Padding diperkecil sedikit khusus untuk card
          />
        </div>

        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 p-3.5">
        {/* Teks warna gelap agar kontras dengan background kaca putih */}
        <span className="text-[10px] font-semibold tracking-wide text-zinc-500 mb-1 line-clamp-1 uppercase">
          {merchantName}
        </span>
        
        <h3 className="text-sm font-medium leading-snug text-zinc-900 line-clamp-2 mb-3">
          {name}
        </h3>
        
        <div className="mt-auto flex items-center justify-between gap-2">
          
          {/* Tambahkan truncate. title={...} ditambahkan agar user bisa hover untuk melihat harga lengkapnya */}
          <span 
            className="text-sm font-bold text-zinc-900 truncate" 
            title={formatPrice(price)}
          >
            {formatPrice(price)}
          </span>
          
          {/* Tambahkan shrink-0 agar ukuran tombol terkunci dan tidak tertekan oleh teks harga */}
          <button
            onClick={() => addToCart({ id, name, price, qty: 1, merchantName })}
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white border border-zinc-100 shadow-sm text-zinc-700 hover:bg-zinc-900 hover:text-white transition-all active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>

        </div>
      </div>
    </div>
  );
}