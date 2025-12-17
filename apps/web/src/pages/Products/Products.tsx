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
  description: string;
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
          <h1>Smart Access for Your Home</h1>
          <p className={styles.heroSubtitle}>Discover the Nuki product world.</p>
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
                <Link to={`/products/${product.id}`} className={styles.productLink}>
                  <h3>{product.name}</h3>
                </Link>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.footer}>
                  <div className={styles.price}>€{product.price}</div>
                  <button className={styles.button} onClick={() => handleAddToCart(product.id)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
