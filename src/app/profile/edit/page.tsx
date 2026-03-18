import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProfileEditForm from '@/components/profile/ProfileEditForm';

export const metadata: Metadata = {
  title: 'Account Details | AsyuraCommerce',
  description: 'Update your personal information and password.',
};

export default function ProfileEditPage() {
  return (
    <div className="pt-4 tablet:pt-8 px-2 tablet:px-0 max-w-2xl mx-auto">
      
      {/* Custom Header dengan Back Button */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <Link 
          href="/profile" 
          className="p-2 -ml-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl tablet:text-2xl font-bold text-zinc-900 tracking-tight">
          Account Details
        </h1>
      </div>
      
      <ProfileEditForm />
    </div>
  );
}