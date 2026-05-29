import React, { useState } from 'react';
import { Search, Phone, Clock, User, ShoppingBag, Menu, X, Landmark, ShieldCheck, Settings } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  lang: 'vi' | 'en';
  onToggleLang: (lang: 'vi' | 'en') => void;
  isLoggedIn: boolean;
  userName: string;
  userPhone: string;
  onLogin: (name: string, phone: string) => void;
  onLogout: () => void;
  onOpenAdmin: () => void;
}

export default function Header({
  cart,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  lang,
  onToggleLang,
  isLoggedIn,
  userName,
  userPhone,
  onLogin,
  onLogout,
  onOpenAdmin,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authStep, setAuthStep] = useState<'login' | 'register'>('login');
  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  
  // 3 Authentication methods: Normal, Google, Facebook
  const [isConnectingSocial, setIsConnectingSocial] = useState<'google' | 'facebook' | null>(null);
  const [showSocialConfirm, setShowSocialConfirm] = useState<'google' | 'facebook' | null>(null);

  const handleGoogleLogin = () => {
    setIsConnectingSocial('google');
    setTimeout(() => {
      setIsConnectingSocial(null);
      // Clean display of google user accounts selection dialog
      setShowSocialConfirm('google');
    }, 1200);
  };

  const handleFacebookLogin = () => {
    setIsConnectingSocial('facebook');
    // Clean transition showing standard connection status
    setTimeout(() => {
      setIsConnectingSocial(null);
      setShowSocialConfirm('facebook');
    }, 1200);
  };

  const confirmSocialLogin = (platform: 'google' | 'facebook') => {
    const defaultName = platform === 'google' 
      ? 'Phú Nguyễn (Google)' 
      : 'Phú Nguyễn (Facebook)';
    const defaultPhone = '0909123456';
    onLogin(defaultName, defaultPhone);
    setShowSocialConfirm(null);
    setShowAuthModal(false);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.trim().length >= 10) {
      const resolvedName = authStep === 'register' && nameInput.trim() 
        ? nameInput.trim() 
        : (lang === 'vi' ? 'Khách Hàng Thân Thiết' : 'Loyal Customer');
      onLogin(resolvedName, phoneInput);
      setPhoneInput('');
      setNameInput('');
      setShowAuthModal(false);
    } else {
      alert(lang === 'vi' ? 'Vui lòng nhập số điện thoại hợp lệ!' : 'Please enter a valid phone number!');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100">
      {/* Top micro-bar */}
      <div className="w-full bg-neutral-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 font-mono">
          <div className="flex items-center gap-4 text-neutral-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              {lang === 'vi' ? 'Mở cửa: 9:30 AM - 6:30 PM (T2 - CN)' : 'Open: 9:30 AM - 6:30 PM (Mon - Sun)'}
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              {lang === 'vi' ? 'Hỗ trợ: 0909 123 456' : 'Hotline: 0909 123 456'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-neutral-700 pr-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-neutral-300">{lang === 'vi' ? 'Thực phẩm sạch 100%' : '100% Safe Foods'}</span>
            </div>
            {/* Language switcher */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onToggleLang('vi')}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition ${
                  lang === 'vi' ? 'bg-red-600 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>🇻🇳</span> <span className="text-[10px]">VI</span>
              </button>
              <button
                onClick={() => onToggleLang('en')}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition ${
                  lang === 'en' ? 'bg-red-600 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>🇺🇸</span> <span className="text-[10px]">EN</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main branding and actions bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 flex sm:py-3.5 items-center justify-between gap-1 sm:gap-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-1.5 sm:gap-3 cursor-pointer shrink-0" onClick={() => onSelectCategory('all')}>
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 bg-red-600 rounded-full flex items-center justify-center shadow-md shrink-0">
            <span className="text-white font-black text-[8px] sm:text-[10px] font-sans tracking-widest">SEA</span>
            <div className="absolute -bottom-1 -right-1 bg-neutral-900 border-2 border-white rounded-full p-0.5 text-[6px] sm:text-[8px] text-red-400 font-extrabold px-1">
              PRO
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm sm:text-xl font-black text-neutral-900 tracking-tight flex items-baseline gap-0.5 sm:gap-1">
              <span>SEAFOOD</span>
              <span className="text-red-600">PREMIUM</span>
            </h1>
            <p className="hidden sm:block text-[10px] text-gray-400 uppercase tracking-widest font-mono">Premium Food Market</p>
          </div>
        </div>

        {/* Real-time search element */}
        <div className="hidden md:flex flex-1 max-w-lg relative">
          <input
            type="text"
            placeholder={
              lang === 'vi'
                ? 'Tìm kiếm sashimi cá hồi, thịt bò Wagyu, bào ngư...'
                : 'Search sashimi salmon, Wagyu, abalone...'
            }
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-neutral-50 text-neutral-800 text-sm pl-11 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-1 sm:gap-3 lg:gap-5">
          {/* Support call action */}
          <a
            href="tel:0909123456"
            className="hidden lg:flex items-center gap-2.5 hover:text-red-600 transition group text-left"
          >
            <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 text-red-600 rounded-full flex items-center justify-center transition">
              <Phone className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div className="flex flex-col text-xs">
              <span className="text-gray-400 font-medium">{lang === 'vi' ? 'Hotline 24/7' : 'Hotline Call'}</span>
              <span className="text-neutral-900 font-bold font-mono">0909.123.456</span>
            </div>
          </a>

          {/* Admin Live Dashboard Trigger */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:flex items-center gap-2 text-neutral-700 hover:text-red-600 transition text-left py-1"
          >
            <div className="w-10 h-10 border border-neutral-300 hover:border-red-550 text-neutral-800 rounded-full flex items-center justify-center bg-rose-50 hover:bg-rose-100 transition shadow-xs shrink-0">
              <Settings className="w-4.5 h-4.5 text-red-650 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div className="hidden sm:flex flex-col text-xs pr-1">
              <span className="text-red-500 font-extrabold uppercase tracking-wider text-[8px] font-mono leading-none mb-0.5">Demo Mode</span>
              <span className="text-neutral-900 font-black">
                {lang === 'vi' ? 'Màn Quản Trị' : 'Admin Panel'}
              </span>
            </div>
          </button>

          {/* User Sign-In Action */}
          <button
            onClick={() => {
              if (isLoggedIn) {
                if (confirm(lang === 'vi' ? 'Bạn có muốn đăng xuất tài khoản không?' : 'Do you want to sign out?')) {
                  onLogout();
                }
              } else {
                setShowAuthModal(true);
              }
            }}
            className="flex items-center gap-2 text-neutral-700 hover:text-red-600 transition text-left py-1"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-200 hover:border-red-200 text-neutral-800 rounded-full flex items-center justify-center bg-neutral-50 transition shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="hidden sm:flex flex-col text-xs">
              <span className="text-gray-400 font-medium">
                {isLoggedIn ? (lang === 'vi' ? 'Xin chào!' : 'Hello!') : lang === 'vi' ? 'Đăng nhập' : 'Sign In'}
              </span>
              <span className="text-neutral-900 font-bold max-w-[100px] truncate">
                {isLoggedIn ? userName : lang === 'vi' ? 'Tài khoản' : 'Account'}
              </span>
            </div>
          </button>

          {/* Interactive Shopping Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 text-white pl-2.5 sm:pl-3.5 pr-2.5 sm:pr-4 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all text-xs sm:text-sm font-semibold"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            <span className="hidden sm:inline font-mono">
              {totalItems > 0 ? formatPrice(totalPrice) : lang === 'vi' ? 'Giỏ hàng' : 'Cart'}
            </span>
            <div className="bg-neutral-900 text-white min-w-5 h-5 px-1 rounded-full text-[10px] flex items-center justify-center font-bold font-mono">
              {totalItems}
            </div>
          </button>

          {/* Mobile hamburger navigation toggler */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-800 p-1"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar and menu drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="relative">
            <input
              type="text"
              placeholder={
                lang === 'vi' ? 'Tìm sashimi, cua, bào ngư, bò úc...' : 'Search sashimi, crab, beef...'
              }
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-50 text-neutral-800 text-sm pl-11 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-col gap-3 font-medium text-sm text-neutral-700 pt-2">
            <div className="flex items-center gap-1.5 text-neutral-500 py-1 font-mono text-xs">
              <Clock className="w-4 h-4 text-red-500" />
              <span>9:30 AM - 6:30 PM (T2-CN)</span>
            </div>
            <a href="tel:0909123456" className="flex items-center gap-1.5 text-red-600 font-bold py-1">
              <Phone className="w-4 h-4" />
              <span>Hotline: 0909.123.456</span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center gap-2.5 bg-rose-50 hover:bg-rose-100 border border-red-200 text-red-800 px-3.5 py-2.5 rounded-xl text-xs font-black transition text-left mt-2"
            >
              <Settings className="w-4.5 h-4.5 text-red-600 animate-spin" style={{ animationDuration: '8s' }} />
              <span>{lang === 'vi' ? 'HỆ THỐNG QUẢN TRỊ (PRO DEMO)' : 'ADMIN PORTAL MANAGEMENT'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Authentication Modal / Dialog */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                setShowAuthModal(false);
                setShowSocialConfirm(null);
                setIsConnectingSocial(null);
              }}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                {authStep === 'login'
                  ? lang === 'vi'
                    ? 'Đăng Nhập Tài Khoản'
                    : 'Log In Session'
                  : lang === 'vi'
                    ? 'Đăng Ký Khách Hàng'
                    : 'Customer Registration'}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {lang === 'vi'
                  ? 'Trải nghiệm mua sắm thực phẩm tươi sống chuẩn vị'
                  : 'Enjoy authentic premium food shopping experience'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5 align-middle">
                  {lang === 'vi' ? 'Số Điện Thoại Nhận Hàng (*)' : 'Delivery Mobile Phone (*)'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder={lang === 'vi' ? 'Nhập số điện thoại của bạn...' : 'Enter your mobile number...'}
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-sm bg-neutral-50 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {authStep === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                    {lang === 'vi' ? 'Họ Và Tên Khách Hàng' : 'Full Customer Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'vi' ? 'Nhập họ và tên...' : 'Enter name...'}
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full text-sm bg-neutral-50 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-semibold transition shadow-md hover:shadow-red-500/10"
              >
                {authStep === 'login'
                  ? lang === 'vi'
                    ? 'Đăng Nhập Tiếp Tục'
                    : 'Log In & Continue'
                  : lang === 'vi'
                    ? 'Đăng Ký Ngay'
                    : 'Register Account'}
              </button>
            </form>

            {/* Social Authentication Options Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-150" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                <span className="bg-white px-3.5 text-neutral-400 font-bold font-sans">
                  {lang === 'vi' ? 'Hoặc tiếp tục với' : 'Or continue with'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-neutral-50 hover:bg-neutral-100 active:scale-98 border border-gray-200 hover:border-gray-300 rounded-lg transition text-xs font-extrabold text-neutral-700"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.99 1 12 1 7.28 1 3.26 3.72 1.35 7.69l3.8 2.95C6.07 7.42 8.79 5.04 12 5.04z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.48-1.11 2.73-2.37 3.58v2.98h3.81c2.23-2.05 3.61-5.07 3.61-8.66z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.15 14.76c-.24-.71-.38-1.47-.38-2.26s.14-1.55.38-2.26L1.35 7.29C.49 9.03 0 10.96 0 13s.49 3.97 1.35 5.71l3.8-2.95z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.81-2.98c-1.07.72-2.45 1.15-4.15 1.15-3.21 0-5.93-2.38-6.85-5.6l-3.8 2.95C3.26 20.28 7.28 23 12 23z"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* Facebook Button */}
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-neutral-50 hover:bg-neutral-100 active:scale-98 border border-gray-200 hover:border-gray-300 rounded-lg transition text-xs font-extrabold text-neutral-700"
              >
                <svg className="w-4 h-4 shrink-0" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs">
              <span className="text-neutral-400">
                {authStep === 'login'
                  ? lang === 'vi'
                    ? 'Chưa có tài khoản Seafood?'
                    : "Don't have an account?"
                  : lang === 'vi'
                    ? 'Đã có tài khoản thành viên?'
                    : 'Already have an account?'}
              </span>
              <button
                onClick={() => setAuthStep(authStep === 'login' ? 'register' : 'login')}
                className="text-red-600 hover:underline ml-1 font-semibold"
              >
                {authStep === 'login'
                  ? lang === 'vi'
                    ? 'Đăng ký ngay'
                    : 'Register now'
                  : lang === 'vi'
                    ? 'Đăng nhập thành viên'
                    : 'Log in here'}
              </button>
            </div>

            {/* Social Connection State Loader Backdrop */}
            {isConnectingSocial && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-20">
                <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-xs font-bold text-neutral-800 animate-pulse uppercase tracking-wider font-mono">
                  {lang === 'vi'
                    ? `Đang kết nối tài khoản ${isConnectingSocial}...`
                    : `Linking ${isConnectingSocial} security...`}
                </p>
              </div>
            )}

            {/* Google Interactive User Confirmation Selection Dialog */}
            {showSocialConfirm === 'google' && (
              <div className="absolute inset-0 bg-white p-6 z-30 flex flex-col justify-between animate-in slide-in-from-bottom duration-250">
                <div>
                  <div className="flex justify-center mb-4">
                    <svg className="w-8 h-8" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.99 1 12 1 7.28 1 3.26 3.72 1.35 7.69l3.8 2.95C6.07 7.42 8.79 5.04 12 5.04z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.48-1.11 2.73-2.37 3.58v2.98h3.81c2.23-2.05 3.61-5.07 3.61-8.66z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.15 14.76c-.24-.71-.38-1.47-.38-2.26s.14-1.55.38-2.26L1.35 7.29C.49 9.03 0 10.96 0 13s.49 3.97 1.35 5.71l3.8-2.95z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.81-2.98c-1.07.72-2.45 1.15-4.15 1.15-3.21 0-5.93-2.38-6.85-5.6l-3.8 2.95C3.26 20.28 7.28 23 12 23z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-center text-sm font-bold text-neutral-800">
                    {lang === 'vi' ? 'Đăng nhập bằng Google' : 'Sign in with Google'}
                  </h3>
                  <p className="text-center text-[10px] text-neutral-400 mt-1">
                    {lang === 'vi'
                      ? 'để tiếp tục đến seafood.premium.vn'
                      : 'to continue to seafood.premium.vn'}
                  </p>

                  <div className="mt-5 space-y-1.5">
                    {/* User Profile List Record */}
                    <button
                      type="button"
                      onClick={() => confirmSocialLogin('google')}
                      className="w-full flex items-center gap-3 p-3 border border-gray-150 hover:bg-neutral-50 rounded-lg text-left transition"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                        alt="Profile avatar"
                        className="w-9 h-9 rounded-full object-cover border border-gray-250 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-neutral-800 leading-none">Phú Nguyễn</p>
                        <p className="text-[9px] text-neutral-500 font-mono mt-1 text-ellipsis overflow-hidden">
                          nphu764@gmail.com
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => confirmSocialLogin('google')}
                      className="w-full text-center px-3 py-2.5 border border-dashed border-gray-200 hover:bg-neutral-50 rounded-lg transition text-neutral-600 text-[10px] font-bold"
                    >
                      <span>{lang === 'vi' ? '+ Sử dụng một tài khoản khác' : '+ Use another account'}</span>
                    </button>
                  </div>
                </div>

                <div className="text-[9px] text-neutral-400 text-center leading-normal mt-4 border-t border-gray-100 pt-3">
                  {lang === 'vi'
                    ? 'Để tiếp tục, Google sẽ chia sẻ tên, địa chỉ email, tùy chọn ngôn ngữ và hình ảnh hồ sơ của bạn với Seafood Premium.'
                    : 'To continue, Google will share your name, email address, language preference, and profile picture with Seafood Premium.'}
                </div>
              </div>
            )}

            {/* Facebook Interactive User Confirmation Selection Dialog */}
            {showSocialConfirm === 'facebook' && (
              <div className="absolute inset-0 bg-white p-6 z-30 flex flex-col justify-between animate-in slide-in-from-bottom duration-250">
                <div>
                  <div className="flex justify-center mb-4">
                    <svg className="w-8 h-8 pointer-events-none" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <h3 className="text-center text-sm font-bold text-neutral-800">
                    {lang === 'vi' ? 'Tiếp tục với Facebook' : 'Continue with Facebook'}
                  </h3>
                  <p className="text-center text-[10px] text-neutral-450 mt-2 px-1 leading-relaxed">
                    {lang === 'vi'
                      ? 'Seafood Premium yêu cầu quyền truy cập vào thông tin công khai (tên và ảnh đại diện) của bạn.'
                      : 'Seafood Premium requests access to your public info (name and profile picture).'}
                  </p>

                  <div className="mt-6 space-y-2">
                    <button
                      type="button"
                      onClick={() => confirmSocialLogin('facebook')}
                      className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white py-2.5 rounded-lg text-xs font-bold text-center transition flex items-center justify-center gap-2 shadow-md"
                    >
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>
                        {lang === 'vi' ? 'Tiếp tục dưới tên Phú Nguyễn' : 'Continue as Phú Nguyễn'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowSocialConfirm(null)}
                      className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-2.5 rounded-lg text-xs font-bold text-center transition"
                    >
                      {lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
                    </button>
                  </div>
                </div>

                <div className="text-[9px] text-neutral-400 text-center leading-normal mt-4 border-t border-gray-100 pt-3">
                  {lang === 'vi'
                    ? 'Ứng dụng này sẽ không được đăng bài lên trang cá nhân của bạn trên Facebook.'
                    : 'This application will not share posts on your Facebook feed.'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
