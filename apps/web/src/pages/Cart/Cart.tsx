import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

import { useCart } from '../../context/CartContext';

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

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await api.getCart();
      setItems(res.data);
      refreshCart(); // Ensure global count is in sync
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (id: number) => {
    await api.removeFromCart(id);
    loadCart();
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
            <button className={styles.checkoutButton} onClick={() => alert('Checkout not implemented')}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
