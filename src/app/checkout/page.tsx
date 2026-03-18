import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CheckoutContainer from '@/components/checkout/CheckoutContainer';

export const metadata: Metadata = {
  title: 'Checkout | AsyuraCommerce',
  description: 'Review your order and securely complete your purchase.',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="pt-4 tablet:pt-8 px-4 tablet:px-0 max-w-3xl mx-auto">
        
        {/* Header Checkout yang Simple & Fokus */}
        <div className="flex items-center gap-3 mb-6">
          <Link 
            href="/cart" 
            className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50 rounded-full transition-colors active:scale-95"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl tablet:text-2xl font-bold text-zinc-900 tracking-tight">
            Checkout
          </h1>
        </div>
        
        <CheckoutContainer />
      </div>
    </div>
  );
}