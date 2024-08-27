// src/components/Sidebar.tsx
import Link from 'next/link'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.nav}>
        <li><Link href="/dashboard">สรุปการเงิน</Link></li>
        <li><Link href="/transactions">รายการทั้งหมด</Link></li>
        <li><Link href="/expenses">รายจ่าย</Link></li>
        {/* <li><Link href="/markets">Markets</Link></li> */}
        <li><Link href="/daily-transaction">บันทึกรายจ่ายวันนี้</Link></li>
      </ul>
    </nav>
  )
}