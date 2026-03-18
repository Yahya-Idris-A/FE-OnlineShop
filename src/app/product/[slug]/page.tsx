import type { Metadata } from "next";
import { Store, Star, ShieldCheck } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductActions from "@/components/product/ProductActions";

// Perhatikan tipe datanya, params sekarang dibungkus Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// Hit API Go kamu pakai slug di sini nanti
async function getProductDetailBySlug(slug: string) {
  return {
    id: "prod-123", // ID tetap direturn dari backend untuk transaksi
    slug: slug,
    name: "Mechanical Keyboard Keychron K2 Wireless",
    price: 1350000,
    merchantName: "Tech Gear Official",
    rating: 4.8,
    sold: 1250,
    stock: 1,
    description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id ante in mi varius lobortis. Nam cursus quis nisi quis faucibus. Morbi consectetur tortor at est luctus consequat a sed sem. Nulla nec sem eget nulla lacinia lacinia vitae ac ex. Aliquam suscipit, massa placerat porttitor laoreet, est libero lacinia lorem, gravida ultrices leo purus dictum enim. Cras porta dictum orci ut tincidunt. Fusce eu neque est. Aenean pulvinar, sem id gravida consequat, enim neque bibendum mauris, eget pellentesque leo lectus et odio. Aenean hendrerit, leo a faucibus vehicula, ipsum nunc elementum risus, aliquam suscipit dolor urna at leo. Nullam nec turpis quis nisi accumsan venenatis. In vehicula id neque vitae accumsan. Suspendisse nec hendrerit massa. Maecenas lobortis fermentum velit quis eleifend.

    Duis pretium vitae elit at consectetur. Pellentesque lectus nisl, molestie eu pellentesque at, pellentesque ac quam. Aliquam sit amet dictum est. Proin id eros mi. Nam posuere sem eget erat rutrum, quis tempus enim semper. Nulla egestas massa eget mi scelerisque, at pulvinar diam pulvinar. Proin vitae arcu nec ante faucibus placerat. Morbi sagittis in urna sit amet pellentesque. Curabitur et bibendum nisl. Phasellus nisi libero, facilisis at nisi nec, fermentum molestie leo. Donec at metus in sapien ullamcorper sodales. Vestibulum accumsan ante in justo aliquet, ut maximus enim mattis. Donec dapibus est ipsum, quis elementum ligula sagittis luctus. Sed ac neque tincidunt, sagittis ex eget, rhoncus ipsum. Mauris at erat urna. Nullam posuere lacus at justo suscipit lobortis. `,
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=1000&q=80",
      "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=1000&q=80",
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Wajib di-await dulu
  const resolvedParams = await params;
  const product = await getProductDetailBySlug(resolvedParams.slug);
  return { title: `${product.name} | AsyuraCommerce` };
}

export default async function ProductDetailPage({ params }: Props) {
  // Wajib di-await dulu
  const resolvedParams = await params;
  const product = await getProductDetailBySlug(resolvedParams.slug);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="pt-2 tablet:pt-6 pb-28 tablet:pb-10">
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-8 desktop:gap-12">
        <div className="tablet:sticky tablet:top-24 h-fit z-10">
          <ProductGallery product={{ id: product.id, name: product.name, price: product.price, merchantName: product.merchantName, imageUrl: product.images[0] }} images={product.images} />
        </div>

        <div className="flex flex-col space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl tablet:text-3xl font-bold text-zinc-900 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-1 text-zinc-900">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                {product.rating}
              </span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-600">{product.sold} Sold</span>
            </div>
            <p className="text-3xl font-bold text-zinc-900">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center border border-white">
                <Store className="w-6 h-6 text-zinc-500" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
                  Sold By
                </p>
                <p className="text-sm font-bold text-zinc-900">
                  {product.merchantName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" /> Official
            </div>
          </div>

          <div className="pt-6 tablet:border-t border-zinc-200/50">
            <ProductActions
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                merchantName: product.merchantName,
                imageUrl: product.images[0],
                stock: product.stock,
              }}
            />
          </div>

          <div className="pt-4 border-t border-zinc-200/50">
            <h3 className="text-lg font-bold text-zinc-900 mb-3">
              Description
            </h3>
            <div className="prose prose-sm prose-zinc text-zinc-600 whitespace-pre-line">
              {product.description}
            </div>
          </div>

          <div className="hidden tablet:block flex-1" />
        </div>
      </div>
    </div>
  );
}
