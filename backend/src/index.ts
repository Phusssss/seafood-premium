import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { getPrisma } from './db.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

app.use(cors());
app.use(express.json());

// Initialize Prisma
const prisma = await getPrisma();
app.locals.prisma = prisma;

// Routes
const { default: productRouter } = await import('./routes/products.js');
const { default: categoryRouter } = await import('./routes/categories.js');
const { default: tipRouter } = await import('./routes/tips.js');
const { default: voucherRouter } = await import('./routes/vouchers.js');
const { default: orderRouter } = await import('./routes/orders.js');
const { default: authRouter } = await import('./routes/auth.js');
const { default: geminiRouter } = await import('./routes/gemini.js');

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/tips', tipRouter);
app.use('/api/vouchers', voucherRouter);
app.use('/api/orders', orderRouter);
app.use('/api/auth', authRouter);
app.use('/api/gemini', geminiRouter);

// Serve frontend in production
const isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
  const distPath = path.resolve(__dirname, '../../frontend/dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Seafood Backend] Server launched on http://localhost:${PORT}`);
});
