'use client';

import Link from 'next/link';
import { Home, Heart, ReceiptText, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
 const cartCount = useCartStore((state) => state.getCartCount());
  // Mengambil path saat ini untuk memberikan efek "active" pada menu yang sedang dibuka
  const pathname = usePathname();

  // Helper function untuk menentukan warna icon yang aktif
  const isActive = (path: string) => pathname === path;

  return (
    // Apple Glass Effect: bg-white/70, border atas putih solid
    <nav className="tablet:hidden fixed bottom-0 left-0 w-full z-50 bg-white/40 backdrop-blur-2xl backdrop-saturate-150 border-t border-white/60 shadow-[0_-4px_30px_rgba(0,0,0,0.03)] pb-safe">
      <div className="flex justify-between items-center px-6 py-3">
        
        {/* Helper untuk render icon. Warna teks dibuat eksplisit gelap/abu-abu */}
        <NavItem href="/" icon={<Home />} label="Home" isActive={isActive('/')} />
        <NavItem href="/wishlist" icon={<Heart />} label="Wishlist" isActive={isActive('/wishlist')} />
        <NavItem href="/transactions" icon={<ReceiptText />} label="Orders" isActive={isActive('/transactions')} />
        
        <Link href="/cart" className={`relative flex flex-col items-center transition-colors ${isActive('/cart') ? 'text-zinc-900' : 'text-zinc-400'}`}>
          <div className="relative">
            <ShoppingCart className="w-[22px] h-[22px]" strokeWidth={isActive('/cart') ? 2.5 : 2} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1.5 font-medium">Cart</span>
        </Link>

        <NavItem href="/profile" icon={<User />} label="Profile" isActive={isActive('/profile')} />

      </div>
    </nav>
  );
}

// Sub-komponen biar rapi
function NavItem({ href, icon, label, isActive }: { href: string, icon: React.ReactNode, label: string, isActive: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center transition-colors ${isActive ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}>
      <div className="[&>svg]:w-[22px] [&>svg]:h-[22px]" style={{ strokeWidth: isActive ? 2.5 : 2 }}>
        {icon}
      </div>
      <span className="text-[10px] mt-1.5 font-medium">{label}</span>
    </Link>
  );
}