import styles from './ConfirmationModal.module.css'

interface ConfirmationModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationModal({ onConfirm, onCancel }: ConfirmationModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>ยืนยันรายจ่ายประจำวัน</h2>
        <p>คุณแน่ใจหรือไม่ว่าต้องการยืนยันรายจ่ายประจำวัน?</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmButton}>ยืนยัน</button>
          <button onClick={onCancel} className={styles.cancelButton}>ยกเลิก</button>
        </div>
      </div>
    </div>
  )
}