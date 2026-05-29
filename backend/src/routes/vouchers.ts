import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const vouchers = await prisma.voucher.findMany({
      where: { isActive: true },
    });
    res.json(vouchers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/validate', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { code, subtotal } = req.body;
    const voucher = await prisma.voucher.findUnique({ where: { code } });

    if (!voucher) {
      return res.json({ valid: false, error: 'Mã giảm giá không tồn tại' });
    }
    if (!voucher.isActive) {
      return res.json({ valid: false, error: 'Mã giảm giá đã bị vô hiệu hóa' });
    }
    if (voucher.maxUsage > 0 && voucher.usageCount >= voucher.maxUsage) {
      return res.json({ valid: false, error: 'Mã giảm giá đã hết lượt sử dụng' });
    }
    if (subtotal < voucher.minOrderValue) {
      return res.json({ valid: false, error: `Đơn hàng tối thiểu ${voucher.minOrderValue.toLocaleString('vi-VN')}đ` });
    }

    let discount = voucher.discountType === 'flat' ? voucher.value : Math.round(subtotal * voucher.value / 100);
    if (voucher.discountType === 'percent') {
      discount = Math.min(discount, 100000);
    }

    res.json({ valid: true, voucher, discount });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const voucher = await prisma.voucher.create({ data: req.body });
    res.status(201).json(voucher);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const voucher = await prisma.voucher.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(voucher);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    await prisma.voucher.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
