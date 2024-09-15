import { Transaction } from '@/core/entities/Transaction';
import { CreateDailyTransaction } from '@/core/interface/create-daily-transaction.interface';
import { TransactionRepository } from '@/core/use-cases/transactionUseCases';
import { supabase } from '@/infrastructure/database/supabase';

export class SupabaseTransactionRepository implements TransactionRepository {
  async getAll(): Promise<Transaction[]> {
    const { data, error } = await supabase.from('Transaction').select('*');
    if (error) throw error;
    return data as Transaction[];
  }

  async getById(id: number): Promise<Transaction | null> {
    const { data, error } = await supabase.from('Transaction').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Transaction | null;
  }

  async create(req: Transaction): Promise<any> {
    const { income, rentPrice } = req;
    const transaction = {
      income,
      rent_price: rentPrice
    };

    try {
      const { data, error } = await supabase.from('Transaction').upsert(transaction).select('id');
      if (error) throw error;
      return {
        status: 200,
        transactionData: data
      };
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to create transaction.');
    }
  }

  async update(id: number, transaction: Partial<Transaction>): Promise<Transaction> {
    const { data, error } = await supabase.from('Transaction').update(transaction).eq('id', id).single();
    if (error) throw error;
    return data as Transaction;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from('Transaction').delete().eq('id', id);
    if (error) throw error;
  }
}