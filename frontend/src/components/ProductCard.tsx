import React, { useState } from 'react';
import { ShoppingCart, Eye, Star, Globe2 } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: any;
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetail: (product: Product) => void;
  lang: 'vi' | 'en';
}

export default function ProductCard({ product, onAddToCart, onViewDetail, lang }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.isInStock) return;
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  // Determine discount percentage
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <div
      onClick={() => onViewDetail(product)}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-red-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer relative h-full"
    >
      {/* Upper section: Image & Badges */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Gray outline gradient */}
        <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-all" />

        {/* Discount ribbon */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-sm shadow-xs z-10">
            -{discountPercent}%
          </div>
        )}

        {/* Origin / Supplier Tag */}
        <div className="absolute top-2 right-2 bg-neutral-950/85 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <Globe2 className="w-3 h-3 text-red-400" />
          <span>{lang === 'en' ? (product.originEn || product.origin) : product.origin}</span>
        </div>

        {/* Over-the-image hover utility bar */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(product);
            }}
            className="w-10 h-10 bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 active:scale-95"
            title={lang === 'vi' ? 'Xem chi tiết' : 'View details'}
          >
            <Eye className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Out of Stock overlay overlay */}
        {!product.isInStock && (
          <div className="absolute inset-0 bg-neutral-950/65 backdrop-blur-xs flex items-center justify-center z-10">
            <span className="bg-neutral-900 text-orange-400 font-extrabold text-xs tracking-widest px-4 py-1.5 border border-orange-400 rounded-sm">
              {lang === 'vi' ? 'HẾT HÀNG' : 'SOLD OUT'}
            </span>
          </div>
        )}
      </div>

      {/* Lower section: Information & Action buttons */}
      <div className="p-4 flex flex-col justify-between flex-1 text-left">
        <div>
          {/* Rating star mock & Spec unit */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-gray-400">
              {lang === 'en' ? (product.unitEn || product.unit) : product.unit}
            </span>
            <div className="flex items-center gap-0.5" title="Review rating">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-bold text-neutral-600 font-mono">4.9</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-neutral-900 group-hover:text-red-600 transition line-clamp-2 leading-snug mb-2 min-h-[40px]">
            {lang === 'en' ? (product.nameEn || product.name) : product.name}
          </h3>
        </div>

        <div>
          {/* Price Tag indicators */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-black text-red-600 font-mono">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-mono">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Interactive add button actions */}
          <button
            onClick={handleQuickAdd}
            disabled={!product.isInStock}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-97 cursor-pointer ${
              !product.isInStock
                ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed'
                : isAdding
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 hover:border-transparent hover:shadow-md hover:shadow-red-500/10'
            }`}
          >
            {isAdding ? (
              <span className="flex items-center gap-1.5">
                <span>✓</span>
                <span>{lang === 'vi' ? 'ĐÃ THÊM' : 'ADDED TO CART'}</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <ShoppingCart className="w-4 h-4" />
                <span>{lang === 'vi' ? 'THÊM VÀO GIỎ' : 'ADD TO CART'}</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
