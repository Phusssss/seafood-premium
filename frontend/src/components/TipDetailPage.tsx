import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  User,
  Calendar,
  Sparkles,
  ShoppingBag,
  Check,
  Award,
  Video,
  Play,
  Share2,
  Dribbble,
  Link as LinkIcon,
  MessageCircle,
  HelpCircle,
  TrendingUp,
  Flame,
  Volume2,
  X,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tip, Product } from '../types';

interface TipDetailPageProps {
  tip: Tip | null;
  onClose: () => void;
  onSelectTip?: (tip: Tip) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewProductDetail: (product: Product) => void;
  lang: 'vi' | 'en';
  allTips: Tip[];
  allProducts: Product[];
}

export default function TipDetailPage({
  tip,
  onClose,
  onSelectTip,
  onAddToCart,
  onViewProductDetail,
  lang,
  allTips,
  allProducts
}: TipDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [promoQty, setPromoQty] = useState(1);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Smooth scroll to top of page when active tip changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tip]);

  if (!tip) return null;

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  // Find the exact "Bào Ngư Úc Viền Xanh Đóng Khay" product for our inline purchase interactive flyer!
  const abaloneProduct = allProducts.find((p) => p.id === 'seafood-abalone');

  // Pull related products matching the tip's associated category
  const relatedProducts = allProducts.filter(
    (p) => p.category === tip.relatedCategory && p.id !== 'seafood-abalone'
  ).slice(0, 4);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Structured nutritional indices for Bào Ngư content (Tip ID 4) or any other premium seafood tip
  const nutritionGrid = [
    {
      label: 'Protein',
      value: '18.7g',
      desc: lang === 'vi' 
        ? 'Cung cấp dồi dào axit amin thiết yếu, hỗ trợ cơ thể duy trì năng lượng và phục hồi cơ bắp tốt hơn.'
        : 'Rich source of essential amino acids, supporting energy levels and tissue rejuvenation.'
    },
    {
      label: lang === 'vi' ? 'Lipid cực thấp' : 'Low Lipid',
      value: '0.5g',
      desc: lang === 'vi'
        ? 'Phù hợp với chế độ ăn kiêng, ăn sạch và các thực đơn sức khỏe tinh sạch mẫu mực.'
        : 'Ideal for weight-conscious, clean eating and metabolic support protocols.'
    },
    {
      label: 'I-ốt & Selenium',
      value: 'I-Se',
      desc: lang === 'vi'
        ? 'Hỗ trợ chức năng tuyến giáp, tăng cường miễn dịch và góp phần bảo vệ tế bào khỏi quá trình oxy hóa.'
        : 'Boosts thyroid homeostasis, enhances immune systems, and halts organic oxidative damage.'
    },
    {
      label: 'Omega-3 DHA/EPA',
      value: 'Ω-3',
      desc: lang === 'vi'
        ? 'Hỗ trợ tim mạch khỏe mạnh, điều hòa mỡ máu và thúc đẩy phát triển hệ thần kinh, bổ não.'
        : 'Reinforces cardiovascular endurance, regulates lipins and fosters smart cognitive focus.'
    }
  ];

  // Simulated FAQ items specifically matching the abalone blog shown in the uploaded screenshot!
  const abaloneFaqs = [
    {
      q: lang === 'vi' 
        ? '1. Bào ngư viền xanh và viền đen loại nào ngon hơn?'
        : '1. Which is better: Greenlip or Blacklip abalone?',
      a: lang === 'vi'
        ? 'Bào ngư viền xanh được đánh giá cao hơn vượt trội nhờ sinh trưởng ở môi trường cực biển lạnh hoang sơ, cho thớ thịt trắng muốt, độ giòn tinh tế dai nhẹ và hậu vị ngọt thanh tao. Viền xanh đặc biệt phù hợp làm sashimi ăn sống trực tiếp, trong khi các dòng viền đen thông thường có cấu trúc dai hơn, thích hợp hơn với các món súp hầm chậm nhiều giờ.'
        : 'Greenlip abalone is highly superior because it populates pristine, deeper Antarctic currents, yielding clean white flesh, a delicate crisp crunch, and a buttery sweet palette. Greenlip is ideal for live sashimi, while blacklip holds a slightly tougher grain fit for slow stewing.'
    },
    {
      q: lang === 'vi'
        ? '2. Làm sao để nhận biết bào ngư Úc đông lạnh IQF đạt chất chuẩn?'
        : '2. How do I identify genuine, certified premium IQF Australian abalone?',
      a: lang === 'vi'
        ? 'Bào ngư IQF tiêu chuẩn hảo hạng phải có lớp mạ băng bảo vệ mỏng trong suốt (glazing chỉ chiếm 10-15%), không bị bọc đá tuyết trắng xóa đóng cục (dấu hiệu rã đông rồi tái cấp đông). Thịt cá/bào ngư có sắc trắng tươi hoặc hơi ánh ngà vàng nhạt tự nhiên, không bị thâm xỉn, không có vết khét lạnh (freezer burn) hay có mùi tanh nồng hôi biến chất.'
        : 'Premium IQF abalone is shielded with a thin, glass-like water glaze (10-15% glazing). Avoid boxes with clumpy snow ice, which signals temperature fluctuations. Flesh should show a healthy cream-white to light ivory tint, free from dark splotches or freezer burn.'
    },
    {
      q: lang === 'vi'
        ? '3. Bào ngư Úc size đại (Jumbo) chế biến món gì là tinh hoa nhất?'
        : '3. What is the best culinary application for Jumbo abalones?',
      a: lang === 'vi'
        ? 'Với size siêu khủng jumbo 3-4 con/kg đại từ rạn đá Tasmania, tinh hoa nhất là cắt lát mỏng ăn Sashimi trực tiếp cùng mù tạt xanh và xì dầu Nhật Bản để tận hưởng trọn vẹn thớ thịt giòn ngọt rộn rã trong miệng. Hoặc áp chảo bơ tỏi siêu nhanh dưới 30 giây để khơi gợi hương vị thơm ngậy tối đa mà không làm xơ dai thớ thịt cơ.'
        : 'With jumbo Tasmania abalones (3-4 units/kg), the absolute peak is raw sashimi to preserve the pristine oceanic texture. Alternatively, a quick 30-second pan-searing with premium garlic herb butter highlights the rich, nut-like profile without toughening the muscle.'
    },
    {
      q: lang === 'vi'
        ? '4. Hàu, cá hồi hay bào ngư nếu chưa ăn hết thì nên bảo quản ra sao?'
        : '4. How do I store leftover seafood if not consumed immediately?',
      a: lang === 'vi'
        ? 'Tất cả hải sản nhập khẩu cao cấp nên được giữ lạnh liên tục ở nhiệt độ ngăn đá chuẩn (-18°C đến -22°C). Nếu đã rã đông bằng phương pháp ngăn mát tủ lạnh, bạn bắt buộc phải chế biến và tiêu thụ hết trong tối đa 24 giờ. Tuyệt đối không được cấp đông tái trở lại sau khi rã đông vì sẽ phá vỡ tế bào dinh dưỡng và tăng nguy cơ nhiễm khuẩn.'
        : 'All imported premium seafood must remain frozen at standard deep-freeze temperatures (-18°C or lower). Once thawed in the refrigerator, consume within 24 hours. Never re-freeze after thawing as it ruins the cellular structure and accelerates bacterial activity.'
    }
  ];

  return (
    <div 
      className="bg-neutral-55/70 py-4 md:py-8 text-left select-none animate-fadeIn bg-slate-50/40" 
      id="tip-detail-view"
    >
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        
        {/* Breadcrumb Navigation - Styled cleanly like Kome88 */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 font-medium pb-2 border-b border-neutral-200">
          <button
            onClick={onClose}
            className="hover:text-red-650 transition-colors uppercase tracking-wider font-bold cursor-pointer"
          >
            {lang === 'vi' ? 'Trang chủ' : 'Home'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-350" />
          <span className="text-neutral-500 uppercase tracking-wider font-semibold">
            {lang === 'vi' ? 'Tin tức & cẩm nang' : 'Handbook & News'}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-350" />
          <span className="text-neutral-800 font-black truncate max-w-[250px] sm:max-w-none">
            {lang === 'en' ? (tip.titleEn || tip.title) : tip.title}
          </span>
        </nav>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-700 hover:text-red-700 cursor-pointer transition-all duration-200 bg-white px-4 py-2.5 rounded-full border border-neutral-200 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-red-600" />
            <span>{lang === 'vi' ? 'Quay lại tin tức' : 'Back to News'}</span>
          </button>
        </div>

        {/* SPLIT LAYOUT CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==================== LEFT COLUMN: RELATED NEWS (TIN LIÊN QUAN) ==================== */}
          <aside className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-5 space-y-5 shadow-xs lg:sticky lg:top-24">
            <div className="border-b border-neutral-150 pb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-red-650 rounded-full block" />
              <h3 className="text-sm font-black text-neutral-900 uppercase tracking-wider">
                {lang === 'vi' ? 'Tin liên quan' : 'Related News'}
              </h3>
            </div>

            <div className="space-y-4">
              {allTips.map((item) => {
                const isActive = item.id === tip.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectTip && onSelectTip(item)}
                    className={`flex gap-3 p-2.5 rounded-xl transition duration-200 cursor-pointer text-left items-start overflow-hidden border ${
                      isActive 
                        ? 'bg-red-50/50 border-red-200' 
                        : 'hover:bg-neutral-50 border-transparent hover:border-neutral-100'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 shrink-0 border border-neutral-100">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Title and date info */}
                    <div className="space-y-1">
                      <h4 className={`text-xs font-black leading-snug line-clamp-2 ${
                        isActive ? 'text-red-700' : 'text-neutral-800'
                      }`}>
                        {lang === 'en' ? (item.titleEn || item.title) : item.title}
                      </h4>
                      <p className="text-[10px] text-neutral-450 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-neutral-300" />
                        <span>05/05/2026</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Promo banner in sidebar */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl p-4 text-white text-center space-y-3 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-20 h-20 bg-red-650/20 rounded-full blur-xl" />
              <div className="space-y-1">
                <span className="bg-red-600 text-white font-mono text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                  HOT DEALS
                </span>
                <h4 className="text-xs font-bold text-neutral-100 leading-tight pt-1">
                  {lang === 'vi' ? 'Hải Sản Cao Cấp Nhập Khẩu 100%' : '100% Imported Elite Seafood'}
                </h4>
                <p className="text-[10px] text-neutral-300 leading-relaxed max-w-xs mx-auto">
                  {lang === 'vi' ? 'Cam kết bay hàng không siêu tốc, giữ lạnh tiêu chuẩn khép kín.' : 'Express air shipping, ultra temperature control chains.'}
                </p>
              </div>
            </div>
          </aside>

          {/* ==================== RIGHT COLUMN: MAIN ARTICLE BODY ==================== */}
          <main className="lg:col-span-8 space-y-8">
            <article className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm" id="article-main-body">
              
              {/* Header meta overlay title */}
              <div className="p-6 md:p-8 space-y-4 border-b border-neutral-100">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-red-650 uppercase tracking-widest font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                  {lang === 'vi' ? 'Cẩm nang dinh dưỡng cao cấp Kome88' : 'Kome88 Elite Health Handbook'}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 tracking-tight leading-tight uppercase font-sans">
                  {lang === 'en' ? (tip.titleEn || tip.title) : tip.title}
                </h1>

                {/* Meta details resembling the Vietnamese layout in screenshot */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs text-neutral-500 py-2 border-t border-neutral-100">
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-neutral-700">{lang === 'vi' ? 'Tác giả:' : 'Author:'}</span>
                      <span className="text-red-700 font-extrabold">{lang === 'vi' ? 'Ban biên tập Kome88' : 'Kome88 Editors'}</span>
                    </div>
                    <div className="w-1 h-1 bg-neutral-300 rounded-full" />
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-neutral-700">{lang === 'vi' ? 'Ngày đăng:' : 'Published:'}</span>
                      <span className="font-mono text-neutral-600">05/05/2026</span>
                    </div>
                  </div>

                  {/* Share action row */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono sm:inline hidden">{lang === 'vi' ? 'Chia sẻ:' : 'Share:'}</span>
                    <button 
                      onClick={handleCopyLink} 
                      className="p-1.5 rounded-full border border-neutral-150 hover:bg-neutral-50 hover:border-red-400 text-neutral-600 hover:text-red-600 transition cursor-pointer relative"
                      title="Copy link"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-950 text-white text-[9px] px-2 py-0.5 rounded font-bold animate-bounce whitespace-nowrap">
                          {lang === 'vi' ? 'Đã sao chép' : 'Copied!'}
                        </span>
                      )}
                    </button>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-full border border-neutral-150 hover:bg-neutral-50 hover:border-red-400 text-neutral-600 hover:text-red-600 transition">
                      <span className="font-sans font-black text-[11px] leading-none px-0.5">F</span>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-full border border-neutral-150 hover:bg-neutral-50 hover:border-red-400 text-neutral-600 hover:text-red-600 transition">
                      <span className="font-sans font-black text-[11px] leading-none px-0.5">X</span>
                    </a>
                    <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="p-1.5 rounded-full border border-neutral-150 hover:bg-neutral-50 hover:border-red-400 text-neutral-600 hover:text-red-600 transition">
                      <span className="font-sans font-black text-[11px] leading-none px-0.5 font-mono">P</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Main content body spacing */}
              <div className="p-6 md:p-8 space-y-8">
                
                {/* Structured Intro Summary Box from layout screen */}
                <div className="bg-red-50/20 rounded-2xl p-5 border-l-4 border-red-600 text-neutral-800 leading-relaxed font-semibold italic text-xs md:text-sm text-justify">
                  {lang === 'en' ? (tip.summaryEn || tip.summary) : tip.summary}
                </div>

                {/* Hero large center image */}
                <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-150 shadow-sm">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover hover:scale-101 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end justify-between">
                    <span className="text-[10px] font-mono text-neutral-200 tracking-wider">
                      © Kome88 Premium Seafood Imports
                    </span>
                    <span className="bg-neutral-950/80 text-white font-mono text-[9px] px-2 py-0.5 rounded-full font-bold">
                      INFO
                    </span>
                  </div>
                </div>

                {/* DYNAMIC ARTICLE SECTIONS WITH EXACT LAYOUT STYLING */}
                <div className="space-y-8 font-sans">
                  
                  {tip.sections && tip.sections.map((section, idx) => {
                    // Check if we should insert the special checklist box at the end of section 3
                    const isSectionThree = idx === 2 && tip.id === 4;
                    // Check if we should insert the scary shark video player at the end of section 5
                    const isSectionFive = idx === 4 && tip.id === 4;

                    return (
                      <div key={idx} className="space-y-3.5 text-left">
                        {/* Elegant heading with red side block like in screenshot */}
                        <div className="flex items-start gap-1 pb-1">
                          <span className="text-red-650 font-black text-xl md:text-2xl mr-2">|</span>
                          <h3 className="text-base md:text-lg font-black text-neutral-900 leading-tight uppercase tracking-tight">
                            {lang === 'en' ? (section.headingEn || section.heading) : section.heading}
                          </h3>
                        </div>

                        {/* Description content text block */}
                        <p className="text-xs md:text-sm text-neutral-700 leading-relaxed text-justify whitespace-pre-line font-medium">
                          {lang === 'en' ? (section.bodyEn || section.body) : section.body}
                        </p>

                        {/* Special Custom bullet/detail specifications inside Section 1 (Tasmanian details) */}
                        {idx === 0 && tip.id === 4 && (
                          <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-150 text-xs text-neutral-700 space-y-3 font-medium">
                            <p className="font-extrabold text-neutral-900 border-b pb-1.5 uppercase tracking-wider text-[11px] text-red-750 flex items-center gap-1">
                              <TrendingUp className="w-3.5 h-3.5" />
                              <span>3 đặc điểm tuyệt đối từ vùng biển Nam Úc:</span>
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="space-y-1 bg-white p-2.5 rounded-lg border border-neutral-200">
                                <span className="font-black text-neutral-900 uppercase tracking-tight block text-[10px] text-red-650">● Chất lượng thịt</span>
                                <span className="text-[11px] text-neutral-600 block line-clamp-3 leading-relaxed">
                                  Thịt trắng ngọc, cấu trúc cơ săn dai béo thanh dồi dào, giòn rụm thanh tao cực phẩm.
                                </span>
                              </div>
                              <div className="space-y-1 bg-white p-2.5 rounded-lg border border-neutral-200">
                                <span className="font-black text-neutral-900 uppercase tracking-tight block text-[10px] text-red-650">● Môi trường sống</span>
                                <span className="text-[11px] text-neutral-600 block line-clamp-3 leading-relaxed">
                                  Độ sâu 5 - 40m cực Nam, rạn đá lạnh xiết, hấp thu dinh dưỡng tối ưu qua dòng đại dương.
                                </span>
                              </div>
                              <div className="space-y-1 bg-white p-2.5 rounded-lg border border-neutral-200">
                                <span className="font-black text-neutral-900 uppercase tracking-tight block text-[10px] text-red-650">● Hương vị sạch tự nhiên</span>
                                <span className="text-[11px] text-neutral-600 block line-clamp-3 leading-relaxed">
                                  Thơm khói biển tự nhiên và vị bơ, tuyệt đối không tanh hay xơ xỉn thớ cơ.
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SPECIAL BOX INSIDE SECTION 3: Approved Arrangement Rules (from screenshot) */}
                        {isSectionThree && (
                          <div className="bg-red-50/10 border-2 border-dashed border-red-200 rounded-2xl p-5 md:p-6 space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-red-100">
                              <Award className="w-5 h-5 text-red-600 animate-pulse" />
                              <h4 className="text-[12px] md:text-sm font-black text-red-750 uppercase tracking-wider">
                                {lang === 'vi' ? '★ Tiêu Chuẩn An Toàn & Truy Xuất Nguồn Gốc' : '★ Biosecurity & Traceability Standard'}
                              </h4>
                            </div>
                            <ul className="space-y-3.5 text-xs text-neutral-700 font-medium">
                              <li className="flex gap-2.5 items-start">
                                <span className="p-1 rounded-full bg-red-100 shrink-0 text-red-600 mt-0.5">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                                <div>
                                  <span className="font-black text-neutral-900">{lang === 'vi' ? 'An toàn sinh học tuyệt đối: ' : 'Absolute Biosecurity: '}</span>
                                  <span>{lang === 'vi' ? 'Ngăn chặn sự lây lan của virus AVG và các tác nhân gây hại qua chuỗi bảo quản hàng không quốc tế.' : 'Under strict government supervision preventing virus and physical contagion risks.'}</span>
                                </div>
                              </li>
                              <li className="flex gap-2.5 items-start">
                                <span className="p-1 rounded-full bg-red-100 shrink-0 text-red-600 mt-0.5">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                                <div>
                                  <span className="font-black text-neutral-900">{lang === 'vi' ? 'Truy xuất nguồn gốc tận gốc: ' : 'Complete Source Traceability: '}</span>
                                  <span>{lang === 'vi' ? 'Mỗi thùng và vây lồng lưới đều minh bạch xuất xứ qua định vị thẻ tàu lặn thu hoạch Tasmanian.' : 'Each individual abalone box is digitally tagged to trace the diver vessel and reef lot.'}</span>
                                </div>
                              </li>
                              <li className="flex gap-2.5 items-start">
                                <span className="p-1 rounded-full bg-red-100 shrink-0 text-red-600 mt-0.5">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                                <div>
                                  <span className="font-black text-neutral-900">{lang === 'vi' ? 'Tiêu chuẩn vệ sinh HACCP: ' : 'HACCP Sanitary Protocol: '}</span>
                                  <span>{lang === 'vi' ? 'Hệ thống lạnh liên hoàn từ hầm tàu 0°C xả sâu đến tủ phân khu thành phẩm xuất bến sấy lạnh.' : 'Continuous sub-zero chill state maintained throughout flight and processing phases.'}</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        )}

                        {/* INTERACTIVE MEDIA VIDEO PLAYER INSIDE SECTION 5 (Diver Danger) */}
                        {isSectionFive && (
                          <div className="space-y-2 pt-2">
                            <div className="relative rounded-2xl overflow-hidden shadow-md group aspect-video cursor-pointer" onClick={() => setShowVideoModal(true)}>
                              {/* Video thumbnail cover mimicking the screenshot perfectly */}
                              <img 
                                src="https://img.youtube.com/vi/6f_O89t_idk/maxresdefault.jpg" 
                                alt="Abalone Divers Video Thriller"
                                className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition duration-500"
                              />
                              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex flex-col justify-between p-4" />
                              
                              {/* Top title bar */}
                              <div className="absolute top-4 left-4 right-4 text-white text-xs sm:text-sm font-extrabold flex items-center justify-between">
                                <span className="truncate bg-black/60 px-3 py-1 rounded-sm tracking-wide">
                                  Diver's Terrifying Shark Encounter | Tasman Sea
                                </span>
                                <span className="font-mono text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded uppercase">
                                  WATCH SENSORY
                                </span>
                              </div>

                              {/* Center play icon overlay matching screenshot */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-600 text-white rounded-full p-4 sm:p-5 shadow-lg relative group-hover:scale-110 group-hover:bg-red-700 transition duration-300 transform animate-pulse">
                                  <Play className="w-6 sm:w-8 h-6 sm:h-8 fill-current ml-0.5" />
                                </div>
                              </div>

                              {/* Footer Youtube signature */}
                              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-neutral-300 text-[10px] sm:text-xs">
                                <span className="font-bold flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded">
                                  <Video className="w-3.5 h-3.5 text-red-500" />
                                  <span>Tập ký sự Quest Shark - Đảo Tasmania</span>
                                </span>
                                <span className="underline select-none font-semibold">Xem trên YouTube</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-neutral-450 italic text-center">
                              {lang === 'vi' ? '▲ Clip tư liệu thợ lặn chạm trán cá mập trắng tại ranh giới đá sâu Tasmania' : '▲ Reel documentation: Tasmania diver shark encounter deep reef zone'}
                            </p>
                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>

                {/* ==================== SECTION 9: NUTRITION DENSE GRID (Nguồn dinh dưỡng vàng) ==================== */}
                {tip.id === 4 && (
                  <div className="space-y-4 pt-4 border-t border-neutral-100 text-left">
                    <div className="flex items-center gap-2 pb-1 bg-gradient-to-r from-red-50/10 to-transparent rounded">
                      <span className="text-[11px] font-extrabold uppercase font-mono text-neutral-450 block">NUTRITION HIGHLIGHT</span>
                    </div>
                    <div className="flex items-start gap-1 pb-2">
                      <span className="text-red-650 font-black text-xl mr-2">|</span>
                      <h4 className="text-sm md:text-base font-extrabold uppercase text-neutral-900 tracking-tight">
                        {lang === 'vi' ? 'Nguồn Dinh Dưỡng Vàng Từ Đại Dương' : 'Tasmanian Clean Sea Nutritional Profile'}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {nutritionGrid.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white rounded-xl p-4 border border-neutral-150 relative space-y-2.5 shadow-2xs hover:border-red-300 transition duration-200"
                        >
                          <span className="absolute top-2.5 right-3 text-red-600 font-extrabold text-[10px] tracking-widest bg-red-50/60 px-2 py-0.5 rounded font-mono">
                            {item.value}
                          </span>
                          <div className="space-y-1 pt-1">
                            <span className="text-[11px] text-neutral-450 font-bold block uppercase tracking-wide">
                              {lang === 'vi' ? 'Thành phần' : 'Element'}
                            </span>
                            <span className="font-extrabold text-neutral-900 text-sm leading-tight block">
                              {item.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-600 leading-normal text-justify">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ==================== INTERACTIVE E-COMMERCE CONVERSION FLYER PLATFORM (Buy Abalone) ==================== */}
                {tip.id === 4 && abaloneProduct && (
                  <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-md">
                    {/* Visual pattern assets */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.15),transparent)] pointer-events-none" />
                    
                    {/* Left flyer promo text */}
                    <div className="space-y-3 flex-1 text-left relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="bg-red-600 text-white font-mono text-[9px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-widest">
                          SIÊU PHẨM
                        </span>
                        <span className="text-red-400 font-bold text-xs uppercase tracking-wider font-mono flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 animate-bounce" />
                          SIZE KHỦNG 3-4 CON / 1KG
                        </span>
                      </div>
                      
                      <h4 className="text-lg md:text-xl font-black text-white uppercase tracking-tight leading-tight pt-1">
                        {lang === 'vi' ? 'BÀO NGƯ ÚC VIỀN XANH TASMANIA JUMBO' : 'Australian Premium Jumbo Greenlip Abalone'}
                      </h4>

                      <div className="space-y-1 text-neutral-300 text-xs font-semibold leading-relaxed">
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>mẫu mã cao cấp - chắc thịt ngọt sữa</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>thịt chật căng tràn lòng bàn tay</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>bay hàng không hoả tốc giữ lạnh 0°C</span>
                        </div>
                      </div>

                      {/* Pricing block */}
                      <div className="flex items-baseline gap-2 pt-2">
                        <span className="text-xl md:text-2xl font-black text-rose-500">
                          {formatPrice(abaloneProduct.price)}
                        </span>
                        {abaloneProduct.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            {formatPrice(abaloneProduct.originalPrice)}
                          </span>
                        )}
                        <span className="text-[10px] text-neutral-300 font-mono">/ Khay 1Kg</span>
                      </div>
                    </div>

                    {/* Right flyer image and shopping interactions card */}
                    <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 w-full md:w-72 shrink-0 space-y-3 relative z-10">
                      <div className="relative h-32 w-full rounded-lg overflow-hidden bg-white border border-slate-600">
                        <img 
                          src={abaloneProduct.image} 
                          alt={abaloneProduct.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-neutral-900/90 text-red-500 text-[8px] font-black px-2 py-0.5 rounded tracking-wider uppercase">
                          BEST CHOICE
                        </div>
                      </div>

                      {/* Add to cart inputs */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-neutral-300">{lang === 'vi' ? 'Số lượng đặt:' : 'Quantity:'}</span>
                          <div className="flex items-center gap-1 bg-slate-900 border border-slate-600 rounded-md py-0.5 px-1.5">
                            <button 
                              onClick={() => setPromoQty(Math.max(1, promoQty - 1))}
                              className="p-1 text-neutral-300 hover:text-white cursor-pointer active:scale-90"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-white font-mono font-bold text-xs">
                              {promoQty}
                            </span>
                            <button 
                              onClick={() => setPromoQty(promoQty + 1)}
                              className="p-1 text-neutral-300 hover:text-white cursor-pointer active:scale-90"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* CTA button with instant validation */}
                        <button
                          onClick={() => onAddToCart(abaloneProduct, promoQty)}
                          className="w-full bg-red-600 hover:bg-red-700 active:scale-97 text-white font-black py-2.5 rounded-lg text-xs transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                        >
                          <ShoppingBag className="w-4 h-4 text-white" />
                          <span>{lang === 'vi' ? 'MUA NGAY - GIAO HỎA TỐC' : 'ADD TO BASKET'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== ACCORDION FAQs SECTION (Section 11) ==================== */}
                <div className="pt-6 border-t border-neutral-100 text-left">
                  <div className="flex items-start gap-1 pb-3">
                    <span className="text-red-650 font-black text-xl mr-2">|</span>
                    <h4 className="text-sm md:text-base font-extrabold uppercase text-neutral-900 tracking-tight">
                      {lang === 'vi' ? 'FAQ - Câu hỏi thường gặp' : 'Frequently Asked Questions'}
                    </h4>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    {abaloneFaqs.map((faq, i) => {
                      const isOpen = activeFaq === i;
                      return (
                        <div 
                          key={i} 
                          className="bg-neutral-50/50 rounded-xl border border-neutral-200 overflow-hidden text-xs"
                        >
                          <button
                            onClick={() => setActiveFaq(isOpen ? null : i)}
                            className="w-full p-4 flex items-center justify-between text-left font-black text-neutral-800 hover:text-red-700 transition cursor-pointer select-none bg-white font-sans"
                          >
                            <span className="leading-snug">{faq.q}</span>
                            <span className={`text-[15px] font-bold shrink-0 ml-3 text-neutral-450 transition-transform duration-200 ${isOpen ? 'rotate-45 text-red-600' : ''}`}>
                              ✕
                            </span>
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="p-4 pt-1 pb-4 text-neutral-600 border-t border-neutral-100 bg-neutral-50 leading-relaxed font-medium">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conclusion closing remarks card */}
                <div className="bg-neutral-900 rounded-2xl p-6 text-white text-center space-y-2 select-none relative overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(ellipse_at_top,rgba(185,28,28,0.08),transparent)]" />
                  <p className="text-xs text-red-500 uppercase font-bold tracking-widest font-mono">
                    {lang === 'vi' ? 'Kome88 Premium Quality Assurance' : 'Kome88 Seafood Quality Dedication'}
                  </p>
                  <p className="text-xs text-neutral-300 max-w-lg mx-auto font-medium leading-relaxed z-10 relative">
                    {lang === 'vi'
                      ? 'Chúng tôi tin tưởng món ăn ngon bắt đầu từ sự trung thực và tự nhiên tuyệt đối. Mỗi thớ cá hồi bay Na Uy hay hải sản rã đông chuẩn sạch đều mang lại sức sống dồi dào nguyên vẹn cho bàn ăn của gia đình Việt.'
                      : 'We believe premium meals ignite from raw integrity and absolute purity. Sourcing from frozen-at-sea standards directly delivers nutrition and delight to your dining table.'}
                  </p>
                </div>

              </div>
            </article>

            {/* RELATED INGREDIENT ITEMS (CROSS-SELL) */}
            {relatedProducts.length > 0 && (
              <div className="space-y-4 pt-4 text-left">
                <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
                  <ShoppingBag className="w-4 h-4 text-red-600" />
                  <h3 className="text-xs md:text-sm font-black text-neutral-800 uppercase tracking-widest">
                    {lang === 'vi' ? 'Hải sản khuyên chọn liên quan' : 'Related Gourmet Ingredients'}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {relatedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-2xl p-3 border border-neutral-200 hover:border-red-200 transition duration-300 flex flex-col justify-between shadow-2xs hover:shadow"
                    >
                      <div 
                        className="cursor-pointer space-y-2 group"
                        onClick={() => onViewProductDetail(p)}
                      >
                        <div className="aspect-square w-full rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 relative">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                          />
                          {p.isBestSeller && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-sm tracking-wide">
                              BEST
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-neutral-900 text-xs line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                            {lang === 'en' ? (p.nameEn || p.name) : p.name}
                          </h4>
                          <p className="text-[10px] text-neutral-450 font-semibold uppercase">
                            {lang === 'vi' ? `Xuất xứ: ${p.origin}` : `Origin: ${p.originEn || p.origin}`}
                          </p>
                          <span className="text-xs font-black text-rose-600 block mt-1">
                            {formatPrice(p.price)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onAddToCart(p, 1)}
                        className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold py-2 rounded-lg transition-all duration-150 shadow-2xs flex items-center justify-center gap-1 active:scale-97 cursor-pointer uppercase tracking-wider"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>{lang === 'vi' ? 'Thêm giỏ' : 'Add to cart'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom action bar */}
            <div className="pt-4 text-center">
              <button
                onClick={onClose}
                className="text-xs font-extrabold text-neutral-500 hover:text-red-700 uppercase tracking-widest cursor-pointer underline"
              >
                {lang === 'vi' ? 'Quay lại xem tin tức khác ✕' : 'Close Details view ✕'}
              </button>
            </div>
          </main>

        </div>

      </div>

      {/* ==================== SENSORY VIDEO MODAL FOR YOUTUBE PLAYBACK ==================== */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-neutral-950/90 z-100 flex items-center justify-center p-4 animate-fadeIn" id="video-sensory-modal">
          <div className="bg-neutral-900 w-full max-w-4xl rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative">
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-12 sm:top-4 -right-1 sm:right-4 text-white hover:text-red-400 bg-black/60 p-2 rounded-full cursor-pointer transition z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/6f_O89t_idk?autoplay=1" 
                title="Abalone Diver Encounter video clip" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-neutral-950 text-left space-y-1 text-white">
              <h4 className="text-xs sm:text-sm font-extrabold text-white">
                Diver's Terrifying Shark Encounter - Deep Sea Tasmania Abalone Diving
              </h4>
              <p className="text-[11px] text-neutral-400">
                Thước phim tư liệu ghi hình thực tế chuyến thăng trầm lặn biển thu hoạch thủ công bào ngư viền xanh tại vùng rạn san hô hoang dã Tas.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
