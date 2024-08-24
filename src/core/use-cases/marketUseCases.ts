import { Market } from '../entities/Market';

export interface MarketRepository {
  getAll(): Promise<Market[]>;
  getById(id: number): Promise<Market | null>;
  create(market: Omit<Market, 'id'>): Promise<Market>;
  update(id: number, market: Partial<Market>): Promise<Market>;
  delete(id: number): Promise<void>;
}

export class MarketUseCases {
  constructor(private repository: MarketRepository) {}

  async getAllMarkets(): Promise<Market[]> {
    return this.repository.getAll();
  }

  async getMarketById(id: number): Promise<Market | null> {
    return this.repository.getById(id);
  }

  async createMarket(market: Omit<Market, 'id'>): Promise<Market> {
    return this.repository.create(market);
  }

  async updateMarket(id: number, market: Partial<Market>): Promise<Market> {
    return this.repository.update(id, market);
  }

  async deleteMarket(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}