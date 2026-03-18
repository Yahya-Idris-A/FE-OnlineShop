'use client';

import { useState } from 'react';
import { Store, Link as LinkIcon, MapPin, ArrowRight } from 'lucide-react';

export default function StoreRegistrationForm() {
  const [storeName, setStoreName] = useState('');
  const [storeSlug, setStoreSlug] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi auto-generate slug dari nama toko
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setStoreName(name);
    // Ubah "Toko Yahya" jadi "toko-yahya"
    setStoreSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulasi hit API registrasi toko ke backend Go
    setTimeout(() => {
      setLoading(false);
      // Nanti setelah sukses, arahkan ke dashboard khusus seller (misal /seller/dashboard)
      alert('Store created successfully! Welcome to Seller Dashboard.');
      window.location.href = '/profile'; 
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-6 tablet:p-8 rounded-3xl bg-white/60 backdrop-blur-3xl backdrop-saturate-150 border border-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
      
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-zinc-900/20 rotate-3">
          <Store className="w-8 h-8 text-white -rotate-3" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Setup Your Store</h1>
        <p className="text-sm text-zinc-500 mt-2">Enter your store details to start selling.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Input Nama Toko */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Store Name</label>
          <div className="relative group">
            <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
            <input
              type="text"
              required
              value={storeName}
              onChange={handleNameChange}
              placeholder="e.g. Asyura Tech Gear"
              className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
            />
          </div>
        </div>

        {/* Input Domain/Slug */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Store Link (URL)</label>
          <div className="relative group flex items-center">
            <div className="absolute left-4 flex items-center gap-1 text-zinc-400">
              <LinkIcon className="w-4 h-4 group-focus-within:text-zinc-900 transition-colors" />
              <span className="text-sm select-none hidden tablet:block">asyura.com/</span>
              <span className="text-sm select-none tablet:hidden">/</span>
            </div>
            <input
              type="text"
              required
              value={storeSlug}
              onChange={(e) => setStoreSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="store-name"
              className="w-full pl-[4.5rem] tablet:pl-[7.5rem] pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm font-mono text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
            />
          </div>
          <p className="text-[10px] text-zinc-500 px-1">This will be your unique store link. Cannot be changed later.</p>
        </div>

        {/* Input Kota/Lokasi (Bisa pakai select dropdown nantinya) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">City / Location</label>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
            <input
              type="text"
              required
              placeholder="e.g. Jakarta Selatan"
              className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !storeName || !storeSlug}
          className="w-full py-4 mt-4 bg-zinc-900 text-white rounded-2xl font-semibold shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 group"
        >
          {loading ? 'Creating Store...' : (
            <>
              Open My Store
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}