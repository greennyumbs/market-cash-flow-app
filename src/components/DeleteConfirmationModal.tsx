import React from 'react';
import styles from './DeleteConfirmationModal.module.css';

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>ยืนยันการลบฟอร์ม</h2>
        <p>คุณแน่ใจหรือว่าต้องการลบฟอร์มนี้?</p>
        <div className={styles.buttons}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            ลบ
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}