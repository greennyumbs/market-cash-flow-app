import { NextResponse } from 'next/server'
import { DailyTransactionUseCases } from '@/core/use-cases/dailyTransactionUseCases'
import { SupabaseDailyTransactionRepository } from '@/data/repositories/DailyTransactionRepository'
import { SupabaseExpenseRepository } from '@/data/repositories/ExpenseRepository';
import { SupabaseTransactionRepository } from '@/data/repositories/TransactionRepository';

const dailyTransactionRepository = new SupabaseDailyTransactionRepository()
const expenseRepository = new SupabaseExpenseRepository()
const transactionRepository = new SupabaseTransactionRepository()
const dailyTransactionUseCases = new DailyTransactionUseCases(dailyTransactionRepository, expenseRepository, transactionRepository)

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const results = await dailyTransactionUseCases.createDailyTransaction(body)
    return NextResponse.json({
      status: 200,
      message: 'Daily transaction created successfully',
      data: results
    })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Failed to create daily transaction',
    })
  }
}