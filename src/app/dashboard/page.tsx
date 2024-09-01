"use client"

import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { SummaryTransaction } from '@/core/interface';

export default function Dashboard() {
  const [summaryTransactions, setSummaryTransactions] = useState<SummaryTransaction[]>([]);

  useEffect(() => {
    async function fetchSummaryTransactions() {
      try {
        const response = await fetch('/api/summary');
        const data = await response.json();
        setSummaryTransactions(data);
      } catch (error) {
        console.error('Error fetching summary transactions:', error);
      }
    }

    fetchSummaryTransactions();
  }, []);

  const sortedTransactions = summaryTransactions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const latestTransactions = sortedTransactions.slice(0, 3);
  const olderTransactions = sortedTransactions.slice(3);

  return (
    <div className={styles.dashboard}>
      <h1>รายการล่าสุด</h1>
      <div className={styles.cards}>
        {latestTransactions.map(transaction => (
          <div key={transaction.transactionId} className={styles.card}>
            <h2>{new Date(transaction.createdAt).toLocaleString()} - รายการที่ {transaction.transactionId}</h2>
            <p>{transaction.marketName || 'N/A'}</p>
            <p>รายได้: ฿{transaction.income.toFixed(2)}</p>
            <p>ค่าเช่าที่: ฿{transaction.rentPrice.toFixed(2)}</p>
            <p>รายจ่ายทั้งหมด: ฿{transaction.totalExpense.toFixed(2)}</p>
            <p>ยอดรวมสุทธิ: ฿{(transaction.income - transaction.totalExpense).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <h2>รายการทั้งหมด</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>วันและเวลาที่บันทึก</th>
            <th>ตลาด</th>
            <th>รายรับ</th>
            <th>ค่าเช่าที่</th>
            <th>รายจ่ายทั้งหมด</th>
            <th>ยอดรวมสุทธิ</th>
          </tr>
        </thead>
        <tbody>
          {olderTransactions.map(transaction => (
            <tr key={transaction.transactionId}>
              <td>{new Date(transaction.createdAt).toLocaleString()}</td>
              <td>{transaction.marketName || 'N/A'}</td>
              <td>฿{transaction.income.toFixed(2)}</td>
              <td>฿{transaction.rentPrice.toFixed(2)}</td>
              <td>฿{transaction.totalExpense.toFixed(2)}</td>
              <td>฿{(transaction.income - transaction.totalExpense).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}