import { ExpenseUseCases } from '@/core/use-cases/expenseUseCases'
import { SupabaseExpenseRepository } from '@/data/repositories/ExpenseRepository'
import ExpenseList from '@/components/ExpenseList'
import ExpenseForm from '@/components/ExpenseForm'
import styles from './Expenses.module.css'

const expenseRepository = new SupabaseExpenseRepository()
const expenseUseCases = new ExpenseUseCases(expenseRepository)

export default async function Expenses() {
  const expenses = await expenseUseCases.getAllExpenses()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Expenses</h1>
      <ExpenseForm />
      <ExpenseList expenses={expenses} />
    </div>
  )
}