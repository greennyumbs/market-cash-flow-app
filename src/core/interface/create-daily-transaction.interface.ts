import { Expense } from '../entities/Expense';

export interface CreateDailyTransaction {
  date: string;
  transactions: CreateDailyTransactionData[];
}
export interface CreateDailyTransactionData {
  marketId: number;
  income: number;
  rentPrice: number;
  expense: Expense[];
}

export interface TransactionExpenseMapping {
  transactionId: number;
  expenseName: string;
  amount: number;
}

export interface DailyTransactionMarket {
  transactionId: number;
  marketId: number;
  createdAt: string;
}