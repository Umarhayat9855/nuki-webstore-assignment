import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const productRouter = Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});
