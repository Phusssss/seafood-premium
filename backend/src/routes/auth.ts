import { Router } from 'express';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { phone } = req.body;

    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({
        data: { phone, name: null },
      });
    }

    res.json({
      id: user.id,
      name: user.name || '',
      phone: user.phone,
      isNew: !user.name,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;
    const { name, phone } = req.body;

    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      const updated = await prisma.user.update({
        where: { phone },
        data: { name },
      });
      return res.json(updated);
    }

    const user = await prisma.user.create({
      data: { phone, name },
    });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
