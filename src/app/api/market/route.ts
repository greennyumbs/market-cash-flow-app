import { NextResponse } from 'next/server'
import { MarketUseCases } from '@/core/use-cases/marketUseCases'
import { SupabaseMarketRepository } from '@/data/repositories/MarketRepository'

const marketRepository = new SupabaseMarketRepository()
const marketUseCases = new MarketUseCases(marketRepository)

export async function GET() {
  const markets = await marketUseCases.getAllMarkets()
  return NextResponse.json(markets)
}