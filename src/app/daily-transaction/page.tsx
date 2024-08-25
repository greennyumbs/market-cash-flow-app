// src/app/daily-transaction/page.tsx
import { Market } from '@/core/entities/Market'
import DailyTransactionForm from '@/components/DailyTransactionForm'

async function getMarkets(): Promise<Market[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/market`, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error('Failed to fetch markets')
  }
  return response.json()
}

export default async function DailyTransaction() {
  const markets = await getMarkets()

  return (
    <div>
      <h1>รายจ่ายวันนี้</h1>
      <DailyTransactionForm markets={markets} />
    </div>
  )
}