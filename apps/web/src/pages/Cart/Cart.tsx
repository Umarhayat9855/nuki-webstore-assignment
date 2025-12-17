import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
  };
}

export const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { refreshCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await api.getCart();
      setItems(res.data);
      refreshCart(); // Ensure global count is in sync
    } catch (error) {
      showToast('Failed to load cart', 'error');
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      await api.removeFromCart(id);
      showToast('Item removed from cart', 'success');
      loadCart();
    } catch (error) {
      showToast('Failed to remove item', 'error');
    }
  };

  const total = items.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>
      {items.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <Link to="/products" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Continue Shopping</Link>
        </div>
      ) : (
        <div className={styles.cartGrid}>
          <div className={styles.cartItems}>
            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img src={item.product.imageUrl} alt={item.product.name} />
                </div>
                <div className={styles.itemDetails}>
                  <h3>{item.product.name}</h3>
                  <div className={styles.itemPrice}>€{item.product.price}</div>
                  <div>Quantity: {item.quantity}</div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h3>Order Summary</h3>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton} onClick={() => showToast('Checkout not implemented', 'info')}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
