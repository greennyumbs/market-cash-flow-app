// src/app/dashboard/page.tsx
import { TransactionUseCases } from '@/core/use-cases/transactionUseCases'
import { SupabaseTransactionRepository } from '@/data/repositories/TransactionRepository'
import { ExpenseUseCases } from '@/core/use-cases/expenseUseCases'
import { SupabaseExpenseRepository } from '@/data/repositories/ExpenseRepository'
import styles from './Dashboard.module.css'

const transactionRepository = new SupabaseTransactionRepository()
const transactionUseCases = new TransactionUseCases(transactionRepository)
const expenseRepository = new SupabaseExpenseRepository()
const expenseUseCases = new ExpenseUseCases(expenseRepository)

export default async function Dashboard() {
  const transactions = await transactionUseCases.getAllTransactions()
  const expenses = await expenseUseCases.getAllExpenses()

  const today = new Date()
  const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)

  const recentTransactions = transactions.filter(t => new Date(t.timestamp) >= threeDaysAgo)
  const olderTransactions = transactions.filter(t => new Date(t.timestamp) < threeDaysAgo)

  const dailySummary = recentTransactions.reduce((acc, t) => {
    const date = new Date(t.timestamp).toDateString()
    if (!acc[date]) acc[date] = { income: 0, expenses: 0 }
    acc[date].income += t.rent_price
    return acc
  }, {} as Record<string, { income: number, expenses: number }>)

  expenses.forEach(e => {
    const date = new Date(e.timestamp).toDateString()
    if (dailySummary[date]) dailySummary[date].expenses += e.amount
  })

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.cards}>
        {Object.entries(dailySummary).map(([date, summary]) => (
          <div key={date} className={styles.card}>
            <h2>{date}</h2>
            <p>Income: ${summary.income.toFixed(2)}</p>
            <p>Expenses: ${summary.expenses.toFixed(2)}</p>
            <p>Net: ${(summary.income - summary.expenses).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <h2>Older Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Market</th>
            <th>Income</th>
          </tr>
        </thead>
        <tbody>
          {olderTransactions.map(t => (
            <tr key={t.id}>
              <td>{new Date(t.timestamp).toLocaleDateString()}</td>
              <td>{t.market_id}</td>
              <td>${t.rent_price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}