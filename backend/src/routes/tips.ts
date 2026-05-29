import { Router } from 'express';

const router = Router();

function parseTip(t: any) {
  return {
    ...t,
    sections: t.sections ? JSON.parse(t.sections) : undefined,
  };
}

router.get('/', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const tips = await prisma.tip.findMany({
      include: { relatedCategory: true },
      orderBy: { id: 'asc' },
    });
    res.json(tips.map(parseTip));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const id = parseInt(req.params.id, 10);
    const tip = await prisma.tip.findUnique({
      where: { id },
      include: { relatedCategory: true },
    });
    if (!tip) return res.status(404).json({ error: 'Tip not found' });
    res.json(parseTip(tip));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
