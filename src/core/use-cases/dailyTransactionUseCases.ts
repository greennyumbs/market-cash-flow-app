import { CreateDailyTransaction, TransactionExpenseMapping } from '../interface/create-daily-transaction.interface';
import { SupabaseExpenseRepository } from '../../data/repositories/ExpenseRepository';
import { SupabaseTransactionRepository } from '../../data/repositories/TransactionRepository';
import { Expense, Transaction } from '../entities';
import { TransactionRepository } from './transactionUseCases';

export interface DailyTransactionRepository {
  create(transactionExpenseMapping: TransactionExpenseMapping[]): Promise<null>;
}

export class DailyTransactionUseCases {
  constructor(
    private repository: DailyTransactionRepository,
    private expenseRepository: SupabaseExpenseRepository,
    private transactionRepository: SupabaseTransactionRepository
  ) {}

  public async createDailyTransaction(req: CreateDailyTransaction[]): Promise<any> {
    try {
      const results = [];

      for (let i = 0; i < req.length; i++) {
        console.log(req[i]);

        const { expenseData } = await this.expenseRepository.create(req[i]);
        const { transactionData } = await this.transactionRepository.create(req[i]);
    
        const transactionExpenseMapping = await this.mapTransactionExpense(transactionData, expenseData);
        
        const data = await this.repository.create(transactionExpenseMapping);
        results.push(data);
      }

      return results;
      
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to create daily transaction');
    }
  }

  private async mapTransactionExpense(transactionData: Transaction[], expenseData: Expense[]): Promise<any> {
    const transactionExpenseMapping = expenseData.map((expense: Expense) => {
      return {
        transactionId: transactionData[0].id,
        expenseId: expense.id
      }
    })
    return transactionExpenseMapping;
  }
}