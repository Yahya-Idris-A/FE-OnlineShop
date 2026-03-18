import type { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | AsyuraCommerce',
  description: 'Login to your account.',
};

export default function LoginPage() {
  return (
    // Memastikan form berada tepat di tengah layar dengan min-h-[80vh]
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 tablet:px-0">
      <LoginForm />
    </div>
  );
}