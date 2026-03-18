// src/utils/cropImage.ts

// Fungsi untuk membuat elemen gambar (Image Object) dari URL/File
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); 
    image.src = url;
  });

// Fungsi utama untuk memotong gambar menggunakan Canvas
export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<File | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  // Set ukuran canvas sesuai area yang di-crop (1:1 / Persegi)
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Gambar potongan ke dalam canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Ubah canvas menjadi file blob (siap dikirim ke backend Go)
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(null);
        return;
      }
      // Beri nama unik untuk file hasil crop
      const file = new File([blob], `avatar-${Date.now()}.jpg`, { type: 'image/jpeg' });
      resolve(file);
    }, 'image/jpeg');
  });
}