import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Tag,
  Plus,
  Edit,
  Trash,
  Package,
  X,
  Search,
  Filter,
  Sparkles,
  ArrowLeft,
  Check,
  AlertCircle,
  Menu,
  RefreshCw,
  Database,
  ChevronRight,
  Eye,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  User,
  Sliders,
  DollarSign
} from 'lucide-react';
import { Product, Voucher } from '../types';
import { fetchOrders, updateOrderStatus, fetchVouchers, createVoucher, createOrder as apiCreateOrder, deleteProduct as apiDeleteProduct, updateProduct as apiUpdateProduct, createProduct as apiCreateProduct } from '../api';

interface AdminDashboardProps {
  onClose: () => void;
  lang: 'vi' | 'en';
  products: Product[];
  onUpdateProducts: (updated: Product[]) => void;
}

export default function AdminDashboard({
  onClose,
  lang,
  products,
  onUpdateProducts,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'vouchers'>('overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Search and filter states
  const [prodSearch, setProdSearch] = useState('');
  const [prodCatFilter, setProdCatFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Product Editor Modal States
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    nameEn: '',
    price: 0,
    originalPrice: 0,
    category: 'salmon',
    origin: 'Na Uy',
    originEn: 'Norway',
    unit: 'Khay 300g',
    unitEn: '300g Tray',
    description: '',
    descriptionEn: '',
    isInStock: true,
    isBestSeller: false,
    specs: [],
    specsEn: []
  });

  // Voucher Editor States
  const [isAddingVoucher, setIsAddingVoucher] = useState(false);
  const [voucherFormData, setVoucherFormData] = useState<Partial<Voucher>>({
    code: '',
    discountType: 'percent',
    value: 10,
    minOrderValue: 200000,
    description: '',
    descriptionEn: ''
  });

  // Load state on mount safely
  useEffect(() => {
    loadOrders();
    loadVouchers();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      const mapped = data.map((o: any) => ({
        id: o.id,
        date: o.createdAt,
        customerName: o.customerName,
        customerPhone: o.customerPhone,
        customerAddress: o.address,
        customerNote: o.note || '',
        shipMethod: o.shipMethod,
        payMethod: o.payMethod,
        items: (o.items || []).map((item: any) => ({
          id: item.productId,
          name: item.productName,
          nameEn: item.productName,
          price: item.price,
          quantity: item.quantity,
          unit: item.selectedSpec || '',
        })),
        subtotal: o.subtotal,
        discount: o.discount,
        shipFee: o.shippingFee,
        grandTotal: o.finalTotal,
        status: o.status,
      }));
      setOrders(mapped);
      return;
    } catch (e) {
      console.warn('Failed to fetch orders from API', e);
    }

    try {
      const savedOrders = localStorage.getItem('seafood_premium_orders_v1');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
        return;
      }
    } catch {}

    const demoOrders = generateMockOrders();
    setOrders(demoOrders);
  };

  const loadVouchers = async () => {
    try {
      const data = await fetchVouchers();
      setVouchers(data);
    } catch (e) {
      try {
        const savedVouchers = localStorage.getItem('seafood_premium_vouchers_v1');
        if (savedVouchers) setVouchers(JSON.parse(savedVouchers));
      } catch {}
    }
  };

  const saveOrdersToStorage = (updatedOrders: any[]) => {
    setOrders(updatedOrders);
    try {
      localStorage.setItem('seafood_premium_orders_v1', JSON.stringify(updatedOrders));
    } catch (e) {
      console.warn('Failed saving orders', e);
    }
  };

  const saveVouchersToStorage = (updatedVouchers: Voucher[]) => {
    setVouchers(updatedVouchers);
    try {
      localStorage.setItem('seafood_premium_vouchers_v1', JSON.stringify(updatedVouchers));
    } catch (e) {
      console.warn('Failed saving vouchers', e);
    }
  };

  const generateMockOrders = () => {
    const names = ['Nguyễn Kim Oanh', 'Trần Hữu Kiên', 'Alexis Thompson', 'Phạm Minh Đức', 'Sophie Laurent'];
    const phones = ['0912345678', '0987654321', '0345678912', '0909555111', '0888999444'];
    const addresses = [
      'Cầu Giấy, Hà Nội',
      'Quận 1, TP. Hồ Chí Minh',
      'Times City, Hai Bà Trưng, Hà Nội',
      'Thanh Xuân, Hà Nội',
      'Quận 7, TP. Hồ Chí Minh'
    ];
    
    return [
      {
        id: 'SFPR-489372',
        date: new Date(Date.now() - 4 * 3600000).toISOString(),
        customerName: names[0],
        customerPhone: phones[0],
        customerAddress: addresses[0],
        customerNote: 'Giao nước sôi sẵn để nhúng lẩu cá hồi nha',
        shipMethod: 'express',
        payMethod: 'bank',
        items: [
          { id: 'salmon-fillet', name: 'Cá Hồi Na Uy Tươi Fillet Cao Cấp', price: 237000, quantity: 2, unit: 'Khay 300g' },
          { id: 'spice-shoyu', name: 'Nước tương ngọt Nhật Yamasa', price: 85000, quantity: 1, unit: 'Chai 150ml' }
        ],
        subtotal: 559000,
        discount: 0,
        shipFee: 70000,
        grandTotal: 629000,
        status: 'delivered'
      },
      {
        id: 'SFPR-928174',
        date: new Date(Date.now() - 24 * 3600000).toISOString(),
        customerName: names[1],
        customerPhone: phones[1],
        customerAddress: addresses[1],
        customerNote: 'Cần nhiều củ cải bào tía tô ăn sashimi!',
        shipMethod: 'standard',
        payMethod: 'cod',
        items: [
          { id: 'sashimi-special', name: 'Combo Sashimi Special Premium', price: 999000, quantity: 1, unit: 'Set 4-5 người' }
        ],
        subtotal: 999000,
        discount: 50000,
        shipFee: 0,
        grandTotal: 949000,
        status: 'shipping'
      },
      {
        id: 'SFPR-201826',
        date: new Date(Date.now() - 48 * 3600000).toISOString(),
        customerName: names[2],
        customerPhone: phones[2],
        customerAddress: addresses[2],
        customerNote: 'Leave with receptionist please',
        shipMethod: 'express',
        payMethod: 'bank',
        items: [
          { id: 'beef-wagyu-a5', name: 'Thịt Bò Nhật Wagyu Thượng Hạng A5', price: 1650000, quantity: 1, unit: 'Khay 300g Steak' }
        ],
        subtotal: 1650000,
        discount: 100000,
        shipFee: 20000,
        grandTotal: 1570000,
        status: 'pending'
      }
    ];
  };

  const handleSimulateOrder = async () => {
    if (products.length === 0) return;
    
    // Choose 1-2 random products
    const selectedProds: Product[] = [];
    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * products.length);
      const chosen = products[idx];
      if (!selectedProds.some(p => p.id === chosen.id)) {
        selectedProds.push(chosen);
      }
    }

    const cart = selectedProds.map(p => ({
      product: { ...p, price: p.price },
      quantity: Math.floor(Math.random() * 2) + 1,
    }));

    const demoNames = ['Lê Hoàng Vinh', 'Phú Nguyễn', 'Ngô Thu Trang', 'David Miller', 'Bùi Xuân Trường', 'Hương Ly'];
    const demoPhones = ['0912' + Math.floor(100000 + Math.random() * 900000), '0903' + Math.floor(100000 + Math.random() * 900000)];
    const demoCities = ['Cầu Giấy, Hà Nội', 'Quận 2, TP.HCM', 'Ba Đình, Hà Nội', 'Sơn Trà, Đà Nẵng'];

    const customerName = demoNames[Math.floor(Math.random() * demoNames.length)];
    const customerPhone = demoPhones[Math.floor(Math.random() * demoPhones.length)];
    const customerAddress = demoCities[Math.floor(Math.random() * demoCities.length)];

    try {
      await apiCreateOrder({
        cart,
        voucher: null,
        customerName,
        customerPhone,
        address: customerAddress,
        note: lang === 'vi' ? 'Đơn hàng giả lập tự động' : 'Automatically simulated test order',
        shipMethod: Math.random() > 0.5 ? 'express' : 'standard',
        payMethod: Math.random() > 0.5 ? 'bank' : 'cod',
        isLoggedIn: false,
      });
      loadOrders();
    } catch (e) {
      console.warn('Failed to create simulated order via API', e);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, nextStatus: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: nextStatus };
      }
      return o;
    });
    try {
      await updateOrderStatus(orderId, nextStatus);
    } catch {}
    saveOrdersToStorage(updated);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm(lang === 'vi' ? `Bạn có muốn xóa đơn hàng ${orderId} không?` : `Do you wish to delete order ${orderId}?`)) {
      const updated = orders.filter((o) => o.id !== orderId);
      saveOrdersToStorage(updated);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || formData.price <= 0) {
      alert(lang === 'vi' ? 'Vui lòng điền tên và giá hợp lệ!' : 'Please write valid name and price!');
      return;
    }

    if (isAddingProduct) {
      const newProd: Product = {
        id: formData.id || 'custom-' + Date.now(),
        name: formData.name,
        nameEn: formData.nameEn || formData.name,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        image: formData.image || 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800',
        category: formData.category || 'salmon',
        origin: formData.origin || 'Na Uy',
        originEn: formData.originEn || 'Norway',
        unit: formData.unit || 'Khay 300g',
        unitEn: formData.unitEn || '300g Pack',
        description: formData.description || '',
        descriptionEn: formData.descriptionEn || '',
        isInStock: formData.isInStock !== undefined ? formData.isInStock : true,
        isBestSeller: formData.isBestSeller !== undefined ? formData.isBestSeller : false,
        specs: formData.specs || [],
        specsEn: formData.specsEn || []
      };

      try {
        await apiCreateProduct(newProd);
      } catch {}
      const updated = [newProd, ...products];
      onUpdateProducts(updated);
      setIsAddingProduct(false);
    } else if (editingProduct) {
      const updated = products.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formData.name!,
            nameEn: formData.nameEn || p.nameEn,
            price: Number(formData.price),
            originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
            image: formData.image || p.image,
            category: formData.category || p.category,
            origin: formData.origin || p.origin,
            originEn: formData.originEn || p.originEn,
            unit: formData.unit || p.unit,
            unitEn: formData.unitEn || p.unitEn,
            description: formData.description || p.description,
            descriptionEn: formData.descriptionEn || p.descriptionEn,
            isInStock: formData.isInStock !== undefined ? formData.isInStock : p.isInStock,
            isBestSeller: formData.isBestSeller !== undefined ? formData.isBestSeller : p.isBestSeller
          };
        }
        return p;
      });
      try {
        await apiUpdateProduct(editingProduct.id, updated.find(p => p.id === editingProduct.id)!);
      } catch {}
      onUpdateProducts(updated);
      setEditingProduct(null);
    }

    resetProductForm();
  };

  const resetProductForm = () => {
    setFormData({
      id: '',
      name: '',
      nameEn: '',
      price: 0,
      originalPrice: 0,
      category: 'salmon',
      origin: 'Na Uy',
      originEn: 'Norway',
      unit: 'Khay 300g',
      unitEn: '300g Pack',
      description: '',
      descriptionEn: '',
      isInStock: true,
      isBestSeller: false,
      specs: [],
      specsEn: []
    });
  };

  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      id: p.id,
      name: p.name,
      nameEn: p.nameEn || '',
      price: p.price,
      originalPrice: p.originalPrice || 0,
      category: p.category,
      origin: p.origin,
      originEn: p.originEn || '',
      unit: p.unit,
      unitEn: p.unitEn || '',
      description: p.description,
      descriptionEn: p.descriptionEn || '',
      isInStock: p.isInStock,
      isBestSeller: p.isBestSeller || false,
      specs: p.specs || [],
      specsEn: p.specsEn || []
    });
  };

  const handleDeleteProduct = async (prodId: string) => {
    if (confirm(lang === 'vi' ? 'Bạn có muốn xóa sản phẩm này?' : 'Are you sure you want to delete this product?')) {
      try {
        await apiDeleteProduct(prodId);
      } catch {}
      const updated = products.filter(p => p.id !== prodId);
      onUpdateProducts(updated);
    }
  };

  const handleToggleBestSeller = async (p: Product) => {
    const updated = products.map((item) => {
      if (item.id === p.id) {
        return { ...item, isBestSeller: !item.isBestSeller };
      }
      return item;
    });
    try {
      await apiUpdateProduct(p.id, updated.find(item => item.id === p.id)!);
    } catch {}
    onUpdateProducts(updated);
  };

  const handleToggleStock = async (p: Product) => {
    const updated = products.map((item) => {
      if (item.id === p.id) {
        return { ...item, isInStock: !item.isInStock };
      }
      return item;
    });
    try {
      await apiUpdateProduct(p.id, updated.find(item => item.id === p.id)!);
    } catch {}
    onUpdateProducts(updated);
  };

  const handleVoucherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherFormData.code || !voucherFormData.value || voucherFormData.value <= 0) {
      alert(lang === 'vi' ? 'Vui lòng điền đủ mã và giá trị bớt!' : 'Voucher fields invalid!');
      return;
    }

    const newV: Voucher = {
      code: voucherFormData.code.toUpperCase().trim(),
      discountType: voucherFormData.discountType as 'percent' | 'flat',
      value: Number(voucherFormData.value),
      minOrderValue: Number(voucherFormData.minOrderValue || 0),
      description: voucherFormData.description || `Giảm ${voucherFormData.value}`,
      descriptionEn: voucherFormData.descriptionEn || `Save ${voucherFormData.value}`
    };

    try {
      await createVoucher(newV);
    } catch {}
    saveVouchersToStorage([newV, ...vouchers]);
    setIsAddingVoucher(false);
    setVoucherFormData({
      code: '',
      discountType: 'percent',
      value: 10,
      minOrderValue: 200000,
      description: '',
      descriptionEn: ''
    });
  };

  const handleDeleteVoucher = (code: string) => {
    if (confirm(lang === 'vi' ? `Bạn có muốn xóa mã giảm giá ${code}?` : `Delete voucher code ${code}?`)) {
      const updated = vouchers.filter(v => v.code !== code);
      saveVouchersToStorage(updated);
    }
  };

  const handleResetToDefault = () => {
    if (confirm(lang === 'vi' ? 'Khôi phục toàn bộ dữ liệu cài đặt gốc?' : 'Reset all settings to original factory default?')) {
      localStorage.removeItem('seafood_premium_products_v1');
      localStorage.removeItem('seafood_premium_orders_v1');
      localStorage.removeItem('seafood_premium_vouchers_v1');
      window.location.reload();
    }
  };

  // Finance calculations
  const totalRevenue = orders
    .filter(o => o.status === 'delivered' || o.status === 'processing' || o.status === 'shipping')
    .reduce((sum, o) => sum + o.grandTotal, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const deliveryOrdersCount = orders.filter(o => o.status === 'shipping' || o.status === 'processing').length;
  const completedOrdersCount = orders.filter(o => o.status === 'delivered').length;

  const displayProducts = products.filter((p) => {
    const searchLower = prodSearch.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(searchLower) || (p.nameEn || '').toLowerCase().includes(searchLower) || p.origin.toLowerCase().includes(searchLower);
    const matchesCat = prodCatFilter === 'all' || p.category === prodCatFilter;
    return matchesSearch && matchesCat;
  });

  const displayOrders = orders.filter((o) => {
    const searchLower = orderSearch.toLowerCase();
    const matchesSearch = o.id.toLowerCase().includes(searchLower) || o.customerName.toLowerCase().includes(searchLower) || o.customerPhone.includes(searchLower);
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + '₫';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'shipping': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'processing': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-neutral-50 text-neutral-600 border-neutral-200';
    }
  };

  const getStatusTranslated = (status: string) => {
    if (lang === 'vi') {
      switch (status) {
        case 'delivered': return 'Đã giao hàng';
        case 'shipping': return 'Đang vận chuyển';
        case 'processing': return 'Đang đóng gói';
        case 'pending': return 'Chờ duyệt';
        default: return 'Đã hủy';
      }
    }
    return status.toUpperCase();
  };

  const getCategoryTranslated = (cat: string) => {
    if (lang === 'vi') {
      switch (cat) {
        case 'salmon': return 'Cá Hồi Na Uy';
        case 'sashimi': return 'Sashimi Nhật';
        case 'beef': return 'Thịt Bò Nhập';
        case 'seafood': return 'Hải Sản Sạch';
        case 'combo': return 'Set Combo';
        case 'spice': return 'Gia vị gõ';
        case 'drink': return 'Sake & Đồ uống';
        default: return cat;
      }
    }
    return cat.toUpperCase();
  };

  const outOfStockProducts = products.filter(p => !p.isInStock);

  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      
      {/* 1. LEFT SIDE NAVIGATION (DESKTOP) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-350 shrink-0 border-r border-slate-800 relative z-30">
        
        {/* Sidebar Header Brand area */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-red-500/20">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-wider leading-none">
              {lang === 'vi' ? 'HẢI SẢN PREMIUM' : 'SEAFOOD PREMIUM'}
            </h1>
            <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1 block">
              {lang === 'vi' ? 'Hệ thống Quản Trị' : 'ADMIN PANEL v1.0'}
            </span>
          </div>
        </div>

        {/* Sidebar Menu Links Grid */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div>
            <span className="px-3.5 text-[9px] uppercase font-bold tracking-widest text-slate-500 block mb-2 font-mono">
              {lang === 'vi' ? 'BẢNG ĐIỀU KHIỂN' : 'NAVIGATION CORE'}
            </span>
            
            <button
              onClick={() => { setActiveTab('overview'); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all relative ${
                activeTab === 'overview'
                  ? 'bg-slate-800 text-white shadow-inner font-bold'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <TrendingUp className={`w-4 h-4 ${activeTab === 'overview' ? 'text-red-500' : 'text-slate-400'}`} />
                <span>{lang === 'vi' ? 'Báo cáo tổng quan' : 'KPI Dashboard'}</span>
              </span>
              {activeTab === 'overview' && (
                <div className="w-1 h-6 bg-red-500 rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
              )}
            </button>

            <button
              onClick={() => { setActiveTab('products'); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all relative mt-1 ${
                activeTab === 'products'
                  ? 'bg-slate-800 text-white shadow-inner font-bold'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Package className={`w-4 h-4 ${activeTab === 'products' ? 'text-red-500' : 'text-slate-400'}`} />
                <span>{lang === 'vi' ? 'Danh sách sản phẩm' : 'Shelves Catalog'}</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'products' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {products.length}
              </span>
              {activeTab === 'products' && (
                <div className="w-1 h-6 bg-red-500 rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
              )}
            </button>

            <button
              onClick={() => { setActiveTab('orders'); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all relative mt-1 ${
                activeTab === 'orders'
                  ? 'bg-slate-800 text-white shadow-inner font-bold'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <ShoppingBag className={`w-4 h-4 ${activeTab === 'orders' ? 'text-red-500' : 'text-slate-400'}`} />
                <span>{lang === 'vi' ? 'Sổ đơn hàng khách' : 'Client Orders'}</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'orders' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {orders.length}
              </span>
              {activeTab === 'orders' && (
                <div className="w-1 h-6 bg-red-500 rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
              )}
            </button>

            <button
              onClick={() => { setActiveTab('vouchers'); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all relative mt-1 ${
                activeTab === 'vouchers'
                  ? 'bg-slate-800 text-white shadow-inner font-bold'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Tag className={`w-4 h-4 ${activeTab === 'vouchers' ? 'text-red-500' : 'text-slate-400'}`} />
                <span>{lang === 'vi' ? 'Chiến dịch Voucher' : 'Campaign Coupons'}</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'vouchers' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {vouchers.length}
              </span>
              {activeTab === 'vouchers' && (
                <div className="w-1 h-6 bg-red-500 rounded-full absolute left-0 top-1/2 -translate-y-1/2" />
              )}
            </button>
          </div>

          <div className="pt-8 border-t border-slate-800/80 mt-8">
            <span className="px-3.5 text-[9px] uppercase font-bold tracking-widest text-slate-500 block mb-2 font-mono">
              {lang === 'vi' ? 'BỘ NHỚ LOCAL' : 'SYSTEM STATUS'}
            </span>
            <div className="mx-3 p-3 bg-slate-950/50 rounded-lg border border-slate-800/60 text-[11px] text-slate-400 space-y-2 leading-relaxed">
              <div className="flex items-center gap-2 text-emerald-500 font-extrabold text-[10px] uppercase font-mono">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Offline Sandbox</span>
              </div>
              <p className="text-[10px] text-slate-500">
                {lang === 'vi' 
                  ? 'Số liệu tự động liên hợp với localStorage để tiện kiểm tra.' 
                  : 'All updates are safe & fully sandboxed in storage memory.'}
              </p>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer element */}
        <div className="p-4 border-t border-slate-850 border-slate-800 bg-slate-950 flex flex-col gap-2">
          <button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-red-600 text-slate-200 hover:text-white transition duration-150 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Quay lại Cửa Hàng' : 'Exit Admin View'}</span>
          </button>
        </div>
      </aside>

      {/* 2. MOBILE HEADER & NAVIGATION DRAWER SCREEN */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xs flex md:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
          <div className="w-64 bg-slate-900 text-slate-350 p-6 flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white">
                    <ShoppingBag className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-xs font-black text-white hover:opacity-90 tracking-wider">PREMIUM ADMIN</span>
                </div>
                <button onClick={() => setIsMobileSidebarOpen(false)} className="text-slate-405 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => { setActiveTab('overview'); setIsMobileSidebarOpen(false); }}
                  className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition ${
                    activeTab === 'overview' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  {lang === 'vi' ? 'Báo cáo tổng quan' : 'KPI Dashboard'}
                </button>
                <button
                  onClick={() => { setActiveTab('products'); setIsMobileSidebarOpen(false); }}
                  className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                    activeTab === 'products' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{lang === 'vi' ? 'Sản phẩm' : 'Shelves Catalog'}</span>
                  <span className="bg-slate-950 px-2 py-0.5 rounded-full text-[10px] text-white">{products.length}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('orders'); setIsMobileSidebarOpen(false); }}
                  className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                    activeTab === 'orders' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{lang === 'vi' ? 'Đơn hàng' : 'Client Orders'}</span>
                  <span className="bg-slate-950 px-2 py-0.5 rounded-full text-[10px] text-white">{orders.length}</span>
                </button>
                <button
                  onClick={() => { setActiveTab('vouchers'); setIsMobileSidebarOpen(false); }}
                  className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                    activeTab === 'vouchers' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{lang === 'vi' ? 'Voucher giảm giá' : 'Campaign Coupons'}</span>
                  <span className="bg-slate-950 px-2 py-0.5 rounded-full text-[10px] text-white">{vouchers.length}</span>
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-red-600 text-slate-100 hover:text-white transition py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'vi' ? 'Quay lại CH' : 'Exit Console'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN WORKPLACE WRAPPER */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* TOP STATUS DESKTOP BAR */}
        <header className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between z-20 shrink-0">
          
          {/* Breadcrumb / Hamburguer toggle triggers info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider font-mono">
                {lang === 'vi' ? 'HỘI SỞ QUẢN TRỊ' : 'ADMIN DESK'}
              </span>
              <ChevronRight className="w-3 h-3 text-neutral-300" />
              <span className="text-xs text-slate-800 font-extrabold uppercase bg-red-50 text-red-600 px-2.5 py-1 rounded-md border border-red-100">
                {activeTab === 'overview' && (lang === 'vi' ? 'Báo cáo doanh số' : 'Overview Stats')}
                {activeTab === 'products' && (lang === 'vi' ? 'Quản lý kho hàng' : 'Seafood Shelves')}
                {activeTab === 'orders' && (lang === 'vi' ? 'Danh sách đơn hàng' : 'Customer Orders Registry')}
                {activeTab === 'vouchers' && (lang === 'vi' ? 'Ưu đãi & Voucher' : 'Campaign Coupons list')}
              </span>
            </div>
          </div>

          {/* SIMULATION & CORE RESET ACTIONS CONTROLS */}
          <div className="flex items-center gap-3">
            
            <button
              onClick={handleSimulateOrder}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] md:text-xs font-bold px-3.5 py-2 rounded-lg transition-all duration-150 flex items-center gap-1.5 shadow-sm shadow-emerald-500/10 active:scale-97 cursor-pointer"
              title={lang === 'vi' ? 'Simulate 1-2 random products purchase' : 'Inject testing orders with random customer details'}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'vi' ? 'Giả lập đơn hàng' : 'Simulate Order'}</span>
              <span className="sm:hidden">{lang === 'vi' ? 'Giả lập' : 'Simulate'}</span>
            </button>

            <button
              onClick={handleResetToDefault}
              className="text-[11px] md:text-xs text-rose-600 bg-red-50 hover:bg-red-100 hover:text-red-700 border border-red-100 font-semibold px-3 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer"
              title={lang === 'vi' ? 'Khôi phục kho lưu trữ ban đầu' : 'Factory resetting local database'}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'vi' ? 'Đặt lại dữ liệu gốc' : 'Factory Reset'}</span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-md text-slate-500 font-mono text-[10px] font-bold border border-slate-200">
              <span className="inline-block w-2 bg-emerald-500 rounded-full h-2 animate-pulse" />
              <span>LIVE DIAL</span>
            </div>
          </div>
        </header>

        {/* WORKPLACE VIEWPORT CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto space-y-6 text-left">
            
            {/* ======================= TAB 1: OVERVIEW COMPONENT ======================= */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Intro Title cards */}
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2 uppercase">
                      <span>{lang === 'vi' ? 'BẢNG SỐ LIỆU DOANH THU & SẢN LƯỢNG' : 'EXECUTIVE REVENUE BOARD'}</span>
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {lang === 'vi' ? 'Dữ liệu giao dịch được hạch toán trực tiếp theo thời gian thực tại trình duyệt.' : 'Statistical aggregates extracted safely from mock data generator inputs.'}
                    </p>
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-500 px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200">
                    {lang === 'vi' ? 'Tổng giao dịch sổ đơn:' : 'Total orders logged:'} <span className="text-red-650 text-red-600 font-black">{orders.length}</span>
                  </div>
                </div>

                {/* 4 KPI Grid display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Revenue Card */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">
                        {lang === 'vi' ? 'DOANH THU TÍCH LŨY' : 'TOTAL INCOME'}
                      </span>
                      <div className="text-2xl font-black text-rose-600 mt-1.5 tracking-tight">
                        {formatPrice(totalRevenue)}
                      </div>
                      <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                        ✓ {orders.filter(o => o.status === 'delivered').length} {lang === 'vi' ? 'đơn hoàn thành' : 'orders fulfilled'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Pending Approvals Card */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">
                        {lang === 'vi' ? 'YÊU CẦU CHỜ DUYỆT' : 'PENDING APPROVALS'}
                      </span>
                      <div className="text-2xl font-black text-amber-600 mt-1.5 tracking-tight flex items-center gap-2">
                        <span>{pendingOrdersCount}</span>
                        {pendingOrdersCount > 0 && (
                          <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
                        )}
                      </div>
                      <span className="text-[11px] text-amber-600 block mt-1">
                        ⚠ {lang === 'vi' ? 'Cần chuẩn bị giao hàng' : 'Awaiting dispatch confirmation'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Product Inventory Count Card */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">
                        {lang === 'vi' ? 'DANH MỤC THỰC PHẨM' : 'CATALOG SKUS'}
                      </span>
                      <div className="text-2xl font-black text-slate-800 mt-1.5 tracking-tight animate-none">
                        {products.length}
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {outOfStockProducts.length > 0 ? (
                          <span className="text-red-550 font-semibold text-rose-600">
                            ✕ {outOfStockProducts.length} {lang === 'vi' ? 'mã hết hàng' : 'items out of stock'}
                          </span>
                        ) : (
                          <span className="text-emerald-600 font-semibold">
                            ✓ {lang === 'vi' ? 'Kho hàng đầy đủ' : 'All items in stock'}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Promotional Campaigns Code Counts */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block font-mono">
                        {lang === 'vi' ? 'VOUCHER ĐANG CHẠY' : 'PROMO CAMPAIGNS'}
                      </span>
                      <div className="text-2xl font-black text-slate-800 mt-1.5 tracking-tight">
                        {vouchers.length}
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {lang === 'vi' ? 'Ưu đãi kích cầu mua sắm' : 'Active checkout discount rules'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                      <Tag className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Status breakdown & bar visualization */}
                <div className="bg-white border border-neutral-200 p-5 rounded-2xl shadow-xs">
                  <h3 className="text-xs uppercase font-extrabold text-neutral-500 tracking-wider mb-3 block font-mono">
                    {lang === 'vi' ? 'BIỂU ĐỒ BỐ TRÍ TRẠNG THÁI ĐƠN HÀNG' : 'ORDER STATUS DISTRIBUTION'}
                  </h3>
                  
                  {orders.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">{lang === 'vi' ? 'Chưa rà soát được đơn hàng để phân tích' : 'Empty logistics graph'}</p>
                  ) : (
                    <div>
                      {/* Flex colored segmented bars */}
                      <div className="w-full h-3 rounded-full overflow-hidden bg-slate-100 flex mt-1 mb-4 select-none">
                        {['delivered', 'shipping', 'processing', 'pending', 'cancelled'].map((stKey) => {
                          const count = orders.filter(o => o.status === stKey).length;
                          const pct = (count / orders.length) * 100;
                          if (pct === 0) return null;
                          
                          let color = 'bg-slate-400';
                          if (stKey === 'delivered') color = 'bg-emerald-500';
                          if (stKey === 'shipping') color = 'bg-indigo-500';
                          if (stKey === 'processing') color = 'bg-cyan-400';
                          if (stKey === 'pending') color = 'bg-amber-400';
                          if (stKey === 'cancelled') color = 'bg-rose-500';

                          return (
                            <div 
                              key={stKey} 
                              style={{ width: `${pct}%` }} 
                              className={`${color} h-full hover:brightness-95 transition-all text-[8px] font-bold text-white flex items-center justify-center truncate px-0.5`}
                              title={`${stKey}: ${count} (${Math.round(pct)}%)`}
                            />
                          );
                        })}
                      </div>

                      {/* Legend item listing info indicators */}
                      <div className="flex flex-wrap gap-x-5 gap-y-2 select-none">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                          <span className="inline-block w-2.5 h-2.5 rounded bg-emerald-500 shrink-0" />
                          <span>{lang === 'vi' ? 'Đã hoàn thành' : 'Delivered'} ({orders.filter(o => o.status === 'delivered').length})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                          <span className="inline-block w-2.5 h-2.5 rounded bg-indigo-500 shrink-0" />
                          <span>{lang === 'vi' ? 'Đang giao' : 'Shipping'} ({orders.filter(o => o.status === 'shipping').length})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                          <span className="inline-block w-2.5 h-2.5 rounded bg-cyan-450 bg-cyan-400 shrink-0" />
                          <span>{lang === 'vi' ? 'Đang soạn' : 'Processing'} ({orders.filter(o => o.status === 'processing').length})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                          <span className="inline-block w-2.5 h-2.5 rounded bg-amber-400 shrink-0" />
                          <span>{lang === 'vi' ? 'Chờ kiểm tra' : 'Pending Review'} ({orders.filter(o => o.status === 'pending').length})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-semibold">
                          <span className="inline-block w-2.5 h-2.5 rounded bg-rose-500 shrink-0" />
                          <span>{lang === 'vi' ? 'Đã hủy đơn' : 'Cancelled'} ({orders.filter(o => o.status === 'cancelled').length})</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2 Column Details: Recent Trans and Low stock warning elements */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                  
                  {/* Left block (Orders list log) */}
                  <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="px-5 py-4 border-b border-neutral-100 flex justify-between items-center bg-slate-50">
                        <h4 className="text-xs uppercase font-black tracking-wider text-slate-700">
                          {lang === 'vi' ? 'Giao dịch mới nhất' : 'RECENT ORDERS LEDGER'}
                        </h4>
                        <button
                          onClick={() => setActiveTab('orders')}
                          className="text-xs text-red-600 font-bold hover:text-red-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>{lang === 'vi' ? 'Quản lý sổ đơn' : 'Manage books'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {orders.length === 0 ? (
                        <div className="p-8 text-center text-neutral-405 text-neutral-400 text-xs italic">
                          {lang === 'vi' ? 'Chưa nhận bất kỳ đơn hàng nào từ khách.' : 'Zero logs registered yet.'}
                        </div>
                      ) : (
                        <div className="divide-y divide-neutral-100">
                          {orders.slice(0, 4).map((order) => (
                            <div key={order.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs hover:bg-slate-50/50 transition duration-150">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-slate-900">{order.id}</span>
                                  <span className={`px-2 py-0.5 rounded text-[9px] border font-bold capitalize ${getStatusColor(order.status)}`}>
                                    {getStatusTranslated(order.status)}
                                  </span>
                                </div>
                                <p className="text-neutral-700 font-extrabold mt-1.5">{order.customerName}</p>
                                <span className="text-[10px] text-neutral-400 block font-mono mt-0.5">{new Date(order.date).toLocaleString()}</span>
                              </div>

                              <div className="text-right shrink-0 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 mt-1 sm:mt-0">
                                <span className="text-[10px] text-slate-400 block font-mono">
                                  {order.items?.length || 0} items
                                </span>
                                <span className="text-sm font-black text-rose-600 tracking-tight block">
                                  {formatPrice(order.grandTotal)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="p-4 border-t border-neutral-100 bg-slate-50 select-none">
                      <p className="text-[10px] text-neutral-450 text-neutral-400 leading-normal">
                        ➜ {lang === 'vi' ? 'Nhấn nút "Giả lập đơn hàng" ở góc phải đỉnh trang để tự tạo hóa đơn hóa nghiệm ngẫu nhiên.' : 'Press "Simulate Order" above to generate sample buyers values dynamically.'}
                      </p>
                    </div>
                  </div>

                  {/* Right block: Stock Alerts & Active codes list */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* Low Stock alerting unit widgets */}
                    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs">
                      <div className="px-5 py-4 border-b border-rose-100 bg-rose-50/30">
                        <h4 className="text-xs uppercase font-black tracking-wider text-slate-800 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-650 text-rose-605 text-red-600" />
                          <span>{lang === 'vi' ? 'Cảnh báo hết hàng' : 'OUT OF STOCK ALERTS'}</span>
                        </h4>
                      </div>

                      {outOfStockProducts.length === 0 ? (
                        <div className="p-6 text-center text-emerald-600 font-bold text-xs flex flex-col items-center gap-1.5">
                          <CheckCircle className="w-8 h-8 text-emerald-500" />
                          <span>{lang === 'vi' ? 'Mọi hải sản đang ngập tràn đầy quầy' : 'All seafood catalog items are currently refilled'}</span>
                        </div>
                      ) : (
                        <div className="divide-y divide-neutral-100 max-h-56 overflow-y-auto">
                          {outOfStockProducts.map((p) => (
                            <div key={p.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover border border-neutral-100 shrink-0" referrerPolicy="no-referrer" />
                                <div className="min-w-0">
                                  <h5 className="font-extrabold text-neutral-800 truncate leading-tight">
                                    {lang === 'en' ? (p.nameEn || p.name) : p.name}
                                  </h5>
                                  <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">{p.id}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleToggleStock(p)}
                                className="bg-neutral-100 hover:bg-emerald-50 text-neutral-700 hover:text-emerald-700 font-extrabold text-[10px] px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:border-emerald-200 transition shrink-0 cursor-pointer"
                              >
                                {lang === 'vi' ? 'Đăng đại lý' : 'Refill block'}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Vouchers lists */}
                    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs">
                      <div className="px-5 py-4 border-b border-neutral-100 bg-slate-50 flex justify-between items-center">
                        <h4 className="text-xs uppercase font-black tracking-wider text-slate-800">
                          {lang === 'vi' ? 'Voucher đang kích hoạt' : 'ACTIVE PROMOTIONS'}
                        </h4>
                        <button onClick={() => setActiveTab('vouchers')} className="text-xs font-bold text-rose-600 hover:underline">
                          {lang === 'vi' ? 'Sửa' : 'View'}
                        </button>
                      </div>

                      <div className="p-4 space-y-2 max-h-52 overflow-y-auto">
                        {vouchers.map(v => (
                          <div key={v.code} className="flex items-center justify-between p-2.5 rounded-xl border border-dashed border-neutral-200 hover:border-indigo-200 transition text-xs">
                            <span className="font-mono bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded text-rose-600 font-black tracking-widest leading-none">
                              {v.code}
                            </span>
                            <span className="text-neutral-500 truncate max-w-[150px] font-bold">
                              {lang === 'en' ? (v.descriptionEn || v.description) : v.description}
                            </span>
                            <span className="font-black text-rose-600 shrink-0 font-mono">
                              {v.discountType === 'flat' ? formatPrice(v.value) : `-${v.value}%`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================= TAB 2: PRODUCTS CATALOG ======================= */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                
                {/* Section title */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-lg font-black text-neutral-900 tracking-tight uppercase">
                      {lang === 'vi' ? 'QUẢN KHO HẢI SẢN & ĐƠN GIÁ BÁN' : 'PRODUCT LOGISTICS & PRICING'}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {lang === 'vi' ? 'Thêm mới hải sản bay hàng tuần, cài đặt giá bớt, gốc bọc và thay đổi trạng thái bán trực quan.' : 'Control active inventory display, set discount compare prices or mark top hot items.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      resetProductForm();
                      setIsAddingProduct(true);
                    }}
                    className="bg-red-650 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-red-500/10 transition flex items-center gap-1.5 active:scale-97 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'vi' ? 'Thêm hải sản mới' : 'Add New Seafood'}</span>
                  </button>
                </div>

                {/* Filters block */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-neutral-200 p-4 rounded-2xl shadow-xs">
                  <div className="md:col-span-7 relative">
                    <input
                      type="text"
                      placeholder={lang === 'vi' ? 'Tìm nhanh theo tên sản phẩm, origin xuất xứ...' : 'Filter catalog records...'}
                      value={prodSearch}
                      onChange={(e) => setProdSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-neutral-250 border-neutral-200 rounded-xl text-xs py-2.5 pl-9 pr-4 focus:outline-none focus:bg-white focus:border-red-500 transition-all font-semibold"
                    />
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  </div>

                  <div className="md:col-span-3 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-neutral-400 shrink-0" />
                    <select
                      value={prodCatFilter}
                      onChange={(e) => setProdCatFilter(e.target.value)}
                      className="w-full bg-slate-50 border border-neutral-200 text-xs rounded-xl px-3 py-2.5 text-neutral-700 focus:outline-none focus:bg-white focus:border-red-500 font-bold"
                    >
                      <option value="all">{lang === 'vi' ? 'Tất cả phân mục' : 'All Categories'}</option>
                      <option value="salmon">{lang === 'vi' ? 'Cá Hồi Na Uy' : 'Norwegian Salmon'}</option>
                      <option value="sashimi">{lang === 'vi' ? 'Sashimi Nhật' : 'Japanese Sashimi'}</option>
                      <option value="beef">{lang === 'vi' ? 'Thịt Bò Nhập Khẩu' : 'Imported Beef'}</option>
                      <option value="seafood">{lang === 'vi' ? 'Hải sản Cao cấp' : 'High-End Seafood'}</option>
                      <option value="combo">{lang === 'vi' ? 'Combo dinh dưỡng' : 'Nutrition Gifts Combos'}</option>
                      <option value="spice">{lang === 'vi' ? 'Gia Vị Gõ Hương Mùi' : 'Spices'}</option>
                      <option value="drink">{lang === 'vi' ? 'Sake & Rượu thơm' : 'Beverages'}</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 text-xs text-neutral-500 py-2 md:py-0 w-full flex items-center justify-center bg-slate-50 border border-neutral-200 rounded-xl font-bold font-mono">
                    {lang === 'vi' ? 'Đang lọc:' : 'Hits:'} <span className="text-red-600 block pl-1.5 font-black">{displayProducts.length} / {products.length}</span>
                  </div>
                </div>

                {/* Table details catalog */}
                <div className="overflow-x-auto border border-neutral-200 rounded-2xl bg-white shadow-xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-slate-50 text-slate-500 font-black uppercase tracking-wider text-[10px] font-mono select-none">
                        <th className="p-4 w-[40%]">{lang === 'vi' ? 'Sản phẩm Hải Sản' : 'Item Info'}</th>
                        <th className="p-4">{lang === 'vi' ? 'Phân loại quầy' : 'Shelf Category'}</th>
                        <th className="p-4 text-right">{lang === 'vi' ? 'Giá bán (VNĐ)' : 'Unit Price'}</th>
                        <th className="p-4 text-center">{lang === 'vi' ? 'Mức HOT' : 'Tag Hot'}</th>
                        <th className="p-4 text-center">{lang === 'vi' ? 'Kho hàng' : 'Stock status'}</th>
                        <th className="p-4 text-center">{lang === 'vi' ? 'Tác vụ' : 'Options'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-150 divide-neutral-100">
                      {displayProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/60 transition duration-150">
                          
                          {/* Item Card Details */}
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-11 h-11 rounded-xl object-cover border border-neutral-200 shrink-0 shadow-xs"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-neutral-900 truncate text-[13px]">
                                {lang === 'en' ? (p.nameEn || p.name) : p.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 text-[10px] font-bold text-neutral-400 font-mono">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-neutral-600 capitalize">{p.id}</span>
                                <span>•</span>
                                <span>{lang === 'en' ? (p.unitEn || p.unit) : p.unit}</span>
                                <span>•</span>
                                <span>{lang === 'en' ? (p.originEn || p.origin) : p.origin}</span>
                              </div>
                            </div>
                          </td>

                          {/* Category Badge */}
                          <td className="p-4">
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-extrabold uppercase font-mono tracking-wide border border-slate-200/50">
                              {getCategoryTranslated(p.category)}
                            </span>
                          </td>

                          {/* Pricing Sheet */}
                          <td className="p-4 text-right font-black text-slate-900 text-sm font-mono whitespace-nowrap">
                            <div>{formatPrice(p.price)}</div>
                            {p.originalPrice && (
                              <div className="text-[10px] text-neutral-400 line-through font-medium">
                                {formatPrice(p.originalPrice)}
                              </div>
                            )}
                          </td>

                          {/* Best seller switch toggler */}
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleToggleBestSeller(p)}
                              className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest leading-none transition-all cursor-pointer ${
                                p.isBestSeller 
                                  ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                                  : 'bg-slate-100 text-neutral-400 hover:text-neutral-700 border border-transparent'
                              }`}
                              title={lang === 'vi' ? 'Click toggler nhãn Hot' : 'Toggle highlight Best Seller label'}
                            >
                              {p.isBestSeller ? 'HOT BÁN CHẠY' : 'BÌNH THƯỜNG'}
                            </button>
                          </td>

                          {/* Stock badge switch toggler */}
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleToggleStock(p)}
                              className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all border shrink-0 cursor-pointer ${
                                p.isInStock 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:brightness-95' 
                                  : 'bg-rose-50 text-rose-700 border-rose-200 hover:brightness-95'
                              }`}
                              title={lang === 'vi' ? 'Click để đảo trạng thái kho hàng' : 'Click to toggle active stock'}
                            >
                              {p.isInStock ? (lang === 'vi' ? 'Còn hàng' : 'In Stock') : (lang === 'vi' ? 'Hết hàng' : 'Out of Stock')}
                            </button>
                          </td>

                          {/* Action controls */}
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => startEditProduct(p)}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-lg transition shrink-0 cursor-pointer"
                                title="Edit product"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition shrink-0 cursor-pointer"
                                title="Delete product"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================= TAB 3: CUSTOMER ORDERS ======================= */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                
                {/* Intro titles */}
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-neutral-900 tracking-tight uppercase">
                    {lang === 'vi' ? 'SỔ KHÁCH HÀNG ĐẶT HÀNG' : 'CLIENTS ORDERS & LOGISTICS LEDGER'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {lang === 'vi' ? 'Giám sát chi tiết giỏ hàng người mua, phê duyệt tình trạng đóng gói soạn lẩu và giao vận chuyển shipper.' : 'Fulfill raw customer orders, change billing status weights and review recipient addresses.'}
                  </p>
                </div>

                {/* Filters block */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white border border-neutral-200 p-4 rounded-2xl shadow-xs">
                  <div className="md:col-span-8 relative">
                    <input
                      type="text"
                      placeholder={lang === 'vi' ? 'Gõ rà theo mã đơn hàng, tên khách mua, điện thoại nhận hàng...' : 'Filter ledger records...'}
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-neutral-200 rounded-xl text-xs py-2.5 pl-9 pr-4 focus:outline-none focus:bg-white focus:border-red-500 transition-all font-semibold"
                    />
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  </div>

                  <div className="md:col-span-4 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-neutral-400 shrink-0" />
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="w-full bg-slate-50 border border-neutral-200 text-xs rounded-xl px-3 py-2.5 text-neutral-700 focus:outline-none focus:bg-white focus:border-red-500 font-bold"
                    >
                      <option value="all">{lang === 'vi' ? 'Tất cả trạng thái' : 'All Statuses'}</option>
                      <option value="pending">{lang === 'vi' ? 'Chờ duyệt (Pending)' : 'Pending'}</option>
                      <option value="processing">{lang === 'vi' ? 'Đang soạn hàng (Processing)' : 'Processing'}</option>
                      <option value="shipping">{lang === 'vi' ? 'Đang giao (Shipping)' : 'Shipping'}</option>
                      <option value="delivered">{lang === 'vi' ? 'Đã hoàn thành (Delivered)' : 'Delivered'}</option>
                      <option value="cancelled">{lang === 'vi' ? 'Đã hủy đơn (Cancelled)' : 'Cancelled'}</option>
                    </select>
                  </div>
                </div>

                {/* Orders listing grid */}
                {displayOrders.length === 0 ? (
                  <div className="border border-dashed border-neutral-200 rounded-2xl py-14 text-center text-neutral-400 text-xs font-semibold bg-white shadow-xs">
                    {lang === 'vi' ? 'Không rà tìm thấy đơn hàng nào tương thích với bộ lọc tìm kiếm!' : 'Zero orders registered in this query. Trigger simulated order!'}
                  </div>
                ) : (
                  <div className="space-y-5">
                    {displayOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-neutral-200 rounded-2xl bg-white overflow-hidden shadow-xs hover:border-slate-300 transition duration-150"
                      >
                        {/* Order Upper Stripe banner header */}
                        <div className="px-5 py-3.5 bg-slate-50 border-b border-neutral-100 flex flex-wrap justify-between items-center gap-4">
                          <div className="flex items-center gap-3 font-mono text-xs font-bold text-slate-800">
                            <span className="text-rose-600 font-extrabold">{order.id}</span>
                            <span className="text-neutral-300">•</span>
                            <span className="text-neutral-500 font-normal">{new Date(order.date).toLocaleString()}</span>
                          </div>

                          {/* Quick Interactive status switch controllers */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {['pending', 'processing', 'shipping', 'delivered', 'cancelled'].map((stKey) => (
                              <button
                                key={stKey}
                                onClick={() => handleUpdateOrderStatus(order.id, stKey)}
                                className={`text-[9px] uppercase font-black px-2.5 py-1 rounded transition-all select-none border cursor-pointer ${
                                  order.status === stKey
                                    ? 'bg-red-600 text-white border-red-650 font-bold scale-[1.02]'
                                    : 'bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-neutral-200'
                                }`}
                              >
                                {getStatusTranslated(stKey)}
                              </button>
                            ))}

                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="bg-rose-5 border border-red-200 hover:bg-rose-100 text-rose-600 p-2 rounded-lg transition stroke-1 w-8 h-8 flex items-center justify-center shrink-0 cursor-pointer ml-2.5"
                              title="Delete permanently"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Order Inner columns panel info */}
                        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-neutral-700 text-xs">
                          
                          {/* Col 1: Customer record info */}
                          <div className="bg-slate-50 border border-neutral-150 border-neutral-100 p-4 rounded-xl space-y-2 text-left">
                            <span className="text-[10px] uppercase font-black tracking-wider text-rose-600 font-mono block">
                              {lang === 'vi' ? '1. Người Điền Đơn' : '1. Buyer Coordinates'}
                            </span>
                            <div className="space-y-1 mt-2 font-medium text-slate-700">
                              <p>
                                <span className="text-neutral-400 font-bold">{lang === 'vi' ? 'Họ tên nhận:' : 'Recipient:'}</span>{' '}
                                <strong className="text-slate-905 text-slate-900 font-extrabold">{order.customerName}</strong>
                              </p>
                              <p>
                                <span className="text-neutral-400 font-bold">{lang === 'vi' ? 'Điện thoại:' : 'Phone No:'}</span>{' '}
                                <span className="font-mono font-bold text-neutral-800">{order.customerPhone}</span>
                              </p>
                              <p className="leading-relaxed">
                                <span className="text-neutral-400 font-bold block mt-1">{lang === 'vi' ? 'Địa chỉ nhà:' : 'Address dropoff:'}</span>{' '}
                                <span className="text-slate-800 bg-white border border-neutral-200 px-2 py-1.5 rounded-md block mt-1 font-semibold leading-relaxed">
                                  {order.customerAddress}
                                </span>
                              </p>
                              {order.customerNote && (
                                <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg p-2 border border-amber-100 font-semibold italic mt-2.5 leading-relaxed">
                                  {lang === 'vi' ? 'Lời nhắn dặn:' : 'Customer leave guidelines:'} "{order.customerNote}"
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Col 2: Ordered Items details */}
                          <div className="bg-slate-50 border border-neutral-100 p-4 rounded-xl flex flex-col justify-between text-left">
                            <div>
                              <span className="text-[10px] uppercase font-black tracking-wider text-rose-600 font-mono block">
                                {lang === 'vi' ? '2. Giỏ Hải Sản Khách Đặt' : '2. Ordered Basket Items'}
                              </span>
                              
                              <div className="space-y-2.5 mt-2.5 max-h-[14rem] overflow-y-auto">
                                {order.items?.map((item: any) => (
                                  <div key={item.id} className="flex justify-between items-start border-b border-dashed border-neutral-200 pb-2 last:border-0 last:pb-0">
                                    <div className="min-w-0 pr-2">
                                      <p className="font-extrabold text-slate-800 leading-tight">
                                        {lang === 'en' ? (item.nameEn || item.name) : item.name}
                                      </p>
                                      <span className="text-[10px] text-neutral-400 block font-mono mt-0.5 font-bold">
                                        {item.quantity} x {item.unit} | {formatPrice(item.price)}
                                      </span>
                                    </div>
                                    <span className="font-mono text-slate-700 font-extrabold shrink-0">
                                      {formatPrice(item.price * item.quantity)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Col 3: Financial summaries breakdown sheets */}
                          <div className="bg-slate-50 border border-neutral-100 p-4 rounded-xl flex flex-col justify-between text-left">
                            <div>
                              <span className="text-[10px] uppercase font-black tracking-wider text-rose-600 font-mono block">
                                {lang === 'vi' ? '3. Chi Bản Cước Hạch Toán' : '3. Invoice Financial Panel'}
                              </span>

                              <div className="space-y-1.5 mt-3 font-mono text-[11px] text-slate-600">
                                <div className="flex justify-between">
                                  <span>{lang === 'vi' ? 'Cộng gộp sản phẩm:' : 'Items Subtotal:'}</span>
                                  <span className="font-bold text-slate-700">{formatPrice(order.subtotal)}</span>
                                </div>
                                {order.discount > 0 && (
                                  <div className="flex justify-between text-emerald-600 font-black">
                                    <span>{lang === 'vi' ? 'Giảm voucher ưu đãi:' : 'Campaign Code Off:'}</span>
                                    <span>-{formatPrice(order.discount)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span>{lang === 'vi' ? 'Cước vận chuyển:' : 'Courier logistics:'}</span>
                                  <span className="font-bold text-slate-700">{formatPrice(order.shipFee)}</span>
                                </div>
                                
                                <div className="flex justify-between border-t border-neutral-200 pt-2 font-bold text-slate-900 mt-2 text-xs">
                                  <span className="font-extrabold">{lang === 'vi' ? 'TỔNG CỘNG HÓA ĐƠN:' : 'GRAND TOTAL INVOICE:'}</span>
                                  <span className="text-red-600 text-sm font-black tracking-tight">{formatPrice(order.grandTotal)}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-neutral-200/60 pt-2 mt-4 bg-white px-2.5 py-1 rounded-md">
                              <span className="font-bold uppercase font-mono">{lang === 'vi' ? 'DỊCH VỤ:' : 'LOGISTICS:'} {order.shipMethod}</span>
                              <span className="font-bold uppercase font-mono">{lang === 'vi' ? 'THANH TOÁN:' : 'PAYMENT:'} {order.payMethod}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ======================= TAB 4: CAMPAIGNS & COUPONS ======================= */}
            {activeTab === 'vouchers' && (
              <div className="space-y-6">
                
                {/* Intro titles */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-lg font-black text-neutral-900 tracking-tight uppercase font-mono">
                      {lang === 'vi' ? 'CHIẾN DỊCH KHUYẾN MẠI VÀ MÃ COUPONS' : 'COUPONS & CAMPAIGN VOUCHERS LIST'}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {lang === 'vi' ? 'Tạo mới, dỡ bỏ các mã coupon giảm giá trực tiếp mà khách hàng có thể điền ở bước thanh toán giỏ hàng.' : 'Deploy automatic or custom campaign markdown offsets matching minimum purchase weights.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingVoucher(true)}
                    className="bg-red-650 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition shadow-md shadow-red-500/10 active:scale-97 cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{lang === 'vi' ? 'Cấp mã Voucher mới' : 'Deploy New Coupon'}</span>
                  </button>
                </div>

                {/* Ticket layout list */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {vouchers.map((v) => (
                    <div
                      key={v.code}
                      className="border-2 border-dashed border-neutral-200 hover:border-red-300 rounded-2xl p-5 flex flex-col justify-between bg-white relative transition duration-150 shadow-xs"
                    >
                      {/* Ticket side indentations visually */}
                      <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-6 h-6 bg-slate-50 rounded-full border border-neutral-200/80" />
                      <div className="absolute top-1/2 -translate-y-1/2 -right-3.5 w-6 h-6 bg-slate-50 rounded-full border border-neutral-200/80" />
                      
                      <div className="space-y-3.5">
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-sm font-black tracking-widest text-red-600 bg-red-50 px-3.5 py-1.5 rounded-xl border border-red-100">
                            {v.code}
                          </span>
                          
                          <button
                            onClick={() => handleDeleteVoucher(v.code)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition shrink-0 cursor-pointer"
                            title="Xóa voucher"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="font-bold text-slate-800 text-sm leading-snug">
                          {lang === 'en' ? (v.descriptionEn || v.description) : v.description}
                        </p>

                        <div className="text-xs text-neutral-500 font-semibold space-y-1 font-mono">
                          <div>
                            {lang === 'vi' ? 'Trị giá khấu trừ:' : 'Discount markdown value:'}{' '}
                            <strong className="text-rose-600 font-black">
                              {v.discountType === 'flat' ? formatPrice(v.value) : `${v.value}%`}
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-neutral-100 flex justify-between items-center text-[10px] text-neutral-400 font-mono font-bold">
                        <span>Min Basket: {formatPrice(v.minOrderValue)}</span>
                        <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
                          <span>ACTIVE</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================================= */}
      {/* 4. SEAFOOD BATCH EDITOR/CREATOR SCREEN MODAL (Unified Clean Design) */}
      {(isAddingProduct || editingProduct) && (
        <div className="fixed inset-0 z-[100] bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl border border-neutral-200 shadow-2xl p-6 overflow-y-auto max-h-[90vh] text-left">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                {isAddingProduct
                  ? (lang === 'vi' ? 'Khai báo lô hải sản mới' : 'ADD NEW SEAFOOD MATCHER')
                  : (lang === 'vi' ? `Biên tập thông tin SKU: ${formData.id}` : `EDIT SEAFOOD UNIT`)}
              </h4>
              <button
                onClick={() => {
                  setIsAddingProduct(false);
                  setEditingProduct(null);
                }}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">
                    {lang === 'vi' ? 'Mã sản phẩm (Duy nhất, không dấu)' : 'Product ID Key (Unique)'}
                  </label>
                  <input
                    type="text"
                    disabled={!!editingProduct}
                    value={formData.id}
                    required
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 transition-all text-xs disabled:opacity-50"
                    placeholder="tom-hum-alaska"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">
                    {lang === 'vi' ? 'Phân loại quầy hàng' : 'Shelf Category'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-950 focus:outline-none focus:bg-white focus:border-red-500 transition-all text-xs font-bold cursor-pointer"
                  >
                    <option value="salmon">Cá Hồi Na Uy</option>
                    <option value="sashimi">Sashimi Nhật Bản</option>
                    <option value="beef">Thịt Bò Nhập Khẩu</option>
                    <option value="seafood">Hải Sản Sạch</option>
                    <option value="combo">Combo Lẩu nướng</option>
                    <option value="spice">Gia vị gõ đi kèm</option>
                    <option value="drink">Sake & Đồ uống</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">
                    {lang === 'vi' ? 'Tên Tiếng Việt' : 'Vietnamese Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    required
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs"
                    placeholder="Ví dụ: Cá tuyết phi lê..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">
                    {lang === 'vi' ? 'Tên Tiếng Anh' : 'English Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs"
                    placeholder="Premium fillets..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block font-mono">
                    {lang === 'vi' ? 'Giá bán thực tế (đ)' : 'Price Amount (₫)'}
                  </label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    required
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block font-mono">
                    {lang === 'vi' ? 'Giá gốc so sánh (đ)' : 'Compare standard original (₫)'}
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-905 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs font-mono"
                    placeholder="Bỏ trống nếu không có cước giảm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase font-bold block">
                    {lang === 'vi' ? 'Xuất xứ (VI)' : 'Origin (VI)'}
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-550 focus:border-red-500 text-xs"
                    placeholder="Na Uy, Nhật..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase block">
                    {lang === 'vi' ? 'Xuất xứ (EN)' : 'Origin (EN)'}
                  </label>
                  <input
                    type="text"
                    value={formData.originEn}
                    onChange={(e) => setFormData({ ...formData, originEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs"
                    placeholder="Norway, Japan..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase block">
                    {lang === 'vi' ? 'Quy cách định lượng (VI)' : 'Display Pack Unit (VI)'}
                  </label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs"
                    placeholder="Ví dụ: Khay 300g..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase block">
                    {lang === 'vi' ? 'Quy cách định lượng (EN)' : 'Display Pack Unit (EN)'}
                  </label>
                  <input
                    type="text"
                    value={formData.unitEn}
                    onChange={(e) => setFormData({ ...formData, unitEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs"
                    placeholder="300g Tray..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 text-[10px] uppercase block font-semibold">
                  {lang === 'vi' ? 'Địa chỉ đường dẫn hình ảnh (Link Unsplash, v.v)' : 'Product image URL source'}
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-550 focus:border-red-500 text-xs font-mono"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase block">
                    {lang === 'vi' ? 'Mô tả tóm tắt (VI)' : 'Short summary (VI)'}
                  </label>
                  <textarea
                    value={formData.description}
                    rows={2}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs resize-none"
                    placeholder="Nhập nét đặc thù thực phẩm..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 text-[10px] uppercase block">
                    {lang === 'vi' ? 'Mô tả tóm tắt (EN)' : 'Short summary (EN)'}
                  </label>
                  <textarea
                    value={formData.descriptionEn}
                    rows={2}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs resize-none"
                    placeholder="Short description..."
                  />
                </div>
              </div>

              <div className="flex gap-6 py-2 select-none">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.isInStock}
                    onChange={(e) => setFormData({ ...formData, isInStock: e.target.checked })}
                    className="w-4 h-4 rounded text-red-650 bg-white border-neutral-300 accent-red-600"
                  />
                  <span>{lang === 'vi' ? 'Đang Sẵn Có / Còn hàng trong tương hợp' : 'In Stock actively'}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="w-4 h-4 rounded text-red-650 bg-white border-neutral-300 accent-red-600"
                  />
                  <span>{lang === 'vi' ? 'Gắn nhãn HOT bán chạy tiêu biểu' : 'Highlight as Best Seller'}</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5 font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  {lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl transition shadow-md shadow-red-500/10 cursor-pointer"
                >
                  {lang === 'vi' ? 'Cập nhật kho lưu' : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* 5. VOUCHER DEPLOYMENT SCREEN MODAL (Unified Pristine Modern UI) */}
      {isAddingVoucher && (
        <div className="fixed inset-0 z-[100] bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl border border-neutral-200 shadow-2xl p-6 text-left">
            
            <div className="flex justify-between items-center pb-3 border-b border-neutral-100 mb-4">
              <h4 className="text-sm font-black text-slate-900 uppercase">
                {lang === 'vi' ? 'XUẤT BẢN KHUYẾN MẠI MỚI' : 'DEPLOY NEW CAMPAIGN CODE'}
              </h4>
              <button
                onClick={() => setIsAddingVoucher(false)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleVoucherSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
              
              <div className="space-y-1">
                <label className="text-slate-500 uppercase font-black text-[9px] block">
                  {lang === 'vi' ? 'Mã Coupon Code (In hoa, không khoảng trắng)' : 'Promo Code (Uppercase, No spaces)'}
                </label>
                <input
                  type="text"
                  required
                  value={voucherFormData.code}
                  onChange={(e) => setVoucherFormData({ ...voucherFormData, code: e.target.value.toUpperCase() })}
                  className="w-full bg-slate-55 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-neutral-950 focus:outline-none focus:bg-white focus:border-red-500 text-xs font-mono font-black tracking-widest uppercase"
                  placeholder="SALEKICHCAU88"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-500 uppercase font-black text-[9px] block">
                    {lang === 'vi' ? 'Hình thức giảm' : 'Off logic style'}
                  </label>
                  <select
                    value={voucherFormData.discountType}
                    onChange={(e) => setVoucherFormData({ ...voucherFormData, discountType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs font-bold cursor-pointer"
                  >
                    <option value="percent">{lang === 'vi' ? 'Tính theo % sỉ' : 'Percentage (%)'}</option>
                    <option value="flat">{lang === 'vi' ? 'Khấu trừ tiền cứng (đ)' : 'Flat Amount (₫)'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 uppercase font-bold text-[9px] block">
                    {lang === 'vi' ? 'Mức trị giá bớt' : 'Discount weight value'}
                  </label>
                  <input
                    type="number"
                    required
                    value={voucherFormData.value || ''}
                    onChange={(e) => setVoucherFormData({ ...voucherFormData, value: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 uppercase font-bold text-[9px] block">
                  {lang === 'vi' ? 'Tiêu chí đơn hàng mua tối thiểu (đ)' : 'Min Spend Criteria limit (₫)'}
                </label>
                <input
                  type="number"
                  value={voucherFormData.minOrderValue || ''}
                  onChange={(e) => setVoucherFormData({ ...voucherFormData, minOrderValue: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-neutral-950 focus:outline-none focus:bg-white focus:border-red-500 text-xs font-mono font-bold"
                  placeholder="300000"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 uppercase block tracking-wide">
                  {lang === 'vi' ? 'Mô tả tóm tắt (VI)' : 'Summary statement (VI)'}
                </label>
                <input
                  type="text"
                  value={voucherFormData.description}
                  onChange={(e) => setVoucherFormData({ ...voucherFormData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs"
                  placeholder="Giảm 5% cho đơn..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 uppercase block tracking-wide">
                  {lang === 'vi' ? 'Mô tả tóm tắt (EN)' : 'Summary statement (EN)'}
                </label>
                <input
                  type="text"
                  value={voucherFormData.descriptionEn}
                  onChange={(e) => setVoucherFormData({ ...voucherFormData, descriptionEn: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 text-xs"
                  placeholder="5% saved on check..."
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5 font-bold">
                <button
                  type="button"
                  onClick={() => setIsAddingVoucher(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  {lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="bg-red-650 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl transition shadow-md shadow-red-500/10 cursor-pointer"
                >
                  {lang === 'vi' ? 'Xuất bản phiếu' : 'Deploy Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
