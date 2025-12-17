import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export const api = {
  getProducts: () => client.get('/products'),
  getCart: () => client.get('/cart'),
  addToCart: (productId: number, quantity: number) => client.post('/cart', { productId, quantity }),
  removeFromCart: (id: number) => client.delete(`/cart/${id}`),
  login: (email: string, password: string) => client.post('/auth/login', { email, password }),
  register: (email: string, password: string) => client.post('/auth/register', { email, password }),
  getProfile: () => client.get('/auth/me'),
  logout: () => client.post('/auth/logout'),
};
