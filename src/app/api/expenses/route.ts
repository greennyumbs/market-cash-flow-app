import { NextResponse } from 'next/server'
import { ExpenseUseCases } from '@/core/use-cases/expenseUseCases'
import { SupabaseExpenseRepository } from '@/data/repositories/ExpenseRepository'

const expenseRepository = new SupabaseExpenseRepository()
const expenseUseCases = new ExpenseUseCases(expenseRepository)

export async function GET() {
  const expenses = await expenseUseCases.getAllExpenses()
  return NextResponse.json(expenses)
}

export async function POST(request: Request) {
  const body = await request.json()
  const expense = await expenseUseCases.createExpense(body)
  return NextResponse.json(expense, { status: 201 })
}