"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import MerchantCard from "@/components/merchant/MerchantCard";
import FilterModal from "./FilterModal";

// Dummy Data untuk tes UI
const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "Logitech MX Master 3S",
    price: 1650000,
    merchantName: "Tech Gear",
    imageUrl:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
  },
  {
    id: "p2",
    name: "Keychron K2 Wireless",
    price: 1350000,
    merchantName: "Tech Gear",
    imageUrl:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80",
  },
];

const MOCK_MERCHANTS = [
  {
    id: "m1",
    name: "Tech Gear Official",
    rating: 4.9,
    location: "Jakarta Selatan",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80",
  },
  {
    id: "m2",
    name: "Audioholic ID",
    rating: 4.8,
    location: "Bandung",
    imageUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&q=80",
  },
];

export default function SearchContainer() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // State untuk Tab: 'products' atau 'merchants'
  const [activeTab, setActiveTab] = useState<"products" | "merchants">(
    "products",
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Pencarian */}
      <div className="flex flex-col tablet:flex-row tablet:items-center justify-between gap-4">
        {/* Judul & Tombol Filter Wrapper */}
        <div className="flex justify-between items-start w-full tablet:w-auto">
          <div>
            <h1 className="text-xl font-bold text-zinc-900">Search Results</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Showing results for{" "}
              <span className="font-semibold text-zinc-900">"{query}"</span>
            </p>
          </div>

          {/* Tombol Filter (Muncul di kanan judul pada Mobile, atau di sebelah tab pada Desktop) */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="tablet:hidden flex items-center justify-center p-2.5 bg-white/60 backdrop-blur-xl border border-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-zinc-600 hover:text-zinc-900 transition-colors"
            aria-label="Open Filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* iOS Segmented Control (Tabs) */}
        <div className="relative flex p-1 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] w-full tablet:w-64">
          {/* Animated Slider Background */}
          <div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out"
            style={{
              transform:
                activeTab === "products" ? "translateX(0)" : "translateX(100%)",
            }}
          />

          <button
            onClick={() => setActiveTab("products")}
            className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-300 ${activeTab === "products" ? "text-zinc-900" : "text-zinc-500"}`}
          >
            Products
          </button>

          <button
            onClick={() => setActiveTab("merchants")}
            className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-300 ${activeTab === "merchants" ? "text-zinc-900" : "text-zinc-500"}`}
          >
            Merchants
          </button>
        </div>
        {/* Tombol Filter untuk Desktop (Samping Tabs) */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="hidden tablet:flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-xl border border-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Render Area */}
      <div className="min-h-[50vh]">
        {activeTab === "products" ? (
          // Grid Produk
          <div className="grid grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-5 gap-3 tablet:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          // List Merchant
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {MOCK_MERCHANTS.map((merchant) => (
              <MerchantCard key={merchant.id} {...merchant} />
            ))}
          </div>
        )}
      </div>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
