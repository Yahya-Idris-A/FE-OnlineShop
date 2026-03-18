import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import StoreRegistrationForm from '@/components/seller/StoreRegistrationForm';

export const metadata: Metadata = {
  title: 'Open Store | AsyuraCommerce',
  description: 'Register and start selling on AsyuraCommerce.',
};

export default function StoreRegistrationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 tablet:px-0 relative">
      
      {/* Tombol Back Melayang di Kiri Atas */}
      <div className="absolute top-4 left-4 tablet:top-8 tablet:left-8">
        <Link 
          href="/profile" 
          className="flex items-center gap-2 p-2 pr-4 text-zinc-500 hover:text-zinc-900 hover:bg-white/60 rounded-full transition-all backdrop-blur-md border border-transparent hover:border-white shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold hidden tablet:block">Back to Profile</span>
        </Link>
      </div>

      <StoreRegistrationForm />
      
    </div>
  );
}