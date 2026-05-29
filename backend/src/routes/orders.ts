import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { cart, voucher, customerName, customerPhone, address, note, shipMethod, payMethod, isLoggedIn, userId } = req.body;

    const subtotal = cart.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0);
    const shippingFee = subtotal >= 1000000 ? 0 : 50000;
    let discount = 0;
    let voucherId = null;

    if (voucher) {
      const dbVoucher = await prisma.voucher.findUnique({ where: { code: voucher.code } });
      if (dbVoucher && dbVoucher.isActive) {
        voucherId = dbVoucher.id;
        discount = dbVoucher.discountType === 'flat'
          ? dbVoucher.value
          : Math.min(Math.round(subtotal * dbVoucher.value / 100), 100000);

        await prisma.voucher.update({
          where: { id: dbVoucher.id },
          data: { usageCount: { increment: 1 } },
        });
      }
    }

    const finalTotal = subtotal + shippingFee - discount;

    const order = await prisma.order.create({
      data: {
        userId: isLoggedIn ? userId : null,
        customerName,
        customerPhone,
        address,
        note,
        shipMethod,
        payMethod,
        subtotal,
        shippingFee,
        discount,
        finalTotal,
        voucherCode: voucher?.code || null,
        voucherId,
        items: {
          create: cart.map((item: any) => ({
            productId: item.product.id,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            selectedSpec: item.selectedSpec || null,
          })),
        },
      },
      include: { items: true },
    });

    res.status(201).json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const orders = await prisma.order.findMany({
      include: { items: true, user: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
