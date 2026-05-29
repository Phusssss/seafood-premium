import { GoogleGenAI, Type } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY' || key.trim() === '') {
      throw new Error('GEMINI_API_KEY is not configured in the Secrets panel.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export const offlineRecommendationsMap: { [key: string]: any } = {
  default: {
    title: 'Miso Udon with Poached Egg & Salmon Fillet',
    prepTime: '15 mins',
    cookTime: '10 mins',
    difficulty: 'Easy',
    description: 'A perfect gourmet combination of thick, succulent premium Norwegian salmon fillets nestled in rich, savory Japanese Miso broth and silky udon noodles.',
    ingredientsNeeded: [
      { name: 'Airborne Fresh Norwegian Salmon Fillet', amount: '200g', availableInCart: true, availableInStore: true, productId: 'salmon-fillet' },
      { name: 'Sweet Yamasa Shoyu Soy Sauce', amount: '2 tbsp', availableInCart: false, availableInStore: true, productId: 'spice-shoyu' },
      { name: 'Fresh Udon noodles', amount: '1 pack', availableInCart: false, availableInStore: false },
      { name: 'Garlic Miso Soup Paste', amount: '2 tbsp', availableInCart: false, availableInStore: false },
      { name: 'Scallion & Fresh Ginger julienne', amount: '10g', availableInCart: false, availableInStore: false }
    ],
    instructions: [
      'Cut the Norwegian salmon fillet into bite-sized slices about 1.5cm thick.',
      'Bring water to a simmer with Japanese Miso paste and sweet soy sauce in a pot.',
      'Blanch the fresh Udon noodles for 2 minutes and transfer to a large ceramic bowl.',
      'Gently immerse the salmon slices into the simmering soup for 2-3 minutes to keep them moist and tender.',
      'Pour the scaling miso broth over the udon bowl, top with salmon slices, scallion ribbons, and a creamy poached egg.'
    ]
  },
  sashimi: {
    title: 'Traditional Sakura Sashimi Plattering',
    prepTime: '20 mins',
    cookTime: '0 mins',
    difficulty: 'Medium',
    description: 'The elegant art of premium Japanese sashimi presentation. Relish the sheer buttery texture of cold-water Salmon and ocean Scallops coupled with instant wasabi.',
    ingredientsNeeded: [
      { name: 'Sashimi Special Premium Box', amount: '1 large platter', availableInCart: true, availableInStore: true, productId: 'sashimi-special' },
      { name: 'Hon-Wasabi Japanese Tube', amount: '1 tube', availableInCart: true, availableInStore: true, productId: 'spice-wasabi' },
      { name: 'Gari Pickled Pink Ginger', amount: '1 pack', availableInCart: false, availableInStore: true, productId: 'spice-ginger' },
      { name: 'Perilla leaves & decorated cucumber', amount: '1 unit', availableInCart: false, availableInStore: false }
    ],
    instructions: [
      'Crush fresh ice cleanly and layout perilla leaves over the serving platter.',
      'Arrange Salmon fillet and giant Scallop coin slices alternately.',
      'Shred radish thinly like snow strands and place them around the edges.',
      'Pour Yamasa sweet shoyu soy sauce into a ceramic cup and add wasabi.',
      'Dip sashimi lightly into shoyu sauce, coat with hon-wasabi, and cleanse palate with pink ginger.'
    ]
  },
  beef: {
    title: 'Wagyu A5 Beef Shabu Shabu Japanese Hotpot',
    prepTime: '15 mins',
    cookTime: '15 mins',
    difficulty: 'Medium',
    description: 'Exquisite shabu-shabu feast showcasing paper-thin marbled ribbons of premium Wagyu A5 beef dissolved in delicate seaweed Kombu broth.',
    ingredientsNeeded: [
      { name: 'Wagyu Japan A5 Striploin Steak Slices', amount: '300g thin slices', availableInCart: true, availableInStore: true, productId: 'beef-wagyu-a5' },
      { name: 'Sweet Yamasa Shoyu Soy Sauce', amount: '3 tbsp', availableInCart: false, availableInStore: true, productId: 'spice-shoyu' },
      { name: 'Enoki and King Oyster mushrooms', amount: '150g', availableInCart: false, availableInStore: false },
      { name: 'Japanese Chrysanthemum Greens & cabbage', amount: '200g', availableInCart: false, availableInStore: false },
      { name: 'Kombu Kelp sheet', amount: '1 unit', availableInCart: false, availableInStore: false }
    ],
    instructions: [
      'Soak Kombu kelp in cold water for 30 minutes, heat to a simmer, and discard kelp to harvest pure broth.',
      'Layout thin, beautifully marbled Wagyu A5 slices on a wooden platter.',
      'Arrange fresh vegetables and mushrooms in a boiling hotpot cooker.',
      'Swirl Wagyu slices in the active boiling broth for exactly 5 seconds to cook medium-rare.',
      'Dip into sesame paste or sweet citrusy Ponzu soy sauce.'
    ]
  }
};

