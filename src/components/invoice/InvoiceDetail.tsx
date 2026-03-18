'use client';

import { CheckCircle2, Receipt, Download, ChevronRight, Home, Package } from 'lucide-react';
import Link from 'next/link';

export default function InvoiceDetail() {
  // Mock Data Invoice
  const invoiceData = {
    id: 'INV/20260319/001',
    date: '19 Mar 2026, 14:30 WIB',
    status: 'Paid',
    paymentMethod: 'BCA Virtual Account',
    sender: 'Tech Gear Official',
    totalAmount: 1368500, // Termasuk ongkir dll
  };

  const formatPrice = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] pb-24 tablet:pb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* 1. Success Header */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
          <div className="relative bg-emerald-500 text-white w-full h-full rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
        </div>
        <h1 className="text-2xl tablet:text-3xl font-bold text-zinc-900 tracking-tight">Payment Successful!</h1>
        <p className="text-sm text-zinc-500 mt-2">Thank you for your purchase.</p>
      </div>

      {/* 2. Digital Receipt Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-3xl border border-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden relative">
        
        {/* Ornamen "Gerigi Struk" di atas (Efek Visual) */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDEwIDEwLDAgMjAsMTAiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] opacity-50 bg-repeat-x" />

        <div className="p-8 pt-10 text-center border-b border-zinc-200/50 border-dashed">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Total Paid</p>
          <p className="text-4xl font-black text-zinc-900 tracking-tight">{formatPrice(invoiceData.totalAmount)}</p>
        </div>

        <div className="p-8 space-y-5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500">Invoice Number</span>
            <span className="font-semibold text-zinc-900">{invoiceData.id}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500">Date & Time</span>
            <span className="font-semibold text-zinc-900">{invoiceData.date}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500">Payment Method</span>
            <span className="font-semibold text-zinc-900">{invoiceData.paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500">Merchant</span>
            <span className="font-semibold text-zinc-900">{invoiceData.sender}</span>
          </div>
        </div>

        {/* Ornamen "Gerigi Struk" di Bawah */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgMTAsMTAgMjAsMCIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==')] opacity-50 bg-repeat-x" />
      </div>

      {/* 3. Action Buttons */}
      <div className="w-full max-w-md mt-8 space-y-3 px-4 tablet:px-0">
        <Link 
          href="/transactions" 
          className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-semibold shadow-xl shadow-zinc-900/20 hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Package className="w-5 h-5" /> Track My Order
        </Link>
        
        <div className="flex gap-3">
          <button className="flex-1 py-3.5 bg-white border border-zinc-200 text-zinc-700 rounded-2xl font-semibold shadow-sm hover:bg-zinc-50 transition-all active:scale-95 flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Save PDF
          </button>
          <Link href="/" className="flex-1 py-3.5 bg-white border border-zinc-200 text-zinc-700 rounded-2xl font-semibold shadow-sm hover:bg-zinc-50 transition-all active:scale-95 flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>
      </div>

    </div>
  );
}