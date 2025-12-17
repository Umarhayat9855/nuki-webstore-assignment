import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

export const cartRouter = Router();

cartRouter.use(authenticate);

cartRouter.get('/', async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });
  res.json(cartItems);
});

cartRouter.post('/', async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  const { productId, quantity } = req.body;

  if (quantity <= 0) return res.status(400).json({ error: 'Quantity must be positive' });

  try {
    const existingItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
      return res.json(updatedItem);
    }

    const newItem = await prisma.cartItem.create({
      data: { userId, productId, quantity },
    });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

cartRouter.delete('/:id', async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  const id = parseInt(req.params.id);

  try {
    const item = await prisma.cartItem.findFirst({ where: { id, userId } });
    if (!item) return res.status(404).json({ error: 'Item not found' });

    await prisma.cartItem.delete({ where: { id } });
    res.json({ message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
});
