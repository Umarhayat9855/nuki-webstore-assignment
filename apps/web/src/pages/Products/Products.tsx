import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Loader } from '../../components/Loader/Loader';
import styles from './Products.module.css';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}
export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    api.getProducts()
      .then((res) => setProducts(res.data))
      .catch(() => showToast('Failed to load products', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      showToast('Added to cart!', 'success');
    } catch (error) {
      showToast('Failed to add to cart', 'error');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>Nuki Online Shop<span className={styles.dot}>.</span> <span className={styles.heroSubtitle}>Exclusive product offerings directly from the manufacturer.</span></h1>
          <div className={styles.features}>
            <span>Free shipping for Nuki Club members</span>
            <span>•</span>
            <span>Free return shipping</span>
            <span>•</span>
            <span>Proven technology by the #1 Smart Lock in Europe</span>
          </div>
          <div className={styles.categories}>
            <button className={`${styles.categoryPill} ${styles.active}`}>ALL PRODUCTS</button>
            <button className={styles.categoryPill}>ACCESS SOLUTIONS</button>
            <button className={styles.categoryPill}>SETS</button>
            <button className={styles.categoryPill}>KEYPADS</button>
            <button className={styles.categoryPill}>ACCESSORIES</button>
          </div>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} alt={product.name} />
                </Link>
              </div>
              <div className={styles.content}>
                <Link to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <div className={styles.price}>€{product.price}</div>
                <button className={styles.button} onClick={() => handleAddToCart(product.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
