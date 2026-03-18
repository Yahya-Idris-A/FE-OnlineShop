'use client';

import { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, Send } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State untuk mengontrol UI
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // Timer hitung mundur untuk tombol Send OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSendOTP = async () => {
    if (!email || !email.includes('@')) return;
    
    setLoading(true);
    // Simulasi API kirim email
    setTimeout(() => {
      setLoading(false);
      setIsOtpSent(true); // Membuka sisa form
      setTimer(60); // Mulai hitung mundur 60 detik
    }, 1500);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!"); // Nanti ganti dengan custom Toast
      return;
    }

    setLoading(true);
    // Simulasi hit API Reset Password
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/auth/login';
    }, 1500);
  };

  return (
    <div className="w-full max-w-md p-6 tablet:p-8 rounded-3xl bg-white/60 backdrop-blur-3xl backdrop-saturate-150 border border-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Reset Password</h1>
        <p className="text-sm text-zinc-500 mt-2">
          {isOtpSent 
            ? 'We sent a code to your email. Set your new password below.' 
            : 'Enter your email to receive a verification code.'}
        </p>
      </div>

      <form onSubmit={handleResetPassword} className="space-y-5">
        
        {/* Baris Email & Tombol Send OTP */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Email</label>
          <div className="flex gap-2">
            <div className="relative group flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
              <input
                type="email"
                required
                disabled={isOtpSent && timer > 0} // Kunci email saat OTP baru saja dikirim
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 placeholder:text-zinc-400 disabled:opacity-60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
            
            {/* Tombol Kirim OTP Dinamis */}
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={loading || !email || timer > 0}
              className="shrink-0 px-4 tablet:px-6 py-3.5 bg-zinc-900 text-white rounded-2xl font-semibold shadow-md hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[100px]"
            >
              {loading && !isOtpSent ? '...' : timer > 0 ? `${timer}s` : <><Send className="w-4 h-4 hidden tablet:block" /> Send</>}
            </button>
          </div>
        </div>

        {/* SMART REVEAL: Sisa form baru muncul setelah tombol Send OTP diklik */}
        {isOtpSent && (
          <div className="space-y-5 animate-in slide-in-from-top-4 fade-in duration-500 pt-2 border-t border-zinc-200/50">
            
            {/* Input 6-Digit OTP */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">6-Digit OTP</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="000000"
                  className="w-full pl-11 pr-4 py-3.5 tracking-[0.5em] font-medium bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 placeholder:text-zinc-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                />
              </div>
            </div>

            {/* Input New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 placeholder:text-zinc-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                />
              </div>
            </div>

            {/* Input Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-3.5 bg-white/50 border focus:bg-white/90 rounded-2xl outline-none focus:ring-4 transition-all text-sm text-zinc-900 placeholder:text-zinc-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] ${
                    confirmPassword && newPassword !== confirmPassword 
                      ? 'border-red-400 focus:ring-red-400/20' 
                      : 'border-white/60 focus:ring-zinc-900/5'
                  }`}
                />
              </div>
              {/* Pesan Error Real-time */}
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500 px-2">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6 || newPassword !== confirmPassword}
              className="w-full py-4 mt-2 bg-zinc-900 text-white rounded-2xl font-semibold shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 group"
            >
              {loading ? 'Resetting...' : (
                <>
                  Confirm Reset
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </form>

      <div className="text-center mt-8">
        <Link href="/auth/login" className="text-sm font-semibold text-zinc-900 hover:underline">
          Back to Login
        </Link>
      </div>

    </div>
  );
}