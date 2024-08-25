import { Cost } from '@/core/entities/Cost';
import { CostRepository } from '@/core/use-cases/costUseCases';
import { supabase } from '@/infrastructure/database/supabase';

export class SupabaseCostRepository implements CostRepository {
  async getAll(): Promise<Cost[]> {
    const { data, error } = await supabase.from('Cost').select('*');
    if (error) throw error;
    return data as Cost[];
  }

  async getById(id: number): Promise<Cost | null> {
    const { data, error } = await supabase.from('Cost').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Cost | null;
  }

  async create(cost: Omit<Cost, 'id'>): Promise<Cost> {
    const { data, error } = await supabase.from('Cost').insert(cost).single();
    if (error) throw error;
    return data as Cost;
  }

  async update(id: number, cost: Partial<Cost>): Promise<Cost> {
    const { data, error } = await supabase.from('Cost').update(cost).eq('id', id).single();
    if (error) throw error;
    return data as Cost;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from('Cost').delete().eq('id', id);
    if (error) throw error;
  }
}