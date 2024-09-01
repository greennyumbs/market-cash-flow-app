// src/components/Modal.tsx
import React from 'react';
import styles from './SeeMoreModal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: { id: number; name: string; amount: number }[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, expenses }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Expense Details</h2>
        <ul>
          {expenses.map(expense => (
            <li key={expense.id}>
              {expense.name}: ฿{expense.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;