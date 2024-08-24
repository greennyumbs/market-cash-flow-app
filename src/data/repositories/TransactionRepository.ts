import { Transaction } from '@/core/entities/Transaction';
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

  async create(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const { data, error } = await supabase.from('Transaction').insert(transaction).single();
    if (error) throw error;
    return data as Transaction;
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