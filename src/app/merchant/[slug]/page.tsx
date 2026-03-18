import type { Metadata } from 'next';
import MerchantProfile from '@/components/merchant/MerchantProfile';
import MerchantProducts from '@/components/merchant/MerchantProducts';

type Props = {
  params: Promise<{ slug: string }>;
};

// Simulasi fetch data merchant berdasarkan slug
async function getMerchantDetail(slug: string) {
  return {
    name: 'Tech Gear Official',
    slug: slug,
    avatar: 'https://ui-avatars.com/api/?name=Tech+Gear&background=18181b&color=fff&size=256', // Menggunakan UI Avatars yang aman
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80', // Banner Toko
    rating: 4.9,
    followers: '124K',
    productCount: 342,
    location: 'Jakarta Selatan',
    isOfficial: true,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const merchant = await getMerchantDetail(resolvedParams.slug);
  return { title: `${merchant.name} | AsyuraCommerce` };
}

export default async function MerchantPage({ params }: Props) {
  const resolvedParams = await params;
  const merchant = await getMerchantDetail(resolvedParams.slug);

  return (
    <div className="min-h-screen bg-zinc-50">
      <MerchantProfile merchant={merchant} />
      <MerchantProducts />
    </div>
  );
}