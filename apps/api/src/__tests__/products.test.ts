import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

jest.mock('../lib/prisma');

describe('GET /api/products', () => {
  it('should return 200 and a list of products', async () => {
    (prisma.product.findMany as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Smart Lock', price: '149.00' },
      { id: 2, name: 'Opener', price: '99.00' },
    ]);

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(2);
    expect(res.body[0].name).toEqual('Smart Lock');
  });

  it('should handle database errors', async () => {
    (prisma.product.findMany as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const res = await request(app).get('/api/products');

    expect(res.statusCode).toEqual(500);
  });
});
