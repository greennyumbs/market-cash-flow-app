import React from 'react';
import styles from './DeleteConfirmationModal.module.css';

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  date: string;
}

export default function DeleteConfirmationModal({
  onConfirm,
  onCancel,
  date,
}: DeleteConfirmationModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>ยืนยันการลบข้อมูล</h2>
        <p>คุณแน่ใจหรือว่าต้องการลบข้อมูลวันที่ {date}?</p>
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