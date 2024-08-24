import { Expense } from '../entities/Expense';

export interface ExpenseRepository {
  getAll(): Promise<Expense[]>;
  getById(id: number): Promise<Expense | null>;
  create(expense: Omit<Expense, 'id'>): Promise<Expense>;
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

  async createExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
    return this.repository.create(expense);
  }

  async updateExpense(id: number, expense: Partial<Expense>): Promise<Expense> {
    return this.repository.update(id, expense);
  }

  async deleteExpense(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}