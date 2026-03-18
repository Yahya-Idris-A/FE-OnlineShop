'use client';

import { useState } from 'react';
import { CreditCard, Plus, Trash2, Smartphone, ShieldCheck, CheckCircle2, X, User, Calendar, Lock } from 'lucide-react';

export default function PaymentMethodsList() {
  const [cards, setCards] = useState([
    { id: 'card-1', type: 'Mastercard', last4: '4242', exp: '12/28', name: 'Yahya Idris', isDefault: true },
    { id: 'card-2', type: 'Visa', last4: '8899', exp: '08/27', name: 'Yahya', isDefault: false },
  ]);

  const [wallets] = useState([
    { id: 'ewallet-1', name: 'GoPay', phone: '0812****7890', connected: true },
    { id: 'ewallet-2', name: 'OVO', phone: 'Not connected', connected: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
  };

  // Fungsi untuk menyimpan kartu baru dari modal
  const handleSaveNewCard = (newCard: any) => {
    setCards(prev => [...prev, { ...newCard, id: `card-${Date.now()}` }]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-24 tablet:pb-8 relative">
      
      {/* SECTION 1: SAVED CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-zinc-500" />
            Saved Cards
          </h2>
          {/* Tombol Add Card sekarang membuka Modal */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 transition-colors flex items-center gap-1 active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Card
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 px-2 custom-scrollbar snap-x">
          {cards.map((card) => (
            <div key={card.id} className="snap-center shrink-0 w-[280px] tablet:w-[320px] rounded-3xl p-6 relative overflow-hidden text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-1">
              
              {/* Background Card Dinamis */}
              <div className={`absolute inset-0 ${card.type === 'Mastercard' ? 'bg-gradient-to-br from-zinc-800 to-black' : 'bg-gradient-to-br from-blue-800 to-blue-950'}`} />
              {/* Efek Pantulan Kaca */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 opacity-50" />
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

              <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
                <div className="flex items-start justify-between">
                  <span className="text-lg font-bold italic tracking-wider opacity-90">{card.type}</span>
                  {card.isDefault && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold bg-white/20 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
                      <CheckCircle2 className="w-3 h-3" /> Default
                    </span>
                  )}
                </div>

                <div className="space-y-4 mt-6">
                  <div className="font-mono text-xl tracking-[0.2em] drop-shadow-md">
                    •••• •••• •••• {card.last4}
                  </div>
                  
                  <div className="flex justify-between items-end text-sm opacity-80">
                    <div>
                      <p className="text-[8px] uppercase tracking-widest opacity-70 mb-0.5">Cardholder</p>
                      <p className="font-semibold tracking-wide truncate max-w-[120px]">{card.name}</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-widest opacity-70 mb-0.5">Expires</p>
                      <p className="font-semibold tracking-wide">{card.exp}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                {!card.isDefault && (
                  <button onClick={() => handleSetDefault(card.id)} className="px-4 py-2 bg-white text-zinc-900 rounded-full text-xs font-semibold hover:bg-zinc-100 active:scale-95 transition-all">
                    Set Default
                  </button>
                )}
                <button onClick={() => handleDeleteCard(card.id)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 active:scale-95 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: E-WALLETS */}
      <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-3xl border border-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
        <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-zinc-500" /> Linked E-Wallets
        </h2>
        {wallets.map((wallet) => (
          <div key={wallet.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-white/60 shadow-sm transition-all hover:border-zinc-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200"><Smartphone className="w-5 h-5 text-zinc-600" /></div>
              <div>
                <p className="text-sm font-bold text-zinc-900">{wallet.name}</p>
                <p className={`text-xs ${wallet.connected ? 'text-zinc-500' : 'text-rose-500'}`}>{wallet.phone}</p>
              </div>
            </div>
            {wallet.connected ? (
              <button className="text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors">Unlink</button>
            ) : (
              <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 transition-colors">Link Now</button>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-zinc-400 mt-8">
        <ShieldCheck className="w-4 h-4" />
        <p className="text-xs font-medium">Your payment information is securely encrypted.</p>
      </div>

      {/* Panggil Modal Add Card */}
      <AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveNewCard} />

    </div>
  );
}

// ==========================================
// SUB-COMPONENT: ADD CARD MODAL
// ==========================================
function AddCardModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (card: any) => void }) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Format nomor kartu otomatis (spasi tiap 4 angka)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Hapus selain angka
    const formatted = value.replace(/(.{4})/g, '$1 ').trim(); // Beri spasi tiap 4 digit
    if (value.length <= 16) setCardNumber(formatted);
  };

  // Format expiry otomatis (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setExpiry(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      // Ambil 4 digit terakhir dan tentukan tipe kartu asal-asalan untuk visual
      const last4 = cardNumber.replace(/\s/g, '').slice(-4);
      const type = cardNumber.startsWith('4') ? 'Visa' : 'Mastercard';
      
      onSave({ type, last4, exp: expiry, name: cardName, isDefault: false });
      
      // Reset Form
      setCardNumber(''); setCardName(''); setExpiry(''); setCvv('');
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-end tablet:items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      
      <div className={`absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      
      <div className={`relative w-full tablet:max-w-md bg-white/90 backdrop-blur-3xl tablet:border border-white/60 rounded-t-3xl tablet:rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ease-out ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-full tablet:translate-y-10 tablet:scale-95'}`}>
        
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-zinc-200/50">
          <h2 className="text-lg font-bold text-zinc-900">Add New Card</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form id="addCardForm" onSubmit={handleSubmit} className="p-6 space-y-5 flex-1">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Card Number</label>
            <div className="relative group">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
              <input type="text" required value={cardNumber} onChange={handleCardNumberChange} placeholder="0000 0000 0000 0000" className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm font-mono text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Cardholder Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
              <input type="text" required value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="JOHN DOE" className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm uppercase text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Expiry Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input type="text" required value={expiry} onChange={handleExpiryChange} placeholder="MM/YY" className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm font-mono text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">CVV / CVC</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                <input type="password" required maxLength={3} value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, ''))} placeholder="123" className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm font-mono tracking-widest text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]" />
              </div>
            </div>
          </div>

        </form>

        <div className="shrink-0 p-4 border-t border-zinc-200/50 bg-white/40 backdrop-blur-xl rounded-b-3xl pb-safe">
          <button form="addCardForm" type="submit" disabled={loading} className="w-full py-3.5 bg-zinc-900 text-white rounded-2xl font-semibold shadow-md hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-70">
            {loading ? 'Verifying Card...' : 'Save Card'}
          </button>
        </div>

      </div>
    </div>
  );
}