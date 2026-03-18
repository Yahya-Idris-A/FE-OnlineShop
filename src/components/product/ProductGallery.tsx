'use client';

import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Gambar Utama */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] group">
          <img 
            src={mainImage} 
            alt={productName} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          />
          {/* Tombol Expand */}
          <button 
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-4 right-4 p-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-zinc-700 hover:text-zinc-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                  mainImage === img ? 'border-zinc-900 shadow-md' : 'border-white bg-white/40 hover:border-zinc-300'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal (Dark Glassmorphism) */}
      {isFullscreen && (
        <div 
          // Ubah bg jadi putih transparan dengan blur kuat
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-3xl transition-opacity p-4 tablet:p-10"
          // Fitur baru: Klik area kosong buat nutup modal
          onClick={() => setIsFullscreen(false)} 
        >
          {/* Tombol Close */}
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Biar event kliknya nggak bentrok
              setIsFullscreen(false);
            }}
            className="absolute top-6 right-6 p-3 bg-zinc-900/10 hover:bg-zinc-900/20 text-zinc-900 rounded-full backdrop-blur-md transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Gambar Fullscreen */}
          <img 
            src={mainImage} 
            alt={productName} 
            // e.stopPropagation() agar kalau ngeklik gambarnya, modalnya nggak ikut ketutup
            onClick={(e) => e.stopPropagation()} 
            className="relative z-10 max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300 border border-white/50" 
          />
        </div>
      )}
    </>
  );
}