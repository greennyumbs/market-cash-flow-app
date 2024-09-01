import { Expense } from '../entities';

export interface SummaryTransaction {
    transactionId: number;
    marketId: number;
    marketName: string;
    income: number;
    rentPrice: number;
    expense: Expense[];
    totalExpense: number;
    createdAt: Date;
  }

export interface RawSummaryTransaction {
    transactionId: number;
    marketId: number;
    rentPrice: number;
    createdAt: Date;
    income: number;
    transactionExpenseMapping: Expense[];
    marketName: String;
}