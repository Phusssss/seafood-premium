import React, { useState } from 'react';
import { X, CheckCircle, Landmark, ShieldCheck, Truck, ChevronRight, Coins } from 'lucide-react';
import { CartItem, Voucher } from '../types';
import { createOrder } from '../api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  voucher: Voucher | null;
  onClearCart: () => void;
  lang: 'vi' | 'en';
  isLoggedIn: boolean;
  defaultName: string;
  defaultPhone: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  voucher,
  onClearCart,
  lang,
  isLoggedIn,
  defaultName,
  defaultPhone,
}: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [shipMethod, setShipMethod] = useState<'express' | 'standard'>('express');
  const [payMethod, setPayMethod] = useState<'cod' | 'bank'>('bank');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Auto-fill customer details from VIP session when modal launches
  React.useEffect(() => {
    if (isOpen) {
      if (isLoggedIn) {
        setName(defaultName);
        setPhone(defaultPhone);
      } else {
        setName('');
        setPhone('');
      }
    }
  }, [isOpen, isLoggedIn, defaultName, defaultPhone]);

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  // Pricing math calculation
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discount = 0;
  if (voucher) {
    if (voucher.discountType === 'flat') {
      discount = voucher.value;
    } else {
      discount = Math.min((subtotal * voucher.value) / 100, 100000);
    }
  }

  const baseShipFee = subtotal >= 1000000 ? 0 : 50000;
  const shipFee = shipMethod === 'express' ? baseShipFee + 20000 : baseShipFee;
  const grandTotal = Math.max(subtotal - discount + shipFee, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const order = await createOrder({
        cart,
        voucher,
        customerName: name,
        customerPhone: phone,
        address,
        note,
        shipMethod,
        payMethod,
        isLoggedIn,
      });

      setOrderId(order.id);
      setIsSubmitting(false);
      setOrderSuccess(true);
    } catch (err) {
      console.warn('Failed to create order', err);
      setIsSubmitting(false);
      alert(lang === 'vi' ? 'Đặt hàng thất bại, vui lòng thử lại!' : 'Order failed, please try again!');
    }
  };

  const handleDone = () => {
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-4 animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]">
        {/* Modal headers */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <h3 className="font-bold text-base text-neutral-900 uppercase tracking-tight text-left">
            {orderSuccess
              ? lang === 'vi'
                ? 'ĐẶT HÀNG THÀNH CÔNG!'
                : 'ORDER COMPLETE!'
              : lang === 'vi'
              ? 'XÁC NHẬN THANH TOÁN'
              : 'ORDER DESPATCH CHECKOUT'}
          </h3>
          {!orderSuccess && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-gray-400 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal main content scroll area */}
        <div className="flex-1 overflow-y-auto p-5">
          {orderSuccess ? (
            /* 1. Success Dashboard display UI */
            <div className="text-center py-6 px-4 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2.5">
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-black text-neutral-900">
                  {lang === 'vi' ? 'Cảm ơn bạn đã mua sắm tại Seafood Premium!' : 'Thank You for Ordering with Seafood Premium!'}
                </h4>
                <p className="text-sm text-neutral-500">
                  {lang === 'vi'
                    ? `Mã số đơn hàng: ${orderId}`
                    : `Your custom invoice identification is ${orderId}`}
                </p>
              </div>

              {/* Order specifics cards */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-gray-100 max-w-md mx-auto text-left text-xs space-y-2.5 font-sans">
                <div className="flex justify-between font-bold border-b border-gray-200 pb-2 text-neutral-800">
                  <span>{lang === 'vi' ? 'Thông Tin Nhận Hàng' : 'Receiver Info'}</span>
                  <span>{lang === 'vi' ? 'Phương Thức' : 'Method'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{lang === 'vi' ? 'Họ và tên:' : 'Full name:'}</span>
                  <span className="font-semibold text-neutral-800">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{lang === 'vi' ? 'Số điện thoại:' : 'Telephone:'}</span>
                  <span className="font-semibold text-neutral-800 font-mono">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{lang === 'vi' ? 'Địa chỉ:' : 'Address:'}</span>
                  <span className="font-semibold text-neutral-800 max-w-[200px] text-right truncate">{address}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-neutral-900">
                  <span>{lang === 'vi' ? 'Tổng thanh toán:' : 'Total paid:'}</span>
                  <span className="text-red-650 font-mono text-sm">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <div className="space-y-2 max-w-md mx-auto leading-relaxed">
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold font-mono tracking-tight flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4 animate-pulse" />
                  <span>
                    {shipMethod === 'express'
                      ? lang === 'vi'
                        ? 'GIAO HÀNG HỎA TỐC GIAO TRONG 2 GIỜ!'
                        : 'EXPRESS 2 HOURS PARCEL DELIVERY OUT!'
                      : lang === 'vi'
                      ? 'NHẬN HÀNG TIÊU CHUẨN GIAO TRONG NGÀY!'
                      : 'STANDARD DELIVERY WITHIN CONTINUAL DAY!'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium">
                  {lang === 'vi'
                    ? 'Nhân viên Seafood Premium sẽ liên hệ điện thoại trực tiếp xác nhận đơn hàng sau 5 phút.'
                    : 'A customer support executive will call your mobile number to confirm items in 5 minutes.'}
                </p>
              </div>

              <button
                onClick={handleDone}
                className="bg-neutral-900 hover:bg-red-650 text-white font-bold text-xs px-8 py-3 rounded-full uppercase tracking-widest transition"
              >
                {lang === 'vi' ? 'Hoàn thành và Tiếp tục' : 'Conclude & Keep Shopping'}
              </button>
            </div>
          ) : (
            /* 2. Form checkouts and payments screen inputs */
            <div className="space-y-5 text-left">
              {isLoggedIn && (
                <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-3.5 flex items-center justify-between gap-3 animate-in fade-in duration-200">
                  <div className="space-y-0.5">
                    <p className="text-emerald-800 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                      {lang === 'vi' ? 'Đã liên kết tài khoản VIP' : 'Link VIP Account Active'}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-medium">
                      {lang === 'vi' 
                        ? `Chào mừng ${defaultName}! Thông tin số điện thoại ${defaultPhone} đã tự động điền vào phom nhận hàng.`
                        : `Welcome back, ${defaultName}! Your contact number ${defaultPhone} has been autofilled into the shipping inputs.`}
                    </p>
                  </div>
                  <span className="bg-emerald-600 text-white font-mono text-[9px] font-black px-2.5 py-0.5 rounded-sm">
                    {lang === 'vi' ? 'ƯU TIÊN' : 'PRIORITY MEMBER'}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Left Column Form */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest border-b pb-1.5 border-gray-150">
                  {lang === 'vi' ? '1. Địa Chỉ Nhận Hàng' : '1. Delivery Addresses'}
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                    {lang === 'vi' ? 'Họ và tên người nhận (*)' : 'Receiver name (*)'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'vi' ? 'Nhập họ và tên người nhận...' : 'Receiver Full Name...'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm bg-neutral-50 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                    {lang === 'vi' ? 'Số điện thoại thoại (*)' : 'Mobile phone (*)'}
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    placeholder={lang === 'vi' ? 'Ví dụ: 0909123456...' : 'E.g. 0909123456...'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-sm bg-neutral-50 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                    {lang === 'vi' ? 'Địa chỉ nhận hàng (*)' : 'Street address (*)'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'vi' ? 'Số nhà, tên đường, phường/xã, quận, tp...' : 'No., Street, Ward, District, City...'}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-sm bg-neutral-50 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                    {lang === 'vi' ? 'Ghi chú thêm (Tùy chọn)' : 'Optional delivery order notes'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={lang === 'vi' ? 'Ví dụ: Cắt fillet mỏng, giao trước 11h trưa...' : 'E.g. thin fillet slices, deliver before 11AM...'}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full text-sm bg-neutral-50 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-sans"
                  />
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest border-b pb-1.5 border-gray-150 mb-3">
                    {lang === 'vi' ? 'Thời gian giao hàng' : 'Shipping Variant options'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShipMethod('express')}
                      className={`p-3 rounded-xl border text-left transition ${
                        shipMethod === 'express'
                          ? 'border-red-600 bg-red-50/40 text-red-700'
                          : 'border-gray-200 bg-white text-neutral-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-extrabold text-xs flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 shrink-0" />
                        <span>{lang === 'vi' ? 'Hỏa tốc 2H' : 'Express 2H Delivery'}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium leading-normal mt-0.5">
                        {lang === 'vi' ? 'Thêm +20.000₫ giao tức thì sạch đá' : 'Adds +20k, delivery instantly ice-packed'}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShipMethod('standard')}
                      className={`p-3 rounded-xl border text-left transition ${
                        shipMethod === 'standard'
                          ? 'border-red-600 bg-red-50/40 text-red-700'
                          : 'border-gray-200 bg-white text-neutral-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-extrabold text-xs">{lang === 'vi' ? 'Trong ngày' : 'Same-day standard'}</div>
                      <p className="text-[10px] text-gray-500 font-medium leading-normal mt-0.5">
                        {lang === 'vi' ? 'Theo lộ trình tiện nhất của Shipper' : 'Standard routes, within this continuous day'}
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column billing & options */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest border-b pb-1.5 border-gray-150">
                  {lang === 'vi' ? '2. Phương Thức Thanh Toán' : '2. Payment Methods'}
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPayMethod('bank')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition ${
                      payMethod === 'bank'
                        ? 'border-red-600 bg-red-50/45 text-red-700'
                        : 'border-gray-200 bg-white text-neutral-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-extrabold text-xs flex items-center gap-1 shrink-0">
                      <Landmark className="w-3.5 h-3.5 shrink-0" />
                      <span>{lang === 'vi' ? 'Chuyển Khoản' : 'Bank Transfer'}</span>
                    </span>
                    <span className="text-[9px] text-gray-500 uppercase font-black font-mono tracking-widest mt-1">
                      VietQR Instant
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayMethod('cod')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition ${
                      payMethod === 'cod'
                        ? 'border-red-600 bg-red-50/45 text-red-700'
                        : 'border-gray-200 bg-white text-neutral-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-extrabold text-xs flex items-center gap-1 shrink-0">
                      <Coins className="w-3.5 h-3.5 shrink-0" />
                      <span>{lang === 'vi' ? 'COD (Tiền Mặt)' : 'COD (Cash on Arrival)'}</span>
                    </span>
                    <span className="text-[9px] text-gray-500 uppercase font-black font-mono tracking-widest mt-1">
                      Cash on arrival
                    </span>
                  </button>
                </div>

                {/* QR Display box if Transfer methodology is chosen */}
                {payMethod === 'bank' && (
                  <div className="bg-neutral-50 p-3.5 rounded-xl border border-gray-200/80 animate-in fade-in duration-200 space-y-3">
                    <div className="flex gap-3 justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-[10px] text-neutral-400 font-extrabold uppercase font-mono tracking-wider">
                          VietQR MB-BANKING
                        </p>
                        <h5 className="font-extrabold text-xs text-neutral-900 leading-tight">
                          CÔNG TY TNHH SEAFOOD PREMIUM
                        </h5>
                        <p className="text-xs text-neutral-600 font-mono">STK: 1234567890</p>
                        <p className="text-[10px] text-neutral-500 font-medium font-sans max-w-[170px] leading-snug">
                          {lang === 'vi' ? 'Nội dung: SEAFOOD [SĐT Khách]' : 'Reference: SEAFOOD [Mobile No]'}
                        </p>
                      </div>

                      {/* Cool Visual Mock QR Code container */}
                      <div className="w-24 h-24 bg-white border border-gray-200 p-1 rounded-lg shrink-0 flex flex-col items-center justify-center relative shadow-xs">
                        {/* Fake intricate QR vectors */}
                        <div className="absolute inset-1 border-[4px] border-solid border-red-600/10"></div>
                        <div className="grid grid-cols-8 gap-[1px]">
                          {Array.from({ length: 64 }).map((_, k) => {
                            // Render a nice structured dark QR code grid pattern
                            const isFilled = (k * 7 + 13) % 5 === 0 || (k > 50 && k < 58) || k === 0 || k === 6 || k === 7 || k === 13 || k === 14 || k === 48 || k === 55 || k === 63;
                            return (
                              <div
                                key={k}
                                className={`w-2 h-2 rounded-[1.5px] ${isFilled ? 'bg-neutral-900' : 'bg-transparent'}`}
                              />
                            );
                          })}
                        </div>
                        {/* Mini VietQR logo inside */}
                        <div className="absolute w-4 h-4 bg-red-600 text-white font-serif font-black text-[7px] flex items-center justify-center rounded-sm tracking-tighter border border-white">
                          QR
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 text-red-700 p-2 text-[10px] rounded flex gap-1 items-start">
                      <ShieldCheck className="w-3.5 h-3.5 mt-0.2 shrink-0" />
                      <span>
                        {lang === 'vi'
                          ? 'Vui lòng quét bằng app ngân hàng của bạn. Hệ thống sẽ tự động đối soát sau khi nhận tiền.'
                          : 'Please scan via your local Bank application. Automated billing confirmation executes instantly.'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Final receipt cost outline summary */}
                <div className="bg-neutral-50 p-4 rounded-xl border border-gray-200 text-xs space-y-2 text-neutral-600">
                  <div className="flex justify-between font-bold text-neutral-800 pb-1 border-b border-gray-200">
                    <span>{lang === 'vi' ? 'MÔ TẢ CHI PHÍ' : 'BILL PRICE BREAKWORDS'}</span>
                    <span>{lang === 'vi' ? 'SỐ TIỀN' : 'AMOUNTS'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === 'vi' ? 'Tạm tính' : 'Subtotal'}</span>
                    <span className="font-mono font-bold text-neutral-850">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>{lang === 'vi' ? 'Voucher giảm giá' : 'Discount Applied'}</span>
                      <span className="font-mono">- {formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <span>{lang === 'vi' ? 'Phí giao hàng' : 'Shipping fee'}</span>
                      {shipFee === 0 && (
                        <span className="text-[9px] bg-red-100 text-red-650 px-1 py-0.2 font-black uppercase rounded-sm">
                          Free
                        </span>
                      )}
                    </span>
                    <span className="font-mono font-bold text-neutral-850">{formatPrice(shipFee)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-neutral-900 text-sm">
                    <span>{lang === 'vi' ? 'Tổng số tiền thanh toán:' : 'Total checkout balance:'}</span>
                    <span className="text-red-600 font-mono text-base">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Submit trigger button details */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-200 text-white disabled:text-neutral-400 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg active:scale-97 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1.5 font-mono">
                      <span className="animate-spin text-sm">◯</span>
                      <span>{lang === 'vi' ? 'ĐANG KẾT NỐI HỆ THỐNG...' : 'LAUNCHING SECURE TRANSACTION...'}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span>{lang === 'vi' ? 'XÁC NHẬN ĐẶT HÀNG' : 'SUBMIT ACQUISITION & PAY'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </div>
            </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
