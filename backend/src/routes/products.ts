import { Router } from 'express';

const router = Router();

function parseProduct(p: any) {
  return {
    ...p,
    specs: p.specs ? JSON.parse(p.specs) : undefined,
    specsEn: p.specsEn ? JSON.parse(p.specsEn) : undefined,
    category: p.category?.id || p.categoryId,
  };
}

router.get('/', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { search, category } = req.query;

    const where: any = { isInStock: true };
    if (category && category !== 'all') {
      where.categoryId = category as string;
    }
    if (search) {
      const q = (search as string).toLowerCase();
      where.OR = [
        { name: { contains: q } },
        { nameEn: { contains: q } },
        { description: { contains: q } },
        { descriptionEn: { contains: q } },
        { origin: { contains: q } },
        { originEn: { contains: q } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json(products.map(parseProduct));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(parseProduct(product));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const data = { ...req.body };
    if (data.specs) data.specs = JSON.stringify(data.specs);
    if (data.specsEn) data.specsEn = JSON.stringify(data.specsEn);
    const product = await prisma.product.create({ data });
    res.status(201).json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const data = { ...req.body };
    if (data.specs) data.specs = JSON.stringify(data.specs);
    if (data.specsEn) data.specsEn = JSON.stringify(data.specsEn);
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data,
    });
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
