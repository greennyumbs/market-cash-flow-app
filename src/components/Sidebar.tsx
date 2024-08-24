// src/components/Sidebar.tsx
import Link from 'next/link'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.nav}>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/transactions">Transactions</Link></li>
        <li><Link href="/expenses">Expenses</Link></li>
        <li><Link href="/markets">Markets</Link></li>
        <li><Link href="/daily-transaction">Daily Transaction</Link></li>
      </ul>
    </nav>
  )
}