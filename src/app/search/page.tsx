import type { Metadata } from 'next';
import SearchContainer from '@/components/search/SearchContainer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search | AsyuraCommerce',
  description: 'Search for products and merchants.',
};

export default function SearchPage() {
  return (
    <div className="pt-4 tablet:pt-8 px-2 tablet:px-0">
      {/* Karena SearchContainer menggunakan useSearchParams() (Client hook), 
        kita WAJIB membungkusnya dengan Suspense agar tidak error saat di-build oleh Next.js 
      */}
      <Suspense fallback={<div className="animate-pulse h-10 w-48 bg-zinc-200 rounded-full" />}>
        <SearchContainer />
      </Suspense>
    </div>
  );
}