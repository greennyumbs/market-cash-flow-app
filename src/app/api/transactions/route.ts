import { NextResponse } from 'next/server'
import { TransactionUseCases } from '@/core/use-cases/transactionUseCases'
import { SupabaseTransactionRepository } from '@/data/repositories/TransactionRepository'

const transactionRepository = new SupabaseTransactionRepository()
const transactionUseCases = new TransactionUseCases(transactionRepository)

export async function GET() {
  const transactions = await transactionUseCases.getAllTransactions()
  return NextResponse.json(transactions)
}

export async function POST(request: Request) {
  const body = await request.json()
  const transaction = await transactionUseCases.createTransaction(body)
  return NextResponse.json(transaction, { status: 201 })
}