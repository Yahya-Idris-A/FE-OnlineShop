'use client';

import { useState } from 'react';
import { MapPin, ChevronRight, Store, Ticket, ShieldCheck, CreditCard, ReceiptText, ArrowRight, Wallet, Truck, X, Plus, CheckCircle2, Tag } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutContainer() {
  const [loading, setLoading] = useState(false);
  const [insuranceEnabled, setInsuranceEnabled] = useState(true);

  // --- MODAL STATES ---
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Mock Data
  const addressList = [
    { id: 'addr-1', label: 'Home', recipient: 'Yahya Idris', phone: '081234567890', full: 'Jl. Sudirman No. 123, Senayan, Jakarta Selatan, 12190' },
    { id: 'addr-2', label: 'Office', recipient: 'Yahya (WeCore)', phone: '089876543210', full: 'Gedung Cyber 2 Tower Lt. 15, Kuningan, Jakarta Selatan 12950' }
  ];
  const promoList = [
    { id: 'p1', code: 'TECHDISC50', title: 'Diskon Gadget 50K', amount: 50000, desc: 'Min. belanja Rp 1.000.000' },
    { id: 'p2', code: 'FREESHIP', title: 'Gratis Ongkir', amount: 15000, desc: 'Potongan ongkir s.d Rp 20.000' }
  ];
  const cartGroup = { merchantName: 'Tech Gear Official', location: 'Jakarta Barat', items: [{ id: '1', name: 'Keychron K2 Wireless Mechanical Keyboard', price: 1350000, qty: 1, img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=200&q=80' }] };

    // --- ACTIVE SELECTIONS ---
  const [selectedAddress, setSelectedAddress] = useState(addressList[0]);
  const [selectedShipping, setSelectedShipping] = useState({ name: 'Reguler (J&T Express)', est: '20 - 22 Mar', price: 15000 });
  const [selectedPayment, setSelectedPayment] = useState({ name: 'BCA Virtual Account', icon: '🏦' });
  const [appliedPromo, setAppliedPromo] = useState<{id: string, code: string, title: string, amount: number} | null>(null);
  const [promoInput, setPromoInput] = useState('');

  // Kalkulasi
  const subTotal = 1350000;
  const insuranceFee = insuranceEnabled ? 2500 : 0;
  const platformFee = 1000;
  const discountAmount = appliedPromo ? appliedPromo.amount : 0;
  const grandTotal = subTotal + selectedShipping.price + insuranceFee + platformFee - discountAmount;

  const formatPrice = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  const handleApplyManualPromo = () => {
    const found = promoList.find(p => p.code === promoInput.toUpperCase());
    if (found) {
      setAppliedPromo(found);
      setIsPromoModalOpen(false);
    } else {
      alert('Promo code not valid or expired!');
    }
  };

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/invoice/INV-20260319-001';
    }, 1500);
  };

  return (
    <>
      <div className="space-y-6 pb-32 tablet:pb-40 relative animate-in fade-in duration-500">
        
        {/* 1. SHIPPING ADDRESS */}
        <div className="p-5 rounded-3xl bg-white/60 backdrop-blur-3xl border border-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-500" /> Delivery Address
            </h2>
            <button onClick={() => setIsAddressModalOpen(true)} className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-2 py-1 bg-blue-50 rounded-lg">Change</button>
          </div>
          <div className="flex items-start gap-3 cursor-pointer group" onClick={() => setIsAddressModalOpen(true)}>
            <div className="flex-1">
              <p className="text-sm font-bold text-zinc-900">{selectedAddress.recipient} <span className="font-normal text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md text-[10px] ml-1">{selectedAddress.label}</span></p>
              <p className="text-sm text-zinc-600 mt-1">{selectedAddress.phone}</p>
              <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed line-clamp-2">{selectedAddress.full}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-300 self-center group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 2. ORDER ITEMS & SHIPPING METHOD */}
        <div className="p-5 rounded-3xl bg-white/60 backdrop-blur-3xl border border-white shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-200/50">
            <Store className="w-4 h-4 text-zinc-500" />
            <span className="text-sm font-bold text-zinc-900">{cartGroup.merchantName}</span>
            <span className="text-[10px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">{cartGroup.location}</span>
          </div>

          {cartGroup.items.map(item => (
            <div key={item.id} className="flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-zinc-900 line-clamp-2">{item.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-zinc-500">{item.qty} x {formatPrice(item.price)}</p>
                  <p className="text-sm font-bold text-zinc-900">{formatPrice(item.price * item.qty)}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <input type="text" placeholder="Leave a message for the seller (optional)..." className="w-full px-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 text-sm transition-all" />
          </div>

          {/* Tombol Buka Modal Kurir */}
          <div className="pt-4 border-t border-zinc-200/50">
            <button 
              onClick={() => setIsShippingModalOpen(true)}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-blue-50/50 border border-blue-100 hover:bg-blue-50 transition-colors text-left"
            >
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-0.5">Shipping Method</p>
                <p className="text-sm font-bold text-zinc-900">{selectedShipping.name}</p>
                <p className="text-xs text-zinc-500">Est. arrived {selectedShipping.est}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-900">{formatPrice(selectedShipping.price)}</span>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </div>
            </button>
          </div>
        </div>

        {/* 3. PROMO & VOUCHER */}
        <button onClick={() => setIsPromoModalOpen(true)} className={`w-full p-5 rounded-3xl backdrop-blur-3xl border shadow-sm flex items-center justify-between transition-all active:scale-95 group ${appliedPromo ? 'bg-emerald-50/80 border-emerald-200' : 'bg-white/60 border-white hover:bg-white/80'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${appliedPromo ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' : 'bg-emerald-100 text-emerald-600'}`}>
              <Ticket className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className={`text-sm font-bold block ${appliedPromo ? 'text-emerald-700' : 'text-zinc-900'}`}>
                {appliedPromo ? appliedPromo.title : 'Use Promo Code or Voucher'}
              </span>
              {appliedPromo && <span className="text-xs text-emerald-600 font-medium">Applied: -{formatPrice(appliedPromo.amount)}</span>}
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 transition-colors ${appliedPromo ? 'text-emerald-500 group-hover:translate-x-1 transition-transform' : 'text-zinc-300 group-hover:text-zinc-600'}`} />
        </button>

        {/* 4. PAYMENT METHOD */}
        <div className="p-5 rounded-3xl bg-white/60 backdrop-blur-3xl border border-white shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-zinc-500" /> Payment Method
            </h2>
            <button onClick={() => setIsPaymentModalOpen(true)} className="text-xs font-semibold text-blue-600 hover:text-blue-700">Change</button>
          </div>
          <button onClick={() => setIsPaymentModalOpen(true)} className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/50 border border-zinc-200 hover:bg-white/90 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-xl">{selectedPayment.icon}</span>
              <span className="text-sm font-bold text-zinc-900">{selectedPayment.name}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* 5. ORDER SUMMARY */}
        <div className="p-5 rounded-3xl bg-white/60 backdrop-blur-3xl border border-white shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2 mb-2">
            <ReceiptText className="w-4 h-4 text-zinc-500" /> Order Summary
          </h2>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-zinc-600"><span>Subtotal (1 Item)</span><span className="font-medium text-zinc-900">{formatPrice(subTotal)}</span></div>
            <div className="flex justify-between text-zinc-600"><span>Shipping Fee</span><span className="font-medium text-zinc-900">{formatPrice(selectedShipping.price)}</span></div>
            
            <div className="flex justify-between items-center text-zinc-600">
              <div className="flex items-center gap-1.5"><span>Shipping Insurance</span><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /></div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-zinc-900">{formatPrice(2500)}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={insuranceEnabled} onChange={() => setInsuranceEnabled(!insuranceEnabled)} className="sr-only peer" />
                  <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-zinc-900"></div>
                </label>
              </div>
            </div>
            
            <div className="flex justify-between text-zinc-600"><span>Application Fee</span><span className="font-medium text-zinc-900">{formatPrice(platformFee)}</span></div>
            
            {/* Promo Discount Row (Muncul kalau ada promo) */}
            {appliedPromo && (
              <div className="flex justify-between text-emerald-600 pt-2 border-t border-emerald-100">
                <span className="font-semibold flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Discount ({appliedPromo.code})</span>
                <span className="font-bold">- {formatPrice(appliedPromo.amount)}</span>
              </div>
            )}
          </div>
        </div>

        {/* 6. STICKY BOTTOM PAYMENT BAR */}
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-8 tablet:pb-6 bg-white/80 backdrop-blur-2xl border-t border-zinc-200/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Grand Total</span>
              <span className="text-xl tablet:text-2xl font-bold text-zinc-900 leading-none mt-1">{formatPrice(grandTotal)}</span>
            </div>
            <button onClick={handleCheckout} disabled={loading} className="flex-1 tablet:flex-none tablet:w-48 px-6 py-4 bg-zinc-900 text-white rounded-2xl font-bold shadow-xl shadow-zinc-900/20 hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-2 group">
              {loading ? 'Processing...' : <>Pay Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1" /></>}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL: ADDRESS */}
      {/* ========================================== */}
      <div className={`fixed inset-0 z-[100] flex items-end tablet:items-center justify-center transition-all duration-300 ${isAddressModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity ${isAddressModalOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsAddressModalOpen(false)} />
        <div className={`relative w-full tablet:max-w-md bg-white/90 backdrop-blur-3xl tablet:border border-white/60 rounded-t-3xl tablet:rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ease-out ${isAddressModalOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="p-6 border-b border-zinc-200/50 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2"><MapPin className="w-5 h-5" /> Select Address</h2>
            <button onClick={() => setIsAddressModalOpen(false)} className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200"><X className="w-4 h-4" /></button>
          </div>
          <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {addressList.map((addr) => (
              <div 
                key={addr.id} 
                onClick={() => { setSelectedAddress(addr); setIsAddressModalOpen(false); }}
                className={`cursor-pointer p-4 rounded-2xl border transition-all relative ${selectedAddress.id === addr.id ? 'border-zinc-900 bg-zinc-50 shadow-sm' : 'border-zinc-200 bg-white hover:border-zinc-400'}`}
              >
                {selectedAddress.id === addr.id && <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-zinc-900" />}
                <p className="font-bold text-zinc-900 flex items-center gap-2 mb-1">
                  {addr.recipient} <span className="text-[10px] font-semibold bg-zinc-200 px-2 py-0.5 rounded-full">{addr.label}</span>
                </p>
                <p className="text-xs text-zinc-600">{addr.phone}</p>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed pr-6">{addr.full}</p>
              </div>
            ))}
            <button className="w-full py-4 mt-2 border-2 border-dashed border-zinc-300 text-zinc-600 font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors">
              <Plus className="w-4 h-4" /> Add New Address
            </button>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL: SHIPPING METHOD (Bottom Sheet) */}
      {/* ========================================== */}
      <div className={`fixed inset-0 z-[100] flex items-end tablet:items-center justify-center transition-all duration-300 ${isShippingModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity ${isShippingModalOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsShippingModalOpen(false)} />
        <div className={`relative w-full tablet:max-w-md bg-white/90 backdrop-blur-3xl tablet:border border-white/60 rounded-t-3xl tablet:rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ease-out ${isShippingModalOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="p-6 border-b border-zinc-200/50 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2"><Truck className="w-5 h-5" /> Select Shipping</h2>
            <button onClick={() => setIsShippingModalOpen(false)} className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200"><X className="w-4 h-4" /></button>
          </div>
          <div className="p-6 space-y-3">
            {[
              { name: 'Reguler (J&T Express)', est: '20 - 22 Mar', price: 15000 },
              { name: 'Next Day (JNE YES)', est: 'Tomorrow', price: 25000 },
              { name: 'Instant (GoSend)', est: 'Today (3 Hours)', price: 45000 },
            ].map((method) => (
              <button
                key={method.name}
                onClick={() => { setSelectedShipping(method); setIsShippingModalOpen(false); }}
                className={`w-full flex justify-between items-center p-4 rounded-2xl border transition-all ${selectedShipping.name === method.name ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 bg-white hover:border-zinc-400'}`}
              >
                <div className="text-left">
                  <p className="font-bold text-zinc-900">{method.name}</p>
                  <p className="text-xs text-zinc-500">Est. arrived {method.est}</p>
                </div>
                <p className="font-bold text-zinc-900">{formatPrice(method.price)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL: PROMO & VOUCHER */}
      {/* ========================================== */}
      <div className={`fixed inset-0 z-[100] flex items-end tablet:items-center justify-center transition-all duration-300 ${isPromoModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity ${isPromoModalOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsPromoModalOpen(false)} />
        <div className={`relative w-full tablet:max-w-md bg-white/90 backdrop-blur-3xl tablet:border border-white/60 rounded-t-3xl tablet:rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ease-out ${isPromoModalOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="p-6 border-b border-zinc-200/50 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2"><Ticket className="w-5 h-5" /> Vouchers & Promos</h2>
            <button onClick={() => setIsPromoModalOpen(false)} className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200"><X className="w-4 h-4" /></button>
          </div>
          
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            
            {/* Input Manual Kode Promo */}
            <div className="flex gap-2">
              <input 
                type="text" 
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                placeholder="Enter Promo Code" 
                className="flex-1 px-4 py-3 bg-white border border-zinc-300 focus:border-zinc-900 rounded-xl outline-none transition-colors text-sm font-semibold uppercase tracking-wide" 
              />
              <button onClick={handleApplyManualPromo} className="px-5 bg-zinc-900 text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors active:scale-95">Apply</button>
            </div>

            {/* List Voucher / Radio Button Style */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Available Vouchers</p>
              
              {/* Tombol Hapus Promo */}
              {appliedPromo && (
                <button onClick={() => { setAppliedPromo(null); setIsPromoModalOpen(false); }} className="w-full text-left p-4 rounded-2xl border border-red-200 bg-red-50 hover:bg-red-100 transition-colors mb-4">
                  <p className="font-bold text-red-600 text-sm">Remove applied promo</p>
                </button>
              )}

              {promoList.map((promo) => (
                <label 
                  key={promo.id} 
                  className={`cursor-pointer flex items-center justify-between p-4 rounded-2xl border transition-all ${appliedPromo?.id === promo.id ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-zinc-200 bg-white hover:border-zinc-400'}`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Ticket className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900 text-sm mb-0.5">{promo.title}</p>
                      <p className="text-xs text-zinc-500">{promo.desc}</p>
                    </div>
                  </div>
                  
                  {/* Custom Radio Button */}
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-zinc-300 ml-2">
                    <input 
                      type="radio" 
                      name="promo" 
                      className="absolute opacity-0 cursor-pointer w-full h-full"
                      checked={appliedPromo?.id === promo.id}
                      onChange={() => { setAppliedPromo(promo); setIsPromoModalOpen(false); }}
                    />
                    {appliedPromo?.id === promo.id && <div className="w-3 h-3 bg-emerald-500 rounded-full" />}
                  </div>
                </label>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL: PAYMENT METHOD (Bottom Sheet) */}
      {/* ========================================== */}
      <div className={`fixed inset-0 z-[100] flex items-end tablet:items-center justify-center transition-all duration-300 ${isPaymentModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity ${isPaymentModalOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsPaymentModalOpen(false)} />
        <div className={`relative w-full tablet:max-w-md bg-white/90 backdrop-blur-3xl tablet:border border-white/60 rounded-t-3xl tablet:rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ease-out ${isPaymentModalOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="p-6 border-b border-zinc-200/50 flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2"><Wallet className="w-5 h-5" /> Payment Method</h2>
            <button onClick={() => setIsPaymentModalOpen(false)} className="p-2 bg-zinc-100 rounded-full hover:bg-zinc-200"><X className="w-4 h-4" /></button>
          </div>
          <div className="p-6 space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Virtual Account</p>
            {[
              { name: 'BCA Virtual Account', icon: '🏦' },
              { name: 'Mandiri Virtual Account', icon: '🏦' },
            ].map((method) => (
              <button key={method.name} onClick={() => { setSelectedPayment(method); setIsPaymentModalOpen(false); }} className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all ${selectedPayment.name === method.name ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 bg-white hover:border-zinc-400'}`}>
                <span className="text-2xl">{method.icon}</span>
                <span className="font-bold text-zinc-900">{method.name}</span>
              </button>
            ))}
            
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-6 mb-2">E-Wallet</p>
            {[
              { name: 'GoPay', icon: '📱' },
              { name: 'OVO', icon: '📱' },
            ].map((method) => (
              <button key={method.name} onClick={() => { setSelectedPayment(method); setIsPaymentModalOpen(false); }} className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all ${selectedPayment.name === method.name ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 bg-white hover:border-zinc-400'}`}>
                <span className="text-2xl">{method.icon}</span>
                <span className="font-bold text-zinc-900">{method.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}