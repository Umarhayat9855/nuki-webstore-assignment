import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';
import jwt from 'jsonwebtoken';

jest.mock('../lib/prisma');

const mockToken = jwt.sign({ userId: 1 }, process.env.JWT_SECRET || 'secret');

describe('Cart Routes', () => {
  describe('GET /api/cart', () => {
    it('should return cart items for authenticated user', async () => {
      (prisma.cartItem.findMany as jest.Mock).mockResolvedValue([
        { id: 1, productId: 1, quantity: 2, product: { name: 'Lock' } },
      ]);

      const res = await request(app)
        .get('/api/cart')
        .set('Cookie', [`token=${mockToken}`]);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].product.name).toEqual('Lock');
    });

    it('should return 401 if not authenticated', async () => {
      const res = await request(app).get('/api/cart');
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('POST /api/cart', () => {
    it('should add item to cart', async () => {
      (prisma.cartItem.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.cartItem.create as jest.Mock).mockResolvedValue({
        id: 1,
        userId: 1,
        productId: 1,
        quantity: 1,
      });

      const res = await request(app)
        .post('/api/cart')
        .set('Cookie', [`token=${mockToken}`])
        .send({ productId: 1, quantity: 1 });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('should update quantity if item exists', async () => {
      (prisma.cartItem.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        userId: 1,
        productId: 1,
        quantity: 1,
      });
      (prisma.cartItem.update as jest.Mock).mockResolvedValue({
        id: 1,
        userId: 1,
        productId: 1,
        quantity: 2,
      });

      const res = await request(app)
        .post('/api/cart')
        .set('Cookie', [`token=${mockToken}`])
        .send({ productId: 1, quantity: 1 });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('quantity', 2);
    });
  });

  describe('DELETE /api/cart/:id', () => {
    it('should remove item from cart', async () => {
      (prisma.cartItem.findFirst as jest.Mock).mockResolvedValue({ id: 1, userId: 1 });
      (prisma.cartItem.delete as jest.Mock).mockResolvedValue({ id: 1 });

      const res = await request(app)
        .delete('/api/cart/1')
        .set('Cookie', [`token=${mockToken}`]);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Item removed');
    });

    it('should return 404 if item not found', async () => {
      (prisma.cartItem.findFirst as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .delete('/api/cart/999')
        .set('Cookie', [`token=${mockToken}`]);

      expect(res.statusCode).toEqual(404);
    });
  });
});
