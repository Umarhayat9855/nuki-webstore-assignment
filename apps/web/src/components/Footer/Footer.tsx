import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4>Products</h4>
          <ul>
            <li><a href="#">Smart Lock</a></li>
            <li><a href="#">Opener</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">Spare Parts</a></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Installation</a></li>
            <li><a href="#">Video Tutorials</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Career</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Nuki Club</h4>
          <ul>
            <li><a href="#">Benefits</a></li>
            <li><a href="#">Join Now</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        © 2024 Nuki Home Solutions GmbH. All rights reserved.
      </div>
    </footer>
  );
};
