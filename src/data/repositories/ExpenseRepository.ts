import { Expense } from '../../core/entities';
import { CreateDailyTransaction, TransactionExpenseMapping } from '@/core/interface';
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

  async create(req: TransactionExpenseMapping[]): Promise<any> {
    const formattedExpense = req.map((expense: TransactionExpenseMapping) => {
      return {
        transaction_id: expense.transactionId,
        expense_name: expense.expenseName,
        amount: expense.amount
      }
    })
    try {
      const { data, error } = await supabase.from('TransactionExpenseMapping').upsert(formattedExpense).select('*');
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