'use client';

import { Store, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

interface MerchantCardProps {
  id: string;
  name: string;
  rating: number;
  location: string;
  imageUrl: string;
}

export default function MerchantCard({ id, name, rating, location, imageUrl }: MerchantCardProps) {
  return (
    <Link href={`/merchant/${id}`} className="block">
      {/* Apple Liquid Glass Style */}
      <div className="flex items-center p-4 rounded-2xl border border-white bg-white/60 backdrop-blur-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] group">
        
        {/* Foto Profil Toko */}
        <div className="w-16 h-16 shrink-0 rounded-full bg-zinc-100 overflow-hidden border border-white shadow-sm">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" loading="lazy" />
        </div>

        {/* Info Toko */}
        <div className="flex flex-col flex-1 ml-4">
          <h3 className="text-base font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Store className="w-3.5 h-3.5" />
              {location}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              {rating}
            </span>
          </div>
        </div>

        {/* Icon Panah */}
        <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-all">
          <ChevronRight className="w-4 h-4" />
        </div>

      </div>
    </Link>
  );
}