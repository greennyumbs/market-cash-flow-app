import { supabase } from '@/infrastructure/database/supabase';
import { DailyTransactionRepository } from '@/core/use-cases/dailyTransactionUseCases';
import { TransactionExpenseMapping } from '@/core/interface/create-daily-transaction.interface';

export class SupabaseDailyTransactionRepository implements DailyTransactionRepository {
  async create(transactionExpenseMapping: TransactionExpenseMapping[]): Promise<any> {
    const mappedTransaction = transactionExpenseMapping.map((mapping) => {
      return {
        transaction_id: mapping.transactionId,
        expense_id: mapping.expenseId
      }
    });

    try {
      const { data, error } = await supabase.from('TransactionExpenseMapping').upsert(mappedTransaction).select();
      if (error) throw error;
      return data;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to create mapped transaction.');
    }
  }
}