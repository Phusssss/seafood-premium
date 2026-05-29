import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CATEGORIES = [
  { id: 'salmon', name: 'Cá Hồi Na Uy', nameEn: 'Norwegian Salmon', icon: 'Fish' },
  { id: 'sashimi', name: 'Sashimi Chuẩn Vị Nhật', nameEn: 'Japanese Sashimi', icon: 'ChefHat' },
  { id: 'beef', name: 'Thịt Bò Nhập Khẩu', nameEn: 'Imported Beef', icon: 'Beef' },
  { id: 'seafood', name: 'Hải Sản Nhập Khẩu', nameEn: 'Imported Seafood', icon: 'Waves' },
  { id: 'combo', name: 'Combo Quà Tặng Dinh Dưỡng', nameEn: 'Premium Food Gifts', icon: 'Gift' },
  { id: 'spice', name: 'Gia Vị & Nguyên Liệu', nameEn: 'Spices & Ingredients', icon: 'ListOrdered' },
  { id: 'drink', name: 'Rượu Vang & Sake', nameEn: 'Fine Wines & Sake', icon: 'Wine' },
];

const PRODUCTS = [
  {
    id: 'salmon-fillet', name: 'Cá Hồi Na Uy Tươi Fillet Cao Cấp', nameEn: 'Premium Fresh Norwegian Salmon Fillet',
    price: 237000, originalPrice: 280000, image: 'https://i.ibb.co/GvkDsHVf/Gemini-Generated-Image-vdm4kuvdm4kuvdm4.png',
    categoryId: 'salmon', origin: 'Na Uy', originEn: 'Norway',
    unit: 'Khay 300g Fillet', unitEn: '300g Fillet Tray',
    description: 'Cá hồi Na Uy tươi lọc xương, giữ lại lớp mỡ béo ngậy đặc trưng. Thích hợp ăn Sashimi hoặc áp chảo.',
    descriptionEn: 'Fresh deboned Norwegian salmon rich in natural oils. Excellent for Sashimi dishes or pan-sear cooking.',
    isBestSeller: true, isInStock: true,
    specs: ['Nên sử dụng trong ngày khi ăn sashimi', 'Bảo quản ngăn mát 0-2 độ C', 'Thịt cá cam đỏ tự nhiên, vân mỡ đều'],
    specsEn: ['Consume within the day for sashimi', 'Keep cold at 0-2°C', 'Natural orange meat with balanced fat marble'],
  },
  {
    id: 'salmon-whole', name: 'Cá Hồi Na Uy Tươi Nguyên Con', nameEn: 'Fresh Norwegian Whole Salmon (Aviation)',
    price: 2860000, originalPrice: 3200000,
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800',
    categoryId: 'salmon', origin: 'Na Uy', originEn: 'Norway',
    unit: 'Con 5-6kg', unitEn: '5-6kg Whole Fish',
    description: 'Cá hồi nhập khẩu trực tiếp bằng đường hàng không hàng tuần. Hỗ trợ mổ, fillet và đóng khay đá miễn phí.',
    descriptionEn: 'Imported fresh by air weekly. Complimented with free custom gutting, deboning, steak-cutting, and ice packing.',
    isBestSeller: true, isInStock: true,
    specs: ['Nhập khẩu nguyên con từ Leroy/Ocean Quality', 'Giao kèm đá lạnh giữ nhiệt', 'Hỗ trợ cắt lát theo yêu cầu'],
    specsEn: ['Imported whole from Leroy/Ocean Quality', 'Delivered with cooling gel pack', 'Custom slicing upon request'],
  },
  {
    id: 'salmon-smoked', name: 'Cá Hồi Xông Khói Na Uy Fossen', nameEn: 'Fossen Smoked Norwegian Salmon',
    price: 180000, image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800',
    categoryId: 'salmon', origin: 'Na Uy', originEn: 'Norway',
    unit: 'Gói 200g', unitEn: '200g Pack',
    description: 'Cá hồi xông khói bằng gỗ sồi tự nhiên đạt chuẩn châu Âu, giữ vị ngọt mềm, mặn nhẹ mượt mà.',
    descriptionEn: 'European standard cold-smoked salmon using natural oak wood, retaining a sweet, moist, lightly-salted finish.',
    isInStock: true,
    specs: ['Ăn trực tiếp cùng salad hoặc bánh mì', 'Bảo quản đông lạnh -18 độ C'],
    specsEn: ['Eat directly with salad or bread', 'Storage under freezing -18°C'],
  },
  {
    id: 'salmon-kirimi', name: 'Cá Hồi Phi Lê Cắt Khúc Kirimi', nameEn: 'Kirimi Norwegian Salmon Portion Slices',
    price: 120000, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800',
    categoryId: 'salmon', origin: 'Na Uy', originEn: 'Norway',
    unit: 'Gói 200g', unitEn: '200g Pack',
    description: 'Cắt khúc Kirimi đều đặn cực kỳ phù hợp cho bé ăn dặm hoặc làm cơm bento gia đình.',
    descriptionEn: 'Even Kirimi vertical-cut steaks, extremely suitable for infant baby nutritious meals or daily family bento.',
    isInStock: true,
    specs: ['Cắt khúc dày tiện lợi', 'Bảo quản đông lạnh'],
    specsEn: ['Thick pre-cut convenience portion', 'Keep frozen for longevity'],
  },
  {
    id: 'sashimi-special', name: 'Combo Sashimi Special Premium', nameEn: 'Special Premium Sashimi Feast Set',
    price: 999000, originalPrice: 1200000,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    categoryId: 'sashimi', origin: 'Nhật Bản & Na Uy', originEn: 'Japan & Norway',
    unit: 'Set 4-5 người', unitEn: 'Set for 4-5 Pax',
    description: 'Mâm tiệc Sashimi cao cấp gồm cá hồi Na Uy, sò đỏ Nhật, bạch tuọc Tako, cá ngừ đại dương và tôm ngọt.',
    descriptionEn: 'Luxurious sashimi platter containing fresh Norwegian salmon, Japanese red surf clams, Tako octopus, sweet shrimp, and bluefin tuna.',
    isBestSeller: true, isInStock: true,
    specs: ['Tặng kèm: Mù tạt tươi, Nước tương Nhật, Gừng muối, Lá tía tô và củ cải bào', 'Đóng khay đá giữ lạnh tối đa'],
    specsEn: ['Includes: Fresh Wasabi, Soy sauce, Sushi ginger, Shiso leaves & Daikon', 'Delivered under ice box for cold preservation'],
  },
  {
    id: 'sashimi-salmon-200', name: 'Sashimi Cá Hồi Na Uy King Size', nameEn: 'King Size Norwegian Salmon Sashimi',
    price: 158000, image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=800',
    categoryId: 'sashimi', origin: 'Na Uy', originEn: 'Norway',
    unit: 'Khay 200g', unitEn: '200g Tray',
    description: 'Cá hồi tươi thái lát sashimi chuẩn vị Nhật, kèm củ cải đỏ và rau tía tô thơm mát.',
    descriptionEn: 'Thick-sliced sashimi grade Norwegian salmon with Japanese standard presentation, garnish, and herbs.',
    isInStock: true,
    specs: ['Cắt lát dày vừa ăn', 'Sử dụng ngay sau khi mở hộp'],
    specsEn: ['Generously thick slices ready to eat', 'Consume immediately after opening package'],
  },
  {
    id: 'sashimi-salmon-500', name: 'Sashimi Cá Hồi Na Uy Thịnh Vượng', nameEn: 'Prosperity Norwegian Salmon Sashimi Platter',
    price: 395000, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=800',
    categoryId: 'sashimi', origin: 'Na Uy', originEn: 'Norway',
    unit: 'Khay 500g', unitEn: '500g Large Tray',
    description: 'Khay sashimi cá hồi siêu to khổng lồ dành cho gia đình. Vân mỡ béo ngậy tan chảy khi cắn.',
    descriptionEn: 'Mega sized salmon sashimi platter perfect for family gatherings. Highly-marbled fat slices that melt on tongue.',
    isInStock: true,
    specs: ['Tặng đầy đủ xì dầu và mù tạt sệt siêu cay', 'Chuẩn bị phòng lạnh vệ sinh đạt chuẩn'],
    specsEn: ['Includes soy sauce and extra spicy ground wasabi', 'Prepped in dynamic sterile temperature-controlled environment'],
  },
  {
    id: 'sashimi-combo-01', name: 'Combo Sashimi Fuji Đầm Ấm', nameEn: 'Fuji Coziness Sashimi Combo Map',
    price: 239000, image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&q=80&w=800',
    categoryId: 'sashimi', origin: 'Nhật Bản & Na Uy', originEn: 'Japan & Norway',
    unit: 'Set 1-2 người', unitEn: 'Set for 1-2 Pax',
    description: 'Sự kết hợp hoàn hảo giữa Cá hồi Na Uy tươi rói và Cá ngừ đại dương đỏ mọng dai ngon.',
    descriptionEn: 'Perfect combination of fresh airborne Norwegian salmon and succulent dark-pink ocean tuna slices.',
    isInStock: true,
    specs: ['Gồm 10 lát cá hồi và 5 lát cá ngừ', 'Kèm gừng hồng Nhật ngọt dịu'],
    specsEn: ['Includes 10 portions of salmon and 5 portions of tuna', 'Served with pickled pink ginger'],
  },
  {
    id: 'sashimi-combo-02', name: 'Combo Sashimi Sakura Hạnh Phúc', nameEn: 'Sakura Happiness Sashimi Combo Set',
    price: 569000, image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&q=80&w=800',
    categoryId: 'sashimi', origin: 'Nhật Bản', originEn: 'Japan',
    unit: 'Set 2-3 người', unitEn: 'Set for 2-3 Pax',
    description: 'Gồm cá hồi, sò điệp Nhật Hotate mọng nước ngọt thanh, trứng cá hồi đỏ lấp lánh.',
    descriptionEn: 'Gourmet box containing fresh salmon slices, sweet Hokkaido Hotate scallops, and shiny red salmon roe (Ikura).',
    isInStock: true,
    specs: ['Gồm 15 lát sashimi các loại', 'Dùng cùng mù tạt cay nồng kích thích vị giác'],
    specsEn: ['Includes 15 luxurious sashimi slices', 'Best enjoyed with spicy raw wasabi paste'],
  },
  {
    id: 'beef-wagyu-a5', name: 'Bò Wagyu Nhật Bản A5 Striploin', nameEn: 'A5 Japanese Wagyu Striploin Beef',
    price: 3200000, originalPrice: 3500000,
    image: 'https://i.ibb.co/23jBw0Jk/Gemini-Generated-Image-roeegdroeegdroee.png',
    categoryId: 'beef', origin: 'Nhật Bản', originEn: 'Japan',
    unit: 'Khay 300g Lát dày', unitEn: '300g Pre-cut Thick Tray',
    description: 'Thịt bò Wagyu cực phẩm xếp hạng vân mỡ A5 - nấc thang cao nhất của ẩm thực bò Nhật Bản.',
    descriptionEn: 'Ultra-premium Japanese Wagyu containing the legendary A5 marbling score—the zenith of Japanese beef perfection.',
    isBestSeller: true, isInStock: true,
    specs: ['Vân mỡ cẩm thạch tuyệt mĩ', 'Đầy đủ chứng nhận nguồn gốc xuất xứ Kagoshima/Miyazaki', 'Thích hợp áp chảo Teppanyaki hoặc ăn nướng yaki'],
    specsEn: ['Gorgeous marble grade', 'Authentic certified Kagoshima/Miyazaki origin', 'Best for pan-searing, hot stone, or Japanese teppanyaki'],
  },
  {
    id: 'beef-ribeye-aus', name: 'Thăn Ngoại Bò Úc Thượng Hạng', nameEn: 'Australian Premium Striploin Steak',
    price: 475000, originalPrice: 520000,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800',
    categoryId: 'beef', origin: 'Úc', originEn: 'Australia',
    unit: 'Khay 400g Steak', unitEn: '400g Steak Portion',
    description: 'Thăn ngoại bò Úc tươi cắt steak dày dặn, mỡ viền mỏng thơm đượm vị cỏ tự nhiên.',
    descriptionEn: 'Gourmet grass-fed Australian striploin cut into thick, luscious steaks with a thin ribbon of meltable fat on side.',
    isBestSeller: true, isInStock: true,
    specs: ['Đã pha lóc sạch gân mỡ thừa', 'Bò ăn ngũ cốc 150 ngày', 'Mềm dẻo ngọt thịt'],
    specsEn: ['Trimmed clean of outer excessive tendon', '150-day grain-fed', 'Tender-soft sweet beef essence'],
  },
  {
    id: 'beef-striploin-aus', name: 'Nạc Lưng Bò Úc Thượng Hạng', nameEn: 'Australian High-Grade Ribeye Steak Portion',
    price: 490000, image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800',
    categoryId: 'beef', origin: 'Úc', originEn: 'Australia',
    unit: 'Khay 400g Steak', unitEn: '400g Steak Portion',
    description: 'Thịt mắt rồng Ribeye bò Úc lý tưởng nhất cho món Bít tết chuẩn Âu.',
    descriptionEn: 'Decadent Australian ribeye cut ideal for classical European steaks, boasting rich marbling and robust juicy chew.',
    isInStock: true,
    specs: ['Cắt cuộn chặt màng bọc chân không', 'Độ mềm ngọt tiêu chuẩn hoàng gia'],
    specsEn: ['Perfect round-trimmed vacuum seal portion', 'Royal-grade dining melt characteristics'],
  },
  {
    id: 'beef-short-plate', name: 'Ba Chỉ Bò Mỹ Đông Lạnh Cuộn', nameEn: 'American Rolled Beef Short Plate',
    price: 153000, image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&q=80&w=800',
    categoryId: 'beef', origin: 'Mỹ', originEn: 'USA',
    unit: 'Khay 500g thái cuộn', unitEn: '500g Sliced Rolls',
    description: 'Thịt ba chỉ bò Mỹ (Short Plate) thái mỏng cuộn tròn xinh xắn, là linh hồn món lẩu nhúng hoặc nướng Hàn Quốc.',
    descriptionEn: 'Wafer-thin American short-plate slices rolled into convenient hotpot and K-BBQ shapes.',
    isInStock: true,
    specs: ['Tỷ lệ nạc mỡ cân đối 6:4', 'Thích hợp ăn lẩu Shabu Shabu hoặc lẩu kim chi'],
    specsEn: ['Perfect Lean-to-Fat ratio of 6:4', 'Absolute champion for Shabu Shabu or Kimchi hotpot stew'],
  },
  {
    id: 'seafood-abalone', name: 'Bào Ngư Úc Viền Xanh Đóng Khay', nameEn: 'Australian Premium Greenlip Abalone',
    price: 5950000, originalPrice: 7000000,
    image: 'https://i.ibb.co/C5Fh722J/Gemini-Generated-Image-auyqljauyqljauyq.png',
    categoryId: 'seafood', origin: 'Úc', originEn: 'Australia',
    unit: 'Hộp gỗ 1kg (6-8 con)', unitEn: '1kg Wooden Gift Box (6-8 pcs)',
    description: 'Bào ngư viền xanh vùng đảo Tasmania hoang dã của Úc. Loại bào ngư đắt đỏ và bổ dưỡng bậc nhất thế giới.',
    descriptionEn: 'Wild greenlip abalone from the untamed waters of Tasmania, Australia.',
    isBestSeller: true, isInStock: true,
    specs: ['Cấp đông nhanh ngay sau khi đánh bắt', 'Dùng hầm canh sâm, súp bổ dưỡng hoặc ăn lẩu'],
    specsEn: ['Flash-frozen immediately upon wild harvest', 'Ideal for premium ginseng soups or gourmet hotpot bases'],
  },
  {
    id: 'seafood-oyster', name: 'Hàu Sữa Hàn Quốc Đóng Khay Tươi', nameEn: 'Korean Half-Shell Fresh Oyster',
    price: 250000, image: 'https://images.unsplash.com/photo-1544510807-2bc4bd1715af?auto=format&fit=crop&q=80&w=800',
    categoryId: 'seafood', origin: 'Hàn Quốc', originEn: 'Korea',
    unit: 'Khay 500g đã bóc vỏ', unitEn: '500g Shucked Tray',
    description: 'Hàu sữa Hàn Quốc mập ú tròn đầy, béo ngậy ngọt ngào, giàu kẽm và vi chất dinh dưỡng.',
    descriptionEn: 'Plump, fatty, and naturally sweet Korean milk oysters. Packed with zinc and high essential minerals.',
    isInStock: true,
    specs: ['Dùng làm hàu nướng mỡ hành, nấu cháo hoặc ăn sống muối tiêu chanh', 'Sạch cát 100%'],
    specsEn: ['Perfect for grilling with spring onion oil, boiling delicious porridge, or eating raw with lime juice', '100% sand-free guaranteed'],
  },
  {
    id: 'seafood-codfish', name: 'Cá Tuyết Úc Fillet Đại Dương', nameEn: 'Ocean Premium Australian Cod Fillet',
    price: 490000, image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=800',
    categoryId: 'seafood', origin: 'Úc', originEn: 'Australia',
    unit: 'Khay 300g phi lê', unitEn: '300g Fillet Tray',
    description: 'Thịt cá tuyết trắng phau, dai ngọt săn chắc, chứa lượng Omega-3 khổng lồ tốt cho tim mạch.',
    descriptionEn: 'Snow-white, firm-textured cod fillet containing a massive concentration of beneficial heart-healthy Omega-3.',
    isInStock: true,
    specs: ['Đông lạnh sâu IQF', 'Phù hợp hấp xì dầu kiểu Hồng Kông'],
    specsEn: ['IQF deep frozen for freshness retention', 'Excellent choice for Hong Kong style soy sauce steaming'],
  },
  {
    id: 'seafood-scallop', name: 'Sò Điệp Nhật Bản Sashimi (Hotate)', nameEn: 'Hokkaido Japanese Hotate Scallops',
    price: 460000, image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7e41?auto=format&fit=crop&q=80&w=800',
    categoryId: 'seafood', origin: 'Nhật Bản', originEn: 'Japan',
    unit: 'Gói 250g (Tròn mập)', unitEn: '250g Premium Gumbo Pack',
    description: 'Cồi sò điệp Hotate vùng biển lạnh Hokkaido. Vị ngọt lịm tự nhiên tinh khiết, mềm thớ thịt.',
    descriptionEn: 'Selected Hotate scallop adductors from the freezing sea waters of Hokkaido, Japan.',
    isInStock: true,
    specs: ['Chuẩn ăn sống sashimi', 'Mỗi chiếc cồi to như chén trà'],
    specsEn: ['Certified sashimi grade for raw consumption', 'Generous jumbo size-factor'],
  },
  {
    id: 'seafood-crab-snow', name: 'Dăm Cua Tuyết Canada Hấp Sẵn', nameEn: 'Ready-to-Eat Cooked Canadian Snow Crab Legs',
    price: 790000, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800',
    categoryId: 'seafood', origin: 'Canada', originEn: 'Canada',
    unit: 'Túi 500g tách sẵn', unitEn: '500g Shucked Bag',
    description: 'Thịt chân cua tuyết Canada dai dai mặn đậm vị biển ngọt bùi, đã hấp chín tiện dùng.',
    descriptionEn: 'Juicy, delicately salted Canadian snow crab leg meat. Streamlined pre-cooked processing for premium hassle-free convenience.',
    isInStock: true,
    specs: ['Ăn trực tiếp sau rã đông', 'Có thể xào miến, làm súp cua đẳng cấp'],
    specsEn: ['Thaw and eat immediately', 'Awesome for stir-fried glass noodles or premium crab soup bases'],
  },
  {
    id: 'combo-signature', name: 'Signature Combo Seafood Premium', nameEn: 'Signature Seafood Premium Gift Set',
    price: 1820000, originalPrice: 2100000,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800',
    categoryId: 'combo', origin: 'Hàn Nhật Na Uy', originEn: 'Korea, Japan & Norway',
    unit: 'Hộp quà cao cấp', unitEn: 'Luxury Gift Box',
    description: 'Bao gồm Cá hồi Na Uy phile 500g, Thăn bò Úc Steak 400g, Cồi sò điệp Nhật 250g đựng trong hộp quà sang trọng.',
    descriptionEn: 'Gorgeously arranged luxury gift set containing 500g fresh Norwegian Salmon fillet, 400g Australian Ribeye steak, and 250g premium Japanese Hotate scallops.',
    isBestSeller: true, isInStock: true,
    specs: ['Lót đá gel giữ nhiệt cao cấp', 'Trang trí ruy băng đỏ lễ hội lịch duyệt', 'Kèm thiệp chúc mừng viết tay'],
    specsEn: ['Layered under advanced cooling gel ice', 'Adorned with elegant holiday festive red ribbons', 'Accompanied by custom hand-written congrats card'],
  },
  {
    id: 'spice-wasabi', name: 'Wasabi Tươi Hon-Wasabi Nhật Bản', nameEn: 'Premium Japanese Hon-Wasabi Paste',
    price: 45000, image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&q=80&w=800',
    categoryId: 'spice', origin: 'Nhật Bản', originEn: 'Japan',
    unit: 'Tuýp 43g', unitEn: '43g Squeeze Tube',
    description: 'Wasabi nghiền từ củ mù tạt tươi trồng tại Shizuoka.',
    descriptionEn: 'Grated wasabi made from real mustard roots cultivated in Shizuoka.',
    isInStock: true,
    specs: ['Màu xanh cốm tự nhiên', 'Không lạm dụng phụ gia tạo màu'],
    specsEn: ['Natural vibrant green tone', 'Free from artificial heavy color dyes'],
  },
  {
    id: 'spice-shoyu', name: 'Nước Tương Shoyu Ngọt Ăn Sashimi Yamasa', nameEn: 'Yamasa Sweet Shoyu Soy Sauce for Sashimi',
    price: 65000, image: 'https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?auto=format&fit=crop&q=80&w=800',
    categoryId: 'spice', origin: 'Nhật Bản', originEn: 'Japan',
    unit: 'Chai 200ml', unitEn: '200ml Bottle',
    description: 'Nước tương ủ lên men tự nhiên làm nổi bật độ tươi sống mọng dẻo của hải sản và cá sống.',
    descriptionEn: 'Naturally brewed Japanese sweet shoyu designed to perfectly elevate the delicate fatty texture of raw fish dishes.',
    isInStock: true,
    specs: ['Vị thanh mặn nhẹ, hậu ngọt sâu', 'Có vòi rót chống tràn thông minh'],
    specsEn: ['Crisp mellow saltiness with deep umami sweet end-notes', 'Tailored with smart drip-free easy-pour cap'],
  },
  {
    id: 'spice-ginger', name: 'Gừng Hồng Muối Chua Gari Nhật', nameEn: 'Japanese Pickled Pink Gari Sushi Ginger',
    price: 35000, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=800',
    categoryId: 'spice', origin: 'Nhật Bản', originEn: 'Japan',
    unit: 'Khay 150g', unitEn: '150g Pack',
    description: 'Gừng non lát mỏng ngâm dấm đường chua ngọt.',
    descriptionEn: 'Paper-thin sliced young ginger marinated in a sweet vinegar solution.',
    isInStock: true,
    specs: ['Màu hồng cánh sen tự nhiên thanh nhã', 'Lát cắt giòn tan'],
    specsEn: ['Graceful natural light lotus petal pink hue', 'Ultra-crispy texture'],
  },
  {
    id: 'drink-sake-gold', name: 'Rượu Sake Vảy Vàng Hakushika Premium', nameEn: 'Hakushika Premium Sake with Gold Flakes',
    price: 380000, image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?auto=format&fit=crop&q=80&w=800',
    categoryId: 'drink', origin: 'Nhật Bản', originEn: 'Japan',
    unit: 'Chai 300ml', unitEn: '300ml Bottle',
    description: 'Sake truyền thống Nhật Bản kết hợp những lá vàng dát siêu mỏng lấp lánh tượng trưng cho tài lộc, may mắn.',
    descriptionEn: 'Traditional Japanese Sake combined with micro-thin sparkling gold leaves, symbolizing luck, wellness, and fortune.',
    isInStock: true,
    specs: ['Nồng độ cồn 14.5%', 'Uống ấm 40 độ hoặc ướp lạnh đều sảng khoái'],
    specsEn: ['Alcohol percentage 14.5%', 'Superb served chilled or warmed safely to 40°C'],
  },
  {
    id: 'drink-soju', name: 'Soju Jinro Chamisul Fresh truyền thống', nameEn: 'Soju Jinro Chamisul Fresh Classic',
    price: 65000, image: 'https://images.unsplash.com/photo-1580959375944-abd7e990f6c4?auto=format&fit=crop&q=80&w=800',
    categoryId: 'drink', origin: 'Hàn Quốc', originEn: 'Korea',
    unit: 'Chai 360ml', unitEn: '360ml Bottle',
    description: 'Dòng soju tinh khiết chưng cất qua tre rừng mang vị êm dịu, sảng khoái vô cùng khi ăn lẩu nướng K-BBQ.',
    descriptionEn: 'Clean, light distilled Korean spirit charcoal-filtered through pure bamboo trunks, offering a smooth finish for K-BBQ meats.',
    isInStock: true,
    specs: ['Nồng độ cồn 16.5%', 'Ngon nhất khi uống lạnh cùng hội bạn'],
    specsEn: ['Alcohol percentage 16.5%', 'Best served ice cold with buddies'],
  },
];

