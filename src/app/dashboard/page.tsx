"use client"

import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { SummaryTransaction } from '@/core/interface';
import Image from 'next/image';

export default function Dashboard() {
  const [summaryTransactions, setSummaryTransactions] = useState<SummaryTransaction[]>([]);
  const [activeExpenses, setActiveExpenses] = useState<{ id: number; name: string; amount: number }[] | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

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

  const handleSeeMore = (expenses: { id: number; name: string; amount: number }[], event: React.MouseEvent) => {
    setActiveExpenses(expenses);
    const rect = event.currentTarget.getBoundingClientRect();
    setModalPosition({ top: rect.bottom + window.scrollY, left: rect.left });
  };

  const handleMouseLeave = () => {
    setActiveExpenses(null);
  };

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
            <button 
              className={styles.seeMoreBtn}
              onMouseEnter={(e) => handleSeeMore(transaction.expense, e)}
              onMouseLeave={handleMouseLeave}
            >
              ดูเพิ่มเติม
            </button>
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
            <th>รายละเอียด</th>
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
              <td>
                <button 
                  className={styles.seeMoreBtn}
                  onMouseEnter={(e) => handleSeeMore(transaction.expense, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  ดูเพิ่มเติม
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {activeExpenses && (
        <div 
          className={styles.modal} 
          style={{ top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}
          onMouseEnter={() => setActiveExpenses(activeExpenses)}
          onMouseLeave={handleMouseLeave}
        >
          <h3>รายละเอียดค่าใช้จ่าย</h3>
          <ul>
            {activeExpenses.map(expense => (
              <li key={expense.id}>{expense.name}: ฿{expense.amount.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.images}>
        <Image src="/memee.png" alt="meme" width={300} height={400} />
        <Image src="/memee2.png" alt="meme" width={300} height={400} />
        <Image src="/memee3.png" alt="meme" width={300} height={400} />
      </div>
    </div>
  );
}