export const offlineRecommendationsViMap: { [key: string]: any } = {
  default: {
    title: 'Mì Udon Cá Hồi Na Uy Miso Trứng Chần',
    prepTime: '15 phút',
    cookTime: '10 phút',
    difficulty: 'Dễ',
    description: 'Sự hòa quyện tuyệt hảo của phi lê cá hồi Na Uy tươi dầy đặn cùng vị nước dùng Miso Nhật Bản ấm áp, đậm đà cùng sợi udon dai mượt.',
    ingredientsNeeded: [
      { name: 'Cá Hồi Na Uy Tươi Fillet Cao Cấp', amount: '200g', availableInCart: true, availableInStore: true, productId: 'salmon-fillet' },
      { name: 'Nước Tương Shoyu Ngọt Ăn Sashimi Yamasa', amount: '2 muỗng canh', availableInCart: false, availableInStore: true, productId: 'spice-shoyu' },
      { name: 'Sợi Udon tươi', amount: '1 gói', availableInCart: false, availableInStore: false },
      { name: 'Súp Miso tỏi hành', amount: '2 muỗng canh', availableInCart: false, availableInStore: false },
      { name: 'Hành hoa & Gừng non xắt sợi', amount: '10g', availableInCart: false, availableInStore: false }
    ],
    instructions: [
      'Thái phi lê cá hồi thành những miếng vừa ăn dầy khoảng 1.5cm.',
      'Nấu sôi nước dùng cùng miso và xì dầu ngọt Nhật trong nồi đất ấm.',
      'Trần sợi mì Udon tươi trong 2 phút chín tới rồi xếp ra tô sứ lớn.',
      'Nhúng nhẹ cá hồi trong nồi nước mì đang sôi ngập khoảng 2-3 phút để giữ nguyên thớ thịt đỏ ngọt bùi mọng nước.',
      'Múc nước súp nóng hổi chan ngập tô mì, bày cá hồi lên trên cùng hành lá thái nhuyễn và một lòng đỏ trứng gà chần béo ngậy.'
    ]
  },
  sashimi: {
    title: 'Khay Tiệc Sashimi Sakura Truyền Thống',
    prepTime: '20 phút',
    cookTime: '0 phút',
    difficulty: 'Trung bình',
    description: 'Nghệ thuật trình bày sashimi chuẩn Nhật sang trọng. Thưởng thức vị thanh mát tinh khiết cá sống vùng biển Bắc cực cùng mù tạt cay bùng nổ.',
    ingredientsNeeded: [
      { name: 'Combo Sashimi Special Premium', amount: '1 khay lớn', availableInCart: true, availableInStore: true, productId: 'sashimi-special' },
      { name: 'Wasabi Tươi Hon-Wasabi Nhật Bản', amount: '1 tuýp', availableInCart: true, availableInStore: true, productId: 'spice-wasabi' },
      { name: 'Gừng Hồng Muối Chua Gari Nhật', amount: '1 gói', availableInCart: false, availableInStore: true, productId: 'spice-ginger' },
      { name: 'Lá tía tô dưa leo tỉa hoa', amount: '1 ít', availableInCart: false, availableInStore: false }
    ],
    instructions: [
      'Ướp lạnh khay đá dăm nhuyễn lót lá tía tô rửa sạch ráo nước khô ráo.',
      'Xếp so le các lát Cá hồi Na Uy phile và Cồi sò điệp mập ú rải xung quanh.',
      'Đặt các chùm củ cải đỏ thái sợi mảnh như tơ mây bên mép đĩa tạo hình ngọn cỏ tuyết.',
      'Bày tuýp Wasabi tươi cùng nước tương Shoyu Yamasa ra chén sứ nhỏ.',
      'Thưởng thức bằng cách nhúng nhẹ thịt cá chín rộm mỡ vắt tẹo mù tạt lên rồi để gừng hồng xoa dịu vòm họng.'
    ]
  },
  beef: {
    title: 'Lẩu Bò Wagyu A5 Nhúng Shabu Shabu Hàn Nhật',
    prepTime: '15 phút',
    cookTime: '15 phút',
    difficulty: 'Trung bình',
    description: 'Món lẩu tinh tế dâng hiến thớ vân mỡ cẩm thạch béo mềm của bò Wagyu A5 thượng đỉnh quyện trong nước cốt kombu thanh tao ngọt đậm vị umami.',
    ingredientsNeeded: [
      { name: 'Bò Wagyu Nhật Bản A5 Striploin', amount: '300g thái mỏng', availableInCart: true, availableInStore: true, productId: 'beef-wagyu-a5' },
      { name: 'Nước Tương Shoyu Ngọt Ăn Sashimi Yamasa', amount: '3 muỗng canh', availableInCart: false, availableInStore: true, productId: 'spice-shoyu' },
      { name: 'Nấm kim châm, nấm đùi gà', amount: '150g', availableInCart: false, availableInStore: false },
      { name: 'Rau cải cúc Nhật (Shungiku) & Cải thảo', amount: '200g', availableInCart: false, availableInStore: false },
      { name: 'Tảo bẹ Kombu nấu nước dùng', amount: '1 miếng', availableInCart: false, availableInStore: false }
    ],
    instructions: [
      'Lau sạch tảo Kombu khô rùi ngâm trong nồi nước lạnh 30 phút, nấu đun sôi nhẹ rồi vớt tảo ra lấy nước dùng tinh hải.',
      'Bày khay bò Wagyu A5 thái mỏng mướt mát ra đĩa gỗ sang trọng.',
      'Xếp rau nấm tỉa hoa bầy xung quanh nồi lẩu lách rách sôi.',
      'Khi nước lẩu bốc khói dồi dào, cầm đũa gắp từng miếng bò Wagyu A5 lướt qua nước sôi khoảng 5 giây chuẩn vừa chín tới.',
      'Chấm đẫm sốt mè rang bùi ngậy béo nức lòng hoặc chấm xì dầu chua Ponzu thanh tao.'
    ]
  }
};
