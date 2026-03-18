import type { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Sign Up | AsyuraCommerce',
  description: 'Create a new account.',
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 tablet:px-0">
      <RegisterForm />
    </div>
  );
}