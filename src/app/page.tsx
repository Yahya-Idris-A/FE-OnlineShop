import ProductCard from '@/components/product/ProductCard';

// Dummy data sementara untuk simulasi sebelum API Go kamu siap
const RANDOM_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Mechanical Keyboard Keychron K2 Wireless Bluetooth',
    price: 1350000,
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80',
    merchantName: 'Tech Gear Official',
  },
  {
    id: 'prod-2',
    name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    price: 4500000,
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
    merchantName: 'Audioholic ID',
  },
  {
    id: 'prod-3',
    name: 'Minimalist Wooden Desk Setup Organizer',
    price: 250000,
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80',
    merchantName: 'WoodCrafter',
  },
  {
    id: 'prod-4',
    name: 'Stainless Steel Insulated Water Bottle 1L',
    price: 180000,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    merchantName: 'EcoLifestyle',
  },
  {
    id: 'prod-5',
    name: 'Logitech MX Master 3S Wireless Mouse',
    price: 1650000,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    merchantName: 'Tech Gear Official',
  },
  {
    id: 'prod-6',
    name: 'Essential Cotton T-Shirt Oversized Black',
    price: 120000,
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80',
    merchantName: 'Basic Wear',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6 pt-2">
      {/* Judul Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg tablet:text-xl font-bold text-zinc-900">
          Recommended for You
        </h1>
      </div>

      {/* Grid Produk dengan pedoman Mobile-First */}
      <div className="grid grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-5 gap-3 tablet:gap-4">
        {RANDOM_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            merchantName={product.merchantName}
          />
        ))}
      </div>
    </div>
  );
}