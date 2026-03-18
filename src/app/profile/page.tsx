import type { Metadata } from 'next';
import ProfileContainer from '@/components/profile/ProfileContainer';

export const metadata: Metadata = {
  title: 'My Profile | AsyuraCommerce',
  description: 'Manage your account, orders, and addresses.',
};

export default function ProfilePage() {
  return (
    <div className="pt-4 tablet:pt-8 px-2 tablet:px-0 max-w-2xl mx-auto">
      <h1 className="text-xl tablet:text-2xl font-bold text-zinc-900 mb-6 tracking-tight px-2">
        My Profile
      </h1>
      
      <ProfileContainer />
    </div>
  );
}