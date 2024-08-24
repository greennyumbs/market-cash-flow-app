import { Market } from '@/core/entities/Market';
import { MarketRepository } from '@/core/use-cases/marketUseCases';
import { supabase } from '@/infrastructure/database/supabase';

export class SupabaseMarketRepository implements MarketRepository {
  async getAll(): Promise<Market[]> {
    const { data, error } = await supabase.from('Market').select('*');
    if (error) throw error;
    return data as Market[];
  }

  async getById(id: number): Promise<Market | null> {
    const { data, error } = await supabase.from('Market').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Market | null;
  }

  async create(market: Omit<Market, 'id'>): Promise<Market> {
    const { data, error } = await supabase.from('Market').insert(market).single();
    if (error) throw error;
    return data as Market;
  }

  async update(id: number, market: Partial<Market>): Promise<Market> {
    const { data, error } = await supabase.from('Market').update(market).eq('id', id).single();
    if (error) throw error;
    return data as Market;
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from('Market').delete().eq('id', id);
    if (error) throw error;
  }
}