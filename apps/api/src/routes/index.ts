import { Router } from 'express';
import { productRouter } from './products';
import { cartRouter } from './cart';
import { authRouter } from './auth';

export const router = Router();

router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/auth', authRouter);
