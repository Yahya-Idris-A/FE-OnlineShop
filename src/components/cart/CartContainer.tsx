"use client";

import { useState, useRef } from "react";
import { useCartStore, CartItem } from "@/store/useCartStore";
import { Minus, Plus, Trash2, Store, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function CartContainer() {
  const {
    items,
    updateQty,
    removeItem,
    toggleSelectItem,
    getCartTotal,
    removeSelectedItems,
  } = useCartStore();
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

  const router = useRouter();

  // Format ke Rupiah
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Logika untuk mengelompokkan item berdasarkan merchantName (Meniru response API Go kamu nanti)
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.merchantName]) {
        acc[item.merchantName] = [];
      }
      acc[item.merchantName].push(item);
      return acc;
    },
    {} as Record<string, typeof items>,
  );

  // Handler saat minus diklik
  const handleMinusClick = (item: CartItem) => {
    if (item.qty === 1) {
      setItemToDelete(item); // Munculkan modal
    } else {
      updateQty(item.id, item.qty - 1);
    }
  };

  const hasSelectedItems = items.some((item) => item.selected);
  const selectedCount = items.filter((item) => item.selected).length;

  const confirmBulkDelete = () => {
    removeSelectedItems();
    setShowBulkDeleteModal(false);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      removeItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  const handleBuyNow = () => {
    // Logika beli langsung: Masukkan ke state khusus checkout atau bypass keranjang
    // Untuk sekarang, kita push ke halaman checkout langsung
    router.push('/checkout');
  };

  // UI Jika Keranjang Kosong
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-24 h-24 bg-white/60 backdrop-blur-xl border border-white rounded-full flex items-center justify-center mb-6 shadow-sm">
          <ShoppingCartIcon className="w-10 h-10 text-zinc-300" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-zinc-500 mb-8 text-sm max-w-xs">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-all active:scale-95"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col tablet:flex-row gap-6 pb-24 tablet:pb-0">
        {/* KIRI: Daftar Barang */}
        <div className="flex-1 space-y-4 overflow-hidden">
          {hasSelectedItems && (
            <div className="flex justify-between items-center px-2 mb-2">
              <span className="text-sm text-zinc-500 font-medium">
                {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
              </span>
              <button
                onClick={() => setShowBulkDeleteModal(true)}
                className="text-xs font-semibold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Selected
              </button>
            </div>
          )}
          {Object.entries(groupedItems).map(([merchantName, merchantItems]) => (
            <div
              key={merchantName}
              className="flex flex-col overflow-hidden rounded-2xl border border-white bg-white/60 backdrop-blur-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-200/50 bg-white/40">
                <Store className="w-4 h-4 text-zinc-500" />
                <span className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
                  {merchantName}
                </span>
              </div>

              <div className="divide-y divide-zinc-200/50">
                {merchantItems.map((item) => (
                  // Wrapper untuk animasi swipe
                  <SwipeableCartItem
                    key={item.id}
                    onDelete={() => setItemToDelete(item)}
                  >
                    <div className="flex gap-3 tablet:gap-4 p-4 bg-white/40 backdrop-blur-xl">
                      {/* Custom Checkbox ala Apple */}
                      <div className="flex items-center pt-6 tablet:pt-0">
                        <button
                          onClick={() => toggleSelectItem(item.id)}
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                            item.selected
                              ? "bg-zinc-900 border-zinc-900 text-white"
                              : "bg-white/50 border-zinc-300 text-transparent hover:border-zinc-400"
                          }`}
                        >
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </button>
                      </div>

                      <div className="w-20 h-20 shrink-0 rounded-xl bg-zinc-100 overflow-hidden border border-zinc-200/50">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col flex-1 justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-zinc-900 line-clamp-2 leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-sm font-bold text-zinc-900 mt-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-2">
                          {/* Tombol hapus */}
                          <button 
                            onClick={() => setItemToDelete(item)}
                            className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors active:scale-95"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="flex items-center bg-white border border-zinc-200 rounded-full px-1 py-1 shadow-sm">
                            <button
                              onClick={() => handleMinusClick(item)}
                              className="w-7 h-7 flex items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 transition-colors active:scale-95"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-zinc-900">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 transition-colors active:scale-95"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwipeableCartItem>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* KANAN/BAWAH: Order Summary */}
        <div className="tablet:w-80 shrink-0">
          <div className="sticky top-24 rounded-2xl border border-white bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-5">
            <h3 className="text-base font-semibold text-zinc-900 mb-4">
              Shopping Summary
            </h3>

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-zinc-200/50">
              <span className="text-sm text-zinc-500">Total Price</span>
              <span className="text-lg font-bold text-zinc-900">
                {formatPrice(getCartTotal())}
              </span>
            </div>

            {/* Tombol disabled jika total = 0 (tidak ada yg di-check) */}
            <button
              disabled={getCartTotal() === 0}
              onClick={handleBuyNow}
              className="w-full py-3 bg-zinc-900 text-white rounded-xl font-medium shadow-md hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              Checkout Selected
            </button>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus (Glassmorphism) */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-2xl border border-white rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Remove Item?
            </h3>
            <p className="text-sm text-zinc-600 mb-6 line-clamp-2">
              Are you sure you want to remove{" "}
              <strong>{itemToDelete.name}</strong> from your cart?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-2.5 rounded-full font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-full font-medium text-white bg-red-500 hover:bg-red-600 shadow-sm shadow-red-500/20 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Konfirmasi Bulk Delete (Glassmorphism) */}
      {showBulkDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm bg-white/80 backdrop-blur-2xl border border-white rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Delete Selected Items?</h3>
            <p className="text-sm text-zinc-600 mb-6">
              Are you sure you want to remove <strong>{selectedCount} items</strong> from your cart? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowBulkDeleteModal(false)}
                className="flex-1 py-2.5 rounded-full font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmBulkDelete}
                className="flex-1 py-2.5 rounded-full font-medium text-white bg-red-500 hover:bg-red-600 shadow-sm shadow-red-500/20 transition-colors"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// SUB-COMPONENT: SWIPEABLE ITEM (MOBILE)
// ==========================================
function SwipeableCartItem({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete: () => void;
}) {
  const [translateX, setTranslateX] = useState(0);
  const touchStartX = useRef(0);
  const initialTranslateX = useRef(0); // Tambahan: Menyimpan posisi saat mulai disentuh
  const ACTION_WIDTH = 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    initialTranslateX.current = translateX; // Simpan posisi card saat ini (entah lagi 0 atau -80)
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentTouchX = e.touches[0].clientX;
    const diff = currentTouchX - touchStartX.current;

    // Hitung posisi baru berdasarkan posisi awal + jarak gesekan jari
    let newTranslateX = initialTranslateX.current + diff;

    // Batasan (Clamp):
    // Jangan biarkan digeser ke kanan melewati batas normal (maksimal 0)
    if (newTranslateX > 0) newTranslateX = 0;
    // Jangan biarkan digeser ke kiri terlalu jauh (maksimal lebar tombol + sedikit efek mentok/bounce)
    if (newTranslateX < -ACTION_WIDTH - 20) newTranslateX = -ACTION_WIDTH - 20;

    setTranslateX(newTranslateX);
  };

  const handleTouchEnd = () => {
    // Jika posisi card bergeser lebih dari setengah lebar tombol aksi, buka penuh
    if (translateX < -(ACTION_WIDTH / 2)) {
      setTranslateX(-ACTION_WIDTH);
    } else {
      // Jika kurang dari setengah, kembalikan tertutup rapat
      setTranslateX(0);
    }
  };

  return (
    <div className="relative overflow-hidden group">
      {/* Latar Belakang Merah (Tombol Hapus) 
        Trik: Kita gunakan opacity agar warna merahnya hilang saat translateX = 0, 
        sehingga tidak tembus/membayang di balik kaca.
      */}
      <div
        className="absolute inset-y-0 right-0 w-[80px] bg-red-500 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: translateX < -5 ? 1 : 0 }} // Merah baru muncul kalau digeser dikit
      >
        <button
          onClick={onDelete}
          className="w-full h-full flex flex-col items-center justify-center text-white active:bg-red-600 transition-colors"
        >
          <Trash2 className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Remove</span>
        </button>
      </div>

      {/* Konten Utama (Bisa digeser) */}
      <div
        // Hapus duration-300 dari sini saat sedang disentuh agar geserannya nempel dengan jari tanpa delay
        className={`relative z-10 w-full ease-out touch-pan-y ${translateX === 0 || translateX === -ACTION_WIDTH ? "transition-transform duration-300" : ""}`}
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
}

// Icon helper untuk state keranjang kosong
function ShoppingCartIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
