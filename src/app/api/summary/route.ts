import { NextResponse } from 'next/server'
import { SummaryTransactionUseCases } from '@/core/use-cases/summaryTransactionUseCases'
import { SupabaseSummaryTransactionRepository } from '@/data/repositories/SummaryRepository'

const summaryTransactionRepository = new SupabaseSummaryTransactionRepository()
const summaryTransactionUseCases = new SummaryTransactionUseCases(summaryTransactionRepository)

export const dynamic = 'force-dynamic'

export async function GET() {
    const summaryTransactions = await summaryTransactionUseCases.getSummaryTransaction()
    return NextResponse.json(summaryTransactions)
}