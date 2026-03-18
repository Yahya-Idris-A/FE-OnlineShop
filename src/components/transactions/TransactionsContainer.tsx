'use client';

import { useState } from 'react';
import { ReceiptText } from 'lucide-react';
import Link from 'next/link';
import OrderCard, { OrderData, OrderStatus } from './OrderCard';

// Dummy Data untuk mensimulasikan riwayat belanja
const MOCK_ORDERS: OrderData[] = [
  {
    id: 'ord-001',
    invoice: 'INV/20260319/001',
    date: '19 Mar 2026',
    status: 'unpaid',
    merchantName: 'Tech Gear Official',
    totalAmount: 1350000,
    items: [
      { id: 'p1', name: 'Keychron K2 Wireless Keyboard', qty: 1, price: 1350000, imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80' }
    ]
  },
  {
    id: 'ord-002',
    invoice: 'INV/20260315/089',
    date: '15 Mar 2026',
    status: 'shipped',
    merchantName: 'Audioholic ID',
    totalAmount: 4750000,
    items: [
      { id: 'p2', name: 'Sony WH-1000XM5 Noise Cancelling', qty: 1, price: 4500000, imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80' },
      { id: 'p3', name: 'Headphone Stand Wooden', qty: 1, price: 250000, imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80' }
    ]
  },
  {
    id: 'ord-003',
    invoice: 'INV/20260228/102',
    date: '28 Feb 2026',
    status: 'completed',
    merchantName: 'Basic Wear',
    totalAmount: 120000,
    items: [
      { id: 'p4', name: 'Essential Cotton T-Shirt Oversized', qty: 1, price: 120000, imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80' }
    ]
  }
];

const TABS: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function TransactionsContainer() {
  const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');

  // Filter order berdasarkan tab yang diklik
  const filteredOrders = activeTab === 'all' 
    ? MOCK_ORDERS 
    : MOCK_ORDERS.filter(order => order.status === activeTab);

  return (
    <div className="space-y-6 pb-24 tablet:pb-0">
      
      {/* Scrollable Tabs (Pills Style) */}
      <div className="flex overflow-x-auto custom-scrollbar pb-2 -mx-2 px-2 tablet:mx-0 tablet:px-0 gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              activeTab === tab.value 
                ? 'bg-zinc-900 border-zinc-900 text-white shadow-md' 
                : 'bg-white/50 border-white text-zinc-600 hover:border-zinc-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Daftar Transaksi */}
      {filteredOrders.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-white/60 backdrop-blur-xl border border-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <ReceiptText className="w-8 h-8 text-zinc-300" />
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 mb-2">No orders found</h2>
          <p className="text-zinc-500 mb-6 text-sm">
            {activeTab === 'all' ? "You haven't placed any orders yet." : `You don't have any ${activeTab} orders.`}
          </p>
          <Link href="/" className="px-6 py-2.5 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-all active:scale-95 text-sm">
            Start Shopping
          </Link>
        </div>
      ) : (
        // Order Cards Grid/List
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

    </div>
  );
}