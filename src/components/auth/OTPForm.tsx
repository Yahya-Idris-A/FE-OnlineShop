'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowRight, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function OTPForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digit OTP
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer hitung mundur untuk Resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // Hanya izinkan angka

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus ke input berikutnya jika diisi
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Auto-focus ke input sebelumnya jika tekan Backspace
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) return;

    setLoading(true);
    // Simulasi API Call
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/'; // Arahkan ke home jika sukses
    }, 1500);
  };

  const handleResend = () => {
    setTimer(60);
    // Nanti panggil API resend OTP di sini
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl bg-white/60 backdrop-blur-3xl backdrop-saturate-150 border border-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
      
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-white shadow-sm">
          <KeyRound className="w-6 h-6 text-zinc-900" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Enter OTP</h1>
        <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
          We have sent a 6-digit verification code to your email address.
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-8">
        
        {/* Input OTP Boxes */}
        <div className="flex justify-center gap-1.5 tablet:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              // FIX: Pakai w-full agar fleksibel, h-12 untuk mobile, rounded-xl agar proporsional
              className="w-full max-w-[2.75rem] tablet:max-w-[3.5rem] h-12 tablet:h-16 px-0 text-center text-lg tablet:text-xl font-bold bg-white/80 border-2 border-zinc-200 focus:border-zinc-900 focus:bg-white rounded-xl tablet:rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/10 transition-all text-zinc-900 shadow-sm"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otp.join('').length < 6}
          className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-semibold shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          {loading ? 'Verifying...' : (
            <>
              Verify Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      {/* Resend OTP Section */}
      <div className="text-center mt-8">
        <p className="text-sm text-zinc-500">
          Didn't receive the code?{' '}
          {timer > 0 ? (
            <span className="font-semibold text-zinc-400">Resend in {timer}s</span>
          ) : (
            <button 
              onClick={handleResend}
              className="font-semibold text-zinc-900 hover:underline transition-all"
            >
              Resend OTP
            </button>
          )}
        </p>
        <div className="mt-4">
          <Link href="/auth/login" className="text-xs text-zinc-400 hover:text-zinc-900 transition-colors">
            Back to Login
          </Link>
        </div>
      </div>

    </div>
  );
}