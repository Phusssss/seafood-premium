import React, { useState } from 'react';
import { X, Trash2, Ticket, Sparkles, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, Voucher } from '../types';
import { validateVoucher } from '../api';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedCheckout: (voucher: Voucher | null) => void;
  lang: 'vi' | 'en';
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  lang,
}: CartDrawerProps) {
  const [voucherCode, setVoucherCode] = useState('');
  const [activeVoucher, setActiveVoucher] = useState<Voucher | null>(null);
  const [voucherError, setVoucherError] = useState('');
  const [addFreeSashimiKit, setAddFreeSashimiKit] = useState(true);

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  // Math totals
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Free delivery limit: 1M or flat 50k
  const shippingFee = subtotal >= 1000000 || subtotal === 0 ? 0 : 50000;

  // Apply voucher algorithms
  let discount = 0;
  if (activeVoucher) {
    if (subtotal >= activeVoucher.minOrderValue) {
      if (activeVoucher.discountType === 'flat') {
        discount = activeVoucher.value;
      } else {
        discount = Math.min((subtotal * activeVoucher.value) / 100, 100000); // max discount 100k
      }
    } else {
      // Order value fell below min value after item removals
      setActiveVoucher(null);
    }
  }

  const grandTotal = Math.max(subtotal - discount + shippingFee, 0);

  const handleApplyVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');

    try {
      const result = await validateVoucher(voucherCode.trim().toUpperCase(), subtotal);
      if (result.valid && result.voucher) {
        setActiveVoucher(result.voucher);
        setVoucherCode('');
      } else {
        setVoucherError(result.error || (lang === 'vi' ? 'Mã giảm giá không hợp lệ!' : 'Invalid voucher code!'));
      }
    } catch {
      setVoucherError(lang === 'vi' ? 'Lỗi kết nối, vui lòng thử lại!' : 'Connection error, please try again!');
    }
  };

  const handleRemoveVoucher = () => {
    setActiveVoucher(null);
  };

  // Check if any sashimi or salmon inside
  const hasSashimiOrSalmon = cart.some((item) => ['sashimi', 'salmon'].includes(item.product.category));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
        {/* Header Drawer strip */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-base text-neutral-900 uppercase tracking-tight">
              {lang === 'vi' ? 'GIỎ HÀNG CỦA BẠN' : 'YOUR SHOPPING CART'}
            </h3>
            <span className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold font-mono">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-gray-400 hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list of Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-neutral-800 text-sm mb-1">
                {lang === 'vi' ? 'Chưa có sản phẩm nào!' : 'Your cart is empty!'}
              </h4>
              <p className="text-xs text-neutral-400 max-w-[240px]">
                {lang === 'vi' ? 'Hãy khám phá các món ăn tươi ngon béo ngậy Na Uy!' : 'Browse and add fresh seafood items!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 bg-neutral-50 p-2.5 rounded-xl border border-gray-100 relative group"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Item metadata */}
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[9px] uppercase font-bold text-red-600 font-mono tracking-widest leading-none">
                          {lang === 'en' ? (item.product.originEn || item.product.origin) : item.product.origin}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-gray-300 hover:text-red-600 transition"
                          title={lang === 'vi' ? 'Xóa sản phẩm' : 'Delete item'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="text-xs font-bold text-neutral-900 line-clamp-1 mt-0.5 leading-snug">
                        {lang === 'en' ? (item.product.nameEn || item.product.name) : item.product.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-semibold">
                        {lang === 'en' ? (item.product.unitEn || item.product.unit) : item.product.unit}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-1">
                      {/* Increment decrement buttons */}
                      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(item.quantity - 1, 1))}
                          className="px-2 py-0.5 hover:bg-neutral-50 text-neutral-600 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-neutral-900 border-x border-gray-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-neutral-50 text-neutral-600 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Line total price */}
                      <span className="text-sm font-bold text-neutral-900 font-mono">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Free sashimi premium package checkbox */}
              {hasSashimiOrSalmon && (
                <div className="bg-red-50/50 p-3.5 rounded-xl border border-red-100 flex items-start gap-2.5 text-left mt-4">
                  <input
                    type="checkbox"
                    id="freeSashimiKit"
                    checked={addFreeSashimiKit}
                    onChange={(e) => setAddFreeSashimiKit(e.target.checked)}
                    className="mt-0.5 accent-red-600 cursor-pointer h-4 w-4 shrink-0 rounded"
                  />
                  <div className="flex-1">
                    <label htmlFor="freeSashimiKit" className="text-xs font-bold text-neutral-900 cursor-pointer">
                      {lang === 'vi' ? 'Nhận Bộ Gia Vị Sashimi Miễn Phí' : 'Claim Free Sashimi Condiment Kit'}
                    </label>
                    <p className="text-[10px] text-gray-500 leading-snug mt-0.5 font-sans">
                      {lang === 'vi'
                        ? 'Gồm mù tạt sệt siêu cay, gừng hồng muối Gari và xì dầu ngọt Nhật kèm đĩa nhựa sạch ráo.'
                        : 'Includes super hot wasabi tube, pink pickled ginger and sweet Japanese soy sauce packet.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Voucher and Checkouts Pricing summary panel */}
        <div className="border-t border-gray-100 p-5 bg-neutral-50 space-y-4">
          {/* Voucher submission form */}
          {cart.length > 0 && (
            <form onSubmit={handleApplyVoucher} className="space-y-2 text-left">
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                {lang === 'vi' ? 'Mã ưu đãi / Voucher Seafood' : 'Seafood Discount Voucher Code'}
              </label>

              {activeVoucher ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-xs">
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 animate-bounce" />
                    <span>
                      {lang === 'vi'
                        ? `Áp dụng: ${activeVoucher.code} (-${formatPrice(discount)})`
                        : `Applied: ${activeVoucher.code}`}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveVoucher}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    X
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={lang === 'vi' ? 'Ví dụ: SEAFOOD100, SEAFOODAI...' : 'E.g. SEAFOOD100, SEAFOODAI...'}
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                    className="flex-1 bg-white text-xs px-3.5 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-neutral-900 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-red-650 transition cursor-pointer"
                  >
                    {lang === 'vi' ? 'Áp dụng' : 'Apply'}
                  </button>
                </div>
              )}

              {voucherError && (
                <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{voucherError}</span>
                </p>
              )}

              {!activeVoucher && (
                <p className="text-[9px] text-gray-400 font-medium">
                  {lang === 'vi' ? 'Gợi ý mã: SEAFOOD100 (đơn từ 1.2M), SEAFOODAI (đơn từ 500k)' : 'Codes: SEAFOOD100 (from 1.2M), SEAFOODAI (from 500k)'}
                </p>
              )}
            </form>
          )}

          {/* Pricing receipts breaklines */}
          {cart.length > 0 && (
            <div className="space-y-2 border-b border-gray-200/60 pb-3 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</span>
                <span className="font-mono font-bold text-neutral-800">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>{lang === 'vi' ? 'Khấu trừ ưu đãi' : 'Voucher discount'}</span>
                  <span className="font-mono">- {formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <span>{lang === 'vi' ? 'Phí giao hàng' : 'Shipping fee'}</span>
                  {shippingFee === 0 && (
                    <span className="text-[9px] bg-red-100 text-red-600 px-1 py-0.2 rounded-sm font-bold uppercase shrink-0">
                      Free Ship
                    </span>
                  )}
                </span>
                <span className="font-mono font-bold text-neutral-800">
                  {shippingFee === 0 ? '0₫' : formatPrice(shippingFee)}
                </span>
              </div>
              {shippingFee > 0 && (
                <p className="text-[9px] text-gray-400 text-right font-medium">
                  {lang === 'vi'
                    ? `Mua thêm ${formatPrice(1000000 - subtotal)} sản phẩm để được miễn phí giao hàng!`
                    : `Add ${formatPrice(1000000 - subtotal)} more to get free shipping!`}
                </p>
              )}
            </div>
          )}

          {/* Final Grand total and trigger button */}
          <div className="flex items-center justify-between text-neutral-900 mb-1">
            <span className="text-sm font-bold">{lang === 'vi' ? 'TỔNG CỘNG ĐƠN HÀNG' : 'GRAND TOTAL:'}</span>
            <span className="text-xl font-black text-red-600 font-mono">{formatPrice(grandTotal)}</span>
          </div>

          <button
            onClick={() => onProceedCheckout(activeVoucher)}
            disabled={cart.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-200 text-white disabled:text-neutral-400 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25 active:scale-97 cursor-pointer"
          >
            <span>{lang === 'vi' ? 'TIẾN HÀNH ĐẶT HÀNG' : 'PROCEED TO CHECKOUT'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
