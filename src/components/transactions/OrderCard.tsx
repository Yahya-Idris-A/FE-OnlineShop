'use client';

import { useState } from 'react';
import { Store, Package, Star, X } from 'lucide-react';

export type OrderStatus = 'unpaid' | 'processing' | 'shipped' | 'completed' | 'cancelled';
export interface OrderItem { id: string; name: string; qty: number; price: number; imageUrl: string; }
export interface OrderData { id: string; invoice: string; date: string; status: OrderStatus; merchantName: string; totalAmount: number; items: OrderItem[]; }

interface OrderCardProps { order: OrderData; }

export default function OrderCard({ order }: OrderCardProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'unpaid': return { label: 'Unpaid', color: 'text-rose-600 bg-rose-50 border-rose-100', action: 'Pay Now' };
      case 'processing': return { label: 'Processing', color: 'text-amber-600 bg-amber-50 border-amber-100', action: 'Track Order' };
      case 'shipped': return { label: 'Shipped', color: 'text-blue-600 bg-blue-50 border-blue-100', action: 'Track Order' };
      // UBAH ACTION JADI WRITE REVIEW UNTUK COMPLETED
      case 'completed': return { label: 'Completed', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', action: 'Write Review' };
      case 'cancelled': return { label: 'Cancelled', color: 'text-zinc-500 bg-zinc-100 border-zinc-200', action: 'Details' };
      default: return { label: 'Unknown', color: 'text-zinc-500 bg-zinc-100 border-zinc-200', action: 'Details' };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const firstItem = order.items[0];

  const handleActionClick = () => {
    if (order.status === 'completed') setIsReviewOpen(true);
    // Logika lain misal push ke /payment jika unpaid
  };

  const submitReview = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsReviewOpen(false);
      alert('Review submitted! Thanks bro!'); // Nanti ganti Toast
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-2xl border border-white bg-white/60 backdrop-blur-xl shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/50 bg-white/40">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-zinc-500" />
            <span className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">{order.merchantName}</span>
          </div>
          <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border ${statusConfig.color}`}>
            {statusConfig.label}
          </div>
        </div>

        <div className="p-4 flex gap-4">
          <div className="w-16 h-16 shrink-0 rounded-xl bg-zinc-100 overflow-hidden border border-zinc-200/50">
            <img src={firstItem.imageUrl} alt={firstItem.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col flex-1 justify-center">
            <h3 className="text-sm font-medium text-zinc-900 line-clamp-1">{firstItem.name}</h3>
            <p className="text-xs text-zinc-500 mt-1">{firstItem.qty} x {formatPrice(firstItem.price)}</p>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-zinc-200/50 bg-white/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">Total Order</p>
            <p className="text-sm font-bold text-zinc-900">{formatPrice(order.totalAmount)}</p>
          </div>
          
          {/* Tombol Aksi (Bisa mentrigger Modal Review) */}
          <button 
            onClick={handleActionClick}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 shadow-sm ${
              order.status === 'unpaid' ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
              : order.status === 'completed' ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20' // Warna spesial buat Review
              : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            {statusConfig.action}
          </button>
        </div>
      </div>

      {/* REVIEW MODAL (Glassmorphism) */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm bg-white/90 backdrop-blur-3xl border border-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-zinc-900">Rate Product</h3>
              <button onClick={() => setIsReviewOpen(false)} className="p-1 text-zinc-400 hover:text-zinc-900 bg-zinc-100 rounded-full"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex items-center gap-3 mb-6 p-3 bg-white/50 border border-white rounded-2xl">
              <img src={firstItem.imageUrl} className="w-12 h-12 rounded-lg object-cover" />
              <p className="text-xs font-medium text-zinc-700 line-clamp-2">{firstItem.name}</p>
            </div>

            {/* Star Rating Interaktif */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star 
                    className={`w-10 h-10 ${
                      star <= (hoverRating || rating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-zinc-300'
                    } transition-colors duration-200`} 
                  />
                </button>
              ))}
            </div>

            <textarea 
              rows={3} 
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell others about your experience..."
              className="w-full px-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 resize-none mb-6"
            />

            <button 
              onClick={submitReview}
              disabled={rating === 0 || isSubmitting}
              className="w-full py-3.5 bg-zinc-900 text-white rounded-2xl font-semibold shadow-md hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}