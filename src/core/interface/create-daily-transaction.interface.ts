import { Expense } from '../entities/Expense';

export interface CreateDailyTransaction {
  transactionId: Number;                    // Spare part
  marketId: Number;
  rentPrice: Number;
  transactionExpenseMappingId: Number;      // Spare part
  expense: Expense[];
}

export interface TransactionExpenseMapping {
  transactionId: Number;
  expenseId: Number;
}