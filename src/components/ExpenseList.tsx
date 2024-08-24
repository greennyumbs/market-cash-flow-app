import { Expense } from '@/core/entities/Expense'
import styles from './ExpenseList.module.css'

interface ExpenseListProps {
  expenses: Expense[]
}

export default function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <ul className={styles.list}>
      {expenses.map(expense => (
        <li key={expense.id} className={styles.item}>
          {expense.name}: ${expense.amount.toFixed(2)}
        </li>
      ))}
    </ul>
  )
}