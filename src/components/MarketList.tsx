import { Market } from '@/core/entities/Market'
import styles from './MarketList.module.css'

interface MarketListProps {
  markets: Market[]
}

export default function MarketList({ markets }: MarketListProps) {
  return (
    <ul className={styles.list}>
      {markets.map(market => (
        <li key={market.id} className={styles.item}>
          {market.name}
        </li>
      ))}
    </ul>
  )
}