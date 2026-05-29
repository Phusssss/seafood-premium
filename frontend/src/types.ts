export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  origin: string; // e.g. "Na Uy", "Nhật Bản", "Úc", "Hàn Quốc"
  originEn?: string;
  unit: string; // e.g. "200g", "Fillet 500g", "Chai 150ml"
  unitEn?: string;
  description: string;
  descriptionEn?: string;
  isBestSeller?: boolean;
  isInStock: boolean;
  specs?: string[]; // nutrition details or storage rules
  specsEn?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSpec?: string;
  freeGifts?: string[]; // e.g., ["Mù tạt sashimi", "Nước tương Nhật"]
}

export interface Voucher {
  code: string;
  discountType: 'percent' | 'flat';
  value: number;
  minOrderValue: number;
  description: string;
  descriptionEn?: string;
  isActive?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface RecipeRecommendation {
  title: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  description: string;
  ingredientsNeeded: { name: string; amount: string; availableInCart: boolean; availableInStore: boolean; productId?: string }[];
  instructions: string[];
}

export interface TipSection {
  heading: string;
  headingEn?: string;
  body: string;
  bodyEn?: string;
  bullets?: string[];
  bulletsEn?: string[];
}

export interface Tip {
  id: number;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  image: string;
  sections?: TipSection[];
  relatedCategory?: string; // used to display cross-selling products in the tip details!
}
