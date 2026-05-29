import { useState, useEffect } from 'react';
import {
  Fish,
  ChefHat,
  Beef,
  Waves,
  Gift,
  ListOrdered,
  Wine,
  Store,
  ChevronLeft,
  ChevronRight,
  Truck,
  RotateCcw,
  BadgePercent,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface HeroProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  lang: 'vi' | 'en';
}

const SLIDES = [
  {
    title_vi: 'CÁ HỒI NA UY TƯƠI SỐNG',
    sub_vi: 'Nhập khẩu trực tiếp bằng đường hàng không sạch cam kết chuẩn Sashimi',
    title_en: 'FRESH NORWEGIAN SALMON',
    sub_en: 'Direct flight shipment certified organic, sashimi-grade guaranteed',
    img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=1200',
    color_accent: 'border-red-600',
    badge_vi: 'Phổ biến nhất',
    badge_en: 'Most Popular',
  },
  {
    title_vi: 'BÒ WAGYU NHẬT BẢN A5',
    sub_vi: 'Cực phẩm thớ mỡ vân cẩm thạch tan mềm ngay đầu lưỡi quý tộc',
    title_en: 'JAPANESE WAGYU BEEF A5',
    sub_en: 'Elite level marbling steak melts effortlessly in your mouth',
    img: 'https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?auto=format&fit=crop&q=80&w=1200',
    color_accent: 'border-amber-500',
    badge_vi: 'Đẳng cấp nhất',
    badge_en: 'Premium Selection',
  },
  {
    title_vi: 'SASHIMI CHUẨN VỊ NHẬT BẢN',
    sub_vi: 'Combo gia vị kèm ngập tràn xì dầu ngọt Nhật, mù tạt cay nồng khó quên',
    title_en: 'AUTHENTIC SUSHI & SASHIMI',
    sub_en: 'Complete dipping set with sweet shoyu oil and blazing fresh wasabi',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1200',
    color_accent: 'border-red-600',
    badge_vi: 'Set tiệc gia đình',
    badge_en: 'Family Platter',
  },
];

export default function Hero({ activeCategory, onSelectCategory, lang }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  // Icon switcher helper
  const renderCategoryIcon = (iconName: string) => {
    const iconClass = 'w-5 h-5';
    switch (iconName) {
      case 'Store':
        return <Store className={iconClass} />;
      case 'Fish':
        return <Fish className={iconClass} />;
      case 'ChefHat':
        return <ChefHat className={iconClass} />;
      case 'Beef':
        return <Beef className={iconClass} />;
      case 'Waves':
        return <Waves className={iconClass} />;
      case 'Gift':
        return <Gift className={iconClass} />;
      case 'ListOrdered':
        return <ListOrdered className={iconClass} />;
      case 'Wine':
        return <Wine className={iconClass} />;
      default:
        return <Store className={iconClass} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* 1. Left Catalog Sidebar Panel */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-fit hidden lg:block">
        <div className="bg-red-600 text-white px-5 py-4 flex items-center gap-2.5">
          <ListOrdered className="w-5 h-5 shrink-0" />
          <h2 className="font-bold text-sm uppercase tracking-wider">
            {lang === 'vi' ? 'DANH MỤC SẢN PHẨM' : 'PRODUCT CATEGORIES'}
          </h2>
        </div>
        <nav className="divide-y divide-gray-50">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-5 py-3.5 text-left text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-red-50 text-red-600 font-bold border-l-4 border-red-600'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-red-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-red-600' : 'text-neutral-400'}>
                    {renderCategoryIcon(cat.icon)}
                  </span>
                  <span>{lang === 'en' ? (cat.nameEn || cat.name) : cat.name}</span>
                </div>
                <span className="text-[10px] text-gray-300 font-mono">▶</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 2. Middle & Right Slideshow Banner Panel */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        <div className="relative h-[250px] sm:h-[320px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-md bg-neutral-900 group">
          {/* Active slide container */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={SLIDES[currentSlide].img}
              alt="Slide premium banner"
              className="w-full h-full object-cover opacity-75 object-center scale-102 hover:scale-105 transition-all duration-[8000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          </div>

          {/* Dynamic Badge */}
          <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-sm flex items-center gap-1 shadow-sm tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
            <span>{lang === 'vi' ? SLIDES[currentSlide].badge_vi : SLIDES[currentSlide].badge_en}</span>
          </div>

          {/* Navigation sliders buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 active:scale-95 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 active:scale-95 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Text Content overlay */}
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-lg text-white">
            <h3 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight mb-2 uppercase drop-shadow-sm leading-tight">
              {lang === 'vi' ? SLIDES[currentSlide].title_vi : SLIDES[currentSlide].title_en}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-200 font-medium mb-4 drop-shadow-sm">
              {lang === 'vi' ? SLIDES[currentSlide].sub_vi : SLIDES[currentSlide].sub_en}
            </p>
            <button
              onClick={() => onSelectCategory('all')}
              className="bg-white hover:bg-red-600 hover:text-white text-neutral-900 border border-transparent font-bold text-xs px-5 py-2.5 rounded-full uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 shadow-md hover:shadow-red-500/20 active:scale-95"
            >
              <span>{lang === 'vi' ? 'MUA NGAY TẠI SEAFOOD' : 'ORDER NOW AT SEAFOOD'}</span>
              <span>➜</span>
            </button>
          </div>

          {/* Indicators dots */}
          <div className="absolute bottom-4 right-6 flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === i ? 'bg-red-600 w-5' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3. Bottom features badges row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Item 1 */}
          <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-neutral-800 tracking-tight">
                {lang === 'en' ? 'EXPRESS 2H DELIVERY' : 'GIAO NHANH 2H'}
              </span>
              <span className="text-[10px] text-gray-400">
                {lang === 'en' ? 'Meticulously chilled & packed' : 'Đóng gói giữ lạnh kỹ'}
              </span>
            </div>
          </div>
          {/* Item 2 */}
          <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <BadgePercent className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-neutral-800 tracking-tight">
                {lang === 'en' ? 'FREE SHIPPING' : 'MIỄN PHÍ SHIP'}
              </span>
              <span className="text-[10px] text-gray-400">
                {lang === 'en' ? 'For orders from 1M₫' : 'Cho đơn hàng từ 1M'}
              </span>
            </div>
          </div>
          {/* Item 3 */}
          <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-neutral-800 tracking-tight">
                {lang === 'en' ? 'AIRBORNE IMPORT' : 'HÀNG HÀNG KHÔNG'}
              </span>
              <span className="text-[10px] text-gray-400">
                {lang === 'en' ? 'Direct flights 5-7 times/W' : 'Nhập trực tiếp 5-7 chuyến/T'}
              </span>
            </div>
          </div>
          {/* Item 4 */}
          <div className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-neutral-800 tracking-tight">
                {lang === 'en' ? 'FREE CONDIMENTS' : 'MIỄN PHÍ GIA VỊ'}
              </span>
              <span className="text-[10px] text-gray-400">
                {lang === 'en' ? 'Complimentary wasabi & ginger' : 'Tặng kèm mù tạt & gừng'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
