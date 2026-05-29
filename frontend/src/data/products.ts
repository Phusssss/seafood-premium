import { Product, Voucher } from '../types';

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm', nameEn: 'All Products', icon: 'Store' },
  { id: 'salmon', name: 'Cá Hồi Na Uy', nameEn: 'Norwegian Salmon', icon: 'Fish' },
  { id: 'sashimi', name: 'Sashimi Chuẩn Vị Nhật', nameEn: 'Japanese Sashimi', icon: 'ChefHat' },
  { id: 'beef', name: 'Thịt Bò Nhập Khẩu', nameEn: 'Imported Beef', icon: 'Beef' },
  { id: 'seafood', name: 'Hải Sản Nhập Khẩu', nameEn: 'Imported Seafood', icon: 'Waves' },
  { id: 'combo', name: 'Combo Quà Tặng Dinh Dưỡng', nameEn: 'Premium Food Gifts', icon: 'Gift' },
  { id: 'spice', name: 'Gia Vị & Nguyên Liệu', nameEn: 'Spices & Ingredients', icon: 'ListOrdered' },
  { id: 'drink', name: 'Rượu Vang & Sake', nameEn: 'Fine Wines & Sake', icon: 'Wine' },
];

export const PRODUCTS: Product[] = [
  // 1. Cá Hồi Na Uy
  {
    id: 'salmon-fillet',
    name: 'Cá Hồi Na Uy Tươi Fillet Cao Cấp',
    nameEn: 'Premium Fresh Norwegian Salmon Fillet',
    price: 237000,
    originalPrice: 280000,
    image: 'https://i.ibb.co/GvkDsHVf/Gemini-Generated-Image-vdm4kuvdm4kuvdm4.png',
    category: 'salmon',
    origin: 'Na Uy',
    originEn: 'Norway',
    unit: 'Khay 300g Fillet',
    unitEn: '300g Fillet Tray',
    description: 'Cá hồi Na Uy tươi lọc xương, giữ lại lớp mỡ béo ngậy đặc trưng. Thích hợp ăn Sashimi hoặc áp chảo.',
    descriptionEn: 'Fresh deboned Norwegian salmon rich in natural oils. Excellent for Sashimi dishes or pan-sear cooking.',
    isBestSeller: true,
    isInStock: true,
    specs: ['Nên sử dụng trong ngày khi ăn sashimi', 'Bảo quản ngăn mát 0-2 độ C', 'Thịt cá cam đỏ tự nhiên, vân mỡ đều'],
    specsEn: ['Consume within the day for sashimi', 'Keep cold at 0-2°C', 'Natural orange meat with balanced fat marble']
  },
  {
    id: 'salmon-whole',
    name: 'Cá Hồi Na Uy Tươi Nguyên Con',
    nameEn: 'Fresh Norwegian Whole Salmon (Aviation)',
    price: 2860000,
    originalPrice: 3200000,
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800',
    category: 'salmon',
    origin: 'Na Uy',
    originEn: 'Norway',
    unit: 'Con 5-6kg',
    unitEn: '5-6kg Whole Fish',
    description: 'Cá hồi nhập khẩu trực tiếp bằng đường hàng không hàng tuần. Hỗ trợ mổ, fillet và đóng khay đá miễn phí cho khách.',
    descriptionEn: 'Imported fresh by air weekly. Complimented with free custom gutting, deboning, steak-cutting, and ice packing.',
    isBestSeller: true,
    isInStock: true,
    specs: ['Nhập khẩu nguyên con từ Leroy/Ocean Quality', 'Giao kèm đá lạnh giữ nhiệt', 'Hỗ trợ cắt lát theo yêu cầu'],
    specsEn: ['Imported whole from Leroy/Ocean Quality', 'Delivered with cooling gel pack', 'Custom slicing upon request']
  },
  {
    id: 'salmon-smoked',
    name: 'Cá Hồi Xông Khói Na Uy Fossen',
    nameEn: 'Fossen Smoked Norwegian Salmon',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800',
    category: 'salmon',
    origin: 'Na Uy',
    originEn: 'Norway',
    unit: 'Gói 200g',
    unitEn: '200g Pack',
    description: 'Cá hồi xông khói bằng gỗ sồi tự nhiên đạt chuẩn châu Âu, giữ vị ngọt mềm, mặn nhẹ mượt mà.',
    descriptionEn: 'European standard cold-smoked salmon using natural oak wood, retaining a sweet, moist, lightly-salted finish.',
    isInStock: true,
    specs: ['Ăn trực tiếp cùng salad hoặc bánh mì', 'Bảo quản đông lạnh -18 độ C'],
    specsEn: ['Eat directly with salad or bread', 'Storage under freezing -18°C']
  },
  {
    id: 'salmon-kirimi',
    name: 'Cá Hồi Phi Lê Cắt Khúc Kirimi',
    nameEn: 'Kirimi Norwegian Salmon Portion Slices',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
    category: 'salmon',
    origin: 'Na Uy',
    originEn: 'Norway',
    unit: 'Gói 200g',
    unitEn: '200g Pack',
    description: 'Cắt khúc Kirimi đều đặn cực kỳ phù hợp cho bé ăn dặm hoặc làm cơm bento gia đình.',
    descriptionEn: 'Even Kirimi vertical-cut steaks, extremely suitable for infant baby nutritious meals or daily family bento.',
    isInStock: true,
    specs: ['Cắt khúc dày tiện lợi', 'Bảo quản đông lạnh'],
    specsEn: ['Thick pre-cut convenience portion', 'Keep frozen for longevity']
  },

  // 2. Sashimi
  {
    id: 'sashimi-special',
    name: 'Combo Sashimi Special Premium',
    nameEn: 'Special Premium Sashimi Feast Set',
    price: 999000,
    originalPrice: 1200000,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    category: 'sashimi',
    origin: 'Nhật Bản & Na Uy',
    originEn: 'Japan & Norway',
    unit: 'Set 4-5 người',
    unitEn: 'Set for 4-5 Pax',
    description: 'Mâm tiệc Sashimi cao cấp gồm cá hồi Na Uy, sò đỏ Nhật, bạch tuọc Tako, cá ngừ đại dương và tôm ngọt.',
    descriptionEn: 'Luxurious sashimi platter containing fresh Norwegian salmon, Japanese red surf clams, Tako octopus, sweet shrimp, and bluefin tuna.',
    isBestSeller: true,
    isInStock: true,
    specs: ['Tặng kèm: Mù tạt tươi, Nước tương Nhật, Gừng muối, Lá tía tô và củ cải bào', 'Đóng khay đá giữ lạnh tối đa'],
    specsEn: ['Includes: Fresh Wasabi, Soy sauce, Sushi ginger, Shiso leaves & Daikon', 'Delivered under ice box for cold preservation']
  },
  {
    id: 'sashimi-salmon-200',
    name: 'Sashimi Cá Hồi Na Uy King Size',
    nameEn: 'King Size Norwegian Salmon Sashimi',
    price: 158000,
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=800',
    category: 'sashimi',
    origin: 'Na Uy',
    originEn: 'Norway',
    unit: 'Khay 200g',
    unitEn: '200g Tray',
    description: 'Cá hồi tươi thái lát sashimi chuẩn vị Nhật, kèm củ cải đỏ và rau tía tô thơm mát.',
    descriptionEn: 'Thick-sliced sashimi grade Norwegian salmon with Japanese standard presentation, garnish, and herbs.',
    isInStock: true,
    specs: ['Cắt lát dày vừa ăn', 'Sử dụng ngay sau khi mở hộp'],
    specsEn: ['Generously thick slices ready to eat', 'Consume immediately after opening package']
  },
  {
    id: 'sashimi-salmon-500',
    name: 'Sashimi Cá Hồi Na Uy Thịnh Vượng',
    nameEn: 'Prosperity Norwegian Salmon Sashimi Platter',
    price: 395000,
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=800',
    category: 'sashimi',
    origin: 'Na Uy',
    originEn: 'Norway',
    unit: 'Khay 500g',
    unitEn: '500g Large Tray',
    description: 'Khay sashimi cá hồi siêu to khổng lồ dành cho gia đình. Vân mỡ béo ngậy tan chảy khi cắn.',
    descriptionEn: 'Mega sized salmon sashimi platter perfect for family gatherings. Highly-marbled fat slices that melt on tongue.',
    isInStock: true,
    specs: ['Tặng đầy đủ xì dầu và mù tạt sệt siêu cay', 'Chuẩn bị phòng lạnh vệ sinh đạt chuẩn'],
    specsEn: ['Includes soy sauce and extra spicy ground wasabi', 'Prepped in dynamic sterile temperature-controlled environment']
  },
  {
    id: 'sashimi-combo-01',
    name: 'Combo Sashimi Fuji Đầm Ấm',
    nameEn: 'Fuji Coziness Sashimi Combo Map',
    price: 239000,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&q=80&w=800',
    category: 'sashimi',
    origin: 'Nhật Bản & Na Uy',
    originEn: 'Japan & Norway',
    unit: 'Set 1-2 người',
    unitEn: 'Set for 1-2 Pax',
    description: 'Sự kết hợp hoàn hảo giữa Cá hồi Na Uy tươi rói và Cá ngừ đại dương đỏ mọng dai ngon.',
    descriptionEn: 'Perfect combination of fresh airborne Norwegian salmon and succulent dark-pink ocean tuna slices.',
    isInStock: true,
    specs: ['Gồm 10 lát cá hồi và 5 lát cá ngừ', 'Kèm gừng hồng Nhật ngọt dịu'],
    specsEn: ['Includes 10 portions of salmon and 5 portions of tuna', 'Served with pickled pink ginger']
  },
  {
    id: 'sashimi-combo-02',
    name: 'Combo Sashimi Sakura Hạnh Phúc',
    nameEn: 'Sakura Happiness Sashimi Combo Set',
    price: 569000,
    image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&q=80&w=800',
    category: 'sashimi',
    origin: 'Nhật Bản',
    originEn: 'Japan',
    unit: 'Set 2-3 người',
    unitEn: 'Set for 2-3 Pax',
    description: 'Gồm cá hồi, sò điệp Nhật Hotate mọng nước ngọt thanh, trứng cá hồi đỏ lấp lánh.',
    descriptionEn: 'Gourmet box containing fresh salmon slices, sweet Hokkaido Hotate scallops, and shiny red salmon roe (Ikura).',
    isInStock: true,
    specs: ['Gồm 15 lát sashimi các loại', 'Dùng cùng mù tạt cay nồng kích thích vị giác'],
    specsEn: ['Includes 15 luxurious sashimi slices', 'Best enjoyed with spicy raw wasabi paste']
  },

  // 3. Thịt Bò Nhập Khẩu
  {
    id: 'beef-wagyu-a5',
    name: 'Bò Wagyu Nhật Bản A5 Striploin',
    nameEn: 'A5 Japanese Wagyu Striploin Beef',
    price: 3200000,
    originalPrice: 3500000,
    image: 'https://i.ibb.co/23jBw0Jk/Gemini-Generated-Image-roeegdroeegdroee.png',
    category: 'beef',
    origin: 'Nhật Bản',
    originEn: 'Japan',
    unit: 'Khay 300g Lát dày',
    unitEn: '300g Pre-cut Thick Tray',
    description: 'Thịt bò Wagyu cực phẩm xếp hạng vân mỡ A5 - nấc thang cao nhất của ẩm thực bò Nhật Bản. Đút vào miệng tan chảy mềm mại.',
    descriptionEn: 'Ultra-premium Japanese Wagyu containing the legendary A5 marbling score—the zenith of Japanese beef perfection. Exquisite melt-in-your-mouth experience.',
    isBestSeller: true,
    isInStock: true,
    specs: ['Vân mỡ cẩm thạch tuyệt mĩ', 'Đầy đủ chứng nhận nguồn gốc xuất xứ Kagoshima/Miyazaki', 'Thích hợp áp chảo Teppanyaki hoặc ăn nướng yaki'],
    specsEn: ['Gorgeous marble grade', 'Authentic certified Kagoshima/Miyazaki origin', 'Best for pan-searing, hot stone, or Japanese teppanyaki']
  },
  {
    id: 'beef-ribeye-aus',
    name: 'Thăn Ngoại Bò Úc Thượng Hạng',
    nameEn: 'Australian Premium Striploin Steak',
    price: 475000,
    originalPrice: 520000,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800',
    category: 'beef',
    origin: 'Úc',
    originEn: 'Australia',
    unit: 'Khay 400g Steak',
    unitEn: '400g Steak Portion',
    description: 'Thăn ngoại bò Úc tươi cắt steak dày dặn, mỡ viền mỏng thơm đượm vị cỏ tự nhiên.',
    descriptionEn: 'Gourmet grass-fed Australian striploin cut into thick, luscious steaks with a thin ribbon of meltable fat on side.',
    isBestSeller: true,
    isInStock: true,
    specs: ['Đã pha lóc sạch gân mỡ thừa', 'Bò ăn ngũ cốc 150 ngày', 'Mềm dẻo ngọt thịt'],
    specsEn: ['Trimmed clean of outer excessive tendon', '150-day grain-fed', 'Tender-soft sweet beef essence']
  },
  {
    id: 'beef-striploin-aus',
    name: 'Nạc Lưng Bò Úc Thượng Hạng',
    nameEn: 'Australian High-Grade Ribeye Steak Portion',
    price: 490000,
    image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800',
    category: 'beef',
    origin: 'Úc',
    originEn: 'Australia',
    unit: 'Khay 400g Steak',
    unitEn: '400g Steak Portion',
    description: 'Thịt mắt rồng Ribeye bò Úc lý tưởng nhất cho món Bít tết chuẩn Âu. Nhiều xơ ngậy đầy quyến rũ.',
    descriptionEn: 'Decadent Australian ribeye cut ideal for classical European steaks, boasting rich marbling and robust juicy chew.',
    isInStock: true,
    specs: ['Cắt cuộn chặt màng bọc chân không', 'Độ mềm ngọt tiêu chuẩn hoàng gia'],
    specsEn: ['Perfect round-trimmed vacuum seal portion', 'Royal-grade dining melt characteristics']
  },
  {
    id: 'beef-short-plate',
    name: 'Ba Chỉ Bò Mỹ Đông Lạnh Cuộn',
    nameEn: 'American Rolled Beef Short Plate',
    price: 153000,
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&q=80&w=800',
    category: 'beef',
    origin: 'Mỹ',
    originEn: 'USA',
    unit: 'Khay 500g thái cuộn',
    unitEn: '500g Sliced Rolls',
    description: 'Thịt ba chỉ bò Mỹ (Short Plate) thái mỏng cuộn tròn xinh xắn, là linh hồn món lẩu nhúng hoặc nướng Hàn Quốc.',
    descriptionEn: 'Wafer-thin American short-plate slices rolled into convenient hotpot and K-BBQ shapes.',
    isInStock: true,
    specs: ['Tỷ lệ nạc mỡ cân đối 6:4', 'Thích hợp ăn lẩu Shabu Shabu hoặc lẩu kim chi'],
    specsEn: ['Perfect Lean-to-Fat ratio of 6:4', 'Absolute champion for Shabu Shabu or Kimchi hotpot stew']
  },

  // 4. Hải Sản Nhập Khẩu
  {
    id: 'seafood-abalone',
    name: 'Bào Ngư Úc Viền Xanh Đóng Khay',
    nameEn: 'Australian Premium Greenlip Abalone',
    price: 5950000,
    originalPrice: 7000000,
    image: 'https://i.ibb.co/C5Fh722J/Gemini-Generated-Image-auyqljauyqljauyq.png',
    category: 'seafood',
    origin: 'Úc',
    originEn: 'Australia',
    unit: 'Hộp gỗ 1kg (6-8 con)',
    unitEn: '1kg Wooden Gift Box (6-8 pcs)',
    description: 'Bào ngư viền xanh vùng đảo Tasmania hoang dã của Úc. Loại bào ngư đắt đỏ và bổ dưỡng bậc nhất thế giới.',
    descriptionEn: 'Wild greenlip abalone from the untamed waters of Tasmania, Australia. One of the world’s most precious, nutrient-rich luxury seafoods.',
    isBestSeller: true,
    isInStock: true,
    specs: ['Cấp đông nhanh ngay sau khi đánh bắt', 'Dùng hầm canh sâm, súp bổ dưỡng hoặc ăn lẩu'],
    specsEn: ['Flash-frozen immediately upon wild harvest', 'Ideal for premium ginseng soups or gourmet hotpot bases']
  },
  {
    id: 'seafood-oyster',
    name: 'Hàu Sữa Hàn Quốc Đóng Khay Tươi',
    nameEn: 'Korean Half-Shell Fresh Oyster',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1544510807-2bc4bd1715af?auto=format&fit=crop&q=80&w=800',
    category: 'seafood',
    origin: 'Hàn Quốc',
    originEn: 'Korea',
    unit: 'Khay 500g đã bóc vỏ',
    unitEn: '500g Shucked Tray',
    description: 'Hàu sữa Hàn Quốc mập ú tròn đầy, béo ngậy ngọt ngào, giàu kẽm và vi chất dinh dưỡng.',
    descriptionEn: 'Plump, fatty, and naturally sweet Korean milk oysters. Packed with zinc and high essential minerals.',
    isInStock: true,
    specs: ['Dùng làm hàu nướng mỡ hành, nấu cháo hoặc ăn sống muối tiêu chanh', 'Sạch cát 100%'],
    specsEn: ['Perfect for grilling with spring onion oil, boiling delicious porridge, or eating raw with lime juice', '100% sand-free guaranteed']
  },
  {
    id: 'seafood-codfish',
    name: 'Cá Tuyết Úc Fillet Đại Dương',
    nameEn: 'Ocean Premium Australian Cod Fillet',
    price: 490000,
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=800',
    category: 'seafood',
    origin: 'Úc',
    originEn: 'Australia',
    unit: 'Khay 300g phi lê',
    unitEn: '300g Fillet Tray',
    description: 'Thịt cá tuyết trắng phau, dai ngọt săn chắc, chứa lượng Omega-3 khổng lồ tốt cho tim mạch.',
    descriptionEn: 'Snow-white, firm-textured cod fillet containing a massive concentration of beneficial heart-healthy Omega-3.',
    isInStock: true,
    specs: ['Đông lạnh sâu IQF', 'Phù hợp hấp xì dầu kiểu Hồng Kông'],
    specsEn: ['IQF deep frozen for freshness retention', 'Excellent choice for Hong Kong style soy sauce steaming']
  },
  {
    id: 'seafood-scallop',
    name: 'Sò Điệp Nhật Bản Sashimi (Hotate)',
    nameEn: 'Hokkaido Japanese Hotate Scallops',
    price: 460000,
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7e41?auto=format&fit=crop&q=80&w=800',
    category: 'seafood',
    origin: 'Nhật Bản',
    originEn: 'Japan',
    unit: 'Gói 250g (Tròn mập)',
    unitEn: '250g Premium Gumbo Pack',
    description: 'Cồi sò điệp Hotate vùng biển lạnh Hokkaido. Vị ngọt lịm tự nhiên tinh khiết, mềm thớ thịt.',
    descriptionEn: 'Selected Hotate scallop adductors from the freezing sea waters of Hokkaido, Japan. Celebrated for pristine natural sweet flavor.',
    isInStock: true,
    specs: ['Chuẩn ăn sống sashimi', 'Mỗi chiếc cồi to như chén trà'],
    specsEn: ['Certified sashimi grade for raw consumption', 'Generous jumbo size-factor']
  },
  {
    id: 'seafood-crab-snow',
    name: 'Dăm Cua Tuyết Canada Hấp Sẵn',
    nameEn: 'Ready-to-Eat Cooked Canadian Snow Crab Legs',
    price: 790000,
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800',
    category: 'seafood',
    origin: 'Canada',
    originEn: 'Canada',
    unit: 'Túi 500g tách sẵn',
    unitEn: '500g Shucked Bag',
    description: 'Thịt chân cua tuyết Canada dai dai mặn đậm vị biển ngọt bùi, đã hấp chín tiện dùng.',
    descriptionEn: 'Juicy, delicately salted Canadian snow crab leg meat. Streamlined pre-cooked processing for premium hassle-free convenience.',
    isInStock: true,
    specs: ['Ăn trực tiếp sau rã đông', 'Có thể xào miến, làm súp cua đẳng cấp'],
    specsEn: ['Thaw and eat immediately', 'Awesome for stir-fried glass noodles or premium crab soup bases']
  },

  // 5. Combo quà tặng
  {
    id: 'combo-signature',
    name: 'Signature Combo Seafood Premium',
    nameEn: 'Signature Seafood Premium Gift Set',
    price: 1820000,
    originalPrice: 2100000,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
    category: 'combo',
    origin: 'Hàn Nhật Na Uy',
    originEn: 'Korea, Japan & Norway',
    unit: 'Hộp quà cao cấp',
    unitEn: 'Luxury Gift Box',
    description: 'Bao gồm Cá hồi Na Uy phile 500g, Thăn bò Úc Steak 400g, Cồi sò điệp Nhật 250g đựng trong hộp quà sang trọng sang chảnh.',
    descriptionEn: 'Gorgeously arranged luxury gift set containing 500g fresh Norwegian Salmon fillet, 400g Australian Ribeye steak, and 250g premium Japanese Hotate scallops.',
    isBestSeller: true,
    isInStock: true,
    specs: ['Lót đá gel giữ nhiệt cao cấp', 'Trang trí ruy băng đỏ lễ hội lịch duyệt', 'Kèm thiệp chúc mừng viết tay'],
    specsEn: ['Layered under advanced cooling gel ice', 'Adorned with elegant holiday festive red ribbons', 'Accompanied by custom hand-written congrats card']
  },

  // 6. Gia Vị & Nguyên Liệu
  {
    id: 'spice-wasabi',
    name: 'Wasabi Tươi Hon-Wasabi Nhật Bản',
    nameEn: 'Premium Japanese Hon-Wasabi Paste',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&q=80&w=800',
    category: 'spice',
    origin: 'Nhật Bản',
    originEn: 'Japan',
    unit: 'Tuýp 43g',
    unitEn: '43g Squeeze Tube',
    description: 'Wasabi nghiền từ củ mù tạt tươi trồng tại Shizuoka. Vị hắc nồng lan tỏa sảng khoái kích thích vị giác đầu lưỡi.',
    descriptionEn: 'Grated wasabi made from real mustard roots cultivated in Shizuoka. Offers a lively, pungent punch that clears sinuses and refines seafood savoring.',
    isInStock: true,
    specs: ['Màu xanh cốm tự nhiên', 'Không lạm dụng phụ gia tạo màu'],
    specsEn: ['Natural vibrant green tone', 'Free from artificial heavy color dyes']
  },
  {
    id: 'spice-shoyu',
    name: 'Nước Tương Shoyu Ngọt Ăn Sashimi Yamasa',
    nameEn: 'Yamasa Sweet Shoyu Soy Sauce for Sashimi',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?auto=format&fit=crop&q=80&w=800',
    category: 'spice',
    origin: 'Nhật Bản',
    originEn: 'Japan',
    unit: 'Chai 200ml',
    unitEn: '200ml Bottle',
    description: 'Nước tương ủ lên men tự nhiên làm nổi bật độ tươi sống mọng dẻo của hải sản và cá sống.',
    descriptionEn: 'Naturally brewed Japanese sweet shoyu designed to perfectly elevate the delicate fatty texture of raw fish dishes.',
    isInStock: true,
    specs: ['Vị thanh mặn nhẹ, hậu ngọt sâu', 'Có vòi rót chống tràn thông minh'],
    specsEn: ['Crisp mellow saltiness with deep umami sweet end-notes', 'Tailored with smart drip-free easy-pour cap']
  },
  {
    id: 'spice-ginger',
    name: 'Gừng Hồng Muối Chua Gari Nhật',
    nameEn: 'Japanese Pickled Pink Gari Sushi Ginger',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=800',
    category: 'spice',
    origin: 'Nhật Bản',
    originEn: 'Japan',
    unit: 'Khay 150g',
    unitEn: '150g Pack',
    description: 'Gừng non lát mỏng ngâm dấm đường chua ngọt. Ăn giữa các lát sashimi khác loại để xóa vị chuẩn bị cho thớ thịt tiếp theo.',
    descriptionEn: 'Paper-thin sliced young ginger marinated in a sweet vinegar solution. Served between distinct sashimi cuts to refresh the palate.',
    isInStock: true,
    specs: ['Màu hồng cánh sen tự nhiên thanh nhã', 'Lát cắt giòn tan'],
    specsEn: ['Graceful natural light lotus petal pink hue', 'Ultra-crispy texture']
  },

  // 7. Rượu Vang & Sake
  {
    id: 'drink-sake-gold',
    name: 'Rượu Sake Vảy Vàng Hakushika Premium',
    nameEn: 'Hakushika Premium Sake with Gold Flakes',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?auto=format&fit=crop&q=80&w=800',
    category: 'drink',
    origin: 'Nhật Bản',
    originEn: 'Japan',
    unit: 'Chai 300ml',
    unitEn: '300ml Bottle',
    description: 'Sake truyền thống Nhật Bản kết hợp những lá vàng dát siêu mỏng lấp lánh tượng trưng cho tài lộc, may mắn.',
    descriptionEn: 'Traditional Japanese Sake combined with micro-thin sparkling gold leaves, symbolizing luck, wellness, and fortune.',
    isInStock: true,
    specs: ['Nồng độ cồn 14.5%', 'Uống ấm 40 độ hoặc ướp lạnh đều sảng khoái'],
    specsEn: ['Alcohol percentage 14.5%', 'Superb served chilled or warmed safely to 40°C']
  },
  {
    id: 'drink-soju',
    name: 'Soju Jinro Chamisul Fresh truyền thống',
    nameEn: 'Soju Jinro Chamisul Fresh Classic',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1580959375944-abd7e990f6c4?auto=format&fit=crop&q=80&w=800',
    category: 'drink',
    origin: 'Hàn Quốc',
    originEn: 'Korea',
    unit: 'Chai 360ml',
    unitEn: '360ml Bottle',
    description: 'Dòng soju tinh khiết chưng cất qua tre rừng mang vị êm dịu, sảng khoái vô cùng khi ăn lẩu nướng K-BBQ.',
    descriptionEn: 'Clean, light distilled Korean spirit charcoal-filtered through pure bamboo trunks, offering a smooth finish for K-BBQ meats.',
    isInStock: true,
    specs: ['Nồng độ cồn 16.5%', 'Ngon nhất khi uống lạnh cùng hội bạn'],
    specsEn: ['Alcohol percentage 16.5%', 'Best served ice cold with buddies']
  }
];

