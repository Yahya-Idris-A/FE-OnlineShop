"use client";

import {
  User,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Wallet,
  Package,
  Truck,
  Star,
  Store,
  Rocket,
} from "lucide-react";
import Link from "next/link";

export default function ProfileContainer() {
  // Mock data user
  const user = {
    name: "Yahya Idris Abdurrahman",
    email: "yahya@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Yahya+Idris&background=18181b&color=fff&size=128",
  };

  return (
    <div className="space-y-6 pb-24 tablet:pb-8">
      {/* 1. Header & User Info Card */}
      <div className="flex items-center gap-4 p-5 rounded-3xl bg-white/60 backdrop-blur-3xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-zinc-900 leading-snug">
            {user.name}
          </h2>
          <p className="text-sm text-zinc-500">{user.email}</p>
        </div>
        <Link
          href="/profile/edit"
          className="p-2 bg-white/50 hover:bg-white rounded-full text-zinc-600 transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-white"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>

      {/* 1.5. CTA Buka Toko (Hanya muncul jika user belum jadi merchant) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black p-6 text-white shadow-xl flex flex-col tablet:flex-row items-center justify-between gap-4 group">
        {/* Efek Kaca & Cahaya di Background */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-700" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
        
        <div className="relative z-10 flex items-center gap-4 text-center tablet:text-left">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 mx-auto tablet:mx-0">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-wide">Start Selling Today!</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-[200px] tablet:max-w-none mx-auto">
              Open your free store and reach millions of buyers.
            </p>
          </div>
        </div>

        <Link 
          href="/seller/register" 
          className="relative z-10 shrink-0 w-full tablet:w-auto px-6 py-3 bg-white text-zinc-900 text-sm font-bold rounded-full shadow-lg hover:bg-zinc-100 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          Open Store <Rocket className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. Quick Access: My Orders */}
      <div className="rounded-3xl bg-white/60 backdrop-blur-3xl border border-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200/50">
          <h3 className="text-base font-bold text-zinc-900">My Orders</h3>
          <Link
            href="/transactions"
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 flex items-center"
          >
            View All <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>
        <div className="flex justify-between items-center p-4">
          <Link
            href="/transactions?tab=unpaid"
            className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <div className="relative p-2 bg-white rounded-full shadow-sm border border-zinc-100">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              Unpaid
            </span>
          </Link>
          <Link
            href="/transactions?tab=processing"
            className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <div className="relative p-2 bg-white rounded-full shadow-sm border border-zinc-100">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              Process
            </span>
          </Link>
          <Link
            href="/transactions?tab=shipped"
            className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <div className="relative p-2 bg-white rounded-full shadow-sm border border-zinc-100">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              Shipped
            </span>
          </Link>
          <Link
            href="/transactions?tab=completed"
            className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <div className="relative p-2 bg-white rounded-full shadow-sm border border-zinc-100">
              <Star className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              Review
            </span>
          </Link>
        </div>
      </div>

      {/* 3. Account Settings Menu List (iOS Style) */}
      <div className="rounded-3xl bg-white/60 backdrop-blur-3xl border border-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <Link
          href="/profile/addresses"
          className="flex items-center p-4 hover:bg-white/40 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-zinc-900">
              Saved Addresses
            </h4>
            <p className="text-xs text-zinc-500">Manage shipping addresses</p>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-400" />
        </Link>
        <div className="h-px bg-zinc-200/50 mx-4" /> {/* Divider */}
        <Link
          href="/profile/payment"
          className="flex items-center p-4 hover:bg-white/40 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
            <CreditCard className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-zinc-900">
              Payment Methods
            </h4>
            <p className="text-xs text-zinc-500">Manage cards and e-wallets</p>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-400" />
        </Link>
        <div className="h-px bg-zinc-200/50 mx-4" /> {/* Divider */}
        <Link
          href="/wishlist"
          className="flex items-center p-4 hover:bg-white/40 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-zinc-900">My Wishlist</h4>
            <p className="text-xs text-zinc-500">View your favorite items</p>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-400" />
        </Link>
        <div className="h-px bg-zinc-200/50 mx-4" /> {/* Divider */}
        <Link
          href="/profile/edit"
          className="flex items-center p-4 hover:bg-white/40 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-zinc-900">
              Account Details
            </h4>
            <p className="text-xs text-zinc-500">
              Update name, email, and password
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-400" />
        </Link>
      </div>

      {/* 4. Logout Button */}
      <button className="w-full flex items-center justify-center gap-2 p-4 rounded-3xl bg-red-50 text-red-600 font-semibold border border-red-100 hover:bg-red-100 transition-colors active:scale-95 shadow-sm">
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}
