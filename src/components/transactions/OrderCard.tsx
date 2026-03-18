'use client';

import { Store, Package } from 'lucide-react';

export type OrderStatus = 'unpaid' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  imageUrl: string;
}

export interface OrderData {
  id: string;
  invoice: string;
  date: string;
  status: OrderStatus;
  merchantName: string;
  totalAmount: number;
  items: OrderItem[];
}

interface OrderCardProps {
  order: OrderData;
}

export default function OrderCard({ order }: OrderCardProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  // Konfigurasi warna dan label berdasarkan status
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'unpaid': return { label: 'Unpaid', color: 'text-rose-600 bg-rose-50 border-rose-100', action: 'Pay Now' };
      case 'processing': return { label: 'Processing', color: 'text-amber-600 bg-amber-50 border-amber-100', action: 'Track Order' };
      case 'shipped': return { label: 'Shipped', color: 'text-blue-600 bg-blue-50 border-blue-100', action: 'Track Order' };
      case 'completed': return { label: 'Completed', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', action: 'Buy Again' };
      case 'cancelled': return { label: 'Cancelled', color: 'text-zinc-500 bg-zinc-100 border-zinc-200', action: 'Details' };
      default: return { label: 'Unknown', color: 'text-zinc-500 bg-zinc-100 border-zinc-200', action: 'Details' };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const firstItem = order.items[0];
  const extraItemsCount = order.items.length - 1;

  return (
    // Apple Liquid Glass Effect
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white bg-white/60 backdrop-blur-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      
      {/* Header: Merchant & Status */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/50 bg-white/40">
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4 text-zinc-500" />
          <span className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
            {order.merchantName}
          </span>
        </div>
        <div className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border ${statusConfig.color}`}>
          {statusConfig.label}
        </div>
      </div>

      {/* Body: Ringkasan Produk Teratas */}
      <div className="p-4 flex gap-4">
        <div className="w-16 h-16 shrink-0 rounded-xl bg-zinc-100 overflow-hidden border border-zinc-200/50">
          <img src={firstItem.imageUrl} alt={firstItem.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        
        <div className="flex flex-col flex-1 justify-center">
          <h3 className="text-sm font-medium text-zinc-900 line-clamp-1">
            {firstItem.name}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            {firstItem.qty} x {formatPrice(firstItem.price)}
          </p>
          
          {/* Info jika barang lebih dari 1 */}
          {extraItemsCount > 0 && (
            <p className="text-xs font-medium text-zinc-400 mt-1.5 flex items-center gap-1">
              <Package className="w-3.5 h-3.5" />
              +{extraItemsCount} other items
            </p>
          )}
        </div>
      </div>

      {/* Footer: Total Harga & Tombol Aksi */}
      <div className="px-4 py-3 border-t border-zinc-200/50 bg-white/20 flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-500">Total Order</p>
          <p className="text-sm font-bold text-zinc-900">{formatPrice(order.totalAmount)}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Tombol aksi utama dinamis berdasarkan status */}
          <button className={`px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 shadow-sm ${
            order.status === 'unpaid' 
              ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
              : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
          }`}>
            {statusConfig.action}
          </button>
        </div>
      </div>

    </div>
  );
}