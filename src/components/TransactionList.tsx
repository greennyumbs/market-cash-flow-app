// src/components/TransactionList.tsx
import { Transaction } from '@/core/entities/Transaction'
import { TransactionUseCases } from '@/core/use-cases/transactionUseCases'
import { SupabaseTransactionRepository } from '@/data/repositories/TransactionRepository'
import styles from './TransactionList.module.css'

async function getTransactions(): Promise<Transaction[]> {
  const repository = new SupabaseTransactionRepository()
  const useCases = new TransactionUseCases(repository)
  return useCases.getAllTransactions()
}

export default async function TransactionList() {
  const transactions = await getTransactions()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className={styles.emptyState}>No transactions recorded yet.</p>
      ) : (
        <ul className={styles.list}>
          {transactions.map((transaction) => (
            <li key={transaction.id} className={styles.item}>
              <span className={styles.marketId}>Market ID: {transaction.market_id}</span>
              <span className={styles.rentPrice}>Rent: ${transaction.rent_price.toFixed(2)}</span>
              <span className={styles.date}>
                {new Date(transaction.timestamp).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}