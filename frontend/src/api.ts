const API_BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export interface ApiProduct {
  id: string;
  name: string;
  nameEn?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  origin: string;
  originEn?: string;
  unit: string;
  unitEn?: string;
  description: string;
  descriptionEn?: string;
  isBestSeller?: boolean;
  isInStock: boolean;
  specs?: string[];
  specsEn?: string[];
}

export interface ApiCategory {
  id: string;
  name: string;
  nameEn?: string;
  icon?: string;
}

export interface ApiVoucher {
  id: string;
  code: string;
  discountType: 'percent' | 'flat';
  value: number;
  minOrderValue: number;
  description: string;
  descriptionEn?: string;
  isActive: boolean;
}

export interface ApiTip {
  id: number;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  image: string;
  relatedCategoryId?: string;
  sections?: { heading: string; headingEn?: string; body: string; bodyEn?: string; bullets?: string[]; bulletsEn?: string[] }[];
}

export interface ApiOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  note?: string;
  shipMethod: string;
  payMethod: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  finalTotal: number;
  status: string;
  items: { productId: string; productName: string; price: number; quantity: number; selectedSpec?: string }[];
  createdAt: string;
}

// Products
export const fetchProducts = (search?: string, category?: string) =>
  request<ApiProduct[]>(`/products?search=${search || ''}&category=${category || 'all'}`);

export const fetchProduct = (id: string) =>
  request<ApiProduct>(`/products/${id}`);

export const createProduct = (data: any) =>
  request<ApiProduct>('/products', { method: 'POST', body: JSON.stringify(data) });

export const updateProduct = (id: string, data: any) =>
  request<ApiProduct>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteProduct = (id: string) =>
  request<{ success: boolean }>(`/products/${id}`, { method: 'DELETE' });

// Categories
export const fetchCategories = () =>
  request<ApiCategory[]>('/categories');

// Tips
export const fetchTips = () =>
  request<ApiTip[]>('/tips');

export const fetchTip = (id: number) =>
  request<ApiTip>(`/tips/${id}`);

// Vouchers
export const fetchVouchers = () =>
  request<ApiVoucher[]>('/vouchers');

export const validateVoucher = (code: string, subtotal: number) =>
  request<{ valid: boolean; voucher?: ApiVoucher; discount?: number; error?: string }>('/vouchers/validate', {
    method: 'POST',
    body: JSON.stringify({ code, subtotal }),
  });

export const createVoucher = (data: any) =>
  request<ApiVoucher>('/vouchers', { method: 'POST', body: JSON.stringify(data) });

// Orders
export const createOrder = (data: any) =>
  request<ApiOrder>('/orders', { method: 'POST', body: JSON.stringify(data) });

export const fetchOrders = () =>
  request<ApiOrder[]>('/orders');

export const updateOrderStatus = (id: string, status: string) =>
  request<ApiOrder>(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });

// Auth
export const loginUser = (phone: string) =>
  request<{ id: string; name: string; phone: string; isNew: boolean }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });

export const registerUser = (name: string, phone: string) =>
  request<{ id: string; name: string; phone: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, phone }),
  });
