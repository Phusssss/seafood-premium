import { useState } from 'react';
import {
  Sparkles,
  X,
  Clock,
  CheckCircle,
  PlusCircle,
  HelpCircle,
  ChefHat,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  Utensils,
} from 'lucide-react';
import { CartItem, Product, RecipeRecommendation } from '../types';

interface AIChefAssistantProps {
  cart: CartItem[];
  allProducts: Product[];
  onAddProductById: (id: string) => void;
  lang: 'vi' | 'en';
}

export default function AIChefAssistant({
  cart,
  allProducts,
  onAddProductById,
  lang,
}: AIChefAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipeResult, setRecipeResult] = useState<RecipeRecommendation | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const handleFetchRecipe = async (promptText?: string) => {
    setIsLoading(true);
    setErrorMessage('');
    setRecipeResult(null);

    // Prepare standard cart logs
    const serializedCart = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      quantity: item.quantity,
      category: item.product.category,
    }));

    try {
      const response = await fetch('/api/gemini/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: serializedCart,
          userPrompt: promptText || customPrompt,
          allStoreProducts: allProducts,
          lang,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned internal error during recipe compilation.');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setRecipeResult(data);
      setCustomPrompt('');
    } catch (err: any) {
      setErrorMessage(
        lang === 'vi'
          ? 'Không thể kết nối đến máy dịch đầu bếp AI. Vui lòng thử lại!'
          : 'Could not contact the AI chef portal. Please try again!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Quick prompt suggestions
  const SUGGESTIONS_VI = [
    'Tôi muốn nấu lẩu cá hồi Na Uy cay ấm',
    'Thực đơn cao cấp từ bò Wagyu Nhật',
    'Cách trình bày và bảo quản khay sashimi',
    'Món ăn kèm rượu Sake Hakushika ngon',
  ];

  const SUGGESTIONS_EN = [
    'Cook cozy Norwegian salmon miso soup',
    'Premium food menu with Japanese Wagyu',
    'Sashimi plating and chilling rules',
    'Best food matches for Hakushika Sake',
  ];

  const activeSuggestions = lang === 'vi' ? SUGGESTIONS_VI : SUGGESTIONS_EN;

  return (
    <>
      {/* 1. Floating round launch bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-neutral-900 border-2 border-red-650 text-white rounded-full p-4 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 group hover:shadow-red-500/25 cursor-pointer"
        title={lang === 'vi' ? 'Trợ lý Ẩm thực Seafood AI' : 'Seafood AI Culinary Assistant'}
      >
        <div className="relative">
          <ChefHat className="w-6 h-6 text-red-500 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider hidden md:inline-block pr-1 font-mono">
          Seafood AI Assistant
        </span>
      </button>

      {/* 2. Interactive Sliding panel modal */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          {/* Header strip */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-neutral-950 text-white sticky top-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                <ChefHat className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm uppercase tracking-tight flex items-center gap-1.55">
                  <span>{lang === 'vi' ? 'TRỢ LÝ ĐẦU BẾP SEAFOOD AI' : 'SEAFOOD AI CHEF ASSISTANT'}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse animate-bounce" />
                </h3>
                <p className="text-[9px] text-gray-400 text-left">
                  {lang === 'vi' ? 'Gợi ý thực đơn & thực phẩm tươi sống chuẩn vị' : 'Gourmet recipe suggestions & fresh seafood pairings'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-neutral-800 flex items-center justify-center text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Main Assistant Chat area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-neutral-50/50">
            {recipeResult ? (
              /* A. Recipe Outcome Display container */
              <div className="space-y-5 animate-in fade-in duration-300">
                {/* Back to chat action */}
                <button
                  onClick={() => setRecipeResult(null)}
                  className="text-xs text-red-600 hover:underline font-bold flex items-center gap-1"
                >
                  ◀ {lang === 'vi' ? 'Hỏi thêm câu khác cùng Seafood AI' : 'Ask another recipe from AI Chef'}
                </button>

                {/* Recipe Hero banner card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs text-left space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-50 text-red-600 text-[10px] font-black px-2.5 py-0.5 rounded-sm uppercase font-mono tracking-wider">
                      {recipeResult.difficulty}
                    </span>
                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Chuẩn bị: {recipeResult.prepTime} | Nấu: {recipeResult.cookTime}</span>
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-neutral-900 leading-tight">
                    {recipeResult.title}
                  </h4>

                  <p className="text-xs text-neutral-600 leading-relaxed font-sans italic border-l-2 border-red-500 pl-3">
                    {recipeResult.description}
                  </p>

                  {/* List of ingredients with cross-sell purchase action */}
                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    <h5 className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                      <Utensils className="w-4 h-4 text-red-600" />
                      <span>{lang === 'vi' ? 'Danh Sách Nguyên Liệu' : 'List of Ingredients'}</span>
                    </h5>

                    <div className="space-y-2">
                      {recipeResult.ingredientsNeeded?.map((ing, j) => {
                        // Find matching product price in our shelf
                        const matchingProduct = allProducts.find((p) => p.id === ing.productId);

                        return (
                          <div
                            key={j}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-lg bg-neutral-50 border border-gray-150/80 text-xs font-sans"
                          >
                            <span className="font-medium text-neutral-800 text-left">
                              <strong>{ing.name}</strong> • <span className="text-neutral-500 font-mono">{ing.amount}</span>
                            </span>

                            {ing.availableInCart ? (
                              <span className="bg-emerald-50 text-emerald-700 font-bold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 self-start sm:self-center font-mono">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                <span>{lang === 'vi' ? 'Đã có ở giỏ' : 'In Cart'}</span>
                              </span>
                            ) : ing.availableInStore && ing.productId ? (
                              <button
                                onClick={() => onAddProductById(ing.productId!)}
                                className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold text-[10px] px-2.5 py-1 rounded-sm flex items-center gap-1 transition shrink-0 active:scale-95 cursor-pointer self-start sm:self-center"
                              >
                                <PlusCircle className="w-3.5 h-3.5" />
                                <span>
                                  {lang === 'vi'
                                    ? `Thêm vào Giỏ ${matchingProduct ? `(${formatPrice(matchingProduct.price)})` : ''}`
                                    : 'Add to Cart'}
                                </span>
                              </button>
                            ) : (
                              <span className="bg-gray-100 text-gray-500 font-medium text-[9px] px-2 py-0.5 rounded-full shrink-0 self-start sm:self-center font-mono">
                                {lang === 'vi' ? 'Nguyên liệu phụ' : 'Complementary'}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* List of step directions */}
                  <div className="space-y-3 pt-3 border-t border-gray-150">
                    <h5 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                      {lang === 'vi' ? 'Các bước chế biến tỉ mỉ' : 'Detailed Instructions Steps'}
                    </h5>

                    <ol className="space-y-3">
                      {recipeResult.instructions?.map((inst, k) => (
                        <li key={k} className="flex gap-2.5 items-start text-xs text-neutral-700 leading-relaxed text-left">
                          <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 font-black flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                            {k + 1}
                          </span>
                          <span>{inst}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              /* B. Default Prompt Interaction Interface */
              <div className="space-y-5 animate-in fade-in duration-200 text-left">
                {/* AI Chef Greeting message */}
                <div className="bg-white border border-gray-100 p-4 rounded-2xl flex items-start gap-3 shadow-xs">
                  <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                    <ChefHat className="w-5.5 h-5.5" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-extrabold text-neutral-900">
                      {lang === 'vi' ? 'Seafood Chef Assistant' : 'Gourmet Culinary Bot'}
                    </h5>
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                      {lang === 'vi'
                        ? 'Xin chào quý khách! Tôi có thể quét ngay các nguyên liệu tươi ngon trong Giỏ Hàng của bạn và lập tức thiết kế một bữa tối mộc mạc hoặc sang trọng phong vị Nhật/Hàn tuyệt hảo!'
                        : 'Welcome! I can instantly scan your current cart items and compile an elite oriental-themed recipe complete with missing ingredients cross-buying buttons!'}
                    </p>
                  </div>
                </div>

                {/* Auto scan cart button trigger */}
                {cart.length > 0 ? (
                  <button
                    onClick={() => handleFetchRecipe()}
                    className="w-full bg-red-600 hover:bg-neutral-900 hover:shadow-neutral-500/10 text-white font-extrabold text-xs py-3 rounded-xl uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md hover:shadow-red-500/20 active:scale-97 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                    <span>{lang === 'vi' ? 'QUÉT GIỎ HÀNG & GỢI Ý THỰC ĐƠN AI' : 'RECOMMEND RECIPE FROM ACTIVE WG-CART'}</span>
                  </button>
                ) : (
                  <div className="p-4 bg-orange-50 text-orange-850 rounded-xl border border-orange-100/80 text-xs flex gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.2" />
                    <p className="font-medium leading-relaxed font-sans">
                      {lang === 'vi'
                        ? 'Giỏ hàng của bạn đang trống! Hãy thêm phi lê cá hồi Na Uy, sườn bò, hay sò điệp Nhật rồi ấn quét để trải nghiệm ẩm thực AI đầy tiện ích!'
                        : 'Your shopping cart is currently empty! Please add salmon, beef, or sushi sets to prompt gourmet AI recipes!'}
                    </p>
                  </div>
                )}

                {/* Question suggestions list */}
                <div className="space-y-2.5">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                    {lang === 'vi' ? 'Gợi ý các chủ đề ẩm thực hỏi ngay:' : 'Quick gourmet prompts to ask:'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeSuggestions.map((sug, m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setCustomPrompt(sug);
                          handleFetchRecipe(sug);
                        }}
                        className="p-3 text-left bg-white hover:bg-neutral-50 border border-gray-150 rounded-xl hover:border-red-200 transition text-xs font-semibold text-neutral-700 flex justify-between items-center group active:scale-95 cursor-pointer"
                      >
                        <span className="line-clamp-2 leading-snug">{sug}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-600 shrink-0 ml-1.5 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom input section */}
          {!recipeResult && (
            <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0">
              {errorMessage && (
                <p className="text-[10px] text-red-600 font-bold mb-2.5 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMessage}</span>
                </p>
              )}

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-4 space-y-2">
                  <div className="w-8 h-8 rounded-full border-[3px] border-solid border-red-500 border-t-transparent animate-spin"></div>
                  <p className="text-xs font-bold text-neutral-800 animate-pulse font-mono tracking-wide">
                    {lang === 'vi' ? 'ĐẦU BẾP AI ĐANG SÁNG TẠO THỰC ĐƠN...' : 'AI GOURMET ARTISAN CREATING...'}
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={
                      lang === 'vi'
                        ? 'Hỏi hoặc viết yêu cầu nấu ăn của bạn...'
                        : 'Ask or describe your cooking query...'
                    }
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && customPrompt.trim()) {
                        handleFetchRecipe();
                      }
                    }}
                    className="flex-1 bg-neutral-50 text-neutral-800 text-xs pl-4 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                  <button
                    onClick={() => customPrompt.trim() && handleFetchRecipe()}
                    className="bg-neutral-900 hover:bg-red-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl uppercase transition group active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    <span>{lang === 'vi' ? 'Gửi' : 'Send'}</span>
                    <Sparkles className="w-3.5 h-3.5 group-hover:animate-spin" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
