'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

// Dummy Etalase (Kategori Toko)
const ETALASE = ['All Products', 'Promo ⚡', 'New Arrivals', 'Keyboards', 'Mice & Accessories', 'Audio'];

// Dummy Kategori Universal (Dari Superadmin)
const UNIVERSAL_CATEGORIES = ['Electronics', 'Computers', 'Gaming', 'Office Supplies'];

// Dummy Produk
const MOCK_PRODUCTS = Array.from({ length: 8 }).map((_, i) => ({
  id: `prod-${i}`,
  name: `Mechanical Keyboard Pro V${i + 1} Wireless Edition`,
  price: 1350000 + (i * 150000),
  merchantName: 'Tech Gear Official',
  imageUrl: `https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80`,
}));

export default function MerchantProducts() {
  const [activeEtalase, setActiveEtalase] = useState('All Products');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeUniversalCat, setActiveUniversalCat] = useState('All');

  return (
    <div className="relative pb-24 tablet:pb-8">
      
      {/* STICKY HEADER: Etalase & Filter Button */}
      {/* z-30 dan sticky agar menempel saat discroll ke bawah */}
      <div className="sticky top-0 tablet:top-16 z-30 bg-zinc-50/80 backdrop-blur-2xl border-b border-zinc-200/50 py-3 mb-6 px-4 tablet:px-8 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          
          {/* Tombol Filter Advanced (Kategori Universal dll) */}
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden tablet:block">Filters</span>
          </button>

          <div className="w-px h-6 bg-zinc-300 mx-1 shrink-0" />

          {/* Horizontal Scrollable Etalase (Pills) */}
          <div className="flex overflow-x-auto custom-scrollbar gap-2 pb-1">
            {ETALASE.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveEtalase(tab)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeEtalase === tab 
                    ? 'bg-zinc-900 border-zinc-900 text-white shadow-md' 
                    : 'bg-white/60 border-white text-zinc-600 hover:border-zinc-300 hover:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-4 tablet:px-8">
        <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-3 tablet:gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {MOCK_PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* BOTTOM SHEET MODAL: ADVANCED FILTERS */}
      {/* ========================================== */}
      <div className={`fixed inset-0 z-[100] flex items-end tablet:items-center justify-center transition-all duration-300 ${isFilterOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
        
        <div className={`relative w-full tablet:max-w-md bg-white/90 backdrop-blur-3xl tablet:border border-white/60 rounded-t-3xl tablet:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] transition-all duration-300 ease-out ${isFilterOpen ? 'translate-y-0 scale-100' : 'translate-y-full tablet:translate-y-10 tablet:scale-95'}`}>
          
          <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-zinc-200/50">
            <h2 className="text-lg font-bold text-zinc-900">Filter Products</h2>
            <button onClick={() => setIsFilterOpen(false)} className="p-2 -mr-2 text-zinc-400 hover:text-zinc-900 bg-zinc-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-6 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
            
            {/* Universal Category (Dari Superadmin) */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Global Category</h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveUniversalCat('All')} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${activeUniversalCat === 'All' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-200 text-zinc-600'}`}>All</button>
                {UNIVERSAL_CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveUniversalCat(cat)} className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${activeUniversalCat === cat ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-200 text-zinc-600'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Price Range</h3>
              <div className="flex items-center gap-3">
                <input type="number" placeholder="Min" className="w-full px-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 text-sm" />
                <div className="w-4 h-px bg-zinc-300 shrink-0" />
                <input type="number" placeholder="Max" className="w-full px-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 text-sm" />
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Sort By</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Latest', 'Top Sales', 'Price: Low to High', 'Price: High to Low'].map(sort => (
                  <button key={sort} className="px-4 py-3 bg-white/50 border border-white/60 rounded-xl text-sm font-semibold text-zinc-700 hover:bg-white text-left shadow-sm">
                    {sort}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="shrink-0 p-4 border-t border-zinc-200/50 bg-white/40 backdrop-blur-xl rounded-b-3xl pb-safe flex gap-3">
            <button className="px-6 py-3.5 bg-white border border-zinc-200 text-zinc-900 rounded-2xl font-semibold shadow-sm hover:bg-zinc-50 active:scale-95">Reset</button>
            <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-3.5 bg-zinc-900 text-white rounded-2xl font-semibold shadow-md hover:bg-zinc-800 active:scale-95">Apply Filters</button>
          </div>

        </div>
      </div>

    </div>
  );
}