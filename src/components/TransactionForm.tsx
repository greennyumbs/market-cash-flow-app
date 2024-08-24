// src/components/TransactionForm.tsx
'use client'

import { useState } from 'react'
import { Transaction } from '@/core/entities/Transaction'
import styles from './TransactionForm.module.css'

export default function TransactionForm() {
  const [market_id, setMarketId] = useState('')
  const [rent_price, setRentPrice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const transaction: Omit<Transaction, 'id'> = {
      market_id: parseInt(market_id),
      rent_price: parseFloat(rent_price),
      timestamp: new Date(),
    }

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      })

      if (!response.ok) {
        throw new Error('Failed to create transaction')
      }

      setMarketId('')
      setRentPrice('')
      // You might want to trigger a refetch of the transaction list here
    } catch (err) {
      setError('An error occurred while submitting the transaction.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Transaction</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="market_id" className={styles.label}>Market ID:</label>
          <input
            id="market_id"
            type="number"
            value={market_id}
            onChange={(e) => setMarketId(e.target.value)}
            placeholder="Enter Market ID"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="rent_price" className={styles.label}>Rent Price:</label>
          <input
            id="rent_price"
            type="number"
            step="0.01"
            value={rent_price}
            onChange={(e) => setRentPrice(e.target.value)}
            placeholder="Enter Rent Price"
            required
            className={styles.input}
          />
        </div>
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? 'Submitting...' : 'Add Transaction'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}