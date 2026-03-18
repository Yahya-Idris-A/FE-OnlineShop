import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PaymentMethodsList from '@/components/profile/PaymentMethodsList';

export const metadata: Metadata = {
  title: 'Payment Methods | AsyuraCommerce',
  description: 'Manage your saved credit cards and e-wallets.',
};

export default function PaymentMethodsPage() {
  return (
    <div className="pt-4 tablet:pt-8 px-2 tablet:px-0 max-w-2xl mx-auto">
      
      <div className="flex items-center gap-3 mb-6 px-2">
        <Link 
          href="/profile" 
          className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl tablet:text-2xl font-bold text-zinc-900 tracking-tight">
          Payment Information
        </h1>
      </div>
      
      <PaymentMethodsList />
    </div>
  );
}