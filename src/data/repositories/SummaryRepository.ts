import { supabase } from '@/infrastructure/database/supabase';
import { SummaryTransactionRepository } from '@/core/use-cases/summaryTransactionUseCases';
import { RawSummaryTransaction } from '@/core/interface';
import { Expense } from '@/core/entities';

export class SupabaseSummaryTransactionRepository implements SummaryTransactionRepository {
  async getSummaryTransaction(): Promise<RawSummaryTransaction[]> {
    try {
      const { data, error } = await supabase
                                    .from('Transaction')
                                    .select('*, TransactionExpenseMapping(Expense(*)), Market(name)');
      if (error) throw error;

      // Map the data to fit the RawSummaryTransaction interface
      const formattedData = data.map((transaction: any) => {
        const expenses: Expense[] = transaction.TransactionExpenseMapping.map((mapping: { Expense: any; }) => ({
          id: mapping.Expense.id,
          name: mapping.Expense.name,
          amount: mapping.Expense.amount,
        }));

        return {
          transactionId: transaction.id,
          marketId: transaction.market_id,
          rentPrice: transaction.rent_price,
          createdAt: new Date(transaction.created_at),
          income: transaction.income,
          transactionExpenseMapping: expenses,
          marketName: transaction.Market.name,
        } as RawSummaryTransaction;
      });
      return formattedData;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to get summary transaction.');
    }
  }
}