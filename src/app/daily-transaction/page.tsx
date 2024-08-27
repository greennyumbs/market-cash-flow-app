"use client"

import { useState, useEffect } from 'react';
import { Market } from '@/core/entities/Market';
import DailyTransactionForm from '@/components/DailyTransactionForm';
import styles from './DailyTransaction.module.css';

async function fetchMarkets(): Promise<Market[]> {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/market`, { cache: 'no-store' });
  const response = await fetch(`/api/market`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch markets');
  }
  return response.json();
}

export default function DailyTransaction() {
  const [markets, setMarkets] = useState<Market[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    async function loadMarkets() {
      try {
        const data = await fetchMarkets();
        setMarkets(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load markets');
        setLoading(false);
      }
    }
    
    loadMarkets();

    // Get the current date and convert to B.E.
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getFullYear() + 543); // Convert to B.E. by adding 543

    setCurrentDate(`${day}/${month}/${year}`);
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>บันทึกรายจ่ายวันนี้ ({currentDate})</h1>
      {markets && <DailyTransactionForm markets={markets} />}
    </div>
  );
}