export const VOUCHERS: Voucher[] = [
  {
    code: 'SEAFOOD100',
    discountType: 'flat',
    value: 100000,
    minOrderValue: 1200000,
    description: 'Giảm 100k cho đơn hàng từ 1.2M',
    descriptionEn: 'Save 100k for order from 1.2M VND'
  },
  {
    code: 'FREESHIP88',
    discountType: 'flat',
    value: 50000,
    minOrderValue: 800000,
    description: 'Miễn phí giao hàng toàn quốc (đơn từ 800k)',
    descriptionEn: 'Free nationwide shipping (order from 800k VND)'
  },
  {
    code: 'SEAFOODAI',
    discountType: 'percent',
    value: 10,
    minOrderValue: 500000,
    description: 'Giảm 10% tối đa 100k cho trải nghiệm ẩm thực cùng Seafood AI',
    descriptionEn: 'Save 10% up to 100k for checking out with Seafood AI coach'
  }
];

export const PARTNERS = [
  { name: 'Lotte Mart', logo: 'LOTTE Mart' },
  { name: 'Emart', logo: 'emart' },
  { name: 'Aeon', logo: 'AEON' },
  { name: 'Co.op Mart', logo: 'co.opmart' },
  { name: 'King Food Mart', logo: 'KINGFOODMART' }
];

