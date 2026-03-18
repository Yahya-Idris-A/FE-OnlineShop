import type { Metadata } from 'next';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | AsyuraCommerce',
  description: 'Reset your password.',
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 tablet:px-0">
      <ForgotPasswordForm />
    </div>
  );
}