import { Router, Request, Response } from 'express';
import { getGeminiClient, offlineRecommendationsMap, offlineRecommendationsViMap } from '../services/gemini';
import { Type } from '@google/genai';

const router = Router();

router.post('/recipe', async (req: Request, res: Response) => {
  try {
    const { cartItems, userPrompt, allStoreProducts, lang } = req.body;
    const isEn = lang === 'en';

    try {
      const client = getGeminiClient();

      const userMessage = `
Current shopping cart contains:
${JSON.stringify(cartItems, null, 2)}

User wants or asks for: "${userPrompt || (isEn ? 'Recommend a delicious meal from active cart products' : 'Gợi ý món ăn ngon từ sản phẩm trong giỏ')}"

List of available products in the store database:
${JSON.stringify(allStoreProducts?.map((p: any) => ({ id: p.id, name: isEn ? (p.nameEn || p.name) : p.name, price: p.price })), null, 2)}

Please recommend a traditional premium Japanese or Korean recipe that perfectly utilizes the user's cart ingredients or satisfies their specific query request.
Your response MUST be a single structured JSON matching the provided schema, with ingredientsNeeded showing whether each item is already in the cart (availableInCart: true) versus if it's available in the store (availableInStore: true and provide correct productId from store list so user can click to buy it) or if it's external (availableInStore: false).

All names, instructions, and descriptions MUST be in ${isEn ? 'English' : 'Vietnamese'} language with premium, elegant, professional restaurant-quality tone. Use terms like "Seafood Premium", "Na Uy", "Nhật Bản", "Hải Sản", "Thượng hạng". Ensure accuracy.
`;

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userMessage,
        config: {
          systemInstruction: isEn
            ? 'You are the premium Seafood Premium AI Chef Assistant, a leading culinary expert in exquisite oriental and seafood dishes. You respond in refined, elegant English, suggesting/advertising relevant gourmet products to boost sales at Seafood Premium. You MUST ONLY respond in the exact JSON format specified below.'
            : 'Bạn là Trợ lý Đầu bếp Seafood Premium AI cao cấp, chuyên gia hàng đầu về các món ăn mộc mạc và thượng hạng phong cách chế biến hải sản. Bạn trả lời bằng ngôn ngữ ẩm thực Việt Nam đậm đà, lịch thiệp, gợi ý kích thích nhu cầu mua sắm thực phẩm tươi sống tại Seafood Premium. Bạn CHỈ trả về duy nhất định dạng cấu trúc JSON chính xác theo schema quy định bên dưới.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: isEn ? 'Luxurious name of the recipe' : 'Tên món ăn sang trọng kiểu Nhật/Hàn' },
              prepTime: { type: Type.STRING, description: isEn ? 'Prep time (e.g., "15 mins")' : 'Thời gian chuẩn bị (ví dụ: "15 phút")' },
              cookTime: { type: Type.STRING, description: isEn ? 'Cook time (e.g., "10 mins")' : 'Thời gian chế biến (ví dụ: "10 phút")' },
              difficulty: { type: Type.STRING, description: isEn ? 'Difficulty level: "Easy" | "Medium" | "Hard"' : 'Độ khó: "Dễ" | "Trung bình" | "Khó"' },
              description: { type: Type.STRING, description: isEn ? 'Short attractive recipe pitch' : 'Mô tả ngắn đầy thu hút khơi gợi hương vị món ăn' },
              ingredientsNeeded: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: isEn ? 'Ingredient name' : 'Tên nguyên liệu' },
                    amount: { type: Type.STRING, description: isEn ? 'Amount' : 'Định lượng cần dùng' },
                    availableInCart: { type: Type.BOOLEAN, description: 'Is available in active cart' },
                    availableInStore: { type: Type.BOOLEAN, description: 'Is active store product shelf item' },
                    productId: { type: Type.STRING, description: 'Correct key from store ID if matched' }
                  },
                  required: ['name', 'amount', 'availableInCart', 'availableInStore']
                }
              },
              instructions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: isEn ? 'Detail sequence of execution instructions' : 'Danh sách các bước thực hiện chi tiết tinh tế, tỉ mỉ'
              }
            },
            required: ['title', 'prepTime', 'cookTime', 'difficulty', 'description', 'ingredientsNeeded', 'instructions']
          }
        }
      });

      if (response && response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json(parsed);
      } else {
        throw new Error('Gemini returned empty text response');
      }
    } catch (apiError: any) {
      let fallbackType = 'default';
      const lowercasePrompt = (userPrompt || '').toLowerCase();
      if (lowercasePrompt.includes('sashimi') || lowercasePrompt.includes('gỏi') || lowercasePrompt.includes('cá sống')) {
        fallbackType = 'sashimi';
      } else if (lowercasePrompt.includes('bò') || lowercasePrompt.includes('wagyu') || lowercasePrompt.includes('nướng') || lowercasePrompt.includes('lẩu')) {
        fallbackType = 'beef';
      }

      const hasSashimi = cartItems?.some((item: any) => item.product.category === 'sashimi');
      const hasBeef = cartItems?.some((item: any) => item.product.category === 'beef');
      if (fallbackType === 'default') {
        if (hasSashimi) fallbackType = 'sashimi';
        else if (hasBeef) fallbackType = 'beef';
      }

      const map = isEn ? offlineRecommendationsMap : offlineRecommendationsViMap;
      const selectedFallback = map[fallbackType];

      const updatedIngredients = selectedFallback.ingredientsNeeded.map((ing: any) => {
        const matchInCart = cartItems?.some((item: any) => item.product.id === ing.productId);
        return { ...ing, availableInCart: !!matchInCart };
      });

      return res.json({
        ...selectedFallback,
        ingredientsNeeded: updatedIngredients,
        systemNote: isEn ? 'Recipe optimized matching your cart items!' : 'Đã tối ưu hóa thực đơn gợi ý dựa trên nguyên liệu của bạn!'
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date() });
});

export default router;
