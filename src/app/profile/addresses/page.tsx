import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AddressList from '@/components/profile/AddressList';

export const metadata: Metadata = {
  title: 'Saved Addresses | AsyuraCommerce',
  description: 'Manage your shipping addresses.',
};

export default function AddressesPage() {
  return (
    <div className="pt-4 tablet:pt-8 px-2 tablet:px-0 max-w-2xl mx-auto">
      
      {/* Custom Header dengan Back Button khusus untuk sub-halaman Profile */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <Link 
          href="/profile" 
          className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl tablet:text-2xl font-bold text-zinc-900 tracking-tight">
          Saved Addresses
        </h1>
      </div>
      
      <AddressList />
    </div>
  );
}