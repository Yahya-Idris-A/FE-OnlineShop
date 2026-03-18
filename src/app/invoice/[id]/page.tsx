import type { Metadata } from 'next';
import InvoiceDetail from '@/components/invoice/InvoiceDetail';

export const metadata: Metadata = {
  title: 'Payment Successful | AsyuraCommerce',
  description: 'Your payment was successful and the order is being processed.',
};

export default function InvoicePage() {
  // Karena ini Server Component, kita bisa ubah background utamanya biar lebih kontras 
  // dan fokus ke "Struk" putih di tengah.
  return (
    <div className="min-h-screen bg-zinc-100/50 pt-4 tablet:pt-12 px-4 tablet:px-0">
      <InvoiceDetail />
    </div>
  );
}