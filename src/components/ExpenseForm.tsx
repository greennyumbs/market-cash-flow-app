'use client'

import { useState } from 'react'
import styles from './ExpenseForm.module.css'

export default function ExpenseForm() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, amount: parseFloat(amount) }),
      })
      if (!response.ok) throw new Error('Failed to create expense')
      setName('')
      setAmount('')
      // Optionally, trigger a refresh of the expense list
    } catch (error) {
      console.error('Error creating expense:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Expense Name"
        required
        className={styles.input}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Add Expense</button>
    </form>
  )
}