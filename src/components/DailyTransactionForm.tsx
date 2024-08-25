'use client'

import { useState } from 'react'
import { Market } from '@/core/entities/Market'
import ConfirmationModal from './ConfirmationModal'
import styles from './DailyTransactionForm.module.css'

interface DailyTransactionFormProps {
  markets: Market[]
}

interface MarketTransaction {
  marketId: number
  rentPrice: string
  expenses: { name: string; amount: string }[]
}

export default function DailyTransactionForm({ markets }: DailyTransactionFormProps) {
  const [transactions, setTransactions] = useState<MarketTransaction[]>(
    markets.map(market => ({
      marketId: market.id,
      rentPrice: '',
      expenses: [{ name: '', amount: '' }]
    }))
  )
  const [showModal, setShowModal] = useState(false)

  const handleRentPriceChange = (index: number, value: string) => {
    const newTransactions = [...transactions]
    newTransactions[index].rentPrice = value
    setTransactions(newTransactions)
  }

  const handleExpenseChange = (transactionIndex: number, expenseIndex: number, field: 'name' | 'amount', value: string) => {
    const newTransactions = [...transactions]
    newTransactions[transactionIndex].expenses[expenseIndex][field] = value
    setTransactions(newTransactions)
  }

  const addExpense = (index: number) => {
    const newTransactions = [...transactions]
    newTransactions[index].expenses.push({ name: '', amount: '' })
    setTransactions(newTransactions)
  }

  const removeExpense = (transactionIndex: number, expenseIndex: number) => {
    const newTransactions = [...transactions]
    newTransactions[transactionIndex].expenses.splice(expenseIndex, 1)
    setTransactions(newTransactions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  const confirmSubmit = async () => {
    try {
      const response = await fetch('/api/daily-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactions),
      })
      if (!response.ok) throw new Error('Failed to submit daily transaction')
      // Reset form or show success message
      setShowModal(false)
    } catch (error) {
      console.error('Error submitting daily transaction:', error)
      setShowModal(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {transactions.map((transaction, index) => (
        <div key={transaction.marketId} className={styles.marketForm}>
          <h3>{markets.find(m => m.id === transaction.marketId)?.name}</h3>
          <input
            type="number"
            value={transaction.rentPrice}
            onChange={(e) => handleRentPriceChange(index, e.target.value)}
            placeholder="ค่าเช่า (บาท)"
            required
            className={styles.input}
          />
          {transaction.expenses.map((expense, expenseIndex) => (
            <div key={expenseIndex} className={styles.expenseForm}>
              <input
                type="text"
                value={expense.name}
                onChange={(e) => handleExpenseChange(index, expenseIndex, 'name', e.target.value)}
                placeholder="รายจ่าย เช่น ค่าน้ำแข็ง"
                className={styles.input}
              />
              <input
                type="number"
                value={expense.amount}
                onChange={(e) => handleExpenseChange(index, expenseIndex, 'amount', e.target.value)}
                placeholder="จำนวนเงิน (บาท)"
                className={styles.input}
              />
              <button type="button" onClick={() => removeExpense(index, expenseIndex)} className={styles.removeButton}>
                ลบรายจ่าย
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addExpense(index)} className={styles.addButton}>
            เพิ่มรายจ่าย
          </button>
        </div>
      ))}
      <button type="submit" className={styles.submitButton}>ยืนยันรายจ่ายประจำวัน</button>
      {showModal && (
        <ConfirmationModal
          onConfirm={confirmSubmit}
          onCancel={() => setShowModal(false)}
        />
      )}
    </form>
  )
}