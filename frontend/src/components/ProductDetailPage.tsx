import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  ShoppingCart,
  ShieldCheck,
  Heart,
  Leaf,
  Globe2,
  Award,
  Sparkles,
  Plane,
  Activity,
  ChevronRight,
  Share2,
  Smile,
  AlertCircle
} from 'lucide-react';
import { Product, CartItem } from '../types';

interface ProductDetailPageProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetail: (product: Product) => void;
  lang: 'vi' | 'en';
  allProducts: Product[];
}

export default function ProductDetailPage({
  product,
  onClose,
  onAddToCart,
  onViewDetail,
  lang,
  allProducts,
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [companionAdded, setCompanionAdded] = useState<Record<string, boolean>>({});

  // Reset page state when product changes
  useEffect(() => {
    setQuantity(1);
    setIsAdded(false);
    setIsDescriptionExpanded(false);
    // Smooth scroll to top of details page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddMain = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleAddCompanion = (compProduct: Product) => {
    onAddToCart(compProduct, 1);
    setCompanionAdded(prev => ({ ...prev, [compProduct.id]: true }));
    setTimeout(() => {
      setCompanionAdded(prev => ({ ...prev, [compProduct.id]: false }));
    }, 1500);
  };

  // Translate category IDs to beautiful human headers
  const categoryNames: Record<string, string> = {
    salmon: lang === 'vi' ? 'Cá Hồi Na Uy' : 'Norwegian Salmon',
    sashimi: lang === 'vi' ? 'Sashimi Chuẩn Vị Nhật' : 'Japanese Sashimi',
    beef: lang === 'vi' ? 'Thịt Bò Nhập Khẩu' : 'Premium Beef',
    seafood: lang === 'vi' ? 'Hải Sản Nhập Khẩu' : 'Imported Seafood',
    combo: lang === 'vi' ? 'Combo Quà Tặng Dinh Dưỡng' : 'Holiday Gift Combos',
    spice: lang === 'vi' ? 'Gia Vị & Nguyên Liệu' : 'Traditional Spices',
    drink: lang === 'vi' ? 'Rượu Vang & Sake' : 'Sake & Premium Drinks',
  };

  const categoryName = categoryNames[product.category] || (lang === 'vi' ? 'Sản phẩm mới' : 'Premium Foods');

  // Find 3 cross-sell companion items (Wasabi, Shoyu, Gari ginger, or Sake depending on category)
  const companionIds = product.category === 'beef'
    ? ['drink-sake-gold', 'drink-soju', 'spice-shoyu']
    : ['spice-wasabi', 'spice-shoyu', 'spice-ginger'];
    
  const companions = allProducts.filter((p) => companionIds.includes(p.id)).slice(0, 3);

  // Suggest 4 products of same category for bottom slider
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-neutral-50/50 min-h-screen py-4 md:py-8 text-left select-none" id="product-detail-view">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        
        {/* Breadcrumb Navigation - Perfectly Matching Seafood design */}
        <nav className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
          <button
            onClick={onClose}
            className="hover:text-red-600 transition-colors uppercase tracking-wider font-semibold cursor-pointer"
          >
            {lang === 'vi' ? 'Trang chủ' : 'Home'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-350" />
          <span className="text-neutral-400">{categoryName}</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-350" />
          <span className="text-neutral-805 font-bold truncate max-w-[200px] sm:max-w-none">
            {lang === 'en' ? (product.nameEn || product.name) : product.name}
          </span>
        </nav>

        {/* Two-Column Core Layout Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl border border-gray-150 p-6 md:p-10 shadow-sm">
          
          {/* Left Column (5/12 width): High-res Full-bleed Cover Image with Premium Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-md flex items-center justify-center group/mainimg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover/mainimg:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Freshness Badge overlay */}
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded-sm tracking-wider shadow-sm">
                {lang === 'vi' ? 'HÀNG BAY ĐẢM BẢO 100%' : 'AIRBORNE GUARANTEED'}
              </div>

              {!product.isInStock && (
                <div className="absolute inset-0 bg-neutral-950/70 flex items-center justify-center backdrop-blur-xs">
                  <span className="bg-red-600 text-white font-black text-xs tracking-widest px-6 py-3 border border-red-500 rounded animate-pulse">
                    {lang === 'vi' ? 'HẾT HÀNG' : 'TEMPORARILY OUT OF STOCK'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Share action button row under image */}
            <div className="flex items-center justify-between px-2 text-neutral-400 text-xs font-mono">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {lang === 'vi' ? 'Không ngậm kháng sinh & hóa chất' : 'Antibiotic & Preservative Free'}
              </span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert(lang === 'vi' ? 'Đã sao chép liên kết sản phẩm!' : 'Product link copied!');
                }}
                className="flex items-center gap-1 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Chia sẻ' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Right Column (7/12 width): Title, Prices, Bought Together, Certificates */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Brand and Availability state row */}
              <div className="flex items-center justify-between text-xs pb-3 border-b border-gray-100">
                <div className="space-x-1">
                  <span className="text-neutral-400 font-medium">{lang === 'vi' ? 'Thương hiệu:' : 'Brand:'}</span>
                  <span className="text-red-600 font-bold">{lang === 'vi' ? 'Chính hãng' : 'Premium Seafood'}</span>
                </div>
                <div className="space-x-1 flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${product.isInStock ? 'bg-emerald-500' : 'bg-red-500 animate-ping'}`} />
                  <span className="text-neutral-400 font-medium">{lang === 'vi' ? 'Tình trạng:' : 'Availability:'}</span>
                  <span className={`${product.isInStock ? 'text-emerald-600' : 'text-red-650'} font-bold`}>
                    {product.isInStock 
                      ? (lang === 'vi' ? 'Còn hàng' : 'In stock') 
                      : (lang === 'vi' ? 'Hết hàng' : 'Out of stock')}
                  </span>
                </div>
              </div>

              {/* Product Full Heading Name */}
              <h1 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight leading-tight">
                {lang === 'en' ? (product.nameEn || product.name) : product.name}
              </h1>

              {/* Package packing specifications unit info */}
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-semibold font-mono pb-2">
                {lang === 'vi' ? `Quy cách đóng gói: ${product.unit}` : `Packaging Spec: ${product.unitEn || product.unit}`}
              </p>

              {/* Big Golden Red Price Tag Box */}
              <div className="bg-red-50/50 p-4 rounded-2xl flex items-baseline gap-3 text-left border border-red-50">
                <span className="text-3xl md:text-4xl font-black text-red-600 font-mono tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded-sm self-center">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Select Quantity Selector Counter Row */}
              <div className="flex items-center gap-4 py-2">
                <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider">
                  {lang === 'vi' ? 'Số lượng:' : 'Quantity:'}
                </span>

                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={!product.isInStock || quantity <= 1}
                    className="px-4 py-2 hover:bg-neutral-50 text-neutral-600 disabled:opacity-40 transition-all font-black text-sm"
                  >
                    -
                  </button>
                  <span className="px-5 py-2 text-sm font-mono font-black text-neutral-900 border-x border-gray-100 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={!product.isInStock}
                    className="px-4 py-2 hover:bg-neutral-50 text-neutral-600 disabled:opacity-40 transition-all font-black text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Core Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={handleAddMain}
                  disabled={!product.isInStock || isAdded}
                  className={`py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-97 cursor-pointer border ${
                    !product.isInStock
                      ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed shadow-none'
                      : isAdded
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-emerald-100'
                      : 'bg-red-600 hover:bg-red-700 border-red-600 text-white hover:shadow-red-500/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{lang === 'vi' ? 'ĐÃ THÊM THÀNH CÔNG!' : 'ADDED SUCCESSFULLY!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4.5 h-4.5" />
                      <span>{lang === 'vi' ? 'MUA CẢM NHẬN NGAY' : 'BUY SENSATIONAL NOW'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    alert(lang === 'vi' ? 'Đã thêm sản phẩm thành công vào Giỏ hàng!' : 'Product added to cart successfully!');
                  }}
                  disabled={!product.isInStock}
                  className="bg-white hover:bg-red-50/35 text-red-600 border-2 border-red-600 py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all active:scale-97 cursor-pointer"
                >
                  {lang === 'vi' ? 'THÊM VÀO GIỎ HÀNG' : 'ADD TO SHOPPING CART'}
                </button>
              </div>
            </div>

            {/* FREQUENTLY BOUGHT TOGETHER (THƯỜNG ĐƯỢC MUA KÈM) SECTION - Perfectly Matching Seafood design */}
            {companions.length > 0 && (
              <div className="border border-neutral-150 rounded-2xl p-5 bg-neutral-50/40 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-gray-250 pb-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{lang === 'vi' ? 'THƯỜNG ĐƯỢC MUA KÈM' : 'FREQUENTLY BOUGHT TOGETHER'}</span>
                  </h3>
                  <span className="text-[10px] text-neutral-400 font-mono">{lang === 'vi' ? 'Gợi ý phù hợp nhất' : 'Highly recommended'}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {companions.map((comp) => (
                    <div key={comp.id} className="bg-white rounded-xl p-3 border border-gray-150 flex md:flex-col items-center justify-between shadow-xs gap-2">
                      <div className="flex md:flex-col items-center gap-2 md:text-center">
                        <img 
                          src={comp.image} 
                          alt={comp.name} 
                          className="w-10 h-10 object-cover rounded-md border border-gray-100" 
                        />
                        <div className="text-left md:text-center">
                          <h4 className="text-[11px] font-bold text-neutral-900 leading-tight line-clamp-2 md:h-8">
                            {lang === 'en' ? (comp.nameEn || comp.name) : comp.name}
                          </h4>
                          <p className="text-[10px] font-mono font-bold text-red-600 mt-0.5">
                            {formatPrice(comp.price)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddCompanion(comp)}
                        className={`w-full text-[10px] font-bold py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
                          companionAdded[comp.id]
                            ? 'bg-emerald-600 text-white'
                            : 'bg-red-50 hover:bg-red-100 text-red-600'
                        }`}
                      >
                        {companionAdded[comp.id] 
                          ? (lang === 'vi' ? '✓ Đã thêm' : '✓ Added') 
                          : (lang === 'vi' ? 'Thêm vào giỏ' : 'Add to cart')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Certificate assurances grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="bg-neutral-50 px-3 py-2.5 rounded-xl border border-gray-100 flex items-center gap-2.5">
                <Plane className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-extrabold text-neutral-700 leading-tight">
                  {lang === 'vi' ? 'Nhập khẩu trực tiếp' : 'Direct Air Import'}
                </span>
              </div>
              <div className="bg-neutral-50 px-3 py-2.5 rounded-xl border border-gray-100 flex items-center gap-2.5">
                <Award className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-extrabold text-neutral-700 leading-tight">
                  {lang === 'vi' ? 'Chứng nhận ATTP' : 'Safety Certified'}
                </span>
              </div>
              <div className="bg-neutral-50 px-3 py-2.5 rounded-xl border border-gray-100 flex items-center gap-2.5">
                <Leaf className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-extrabold text-neutral-700 leading-tight">
                  {lang === 'vi' ? 'Tươi ngon mỗi ngày' : 'Ultra Fresh Daily'}
                </span>
              </div>
              <div className="bg-neutral-50 px-3 py-2.5 rounded-xl border border-gray-100 flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-extrabold text-neutral-700 leading-tight">
                  {lang === 'vi' ? 'An toàn sức khoẻ' : 'Healthy Organic'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Info collapse element below */}
        <div className="bg-white rounded-2xl border border-gray-150 p-6 md:p-8 space-y-6 shadow-sm">
          <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-900 border-l-4 border-red-600 pl-3">
              {lang === 'vi' ? 'THÔNG TIN CHI TIẾT SẢN PHẨM' : 'DETAILED SPECIFICATIONS'}
            </h2>
            <span className="text-xs text-neutral-500 font-mono">
              ★ {lang === 'vi' ? 'Cam kết chất lượng Seafood Premium' : 'Quality Assurance Guaranteed'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-2.5 border-b border-gray-100 text-sm">
              <span className="font-bold text-neutral-600 min-w-[120px]">{lang === 'vi' ? 'Xuất xứ:' : 'Origin Country:'}</span>
              <span className="text-neutral-800 font-medium">
                {lang === 'en' ? (product.originEn || product.origin) : product.origin}
              </span>
            </div>

            <div className="space-y-2 text-sm leading-relaxed text-neutral-700">
              <span className="block font-bold text-neutral-600 mb-1">{lang === 'vi' ? 'Đặc tính sản phẩm:' : 'Product Description:'}</span>
              
              <div className={`transition-all duration-300 relative overflow-hidden ${!isDescriptionExpanded ? 'max-h-24' : 'max-h-[1000px]'}`}>
                <p className="whitespace-pre-line text-neutral-700 text-sm leading-relaxed font-sans">
                  {lang === 'en' ? (product.descriptionEn || product.description) : product.description}
                </p>
                
                {((lang === 'en' && product.specsEn && product.specsEn.length > 0) || (product.specs && product.specs.length > 0)) && (
                  <div className="mt-4 space-y-2">
                    <p className="font-bold text-xs text-red-600 uppercase tracking-widest">{lang === 'vi' ? 'Hướng dẫn bảo quản & Sử dụng:' : 'Storage & Handlings:'}</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600">
                      {(lang === 'en' && product.specsEn ? product.specsEn : product.specs || []).map((spec, idx) => (
                        <li key={idx}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Fade effect if collapsed */}
                {!isDescriptionExpanded && (
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
                )}
              </div>

              {/* Toggle expansion button */}
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-xs text-red-650 font-black tracking-wider uppercase bg-red-50 hover:bg-red-100/70 px-4 py-2 rounded-full mt-3 transition-colors cursor-pointer"
              >
                {isDescriptionExpanded 
                  ? (lang === 'vi' ? 'Thu gọn bài viết ▴' : 'Show less description ▴') 
                  : (lang === 'vi' ? 'Xem thêm thông tin ▾' : 'Read full descriptions ▾')}
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS (SẢN PHẨM GỢI Ý) - Beautiful horizontal row */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex border-b-2 border-red-600 pb-2.5 items-end justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-6 bg-red-600 rounded-sm"></div>
                <h3 className="text-lg md:text-xl font-black text-neutral-900 uppercase tracking-tight">
                  {lang === 'vi' ? 'SẢN PHẨM GỢI Ý PHÙ HỢP' : 'SUGGESTED COMBOS & RELATED ITEMS'}
                </h3>
              </div>
              <span className="text-neutral-400 text-xs font-mono">{lang === 'vi' ? 'Xem thêm các dòng tương tự' : 'Browse matching series'}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => onViewDetail(p)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-150 hover:border-red-300 hover:shadow-lg transition-all duration-200 cursor-pointer p-4 text-left flex flex-col justify-between group relative"
                >
                  <div className="space-y-3.5">
                    {/* Image box */}
                    <div className="aspect-square bg-white border border-neutral-200/80 rounded-xl overflow-hidden flex items-center justify-center relative">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Metadata details */}
                    <div>
                      <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                        {lang === 'en' ? (p.originEn || p.origin) : p.origin} / {lang === 'en' ? (p.unitEn || p.unit) : p.unit}
                      </p>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug line-clamp-2 uppercase min-h-10 mt-1">
                        {lang === 'en' ? (p.nameEn || p.name) : p.name}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4 font-mono">
                    <p className="text-sm sm:text-base font-black text-red-600">{formatPrice(p.price)}</p>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p, 1);
                        alert(lang === 'vi' ? 'Đã thêm thành công!' : 'Added successfully!');
                      }}
                      className="w-full bg-red-600 hover:bg-neutral-900 text-white py-2 rounded-lg text-[10px] font-black uppercase text-center transition-colors cursor-pointer"
                    >
                      {lang === 'vi' ? 'THÊM VÀO GIỎ' : 'ADD TO BASKET'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
