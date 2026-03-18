'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingCart, CreditCard, XCircle } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';

interface ProductActionsProps {
  product: { id: string; name: string; price: number; merchantName: string; imageUrl: string; stock: number; };
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [qty, setQty] = useState(product.stock > 0 ? 1 : 0);
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart({ ...product, qty });
    setQty(1);
    // Nanti tambahkan toast: "Ditambahkan ke keranjang"
  };

  const handleBuyNow = () => {
    // Logika beli langsung: Masukkan ke state khusus checkout atau bypass keranjang
    // Untuk sekarang, kita push ke halaman checkout langsung
    router.push('/checkout');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-60 p-4 pb-8 tablet:p-0 bg-white/90 tablet:bg-transparent backdrop-blur-2xl tablet:backdrop-blur-none border-t border-zinc-200/50 tablet:border-none tablet:static tablet:w-auto shadow-[0_-10px_40px_rgba(0,0,0,0.05)] tablet:shadow-none transition-all">
      
      <div className="max-w-7xl mx-auto flex flex-col tablet:flex-row gap-3">
        
        {isOutOfStock ? (
          <div className="w-full py-3.5 px-4 bg-zinc-100 text-zinc-500 rounded-2xl tablet:rounded-full font-semibold flex items-center justify-center gap-2 border border-zinc-200">
            <XCircle className="w-5 h-5" />
            <span>Out of Stock</span>
          </div>
        ) : (
          <>
            {/* Kontrol Qty (Muncul di Mobile & Desktop) */}
            <div className="flex items-center justify-between tablet:justify-center bg-white/60 tablet:bg-white/40 border border-zinc-200 tablet:border-white rounded-full p-1 shadow-sm tablet:shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] w-full tablet:w-fit shrink-0">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))} 
                className="w-10 h-10 flex justify-center items-center text-zinc-600 hover:bg-white rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed" 
                disabled={qty <= 1} // Disable kalau qty mentok 1
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="w-10 text-center font-semibold text-zinc-900">{qty}</span>
              
              <button 
                onClick={() => setQty(Math.min(product.stock, qty + 1))} 
                className="w-10 h-10 flex justify-center items-center text-zinc-600 hover:bg-white rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={qty >= product.stock} // Disable kalau qty sudah sama dengan batas stok
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons Group */}
            <div className="flex w-full gap-2">
              <button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 tablet:px-8 bg-white border border-zinc-200 text-zinc-900 rounded-2xl tablet:rounded-full font-semibold shadow-sm hover:bg-zinc-50 transition-all active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-sm tablet:text-base">Cart</span>
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 tablet:px-8 bg-zinc-900 text-white rounded-2xl tablet:rounded-full font-semibold shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 transition-all active:scale-95"
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-sm tablet:text-base">Buy Now</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}