'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';

export default function Header() {
  // Mengambil state jumlah barang di keranjang dari Zustand store
  const cartCount = useCartStore((state) => state.getCartCount());

  const router = useRouter(); // Inisialisasi router

  // Fungsi untuk handle submit pencarian
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('searchQuery')?.toString();
    
    if (searchQuery && searchQuery.trim() !== '') {
      // Arahkan ke halaman search dengan query parameter
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-3 tablet:top-0 z-50 mx-3 tablet:mx-0 transition-all duration-300">
      
      {/* Container Kaca. Di mobile bentuknya rounded-full, di desktop rounded-none */}
      <div className="w-full bg-white/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 tablet:border-x-0 tablet:border-t-0 tablet:border-b shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[2rem] tablet:rounded-none">
        
        <div className="flex items-center justify-between px-3 py-2.5 tablet:p-4 max-w-7xl mx-auto">
          
          <Link href="/" className="hidden tablet:block font-bold text-xl mr-8 text-zinc-900 tracking-tight">
            AsyuraCommerce
          </Link>
          
          {/* Class 'group' ditambahkan agar icon di dalamnya bisa bereaksi kalau input lagi diklik */}
          <div className="relative flex-1 max-w-2xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-zinc-900 transition-colors z-10" />
            
            {/* Bungkus input dengan form */}
            <form onSubmit={handleSearch} className="w-full">
              <input 
                name="searchQuery" // Tambahkan name untuk diambil oleh FormData
                type="text" 
                placeholder="Search products or merchants..." 
                className="w-full pl-11 pr-4 py-2 tablet:py-2.5 bg-white/50 border border-white/60 focus:bg-white/80 rounded-full outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all text-sm text-zinc-900 placeholder:text-zinc-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </form>
          </div>

          <div className="hidden tablet:flex items-center gap-2 ml-8">
            {/* Efek hover diubah jadi bg-black/5 dan text-zinc-900 biar makin elegan dan kontras */}
            <Link href="/cart" className="relative p-2 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-black/5 transition-all">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/profile" className="p-2 rounded-full text-zinc-600 hover:text-zinc-900 hover:bg-black/5 transition-all">
              <User className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}