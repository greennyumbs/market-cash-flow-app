import { Billing } from '@/core/entities/Billing';
import { BillingRepository } from '@/core/use-cases/billingUseCases';
import { supabase } from '@/infrastructure/database/supabase';

export class SupabaseBillingRepository implements BillingRepository {
  async getAll(): Promise<Billing[]> {
    const { data, error } = await supabase.from('Billing').select('*');
    if (error) throw error;
    return data as Billing[];
  }

  async getById(id: number): Promise<Billing | null> {
    const { data, error } = await supabase.from('Billing').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Billing | null;
  }

  async create(billing: Omit<Billing, 'id'>): Promise<Billing> {
    const { data, error } = await supabase.from('Billing').insert(billing).single();
    if (error) throw error;
    return data as Billing;
  }

  async update(id: number, billing: Partial<Billing>): Promise<Billing> {
    const { data, error } = await supabase.from('Billing').update(billing).eq('id', id).single();
    if (error) throw error;
    return data as Billing;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from('Billing').delete().eq('id', id);
    if (error) throw error;
  }
}