import type { Metadata } from 'next'
import Sidebar from '@/components/Sidebar'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: 'Daily Financial Record',
  description: 'Track your daily financial records',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  )
}