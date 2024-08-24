import styles from './ConfirmationModal.module.css'

interface ConfirmationModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmationModal({ onConfirm, onCancel }: ConfirmationModalProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Confirm Submission</h2>
        <p>Are you sure you want to submit this daily transaction?</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmButton}>Confirm</button>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  )
}