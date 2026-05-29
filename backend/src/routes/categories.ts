import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'asc' },
    });
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