const VOUCHERS = [
  { code: 'SEAFOOD100', discountType: 'flat' as const, value: 100000, minOrderValue: 1200000, description: 'Giảm 100k cho đơn hàng từ 1.2M', descriptionEn: 'Save 100k for order from 1.2M VND', isActive: true, maxUsage: 100, usageCount: 0 },
  { code: 'FREESHIP88', discountType: 'flat' as const, value: 50000, minOrderValue: 800000, description: 'Miễn phí giao hàng toàn quốc (đơn từ 800k)', descriptionEn: 'Free nationwide shipping (order from 800k VND)', isActive: true, maxUsage: 100, usageCount: 0 },
  { code: 'SEAFOODAI', discountType: 'percent' as const, value: 10, minOrderValue: 500000, description: 'Giảm 10% tối đa 100k cho trải nghiệm ẩm thực cùng Seafood AI', descriptionEn: 'Save 10% up to 100k for checking out with Seafood AI coach', isActive: true, maxUsage: 100, usageCount: 0 },
];

const TIPS = [
  {
    id: 1, title: 'Hành trình từ Na Uy đến Hà Nội của Cá Hồi Na Uy tại Seafood Premium',
    titleEn: 'Airborne Journey: How Norwegian Salmon Reaches Hanoi in 36 Hours',
    summary: 'Cá hồi được khai thác hữu cơ từ những nông trại lộng gió vùng hẹp vịnh lạnh giá rạn san hô Bắc Na Uy.',
    summaryEn: 'Sourced organically from icy ocean fjords in Northern Norway.',
    image: 'https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&q=80&w=800',
    relatedCategoryId: 'salmon',
    sections: [
      { heading: '1. Nguồn Gốc Từ Những Vịnh Hẹp Băng Giá Na Uy', headingEn: '1. Sourced from the Chilly Norwegian Fjords', body: 'Cá hồi Na Uy hữu cơ tại Seafood Premium được nuôi dưỡng trong môi trường tự nhiên hoàn hảo.', bodyEn: 'Organic Norwegian salmon at Seafood Premium is nurtured in the crisp, clean waters.' },
      { heading: '2. Quy Trình Vận Chuyển Hàng Không Siêu Tốc 36 Giờ', headingEn: '2. Fast-Track Air Freight Protocol under 36 Hours', body: 'Ngay sau khi được thu hoạch, cá hồi trải qua quy trình hạ thân nhiệt.', bodyEn: 'Upon certified sorting, salmon is chilled in a specialized 0°C slush.' },
      { heading: '3. Giá Trị Dinh Dưỡng Vượt Trội', headingEn: '3. Extraordinary Health & Dietary Value', body: 'Mỗi 100g thịt cá hồi Na Uy tươi chứa hàm lượng lý tưởng Axit béo Omega-3.', bodyEn: 'Every 100g chunk yields high levels of polyunsaturated Omega-3.' },
    ],
  },
  {
    id: 2, title: 'Sự khác biệt vượt bậc của Cá hồi Na Uy hữu cơ & Cá hồi Chile thường',
    titleEn: 'Key Differences: Premium Norwegian Organic vs Standard Chilean Salmon',
    summary: 'Từng thớ thịt cá hồi Na Uy tại Seafood Premium lấp lánh sắc vàng cam óng ả tự nhiên.',
    summaryEn: 'Salmon fillets at Seafood Premium exhibit an exquisite natural orange hue.',
    image: 'https://images.unsplash.com/photo-1574484284002-982da33611f7?auto=format&fit=crop&q=80&w=800',
    relatedCategoryId: 'salmon',
    sections: [
      { heading: '1. Thể Chất & Màu Sắc Thớ Thịt Đặc Trưng', headingEn: '1. Flesh Texture & Color Differences', body: 'Cá hồi Na Uy hữu cơ có thớ thịt màu vàng cam sáng.', bodyEn: 'Norwegian salmon exhibits a glossy, bright golden-orange color.' },
      { heading: '2. Bản Chất Vân Mỡ Đan Xen', headingEn: '2. Interstitial Fat Ribbons', body: 'Cá hồi Na Uy sở hữu hệ thống vân mỡ rất mảnh, mịn.', bodyEn: 'Fine, elegant networks of white marble-patterned fat stripes.' },
      { heading: '3. Kiểm Soát Kháng Sinh Và Sạch Sẽ Tuyệt Đối', headingEn: '3. Antibiotic Inspections & Absolute Purity', body: 'Na Uy nói không hoàn toàn với chất kích thích tăng trưởng và kháng sinh.', bodyEn: 'Norway employs the most thorough sanitary regulations on Earth.' },
    ],
  },
  {
    id: 3, title: 'Bí quyết bảo quan rã đông hàu thịt Hàn Quốc ăn trực tiếp không tanh',
    titleEn: 'Pro-Tip: Safely Thawing Shucked Korean Oysters for Raw Snacking',
    summary: 'Không nên ngâm nước ấm trực tiếp! Hãy rã đông chậm hàu sâu bằng ngăn mát tủ lạnh.',
    summaryEn: 'Avoid using warm water baths! Defrost slowly in the chiller compartment.',
    image: 'https://images.unsplash.com/photo-1544510807-2bc4bd1715af?auto=format&fit=crop&q=80&w=800',
    relatedCategoryId: 'seafood',
    sections: [
      { heading: '1. Rã Đông Chậm Bằng Ngăn Mát', headingEn: '1. Slow Defrosting in Chiller Room', body: 'Rất nhiều khách hàng ngâm trực tiếp túi hàu đông lạnh vào nước nóng.', bodyEn: 'Many foodies defrost frozen oysters rapidly via warm water baths.' },
      { heading: '2. Rửa Sạch Hương Vị Bằng Nước Đá Lạnh Pha Muối Chanh', headingEn: '2. Rinse with Salt, Lemon Juice & Chilled Water', body: 'Ngâm hàu vào bát nước đá lạnh có pha chút muối biển.', bodyEn: 'Gently bathe them in a bowl of cold icy water flavored with fine marine salt.' },
      { heading: '3. Phục Vụ Và Ăn Thưởng Thức Đúng Cách', headingEn: '3. Plating and Raw Snacking Presentation', body: 'Hàu thịt Hàn Quốc ăn sashimi trực tiếp ngon nhất khi bày trên đĩa đá bào lạnh sâu.', bodyEn: 'Korean shucked giant oysters are best enjoyed over shaved ice plates.' },
    ],
  },
  {
    id: 4, title: 'Hành trình của Bào Ngư Úc viền xanh không vỏ từ vùng biển Tasmania',
    titleEn: 'Tasmanian Odyssey: Bringing Wild Greenlip Abalone to Your Dining Table',
    summary: 'Sự hội tụ của các dòng hải lưu lạnh tại Nam Đại Dương đã biến vùng biển Tasmania thành môi trường sống hoàn hảo.',
    summaryEn: 'The convergence of cold Antarctic currents makes Tasmania a pristine habitat.',
    image: 'https://i.ibb.co/C5Fh722J/Gemini-Generated-Image-auyqljauyqljauyq.png',
    relatedCategoryId: 'seafood',
    sections: [
      { heading: '1. Bào ngư viền xanh là gì?', headingEn: '1. What is Greenlip Abalone?', body: 'Bào ngư viền xanh là loài động vật thân mềm chân bụng.', bodyEn: 'Greenlip abalone are rare, pristine marine gastropods.' },
      { heading: '2. Vì sao bào ngư size lớn có giá rất đắt?', headingEn: '2. Why are Large Abalones So Costly?', body: 'Bào ngư size đại có giá rất đắt đỏ.', bodyEn: 'Jumbo abalone command a extreme premium price.' },
      { heading: '3. Tiêu chuẩn chất lượng và chế biến công nghiệp', headingEn: '3. Elite Process Quality & Commercial Standards', body: 'Mọi sản phẩm bào ngư Tasmania đều phải trải qua quy trình kiểm soát chất lượng.', bodyEn: 'Tasmanian packing plants operate under Approved Arrangement.' },
    ],
  },
];

async function seed() {
  const { getPrisma } = await import('./db.js');
  const prisma = await getPrisma();

  console.log('Seeding database...');

  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }
  console.log(`Seeded ${CATEGORIES.length} categories`);

  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: { ...p, specs: JSON.stringify(p.specs), specsEn: JSON.stringify(p.specsEn) },
      create: { ...p, specs: JSON.stringify(p.specs), specsEn: JSON.stringify(p.specsEn) },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products`);

  for (const v of VOUCHERS) {
    await prisma.voucher.upsert({
      where: { code: v.code },
      update: v,
      create: v,
    });
  }
  console.log(`Seeded ${VOUCHERS.length} vouchers`);

  for (const t of TIPS) {
    await prisma.tip.upsert({
      where: { id: t.id },
      update: { ...t, sections: JSON.stringify(t.sections) },
      create: { ...t, sections: JSON.stringify(t.sections) },
    });
  }
  console.log(`Seeded ${TIPS.length} tips`);

  console.log('Seed completed!');
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error('Seed failed:', e);
  process.exit(1);
});
