'use client';

import { useState } from 'react';
import { MapPin, Plus, CheckCircle2, Trash2, Edit2, X, LocateFixed, Navigation } from 'lucide-react';

type Address = {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  fullAddress: string;
  isPrimary: boolean;
};

const INITIAL_ADDRESSES: Address[] = [
  { id: 'addr-1', label: 'Home', recipient: 'Yahya Idris Abdurrahman', phone: '081234567890', fullAddress: 'Jl. Sudirman No. 123, Senayan...', isPrimary: true },
  { id: 'addr-2', label: 'Office', recipient: 'Yahya (WeCore)', phone: '089876543210', fullAddress: 'Gedung Cyber 2 Tower Lt. 15...', isPrimary: false }
];

export default function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSetPrimary = (id: string) => {
    setAddresses(prev => prev.map(addr => ({ ...addr, isPrimary: addr.id === id })));
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  // Fungsi pura-pura save ke state agar auto-update
  const handleSaveNewAddress = (newAddr: Omit<Address, 'id'>) => {
    const newAddress: Address = { ...newAddr, id: `addr-${Date.now()}` };
    setAddresses(prev => [...prev, newAddress]);
    setIsModalOpen(false); // Tutup modal setelah save
  };

  return (
    <div className="space-y-6 pb-24 tablet:pb-8">
      
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 p-4 rounded-3xl bg-zinc-900 text-white font-semibold shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 transition-all active:scale-95"
      >
        <Plus className="w-5 h-5" /> Add New Address
      </button>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className={`relative p-5 rounded-3xl bg-white/60 backdrop-blur-3xl border transition-all shadow-sm ${address.isPrimary ? 'border-zinc-900 ring-1 ring-zinc-900 shadow-md' : 'border-white hover:border-zinc-300'}`}>
            {address.isPrimary && (
              <div className="absolute top-0 right-5 -translate-y-1/2 flex items-center gap-1 px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm"><CheckCircle2 className="w-3.5 h-3.5" /> Primary</div>
            )}
            <div className="flex items-start gap-4">
              <div className={`p-2.5 rounded-full shrink-0 ${address.isPrimary ? 'bg-zinc-100 text-zinc-900' : 'bg-white text-zinc-400 border border-zinc-100'}`}><MapPin className="w-6 h-6" /></div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-zinc-900">{address.recipient}</h3>
                  <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[10px] font-semibold uppercase tracking-wider">{address.label}</span>
                </div>
                <p className="text-sm font-medium text-zinc-600">{address.phone}</p>
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{address.fullAddress}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-200/50">
              <div className="flex items-center gap-2">
                <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"><Edit2 className="w-4 h-4" /></button>
                {!address.isPrimary && <button onClick={() => handleDelete(address.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-4 h-4" /></button>}
              </div>
              {!address.isPrimary && (
                <button onClick={() => handleSetPrimary(address.id)} className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 text-xs font-semibold rounded-full hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-95 shadow-sm">Set as Primary</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <AddAddressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveNewAddress} />
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: ADD ADDRESS MODAL DENGAN MAPS
// ==========================================
function AddAddressModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (addr: Omit<Address, 'id'>) => void }) {
  const [loading, setLoading] = useState(false);

  // State form
  const [label, setLabel] = useState('');
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [fullAddress, setFullAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSave({ label: label || 'Other', recipient, phone, fullAddress, isPrimary: false });
      // Reset form
      setLabel(''); setRecipient(''); setPhone(''); setFullAddress('');
    }, 800);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-end tablet:items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      
      <div className={`relative w-full tablet:max-w-md bg-white/90 backdrop-blur-3xl tablet:border border-white/60 rounded-t-3xl tablet:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] transition-all duration-300 ease-out ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-full tablet:translate-y-10 tablet:scale-95'}`}>
        
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-zinc-200/50">
          <h2 className="text-lg font-bold text-zinc-900">Add New Address</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* MAPS AREA */}
          <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-white shadow-sm group cursor-pointer bg-zinc-100">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Map" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative -top-4 animate-bounce">
                <div className="bg-zinc-900 text-white p-2.5 rounded-full shadow-xl"><MapPin className="w-6 h-6" /></div>
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-1 bg-black/20 rounded-[100%] blur-[2px]" />
              </div>
            </div>
            <button type="button" className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-zinc-700 hover:text-blue-600"><Navigation className="w-4 h-4" /></button>
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-2.5 rounded-xl text-xs font-semibold text-zinc-700 flex items-center justify-between border border-white">
              <span className="flex items-center gap-1.5 line-clamp-1"><LocateFixed className="w-3.5 h-3.5 text-blue-500 shrink-0" /> Set Pinpoint</span>
            </div>
          </div>

          <form id="addressForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Label</label>
                <input required value={label} onChange={e => setLabel(e.target.value)} type="text" placeholder="e.g. Kosan" className="w-full px-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Recipient</label>
                <input required value={recipient} onChange={e => setRecipient(e.target.value)} type="text" placeholder="Name" className="w-full px-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Phone Number</label>
              <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="08..." className="w-full px-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">Full Address</label>
              <textarea required value={fullAddress} onChange={e => setFullAddress(e.target.value)} rows={3} placeholder="Street, block, details..." className="w-full px-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 text-sm resize-none" />
            </div>
          </form>

        </div>

        <div className="shrink-0 p-4 border-t border-zinc-200/50 bg-white/40 backdrop-blur-xl rounded-b-3xl pb-safe">
          <button form="addressForm" type="submit" disabled={loading} className="w-full py-3.5 bg-zinc-900 text-white rounded-2xl font-semibold shadow-md hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-70">
            {loading ? 'Saving...' : 'Save Address'}
          </button>
        </div>

      </div>
    </div>
  );
}