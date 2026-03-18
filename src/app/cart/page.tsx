import type { Metadata } from 'next';
import CartContainer from '@/components/cart/CartContainer';

export const metadata: Metadata = {
  title: 'Shopping Cart | AsyuraCommerce',
  description: 'Review and checkout your items.',
};

export default function CartPage() {
  return (
    <div className="pt-4 tablet:pt-8 px-2 tablet:px-0">
      <h1 className="text-xl tablet:text-2xl font-bold text-zinc-900 mb-6 tracking-tight">
        Shopping Cart
      </h1>
      
      <CartContainer />
    </div>
  );
}