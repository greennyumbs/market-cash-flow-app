import { Expense } from '@/core/entities/Expense';
import { CreateDailyTransaction } from '@/core/interface/create-daily-transaction.interface';
import { ExpenseRepository } from '@/core/use-cases/expenseUseCases';
import { supabase } from '@/infrastructure/database/supabase';

export class SupabaseExpenseRepository implements ExpenseRepository {
  async getAll(): Promise<Expense[]> {
    const { data, error } = await supabase.from('Expense').select('*');
    if (error) throw error;
    return data as Expense[];
  }

  async getById(id: number): Promise<Expense | null> {
    const { data, error } = await supabase.from('Expense').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Expense | null;
  }

  async create(req: CreateDailyTransaction): Promise<any> {
    const { expense } = req;
    try {
      const { data, error } = await supabase.from('Expense').upsert(expense).select();
      if (error) throw error;
      return {
        status: 200,
        expenseData: data
      };
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to create expense(s).');
    }
  }

  async update(id: number, expense: Partial<Expense>): Promise<Expense> {
    const { data, error } = await supabase.from('Expense').update(expense).eq('id', id).single();
    if (error) throw error;
    return data as Expense;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from('Expense').delete().eq('id', id);
    if (error) throw error;
  }
}