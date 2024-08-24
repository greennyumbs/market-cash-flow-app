import TransactionList from '@/components/TransactionList'
import TransactionForm from '@/components/TransactionForm'

export default function Transactions() {
  return (
    <div>
      <h1>Transactions</h1>
      <TransactionForm />
      <TransactionList />
    </div>
  )
}