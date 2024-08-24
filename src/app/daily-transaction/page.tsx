// src/app/daily-transaction/page.tsx
import { MarketUseCases } from '@/core/use-cases/marketUseCases'
import { SupabaseMarketRepository } from '@/data/repositories/MarketRepository'
import DailyTransactionForm from '@/components/DailyTransactionForm'

const marketRepository = new SupabaseMarketRepository()
const marketUseCases = new MarketUseCases(marketRepository)

export default async function DailyTransaction() {
  const markets = await marketUseCases.getAllMarkets()

  return (
    <div>
      <h1>Daily Transaction</h1>
      <DailyTransactionForm markets={markets} />
    </div>
  )
}