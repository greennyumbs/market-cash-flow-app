'use client'

import { useState } from 'react'
import styles from './MarketForm.module.css'

export default function MarketForm() {
  const [name, setName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/markets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      if (!response.ok) throw new Error('Failed to create market')
      setName('')
      // Optionally, trigger a refresh of the market list
    } catch (error) {
      console.error('Error creating market:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Market Name"
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Add Market</button>
    </form>
  )
}