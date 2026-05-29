import React, { useState, useEffect } from 'react';
import {
  Fish,
  ChefHat,
  Beef,
  Waves,
  Gift,
  ListOrdered,
  Wine,
  Store,
  Compass,
  ArrowRight,
  BookOpen,
  Sparkles,
  Award,
  Clock,
  MapPin,
  Search,
} from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailPage from './components/ProductDetailPage';
import TipDetailPage from './components/TipDetailPage';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AIChefAssistant from './components/AIChefAssistant';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { CATEGORIES, PRODUCTS as FALLBACK_PRODUCTS, TIPS as FALLBACK_TIPS, VOUCHERS as FALLBACK_VOUCHERS } from './data/products';
import { CartItem, Product, Voucher, Tip } from './types';
import { fetchProducts, fetchTips, fetchVouchers, loginUser, registerUser } from './api';

export default function App() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [isAdminView, setIsAdminView] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [activeVoucher, setActiveVoucher] = useState<Voucher | null>(null);
  const [tips, setTips] = useState<Tip[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

  // Global user authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  // Load data from API on mount
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const mapped = data.map((p) => ({
          ...p,
          specs: Array.isArray(p.specs) ? p.specs : undefined,
          specsEn: Array.isArray(p.specsEn) ? p.specsEn : undefined,
        }));
        setProducts(mapped);
      })
      .catch(() => {
        setProducts(FALLBACK_PRODUCTS);
      });
  }, []);

  useEffect(() => {
    fetchTips()
      .then((data) => setTips(data))
      .catch(() => setTips(FALLBACK_TIPS));
  }, []);

  useEffect(() => {
    fetchVouchers()
      .then((data) => setVouchers(data))
      .catch(() => setVouchers(FALLBACK_VOUCHERS));
  }, []);

  const handleUpdateProducts = (updated: Product[]) => {
    setProducts(updated);
    try {
      localStorage.setItem('seafood_premium_products_v1', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save products list to storage', e);
    }
  };

  // Load cart and user sessions from localized storage on mount safely
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('seafood_premium_cart_v1');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      
      const savedLogin = localStorage.getItem('seafood_premium_is_logged_in');
      if (savedLogin === 'true') {
        setIsLoggedIn(true);
        setUserName(localStorage.getItem('seafood_premium_user_name') || '');
        setUserPhone(localStorage.getItem('seafood_premium_user_phone') || '');
      }
    } catch (e) {
      console.warn('Failed to parse storage on mount', e);
    }
  }, []);

  const handleLogin = async (name: string, phone: string) => {
    try {
      if (name) {
        await registerUser(name, phone);
      } else {
        await loginUser(phone);
      }
    } catch (e) {
      console.warn('Failed to sync auth with API', e);
    }
    setIsLoggedIn(true);
    setUserName(name);
    setUserPhone(phone);
    try {
      localStorage.setItem('seafood_premium_is_logged_in', 'true');
      localStorage.setItem('seafood_premium_user_name', name);
      localStorage.setItem('seafood_premium_user_phone', phone);
    } catch (e) {
      console.warn('Failed to persist user session', e);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserPhone('');
    try {
      localStorage.removeItem('seafood_premium_is_logged_in');
      localStorage.removeItem('seafood_premium_user_name');
      localStorage.removeItem('seafood_premium_user_phone');
    } catch (e) {
      console.warn('Failed to clear user storage', e);
    }
  };

  // Save cart modifications to storage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('seafood_premium_cart_v1', JSON.stringify(newCart));
    } catch (e) {
      console.warn('Failed to save cart storage', e);
    }
  };

  // Add item to cart
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity }]);
    }
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    const updated = cart.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updated);
  };

  // Remove item from cart
  const handleRemoveItem = (id: string) => {
    const updated = cart.filter((item) => item.product.id !== id);
    saveCart(updated);
  };

  // Add item from ID (used by AI Chef cross-sell click mechanisms)
  const handleAddProductById = (id: string) => {
    const found = products.find((p) => p.id === id);
    if (found && found.isInStock) {
      handleAddToCart(found, 1);
    }
  };

  const handleClearCart = () => {
    saveCart([]);
    setActiveVoucher(null);
  };

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    // Smooth scroll down to products anchor when selection is made
    const anchor = document.getElementById('catalog-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Master product search filters
  const filteredProducts = products.filter((p) => {
    const nameSearch = (p.nameEn || '').toLowerCase() + ' ' + p.name.toLowerCase();
    const descSearch = (p.descriptionEn || '').toLowerCase() + ' ' + p.description.toLowerCase();
    const originSearch = (p.originEn || '').toLowerCase() + ' ' + p.origin.toLowerCase();

    const matchesSearch =
      nameSearch.includes(searchQuery.toLowerCase()) ||
      descSearch.includes(searchQuery.toLowerCase()) ||
      originSearch.includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Filter sections displays (Home grid blocks)
  const bestSellers = products.filter((p) => p.isBestSeller);
  const sashimiSet = products.filter((p) => p.category === 'sashimi');
  const salmonSet = products.filter((p) => p.category === 'salmon');
  const beefSet = products.filter((p) => p.category === 'beef');
  const seafoodSet = products.filter((p) => p.category === 'seafood');

  return (
    <div className="min-h-screen bg-neutral-50/50 flex flex-col font-sans text-neutral-800 antialiased selection:bg-red-650 selection:text-white">
      {/* 1. Sticky Navigation Header */}
      {!isAdminView && (
        <Header
          cart={cart}
          onOpenCart={() => setIsCartOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          lang={lang}
          onToggleLang={setLang}
          isLoggedIn={isLoggedIn}
          userName={userName}
          userPhone={userPhone}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onOpenAdmin={() => setIsAdminView(!isAdminView)}
        />
      )}

      {isAdminView ? (
        <AdminDashboard
          onClose={() => setIsAdminView(false)}
          lang={lang}
          products={products}
          onUpdateProducts={handleUpdateProducts}
        />
      ) : (
        <>
          {/* 2. Hero slider & category sections bar */}
          {!selectedProduct && !selectedTip && <Hero activeCategory={activeCategory} onSelectCategory={handleSelectCategory} lang={lang} />}

      {/* 3. Catalog and category anchors blocks */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex-1 space-y-12" id="catalog-anchor border-t border-gray-100">
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onViewDetail={setSelectedProduct}
            lang={lang}
            allProducts={products}
          />
        ) : selectedTip ? (
          <TipDetailPage
            tip={selectedTip}
            onClose={() => setSelectedTip(null)}
            onSelectTip={setSelectedTip}
            onAddToCart={handleAddToCart}
            onViewProductDetail={(p) => {
              setSelectedTip(null);
              setSelectedProduct(p);
            }}
            lang={lang}
            allTips={tips}
            allProducts={products}
          />
        ) : searchQuery.trim() !== '' || activeCategory !== 'all' ? (
          /* Search results or filtered category view */
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
                  <Compass className="w-5.5 h-5.5 text-red-600 animate-spin" />
                  <span>
                    {searchQuery.trim() !== ''
                      ? lang === 'vi'
                        ? `Kết quả tìm kiếm: "${searchQuery}"`
                        : `Search outcomes for: "${searchQuery}"`
                      : (() => {
                          const cat = CATEGORIES.find((c) => c.id === activeCategory);
                          return cat ? (lang === 'en' ? (cat.nameEn || cat.name) : cat.name) : '';
                        })()}
                  </span>
                </h2>
                <p className="text-xs text-gray-450 mt-1">
                  {lang === 'vi' ? (
                    `Tìm thấy ${filteredProducts.length} sản phẩm phù hợp`
                  ) : (
                    <>
                      Discovered<sup className="text-red-500 font-bold ml-0.5">{filteredProducts.length}</sup> match-capable items
                    </>
                  )}
                </p>
              </div>

              {/* Clear filters button */}
              {(activeCategory !== 'all' || searchQuery.trim() !== '') && (
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-red-650 font-bold hover:underline cursor-pointer"
                >
                  {lang === 'vi' ? 'Xếp lại mặc định ✕' : 'Clear all filters ✕'}
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-150">
                <p className="text-neutral-500 font-bold text-sm mb-2">
                  {lang === 'vi' ? 'Không rã tìm thấy sản phẩm nào!' : 'No products found matching filters!'}
                </p>
                <p className="text-xs text-gray-400">
                  {lang === 'vi' ? 'Thử tìm các từ khóa ngắn khác như "Cá hồi", "Bò", "Wagyu"' : 'Try short key terms like "Salmon", "Beef"'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={(prod) => handleAddToCart(prod, 1)}
                    onViewDetail={setSelectedProduct}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Multi-sectional home blocks representation matching Seafood Premium design */
          <div className="space-y-12">
            {/* A. BEST SELLER section */}
            <section className="space-y-6">
              <div className="flex border-b-2 border-red-600 pb-2.5 items-end justify-between text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-6 bg-red-600 rounded-sm"></div>
                  <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight">
                    {lang === 'vi' ? 'BÁN CHẠY NHẤT / BEST SELLER' : 'POPULAR BEST SELLERS'}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-bold">
                  <span>{lang === 'vi' ? 'Đầy đủ tươi sạch' : 'Organic & Fresh'}</span>
                  <Award className="w-4 h-4 text-red-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                {bestSellers.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={(prod) => handleAddToCart(prod, 1)}
                    onViewDetail={setSelectedProduct}
                    lang={lang}
                  />
                ))}
              </div>
            </section>

            {/* B. SASHIMI section */}
            <section className="space-y-6">
              <div className="flex border-b-2 border-red-600 pb-2.5 items-end justify-between text-left bg-gradient-to-r from-red-50/25 to-transparent p-1.5 rounded">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5.5 h-5.5 text-red-650 animate-bounce" />
                  <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight">
                    {lang === 'vi' ? 'SASHIMI CHUẨN VỊ NHẬT' : 'JAPANESE SASHIMI SETS'}
                  </h3>
                </div>
                <button
                  onClick={() => handleSelectCategory('sashimi')}
                  className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'vi' ? 'Xem tất cả' : 'View all'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                {sashimiSet.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={(prod) => handleAddToCart(prod, 1)}
                    onViewDetail={setSelectedProduct}
                    lang={lang}
                  />
                ))}
              </div>
            </section>

            {/* Premium visual Norwegian Salmon promo divider */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-md h-[120px] sm:h-[180px] bg-neutral-900 flex items-center p-6 sm:p-11 text-left select-none md:-mx-4 lg:mx-0">
              <img
                src="https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&q=80&w=1200"
                alt="Norwegian fjords"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
              <div className="z-10 text-white space-y-1.5 max-w-md">
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-red-400">
                  Fjord Selected Premium
                </p>
                <h4 className="text-lg sm:text-2xl font-black tracking-tight leading-tight uppercase">
                  {lang === 'vi' ? 'Cá Hồi Na Uy Tươi Rói Đi Máy Bay' : 'Fresh Airborne Norwegian Salmon'}
                </h4>
                <p className="text-[10px] sm:text-xs text-neutral-300 font-medium">
                  {lang === 'vi'
                    ? 'Lọc xương sạch ráo, bảo quản kỹ lưỡng ngăn mát 0-2 độ C giữ lát cá phơi phới mỡ bùi ngậy'
                    : 'Deboned cleanly, cold chain sealed at constant 0-2°C for premium sashimi taste'}
                </p>
              </div>
              <button
                onClick={() => handleSelectCategory('salmon')}
                className="absolute right-6 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-10 bg-white hover:bg-red-600 hover:text-white text-neutral-900 hover:shadow-red-500/25 active:scale-95 text-[10px] sm:text-xs font-extrabold px-4 py-2.5 rounded-full uppercase tracking-wider transition-all duration-150"
              >
                {lang === 'vi' ? 'Đặt Cá Hồi' : 'Shop Salmon'}
              </button>
            </div>

            {/* C. CÁ HỒI NA UY section */}
            <section className="space-y-6">
              <div className="flex border-b-2 border-red-650 pb-2.5 items-end justify-between text-left">
                <div className="flex items-center gap-2">
                  <Fish className="w-5.5 h-5.5 text-red-650" />
                  <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight">
                    {lang === 'vi' ? 'CÁ HỒI NA UY NHẬP KHẨU' : 'NORWEGIAN SALMON LINEUP'}
                  </h3>
                </div>
                <button
                  onClick={() => handleSelectCategory('salmon')}
                  className="text-xs text-red-650 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'vi' ? 'Xem tất cả' : 'View all'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                {salmonSet.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={(prod) => handleAddToCart(prod, 1)}
                    onViewDetail={setSelectedProduct}
                    lang={lang}
                  />
                ))}
              </div>
            </section>

            {/* D. THỊT BÒ NHẬP KHẨU section */}
            <section className="space-y-6">
              <div className="flex border-b-2 border-red-650 pb-2.5 items-end justify-between text-left">
                <div className="flex items-center gap-2">
                  <Beef className="w-5.5 h-5.5 text-red-655" />
                  <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight">
                    {lang === 'vi' ? 'THỊT BÒ NHẬP KHẨU CAO CẤP' : 'IMPORTED PREMIUM BEEF'}
                  </h3>
                </div>
                <button
                  onClick={() => handleSelectCategory('beef')}
                  className="text-xs text-red-650 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'vi' ? 'Xem tất cả' : 'View all'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                {beefSet.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={(prod) => handleAddToCart(prod, 1)}
                    onViewDetail={setSelectedProduct}
                    lang={lang}
                  />
                ))}
              </div>
            </section>

            {/* E. HẢI SẢN NHẬP KHẨU section */}
            <section className="space-y-6">
              <div className="flex border-b-2 border-red-650 pb-2.5 items-end justify-between text-left bg-gradient-to-r from-red-50/20 to-transparent p-1">
                <div className="flex items-center gap-2">
                  <Waves className="w-5.5 h-5.5 text-blue-600 shrink-0" />
                  <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight">
                    {lang === 'vi' ? 'HẢI SẢN SẠCH CAO CẤP' : 'CLEAN IMPORTED SEAFOOD'}
                  </h3>
                </div>
                <button
                  onClick={() => handleSelectCategory('seafood')}
                  className="text-xs text-red-650 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'vi' ? 'Xem tất cả' : 'View all'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                {seafoodSet.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={(prod) => handleAddToCart(prod, 1)}
                    onViewDetail={setSelectedProduct}
                    lang={lang}
                  />
                ))}
              </div>
            </section>

            {/* F. TIPS & NEWS SECTION (Tin tức và Cẩm nang sống khỏe) */}
            <section className="space-y-6">
              <div className="flex border-b-2 border-red-650 pb-2.5 items-end justify-between text-left">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5.5 h-5.5 text-neutral-700" />
                  <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight">
                    {lang === 'vi' ? 'TIN TỨC & CẨM NANG SỐNG KHỎE' : 'HEALTH RECIPES & TIPS ARTICLES'}
                  </h3>
                </div>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider font-mono">
                  {lang === 'vi' ? 'Cập nhật hàng tuần' : 'Weekly update'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tips.map((tip) => (
                  <article
                    key={tip.id}
                    onClick={() => setSelectedTip(tip)}
                    className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-red-200 hover:shadow-md transition duration-300 text-left flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="h-44 w-full bg-gray-50 overflow-hidden relative">
                        <img
                          src={tip.image}
                          alt={tip.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-550"
                        />
                        <div className="absolute top-3 left-3 bg-neutral-950/80 text-white font-mono text-[9px] px-2 py-0.5 rounded-full font-bold">
                          Seafood Info
                        </div>
                      </div>
                      <div className="p-4 space-y-1.5">
                        <h4 className="font-extrabold text-neutral-900 group-hover:text-red-650 transition text-sm leading-tight line-clamp-2">
                          {lang === 'en' ? (tip.titleEn || tip.title) : tip.title}
                        </h4>
                        <p className="text-xs text-neutral-500 leading-relaxed font-sans line-clamp-3">
                          {lang === 'en' ? (tip.summaryEn || tip.summary) : tip.summary}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 pb-4 select-none">
                      <span className="text-[11px] text-red-650 group-hover:text-red-700 font-bold inline-flex items-center gap-1 cursor-pointer">
                        <span>{lang === 'vi' ? 'Xem chi tiết cẩm nang' : 'Read handbook details'}</span>
                        <span>➜</span>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* 4. Footer info area */}
      <Footer lang={lang} />
        </>
      )}

      {/* 5. Shopping Cart standard drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={(voucher) => {
          setActiveVoucher(voucher);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        lang={lang}
      />

      {/* 7. Checkout process dialog */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        voucher={activeVoucher}
        onClearCart={handleClearCart}
        lang={lang}
        isLoggedIn={isLoggedIn}
        defaultName={userName}
        defaultPhone={userPhone}
      />

      {/* 8. Elite AI Kitchen Planner Cooking assistant floating widget */}
      {!isAdminView && (
        <AIChefAssistant
          cart={cart}
          allProducts={products}
          onAddProductById={handleAddProductById}
          lang={lang}
        />
      )}
    </div>
  );
}
