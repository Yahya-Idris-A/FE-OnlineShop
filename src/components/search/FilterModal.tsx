'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = ['Electronics', 'Fashion', 'Home & Living', 'Sports', 'Automotive', 'Beauty', 'Health', 'Toys', 'Food & Beverage'];
const SORT_OPTIONS = ['Most Relevant', 'Newest', 'Lowest Price', 'Highest Price'];

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const [selectedSort, setSelectedSort] = useState('Most Relevant');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    // Wrapper Utama: Mengatur visibility dan opacity keseluruhan modal
    <div 
      className={`fixed inset-0 z-[100] flex items-end tablet:items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      
      {/* Backdrop Kaca Gelap (Bisa diklik untuk menutup modal) */}
      <div 
        className={`absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose} 
      />
      
      {/* Container Modal:
        - max-h-[85vh]: Membatasi tinggi agar tidak bablas keluar layar.
        - flex flex-col: Agar header, body, dan footer bisa diatur susunannya.
        - translate-y: Animasi slide dari bawah (mobile) atau sedikit zoom-in dari tengah (desktop).
      */}
      <div 
        className={`relative w-full tablet:max-w-md bg-white/85 backdrop-blur-3xl tablet:border border-white/60 rounded-t-3xl tablet:rounded-3xl shadow-2xl flex flex-col max-h-[85vh] transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-full tablet:translate-y-10 tablet:scale-95'
        }`}
      >
        
        {/* Header Modal - Posisi Tetap */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-zinc-200/50">
          <h2 className="text-lg font-bold text-zinc-900">Filters</h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Modal - SCROLLABLE AREA (Aman untuk filter buanyak sekalipun) */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
          
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map(sort => (
                <button
                  key={sort}
                  onClick={() => setSelectedSort(sort)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    selectedSort === sort 
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-md' 
                      : 'bg-white/50 border-white text-zinc-600 hover:border-zinc-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    selectedCategories.includes(cat)
                      ? 'bg-zinc-900 border-zinc-900 text-white shadow-md' 
                      : 'bg-white/50 border-white text-zinc-600 hover:border-zinc-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900 mb-3">Price Range (Rp)</h3>
            <div className="flex items-center gap-3">
              <input 
                type="number" 
                placeholder="Minimum"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/50 border border-white focus:bg-white rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all text-sm text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
              <span className="text-zinc-400 font-medium">-</span>
              <input 
                type="number" 
                placeholder="Maximum"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/50 border border-white focus:bg-white rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all text-sm text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
          </div>

          {/* Simulasi area kosong agar terlihat bisa discroll panjang */}
          <div className="h-20 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl text-zinc-400 text-sm">
            More filters space...
          </div>

        </div>

        {/* Footer Modal - Posisi Tetap */}
        <div className="shrink-0 p-4 border-t border-zinc-200/50 bg-white/40 backdrop-blur-xl rounded-b-3xl pb-safe">
          <div className="flex gap-3">
            <button 
              onClick={() => {
                setSelectedCategories([]);
                setMinPrice('');
                setMaxPrice('');
                setSelectedSort('Most Relevant');
              }}
              className="px-6 py-3 rounded-xl font-medium text-zinc-700 bg-white border border-white shadow-sm hover:bg-zinc-50 transition-colors"
            >
              Reset
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-zinc-900 text-white rounded-xl font-medium shadow-md hover:bg-zinc-800 transition-all active:scale-95"
            >
              Apply Filters
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}