'use client';

import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi loading API (Hit POST /register)
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/auth/otp-verification'; // Arahkan ke halaman OTP setelah register sukses
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-white/60 backdrop-blur-3xl backdrop-saturate-150 border border-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Create Account</h1>
        <p className="text-sm text-zinc-500 mt-2">Join us to start shopping easily</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        
        {/* Input Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Full Name</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 placeholder:text-zinc-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
            />
          </div>
        </div>

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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-4 bg-zinc-900 text-white rounded-2xl font-semibold shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 group"
        >
          {loading ? 'Creating account...' : (
            <>
              Sign Up
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-zinc-500 mt-8">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-semibold text-zinc-900 hover:underline">
          Sign In
        </Link>
      </p>

    </div>
  );
}