import { MarketUseCases } from '@/core/use-cases/marketUseCases'
import { SupabaseMarketRepository } from '@/data/repositories/MarketRepository'
import MarketList from '@/components/MarketList'
import MarketForm from '@/components/MarketForm'
import styles from './Markets.module.css'

const marketRepository = new SupabaseMarketRepository()
const marketUseCases = new MarketUseCases(marketRepository)

export default async function Markets() {
  const markets = await marketUseCases.getAllMarkets()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Markets</h1>
      <MarketForm />
      <MarketList markets={markets} />
    </div>
  )
}