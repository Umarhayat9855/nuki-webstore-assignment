import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client';
import { useCart } from '../../context/CartContext';
import { Loader } from '../../components/Loader/Loader';
import styles from './ProductDetails.module.css';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch all products and filter client-side to find the requested product.
    // This approach is used because the current API endpoint returns the full product list.
    api.getProducts().then((res) => {
      const found = res.data.find((p: Product) => p.id === Number(id));
      setProduct(found || null);
    });
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, 1);
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  if (!product) return <Loader />;

  return (
    <div className={styles.container}>
      <Link to="/products" className={styles.backLink}>← Back to Products</Link>
      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>€{product.price}</div>
          <p className={styles.description}>
            Experience the future of smart home access. {product.name} brings convenience, security, and flexibility to your daily life.
          </p>
          <ul className={styles.features}>
            <li>Easy installation</li>
            <li>Secure encryption</li>
            <li>Smartphone control</li>
            <li>Auto Unlock feature</li>
          </ul>
          <div className={styles.actions}>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
