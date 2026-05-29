import { useState } from 'react';
import { Landmark, ShieldAlert, BadgeCheck, Phone, Mail, MapPin } from 'lucide-react';
import { PARTNERS } from '../data/products';

interface FooterProps {
  lang: 'vi' | 'en';
}

export default function Footer({ lang }: FooterProps) {
  const [showCookies, setShowCookies] = useState(true);

  return (
    <footer className="bg-neutral-900 text-neutral-400 text-xs py-10 border-t-4 border-red-650 font-sans">
      {/* 1. Partners Marquee Row */}
      <div className="max-w-7xl mx-auto px-4 pb-8 border-b border-neutral-800 text-center">
        <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-6">
          {lang === 'vi' ? 'ĐỐI TÁC CỦA SEAFOOD PREMIUM' : 'SEAFOOD PREMIUM PARTNERS'}
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-11">
          {PARTNERS.map((p, i) => (
            <div
              key={i}
              className="px-5 py-2.5 rounded-lg bg-neutral-800/40 border border-neutral-800/80 text-white font-black tracking-tighter text-sm select-none hover:text-red-500 transition duration-150 flex items-center gap-1.5"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
              <span>{p.logo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Corporate Informative Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {/* Col 1: About */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">S</span>
            </div>
            <h4 className="font-extrabold text-white text-sm tracking-tight">SEAFOOD PREMIUM MARKET</h4>
          </div>
          <p className="leading-relaxed text-neutral-400">
            {lang === 'vi'
              ? 'Tự hào là đơn vị phân phối chính ngạch thủy hải sản nhập khẩu Na Uy bằng đường hàng không sạch nguyên bản, thịt bò Úc, Nhật đạt tiêu chuẩn vệ sinh an toàn cao nhất.'
              : 'Proud exclusive direct distributor of air-freighted Norwegian salmon, Japanese Wagyu, and premium organic seafood compliant with absolute sanitation benchmarks.'}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono">
            <BadgeCheck className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'vi' ? 'Mã số kiểm định: #HN-98175' : 'Certified Licence ID: #HN-98175'}</span>
          </div>
        </div>

        {/* Col 2: Hotlines and Address info */}
        <div className="space-y-3">
          <h4 className="font-bold text-neutral-200 text-xs uppercase tracking-wider">
            {lang === 'vi' ? 'Hỗ trợ khách hàng' : 'Customer Support'}
          </h4>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <span>
                {lang === 'vi' ? 'Hỗ trợ khẩn cấp: 0909.123.456' : 'Emergency line: 0909.123.456'}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <span>sales@seafoodpremium.vn</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>
                {lang === 'vi'
                  ? 'Trụ sở: 88 Trần Thái Tông, Dịch Vọng Hậu, Cầu Giấy, Hà Nội'
                  : 'HQ: 88 Tran Thai Tong, Cau Giay, Hanoi, Vietnam'}
              </span>
            </li>
          </ul>
        </div>

        {/* Col 3: Quality statements */}
        <div className="space-y-3">
          <h4 className="font-bold text-neutral-200 text-xs uppercase tracking-wider">
            {lang === 'vi' ? 'Sứ mệnh cam kết của Seafood Premium' : 'Seafood Premium Guarantee Oath'}
          </h4>
          <div className="p-3.5 bg-neutral-800/30 rounded-xl border border-neutral-850 space-y-2">
            <div className="flex items-center gap-1 text-white font-bold text-[11px]">
              <Landmark className="w-3.5 h-3.5 text-red-500" />
              <span>{lang === 'vi' ? 'AN TOÀN TUYỆT ĐỐI' : 'ABSOLUTE SECURE SAFE'}</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              {lang === 'vi'
                ? 'Đóng gói trong thùng xốp rải đá dăm nhuyễn đút gel lạnh nhiệt độ tối ưu 0-2 độ C vận chuyển tức thời không biến dạng.'
                : 'Pristinely sealed inside optimized boxes packed with shaved ice layer to preserve sashimi textures flawlessly.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Bottom copyright bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-neutral-500 font-mono">
        <span>© 2026 SEAFOOD PREMIUM. All rights reserved. Designed by Google AI Studio Build.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-red-550">{lang === 'vi' ? 'Điều khoản sử dụng' : 'Terms of use'}</a>
          <a href="#" className="hover:text-red-550">{lang === 'vi' ? 'Chính sách bảo mật' : 'Privacy policy'}</a>
        </div>
      </div>

      {/* 4. Overlay Cookie Consent Bar matching bottom right banner */}
      {showCookies && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 max-w-sm bg-white/95 text-neutral-800 border border-gray-200/80 p-4 rounded-xl shadow-2xl flex flex-col gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[9px] uppercase font-bold text-red-650 tracking-wider">
              🍪 Cookie Seafood Privacy
            </span>
            <button
              onClick={() => setShowCookies(false)}
              className="text-gray-400 hover:text-black font-bold text-[10px]"
            >
              X
            </button>
          </div>
          <p className="text-[11px] text-neutral-600 leading-relaxed text-left font-sans">
            {lang === 'vi'
              ? 'Chúng tôi sử dụng cookie để tối ưu trải nghiệm của bạn trên cửa hàng Seafood Premium và phục vụ công cụ gợi ý ẩm thực từ trợ lý ảo AI.'
              : 'Our system accesses minimal cookies to customize shopping interfaces and power the AI recipe model recommendations.'}
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowCookies(false)}
              className="text-[10px] text-neutral-500 hover:text-neutral-900 px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-md font-bold transition"
            >
              {lang === 'vi' ? 'Từ chối' : 'Reject'}
            </button>
            <button
              onClick={() => setShowCookies(false)}
              className="text-[10px] text-white px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded-md font-bold transition shadow-sm"
            >
              {lang === 'vi' ? 'Chấp nhận' : 'Accept'}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
