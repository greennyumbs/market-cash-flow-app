import { Transaction } from '../entities/Transaction';

export interface TransactionRepository {
  getAll(): Promise<Transaction[]>;
  getById(id: number): Promise<Transaction | null>;
  create(transaction: Omit<Transaction, 'id'>): Promise<Transaction>;
  update(id: number, transaction: Partial<Transaction>): Promise<Transaction>;
  delete(id: number): Promise<void>;
}

export class TransactionUseCases {
  constructor(private repository: TransactionRepository) {}

  async getAllTransactions(): Promise<Transaction[]> {
    return this.repository.getAll();
  }

  async getTransactionById(id: number): Promise<Transaction | null> {
    return this.repository.getById(id);
  }

  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    return this.repository.create(transaction);
  }

  async updateTransaction(id: number, transaction: Partial<Transaction>): Promise<Transaction> {
    return this.repository.update(id, transaction);
  }

  async deleteTransaction(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}