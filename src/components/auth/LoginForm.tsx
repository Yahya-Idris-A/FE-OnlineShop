'use client';

import { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
// import { authService } from '@/features/auth/services/authService'; // Nanti di-uncomment kalau API sudah siap

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi loading API
    setTimeout(() => {
      setLoading(false);
      // Nanti ganti dengan: await authService.login({ email, password })
      // Lalu simpan token ke Cookies/localStorage dan redirect ke Home
      window.location.href = '/auth/otp-verification'; // Arahkan ke halaman OTP setelah login sukses
    }, 1500);
  };

  return (
    // Card Kaca Utama
    <div className="w-full max-w-md p-8 rounded-3xl bg-white/60 backdrop-blur-3xl backdrop-saturate-150 border border-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Welcome Back</h1>
        <p className="text-sm text-zinc-500 mt-2">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        
        {/* Input Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 placeholder:text-zinc-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
            />
          </div>
        </div>

        {/* Input Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 placeholder:text-zinc-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <a href="/auth/forgot-password" className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            Forgot password?
          </a>
        </div>

        {/* Tombol Submit Solid */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-2 bg-zinc-900 text-white rounded-2xl font-semibold shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 group"
        >
          {loading ? 'Signing in...' : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-500 mt-8">
        Don't have an account?{' '}
        <Link href="/auth/register" className="font-semibold text-zinc-900 hover:underline">
          Sign Up
        </Link>
      </p>

    </div>
  );
}