"use client"

import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { Expense } from '@/core/entities';

interface Transaction {
  market_name: string;
  transaction: {
    income: number;
    rent_price: number;
    Expense: Expense[];
  };
}

interface DailySummary {
  [date: string]: Transaction[];
}

export default function Dashboard() {
  const [summaryData, setSummaryData] = useState<DailySummary>({});
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummaryData() {
      try {
        const response = await fetch('/api/summary');
        const data = await response.json();
        setSummaryData(data);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    }

    fetchSummaryData();
  }, []);

  const dates = Object.keys(summaryData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const latestDate = dates[0];

  const calculateDailyTotals = (transactions: Transaction[]) => {
    return transactions.reduce((acc, t) => {
      acc.income += t.transaction.income;
      acc.expense += t.transaction.Expense.reduce((sum, e) => sum + e.amount, 0);
      acc.rentPrice += t.transaction.rent_price;
      return acc;
    }, { income: 0, expense: 0, rentPrice: 0 });
  };

  const toggleRow = (date: string) => {
    setExpandedRow(expandedRow === date ? null : date);
  };

  return (
    <div className={styles.dashboard}>
      <h1>ข้อมูลสรุป</h1>
      
      {latestDate && (
        <div className={styles.summaryCard}>
          <div className={styles.summaryHeader}>
            <h2>สรุปรายการล่าสุด - {latestDate}</h2>
            {(() => {
              const { income, expense, rentPrice } = calculateDailyTotals(summaryData[latestDate]);
              const netProfit = income - expense - rentPrice;
              return (
                <div className={styles.dailyTotals}>
                  <div>
                    <span>รายได้รวม</span>
                    <strong>฿{income.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>ค่าเช่ารวม</span>
                    <strong>฿{rentPrice.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>รายจ่ายรวม</span>
                    <strong>฿{expense.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>กำไรสุทธิ</span>
                    <strong>฿{netProfit.toFixed(2)}</strong>
                  </div>
                </div>
              );
            })()}
          </div>
          <div className={styles.marketDetailsGrid}>
            {summaryData[latestDate].map((transaction, index) => {
              const totalExpense = transaction.transaction.Expense.reduce((sum, e) => sum + e.amount, 0);
              const netProfit = transaction.transaction.income - transaction.transaction.rent_price - totalExpense;
              return (
                <div key={index} className={styles.marketSummary}>
                  <h3>{transaction.market_name}</h3>
                  <div className={styles.marketInfo}>
                    <div>
                      <span>รายได้</span>
                      <strong>฿{transaction.transaction.income.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span>ค่าเช่าที่</span>
                      <strong>฿{transaction.transaction.rent_price.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span>รายจ่าย</span>
                      <strong>฿{totalExpense.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span>กำไรสุทธิ</span>
                      <strong>฿{netProfit.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <h2>รายการทั้งหมด</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>วันที่</th>
            <th>รายได้รวม</th>
            <th>ค่าเช่ารวม</th>
            <th>รายจ่ายรวม</th>
            <th>กำไรสุทธิ</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {dates.slice(1).map(date => {
            const { income, expense, rentPrice } = calculateDailyTotals(summaryData[date]);
            const netProfit = income - expense - rentPrice;
            return (
              <React.Fragment key={date}>
                <tr>
                  <td>{date}</td>
                  <td>฿{income.toFixed(2)}</td>
                  <td>฿{rentPrice.toFixed(2)}</td>
                  <td>฿{expense.toFixed(2)}</td>
                  <td>฿{netProfit.toFixed(2)}</td>
                  <td>
                    <button className={styles.toggleBtn} onClick={() => toggleRow(date)}>
                      {expandedRow === date ? 'ซ่อน' : 'แสดง'}
                    </button>
                  </td>
                </tr>
                {expandedRow === date && (
                  <tr>
                    <td colSpan={6}>
                      <div className={styles.expandedContent}>
                        {summaryData[date].map((transaction, index) => (
                          <div key={index} className={styles.expandedMarket}>
                            <h4>{transaction.market_name}</h4>
                            <div className={styles.marketInfo}>
                              <p>รายได้: ฿{transaction.transaction.income.toFixed(2)}</p>
                              <p>ค่าเช่าที่: ฿{transaction.transaction.rent_price.toFixed(2)}</p>
                              <p>รายจ่าย: ฿{transaction.transaction.Expense.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}</p>
                              <p>กำไรสุทธิ: ฿{(transaction.transaction.income - transaction.transaction.rent_price - transaction.transaction.Expense.reduce((sum, e) => sum + e.amount, 0)).toFixed(2)}</p>
                            </div>
                            <details>
                              <summary>รายละเอียดค่าใช้จ่าย</summary>
                              <ul>
                                {transaction.transaction.Expense.map((expense, i) => (
                                  <li key={i}>{expense.name}: ฿{expense.amount.toFixed(2)}</li>
                                ))}
                              </ul>
                            </details>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}