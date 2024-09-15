import { Expense } from '../entities/Expense';
import { CreateDailyTransaction, TransactionExpenseMapping } from '../interface/create-daily-transaction.interface';

export interface ExpenseRepository {
  getAll(): Promise<Expense[]>;
  getById(id: number): Promise<Expense | null>;
  create(req: TransactionExpenseMapping[]): Promise<any>;
  update(id: number, expense: Partial<Expense>): Promise<Expense>;
  delete(id: number): Promise<void>;
}

export class ExpenseUseCases {
  constructor(private repository: ExpenseRepository) {}

  async getAllExpenses(): Promise<Expense[]> {
    return this.repository.getAll();
  }

  async getExpenseById(id: number): Promise<Expense | null> {
    return this.repository.getById(id);
  }

  // async createExpense(req: CreateDailyTransaction): Promise<any> {
  //   return this.repository.create(req);
  // }

  async updateExpense(id: number, expense: Partial<Expense>): Promise<Expense> {
    return this.repository.update(id, expense);
  }

  async deleteExpense(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}