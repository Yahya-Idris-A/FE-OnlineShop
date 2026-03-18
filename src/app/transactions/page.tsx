import type { Metadata } from 'next';
import TransactionsContainer from '@/components/transactions/TransactionsContainer';

export const metadata: Metadata = {
  title: 'My Orders | AsyuraCommerce',
  description: 'View your transaction history and order status.',
};

export default function TransactionsPage() {
  return (
    <div className="pt-4 tablet:pt-8 px-2 tablet:px-0 min-h-[70vh]">
      <h1 className="text-xl tablet:text-2xl font-bold text-zinc-900 mb-6 tracking-tight">
        Transaction History
      </h1>
      
      <TransactionsContainer />
    </div>
  );
}