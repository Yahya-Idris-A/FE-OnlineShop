'use client';

import { useState } from 'react';
import { ShieldCheck, Star, Users, Box, MapPin, Plus, Check } from 'lucide-react';

interface MerchantProfileProps {
  merchant: {
    name: string;
    slug: string;
    avatar: string;
    banner: string;
    rating: number;
    followers: string;
    productCount: number;
    location: string;
    isOfficial: boolean;
  };
}

export default function MerchantProfile({ merchant }: MerchantProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="relative mb-6">
      
      {/* Immersive Banner Background */}
      <div className="absolute inset-0 h-[200px] w-full overflow-hidden">
        <img src={merchant.banner} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/100 via-zinc-50/80 to-transparent" />
      </div>

      <div className="relative z-10 pt-16 px-4 tablet:px-8 max-w-5xl mx-auto">
        
        {/* Floating Glass Card */}
        <div className="p-6 tablet:p-8 rounded-3xl bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] flex flex-col tablet:flex-row gap-6 items-center tablet:items-start text-center tablet:text-left">
          
          {/* Avatar */}
          <div className="w-24 h-24 tablet:w-32 tablet:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 bg-white">
            <img src={merchant.avatar} alt={merchant.name} className="w-full h-full object-contain" />
          </div>

          <div className="flex-1 space-y-4 w-full">
            
            {/* Nama & Badge */}
            <div>
              <div className="flex items-center justify-center tablet:justify-start gap-2 mb-1">
                <h1 className="text-2xl tablet:text-3xl font-bold text-zinc-900 tracking-tight">{merchant.name}</h1>
                {merchant.isOfficial && (
                  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Official</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-zinc-500 flex items-center justify-center tablet:justify-start gap-1">
                <MapPin className="w-4 h-4" /> {merchant.location}
              </p>
            </div>

            {/* Statistik (Rating, Followers, Products) */}
            <div className="flex items-center justify-center tablet:justify-start gap-6 py-4 border-y border-zinc-200/50">
              <div className="text-center tablet:text-left">
                <div className="flex items-center gap-1 text-zinc-900 font-bold"><Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {merchant.rating}</div>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mt-0.5">Rating</p>
              </div>
              <div className="w-px h-8 bg-zinc-200/50" />
              <div className="text-center tablet:text-left">
                <div className="flex items-center gap-1 text-zinc-900 font-bold"><Users className="w-4 h-4 text-blue-500" /> {merchant.followers}</div>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mt-0.5">Followers</p>
              </div>
              <div className="w-px h-8 bg-zinc-200/50" />
              <div className="text-center tablet:text-left">
                <div className="flex items-center gap-1 text-zinc-900 font-bold"><Box className="w-4 h-4 text-purple-500" /> {merchant.productCount}</div>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mt-0.5">Products</p>
              </div>
            </div>

          </div>

          {/* Tombol Follow */}
          <div className="shrink-0 w-full tablet:w-auto mt-2 tablet:mt-0">
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`w-full tablet:w-auto px-8 py-3.5 rounded-full font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
                isFollowing 
                  ? 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50' 
                  : 'bg-zinc-900 text-white shadow-zinc-900/20 hover:bg-zinc-800'
              }`}
            >
              {isFollowing ? <><Check className="w-4 h-4" /> Following</> : <><Plus className="w-4 h-4" /> Follow Store</>}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}