import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/client';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { Loader } from '../../components/Loader/Loader';
import styles from './ProductDetails.module.css';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    api.getProducts()
      .then((res) => {
        const found = res.data.find((p: Product) => p.id === Number(id));
        setProduct(found || null);
      })
      .catch(() => showToast('Failed to load product', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      try {
        await addToCart(product.id, 1);
        showToast('Added to cart!', 'success');
      } catch (error) {
        showToast('Failed to add to cart', 'error');
      }
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div className={styles.container}>Product not found</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className={styles.infoSection}>
            <h1>{product.name}</h1>
            <div className={styles.price}>€{product.price}</div>
            <p className={styles.description}>{product.description}</p>
            
            <div className={styles.actions}>
              <button className={styles.addToCartButton} onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <span>✓</span> Free shipping
              </div>
              <div className={styles.featureItem}>
                <span>✓</span> 30-day return policy
              </div>
              <div className={styles.featureItem}>
                <span>✓</span> 2-year warranty
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
