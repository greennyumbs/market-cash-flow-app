import { CreateDailyTransaction, TransactionExpenseMapping } from '../interface/create-daily-transaction.interface';
import { SupabaseExpenseRepository } from '../../data/repositories/ExpenseRepository';
import { SupabaseTransactionRepository } from '../../data/repositories/TransactionRepository';
import { DailyTransactionMarket, Expense } from '../entities';

export interface DailyTransactionRepository {
  create(transactionExpenseMapping: DailyTransactionMarket): Promise<any>;
}

export class DailyTransactionUseCases {
  constructor(
    private repository: DailyTransactionRepository,
    private expenseRepository: SupabaseExpenseRepository,
    private transactionRepository: SupabaseTransactionRepository
  ) {}

  public async createDailyTransaction(req: CreateDailyTransaction[]): Promise<any> {
    try {
      const results = await this.upsertTransaction(req);
      return results;
    } catch (error) {
      console.error('Failed to create daily transaction:', error);
      throw new Error('Failed to create daily transaction');
    }
  }

  private async upsertTransaction(req: CreateDailyTransaction[]): Promise<{ expenseAdded: any[]; transactionAdded: any[] }> {
    const results: { expenseAdded: any[]; transactionAdded: any[] } = {
      expenseAdded: [],
      transactionAdded: [],
    };

    try {
      for (const transactionRequest of req) {
        const { income, rentPrice, marketId, expense } = transactionRequest;

        // Create transaction
        const transaction = { income, rentPrice };
        const { transactionData } = await this.transactionRepository.create(transaction);
        const transactionId = Number(transactionData[0].id);

        // Map and insert expenses
        const transactionExpenseMapping = expense.map(({ name, amount }: Expense) => ({
          transactionId,
          expenseName: name,
          amount,
        }));

        await this.insertTransactionExpenseMapping(transactionExpenseMapping);

        // Create Daily Transaction Market
        const dailyTransactionMarket: DailyTransactionMarket = {
          transactionId,
          marketId,
          createdAt: this.getCurrentDateWithoutTime(),
        };
        
        const { dailyTransactionData } = await this.insertDailyTransactionMarket(dailyTransactionMarket);

        results.transactionAdded.push(dailyTransactionData);
        results.expenseAdded.push(transactionExpenseMapping);
      }

      return results;
    } catch (error) {
      console.error('Failed to upsert transactions:', error);
      throw new Error('Failed to upsert transactions');
    }
  }

  private async insertTransactionExpenseMapping(transactionExpenseMapping: TransactionExpenseMapping[]): Promise<any> {
    try {
      const { status, expenseData } = await this.expenseRepository.create(transactionExpenseMapping);
      return { status, expenseData };
    } catch (error) {
      console.error('Failed to insert transaction expense mapping:', error);
      throw new Error('Failed to insert transaction expense mapping');
    }
  }

  private async insertDailyTransactionMarket(dailyTransactionMarket: DailyTransactionMarket): Promise<any> {
    try {
      const { status, dailyTransactionData } = await this.repository.create(dailyTransactionMarket);
      return { status, dailyTransactionData };
    } catch (error) {
      console.error('Failed to insert daily transaction market:', error);
      throw new Error('Failed to insert daily transaction market');
    }
  }

  // Utility function to get date without time
  private getCurrentDateWithoutTime(): string {
    const offset = 7 * 60; // UTC+7 in minutes
    const now = new Date();
    
    // Get the current time in milliseconds and adjust for the offset
    const localDate = new Date(now.getTime() + offset * 60 * 1000);
    
    // Format the date to yyyy-mm-dd
    return localDate.toISOString().split('T')[0];
  }
}