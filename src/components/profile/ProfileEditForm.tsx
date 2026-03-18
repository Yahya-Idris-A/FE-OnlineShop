"use client";

import { useState, useRef, useCallback } from "react";
import {
  Camera,
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  X,
  ZoomIn,
} from "lucide-react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";

export default function ProfileEditForm() {
  const [loading, setLoading] = useState(false);

  // State Avatar & Cropper
  const [avatarPreview, setAvatarPreview] = useState(
    "https://ui-avatars.com/api/?name=Yahya+Idris&background=18181b&color=fff&size=256",
  );
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Default value menggunakan data dummy (bisa disesuaikan nanti dengan data dari backend)
  const [name, setName] = useState("Yahya Idris Abdurrahman");
  const [email, setEmail] = useState("yahya@example.com");
  const [phone, setPhone] = useState("081234567890");

  // State untuk password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Trigger saat user pilih file foto
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImageToCrop(imageUrl); // Buka modal cropper
      e.target.value = ""; // Reset input
    }
  };

  // 2. Simpan koordinat saat user geser-geser foto
  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  // 3. Eksekusi pemotongan gambar saat klik "Save Crop"
  const handleSaveCrop = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;
    setLoading(true);

    try {
      // Dapatkan file hasil crop dari utility Canvas
      const croppedFile = await getCroppedImg(imageToCrop, croppedAreaPixels);
      if (croppedFile) {
        // Buat URL untuk preview di UI
        setAvatarPreview(URL.createObjectURL(croppedFile));

        // TODO: Simpan `croppedFile` ini ke dalam FormData untuk dikirim ke Backend Go nanti
        // const formData = new FormData();
        // formData.append('avatar', croppedFile);
        // await api.put('/profile/avatar', formData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setImageToCrop(null); // Tutup modal
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulasi API hit untuk update profile
    setTimeout(() => {
      setLoading(false);
      alert("Profile updated successfully!"); // Nanti ganti pakai Toast
    }, 1000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;

    setLoading(true);
    // Simulasi API hit untuk ganti password
    setTimeout(() => {
      setLoading(false);
      setCurrentPassword("");
      setNewPassword("");
      alert("Password changed successfully!"); // Nanti ganti pakai Toast
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-24 tablet:pb-8">
      {/* SECTION 1: PERSONAL INFORMATION */}
      <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-3xl border border-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <h2 className="text-base font-bold text-zinc-900 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-zinc-500" />
          Personal Information
        </h2>

        {/* Area Edit Avatar */}
        <div className="flex flex-col items-center mb-8">
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative group cursor-pointer"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-zinc-100">
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
              />
            </div>
            <div className="absolute bottom-0 right-0 p-2 bg-zinc-900 text-white rounded-full shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-3 font-medium">
            Tap to change photo
          </p>
        </div>

        {/* Form Personal Info */}
        <form
          id="profileForm"
          onSubmit={handleSaveProfile}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-zinc-900 text-white rounded-2xl font-semibold shadow-md hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* SECTION 2: SECURITY & PASSWORD */}
      <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-3xl border border-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <h2 className="text-base font-bold text-zinc-900 mb-6 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-zinc-500" />
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide px-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-white/50 border border-white/60 focus:bg-white/90 rounded-2xl outline-none focus:ring-4 focus:ring-zinc-900/5 transition-all text-sm text-zinc-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !currentPassword || !newPassword}
            className="w-full py-3.5 mt-2 bg-white border border-zinc-200 text-zinc-900 rounded-2xl font-semibold shadow-sm hover:bg-zinc-50 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
      {/* ========================================== */}
      {/* MODAL CROPPER IMAGE (APPLE LIQUID GLASS) */}
      {/* ========================================== */}
      {imageToCrop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/90 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[70vh] tablet:h-[80vh]">
            {/* Header Modal */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-zinc-200/50 bg-white z-10">
              <h3 className="text-lg font-bold text-zinc-900">
                Adjust Profile Picture
              </h3>
              <button
                onClick={() => setImageToCrop(null)}
                className="p-2 -mr-2 text-zinc-400 hover:text-zinc-900 bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Area Cropper (React Easy Crop) */}
            <div className="relative flex-1 bg-zinc-100">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1} // Rasio 1:1
                cropShape="round" // Tampilan area crop bulat
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            {/* Area Kontrol & Tombol Save Bawah */}
            <div className="shrink-0 p-6 bg-white border-t border-zinc-200/50 z-10 space-y-6">
              {/* Slider Zoom */}
              <div className="flex items-center gap-4">
                <ZoomIn className="w-5 h-5 text-zinc-400 shrink-0" />
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                />
              </div>

              <button
                onClick={handleSaveCrop}
                disabled={loading}
                className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-semibold shadow-md hover:bg-zinc-800 transition-all active:scale-95"
              >
                {loading ? "Processing..." : "Save Picture"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
