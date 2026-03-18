import type { Metadata } from 'next';
import OTPForm from '@/components/auth/OTPForm';

export const metadata: Metadata = {
  title: 'OTP Verification | AsyuraCommerce',
  description: 'Verify your account.',
};

export default function OTPPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 tablet:px-0">
      <OTPForm />
    </div>
  );
}