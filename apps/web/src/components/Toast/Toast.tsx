import React, { useEffect } from 'react';
import styles from './Toast.module.css';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <span>{toast.message}</span>
      <button className={styles.closeButton} onClick={() => onClose(toast.id)}>
        ×
      </button>
    </div>
  );
};