export const TIPS = [
  {
    id: 1,
    title: 'Hành trình từ Na Uy đến Hà Nội của Cá Hồi Na Uy tại Seafood Premium',
    titleEn: 'Airborne Journey: How Norwegian Salmon Reaches Hanoi in 36 Hours',
    summary: 'Cá hồi được khai thác hữu cơ từ những nông trại lộng gió vùng hẹp vịnh lạnh giá rạn san hô Bắc Na Uy, vận chuyển bay thẳng đến Việt Nam chỉ trong 36 giờ để phục vụ bữa ăn an toàn của gia dịch bạn.',
    summaryEn: 'Sourced organically from icy ocean fjords in Northern Norway, the salmon flies straight to Vietnam in under 36 hours for safe, delicious dining.',
    image: 'https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&q=80&w=800',
    relatedCategory: 'salmon',
    sections: [
      {
        heading: '1. Nguồn Gốc Từ Những Vịnh Hẹp Băng Giá Na Uy',
        headingEn: '1. Sourced from the Chilly Norwegian Fjords',
        body: 'Cá hồi Na Uy hữu cơ tại Seafood Premium được nuôi dưỡng trong môi trường tự nhiên hoàn hảo của dòng nước biển sạch lạnh quanh năm ở vùng cực Bắc của đất nước Na Uy. Tại đây, mật độ cá trong lồng nuôi cực kỳ thấp (chỉ khoảng 2% cá, phần còn lại là 98% nước biển tự nhiên), đảm bảo cá hồi có đủ không gian bơi lội và phát triển tự nhiên nhất.',
        bodyEn: 'Organic Norwegian salmon at Seafood Premium is nurtured in the crisp, clean waters of the Arctic circle. Lobe pens feature a minimal density (just 2% fish density vs 98% wild flowing water), allowing natural migration rhythms and dynamic fat growth.'
      },
      {
        heading: '2. Quy Trình Vận Chuyển Hàng Không Siêu Tốc 36 Giờ',
        headingEn: '2. Fast-Track Air Freight Protocol under 36 Hours',
        body: 'Ngay sau khi được thu hoạch từ trang trại hữu cơ đạt chuẩn quốc tế, cá hồi trải qua quy trình hạ thân nhiệt gắt gao trong hầm chứa nước lạnh sâu 0 độ C để đưa thịt cá về trạng thái bảo quản tối ưu. Tiếp đó, cá được đóng gói đá gel giữ nhiệt chuyên dụng rồi vận chuyển thẳng ra sân bay quốc tế Oslo, cất cánh xuyên lục địa đến sân bay Nội Bài chỉ sau 36 tiếng, đảm bảo độ tươi mướt nguyên bản nhất.',
        bodyEn: 'Upon certified sorting, salmon is chilled in a specialized 0°C slush. Fillets are insulated with custom gel-packs, transported to Oslo Airport, and flown directly to Hanoi under continuous temperature-monitoring within 36 hours.'
      },
      {
        heading: '3. Giá Trị Dinh Dưỡng Vượt Trội',
        headingEn: '3. Extraordinary Health & Dietary Value',
        body: 'Mỗi 100g thịt cá hồi Na Uy tươi chứa hàm lượng lý tưởng Axit béo Omega-3 (EPA và DHA) giúp điều hòa tim mạch, hàm lượng vitamin D dồi dào củng cố hệ xương, cùng các khoáng chất quý như Selen tự nhiên và Phốt pho, thúc đẩy não bộ phát triển minh mẫn và trẻ hóa tế bào.',
        bodyEn: 'Every 100g chunk yields high levels of polyunsaturated Omega-3 (EPA/DHA) that improve blood pressure levels, rich Vitamin D strengthening bone health, plus antioxidants and organic selenium.'
      }
    ]
  },
  {
    id: 2,
    title: 'Sự khác biệt vượt bậc của Cá hồi Na Uy hữu cơ & Cá hồi Chile thường',
    titleEn: 'Key Differences: Premium Norwegian Organic vs Standard Chilean Salmon',
    summary: 'Từng thớ thịt cá hồi Na Uy tại Seafood Premium lấp lánh sắc vàng cam óng ả tự nhiên, không ngậm kháng sinh hay hóa chất bảo quản, thớ vân mỡ đan xen đều đặn mịn màng thơm bùi quý phái.',
    summaryEn: 'Salmon fillets at Seafood Premium exhibit an exquisite natural orange hue, completely free of antibiotics and chemical dyes, boasting beautiful fat ribbons.',
    image: 'https://images.unsplash.com/photo-1574484284002-982da33611f7?auto=format&fit=crop&q=80&w=800',
    relatedCategory: 'salmon',
    sections: [
      {
        heading: '1. Thể Chất & Màu Sắc Thớ Thịt Đặc Trưng',
        headingEn: '1. Flesh Texture & Color Differences',
        body: 'Cá hồi Na Uy hữu cơ có thớ thịt màu vàng cam sáng, rực rỡ một cách tự nhiên nhờ được ăn thức ăn hữu cơ từ sinh vật phù du. Trái lại, cá hồi Chile thường có màu cam đậm hơn (nhờ các chất tạo màu nhân tạo trong cám nuôi thông thường), nhưng thịt cá lỏng hơn, không có độ săn chắc đàn hồi tinh tế đặc trưng của dòng Na Uy cao cấp.',
        bodyEn: 'Norwegian salmon exhibits a glossy, bright golden-orange color because of high-quality organic crustacean feeds. Ordinary Chilean imports are dyed orange synthetically, leaving the flesh softer with less dense muscular fibers.'
      },
      {
        heading: '2. Bản Chất Vân Mỡ Đan Xen',
        headingEn: '2. Interstitial Fat Ribbons',
        body: 'Chỉ cần quan sát kỹ lát cắt, bạn sẽ thấy cá hồi Na Uy sở hữu hệ thống vân mỡ rất mảnh, mịn, phân bổ đồng đều đan xen khắp miếng thịt như vân cẩm thạch. Khi ăn làm sashimi hoặc nướng áp chảo, vân mỡ này tan chảy nhẹ nhàng, tạo dư vị béo ngọt thanh tao, không bị ngấy hoặc chảy mỡ hôi như cá hồi béo ngập của vùng biển ấm Chile.',
        bodyEn: 'Fine, elegant networks of white marble-patterned fat stripes ribbon throughout Norwegian salmon. These thin strips melt easily to yield a nutty, luxurious mouthfeel without any oily, unpleasant smells.'
      },
      {
        heading: '3. Kiểm Soát Kháng Sinh Và Sạch Sẽ Tuyệt Đối',
        headingEn: '3. Antibiotic Inspections & Absolute Purity',
        body: 'Na Uy áp dụng quy trình kiểm soát chất lượng nghiêm nghặt nhất hành tinh, nói không hoàn toàn với chất kích thích tăng trưởng và kháng sinh trị bệnh trên đàn cá nuôi hữu cơ. Tại Chile, quy định lỏng lẻo hơn dẫn đến nguy cơ dư lượng kháng sinh cao hơn rất nhiều, làm ảnh hưởng lâu dài tới sức khỏe gia đình bạn.',
        bodyEn: 'Norway employs the most thorough sanitary regulations on Earth, outlawing growth chemicals and therapeutic drugs. In contrast, standard farms use chemical formulas which risk leaving trace residues.'
      }
    ]
  },
  {
    id: 3,
    title: 'Bí quyết bảo quan rã đông hàu thịt Hàn Quốc ăn trực tiếp không tanh',
    titleEn: 'Pro-Tip: Safely Thawing Shucked Korean Oysters for Raw Snacking',
    summary: 'Không nên ngâm nước ấm trực tiếp! Hãy rã đông chậm hàu sâu bằng ngăn mát tủ lạnh, rửa qua nước cốt chanh sả nhẹ nhàng để cảm thụ nguyên vẹn vị bùi sữa dồi dào nguyên tử vitamin.',
    summaryEn: 'Avoid using warm water baths! Defrost slowly in the chiller compartment, rinse with clear water and lemon juice to relish the pure creamy zinc goodness.',
    image: 'https://images.unsplash.com/photo-1544510807-2bc4bd1715af?auto=format&fit=crop&q=80&w=800',
    relatedCategory: 'seafood',
    sections: [
      {
        heading: '1. Rã Đông Chậm Bằng Ngăn Mát - Nguyên Tắc Bất Di Bất Dịch',
        headingEn: '1. Slow Defrosting in Chiller Room - An Unbreakable Rule',
        body: 'Rất nhiều khách hàng có thói quen ngâm trực tiếp túi hàu đông lạnh vào nước nóng hoặc quay bằng lò vi sóng để rã đông nhanh. Điều này khiến tế bào ngậm nước trong sữa hàu bị vỡ đột ngột, làm hàu bị chảy nước bớt, tóp thịt và xuất hiện mùi tanh khó chịu. Cách rã đông chuẩn nhất là chuyển túi hàu từ ngăn đá xuống ngăn mát trước khi chế biến khoảng 4 - 6 giờ.',
        bodyEn: 'Many foodies defrost frozen oysters rapidly via warm water baths or standard microwave ovens. This micro-explosively ruptures the juicy nutrient pockets of oysters, making them saggy and smelly. Always move them down to the chiller compartment 4 - 6 hours before cooking.'
      },
      {
        heading: '2. Rửa Sạch Hương Vị Bằng Nước Đá Lạnh Pha Muối Chanh',
        headingEn: '2. Rinse with Salt, Lemon Juice & Chilled Water',
        body: 'Sau khi hàu đã mềm hoàn toàn, nhẹ nhàng vớt hàu ra và ngâm vào một bát nước đá lạnh có pha chút muối biển tinh và vài giọt nước cốt chanh tươi trong vòng 2 phút. Nước đá lạnh giúp cơ hàu co lại, săn chắc và giữ được vị ngọt thơm nguyên bản, chất chua nhẹ từ chanh khử sạch hoàn toàn mùi tanh của biển khơi.',
        bodyEn: 'After the oysters are soft, gently bathe them in a bowl of cold icy water flavored with fine marine salt and a squeeze of fresh lemon juice for 2 minutes. The icy bath firm-plates the raw oyster muscle while the lemon citrus clears out marine mud smells.'
      },
      {
        heading: '3. Phục Vụ Và Ăn Thưởng Thức Đúng Cách',
        headingEn: '3. Plating and Raw Snacking Presentation',
        body: 'Hàu thịt Hàn Quốc ăn sashimi trực tiếp ngon nhất khi bày trên đĩa đá bào lạnh sâu, chấm kèm nước tương ngọt Nhật, mù tạt xanh Wasabi nồng nàn. Sự cay nồng của mù tạt kết hợp độ béo ngậy như bơ sữa của hàu Hàn Quốc tạo nên một trải nghiệm bùng nổ vị giác đầy phấn khích.',
        bodyEn: 'Korean shucked giant oysters are best enjoyed over shaved ice plates, dolloped with rich Japanese sweet shoyu and extra hot green wasabi paste. The sensory kick of hot wasabi paired with sweet buttery meat is an unmatched gourmand delight.'
      }
    ]
  },
  {
    id: 4,
    title: 'Hành trình của Bào Ngư Úc viền xanh không vỏ từ vùng biển Tasmania đến bàn ăn của bạn',
    titleEn: 'Tasmanian Odyssey: Bringing Wild Greenlip Abalone to Your Dining Table',
    summary: 'Sự hội tụ của các dòng hải lưu lạnh tại Nam Đại Dương đã biến vùng biển Tasmania (Úc) trở thành môi trường sống hoàn hảo cho một trong những loài hải sản quý hiếm và giá trị đắt đỏ nhất hành tinh.',
    summaryEn: 'The convergence of cold Antarctic currents makes Tasmania a pristine habitat for the rare, precious, and highly coveted wild greenlip abalone.',
    image: 'https://i.ibb.co/C5Fh722J/Gemini-Generated-Image-auyqljauyqljauyq.png',
    relatedCategory: 'seafood',
    sections: [
      {
        heading: '1. Bào ngư viền xanh là gì? Sự khác biệt từ vùng biển Tasmania',
        headingEn: '1. What is Greenlip Abalone? Sourced from Tasmania',
        body: 'Bào ngư viền xanh (tên khoa học: Haliotis laevigata) là loài động vật thân mềm chân bụng, đặc trưng bởi dải cơ viền màu xanh lục sáng bao quanh phần thịt trắng muốt như ngọc trai. Khác với bào ngư đen phổ biến, bào ngư viền xanh sinh trưởng chủ yếu ở các rạn đá ngầm bản địa vùng biển Nam Úc và quanh đảo Tasmania, nơi có dòng hải lưu lạnh cực kỳ giàu dinh dưỡng.',
        bodyEn: 'Greenlip abalone (Haliotis laevigata) are rare, pristine marine gastropods characterized by an iridescent, emerald-green edge wrapping around pristine white pearlescent meat. Grown natively in high-oxygen rocky reefs of Southern Australia and Tasmania.'
      },
      {
        heading: '2. Vì sao bào ngư size lớn có giá rất đắt? Giải mã "cơn sốt" Bào ngư Úc viền xanh size đại (Jumbo)',
        headingEn: '2. Why are Large Abalones So Costly? Decoding the Jumbo Greenlip Craze',
        body: 'Bào ngư size đại có giá rất đắt đỏ, không chỉ đơn thuần là một món ăn ngon mà còn mang trên mình nhiều câu chuyện xoay quanh việc khai thác, bảo quan và vận chuyển khiến cho nó trở thành một trong những loại hải sản đắt bậc nhất. Để một con bào ngư đạt đến kích thước khổng lồ, nó phải sống sót qua những rủi rro đại dương trong hơn 10 đến 15 năm.',
        bodyEn: 'Jumbo abalone command a extreme premium price due to scarcity, complex logistics, quota limits, and the epic 10 to 15 years required in cold oceans to mature to massive jumbo proportions.'
      },
      {
        heading: '3. Tiêu chuẩn chất lượng và chế biến công nghiệp',
        headingEn: '3. Elite Process Quality & Commercial Standards',
        body: 'Để duy trì vị thế "vàng xanh", mọi sản phẩm bào ngư Tasmania đều phải trải qua quy trình kiểm soát chất lượng nghiêm ngặt theo tiêu chuẩn quốc tế. Từ quy trình Approved Arrangement (AA) của Bộ Nông nghiệp Australia đến tiêu chuẩn HACCP và kiểm định an toàn sinh học. Các cơ sở chế biến như Cilia Tasmanian Seafoods tại Margate hay Smithton đều phải đạt chứng nhận AA từ Bộ Nông nghiệp, Lâm nghiệp và Thủy sản Australia.',
        bodyEn: 'Tasmanian packing plants operate under Approved Arrangement (AA) from the Australian Department of Agriculture, enforcing rigorous HACCP guidelines, biosecurity protocols, and complete temperature compliance.'
      },
      {
        heading: '4. Bào ngư Úc viền xanh size 3-4 con/kg có gì đặc biệt?',
        headingEn: '4. What Makes Jumbo Size 3-4 Count/kg So Special?',
        body: 'Bào ngư size 3-4 con/kg đại diện cho độ tuổi "chín muồi" về mặt ẩm thực (thường trên 10 năm tuổi). Ở kích thước này, khối cơ dày, khi thái lát mỏng có độ giòn sần sật và vị béo umami ngọt hậu cực kỳ đậm đà nhờ lượng Glycogen dồi dào phát triển qua nhiều năm.',
        bodyEn: 'Abalone averaging 3-4 units per kilogram represents their absolute culinary peak. Muscles are thick and succulent, delivering a divine crunch and a highly intense umami flavor developed over a decade of slow wild maturation.'
      },
      {
        heading: '5. Thử thách của nghề lặn "săn" bào ngư hoang dã',
        headingEn: '5. Sinking Into Danger: Harvesting the Emerald of the Sea',
        body: 'Hải sản này được thu hoạch hoàn toàn bằng tay của những thợ lặn chuyên nghiệp tại Tasmania. Họ lặn sâu tới 40 mét trong điều kiện buốt giá, sóng gió, đối mặt với cá mập trắng lớn và sứa độc, dùng dụng cụ ab-iron dẹp để gỡ từng cá thể bào ngư rời rạn đá một cách khéo léo để tránh làm trầy xước thịt.',
        bodyEn: 'Commercial abalone divers plunge up to 40 meters into heavy Antarctic swells, braving white sharks and stinging jellyfish. They pry abalone off kelp-covered rocks with precise hand tools called ab-irons to prevent any physical damage.'
      },
      {
        heading: '6. Công nghệ cấp đông nhanh IQF và kỹ thuật rã đông thưởng thức Sashimi',
        headingEn: '6. IQF Micro-Freezing Technology & Master Sashimi Preparation',
        body: 'Quy trình cấp đông IQF khóa trọn dinh dưỡng, giữ nguyên cấu trúc mô tế bào mọng nước mà không làm vỡ thớ thịt nhờ những viên nước đá siêu nhỏ. Để ăn sashimi hoàn hảo nhất, rã đông chậm trong ngăn mát tủ lạnh 12 tiếng, thái lát mỏng bày lên đĩa đá lạnh, chấm cùng wasabi cay nồng và xì dầu Nhật Bản.',
        bodyEn: 'Using IQF (Individual Quick Freezing) locks in nutrients within hours of harvest by forming tiny, harmless ice micro-crystals. For sashimi, slice finely on crushed ice, dip into premium soy sauce, and contrast with hot wasabi.'
      }
    ]
  }
];
