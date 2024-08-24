import { Cost } from '../entities/Cost';

export interface CostRepository {
  getAll(): Promise<Cost[]>;
  getById(id: number): Promise<Cost | null>;
  create(cost: Omit<Cost, 'id'>): Promise<Cost>;
  update(id: number, cost: Partial<Cost>): Promise<Cost>;
  delete(id: number): Promise<void>;
}

export class CostUseCases {
  constructor(private repository: CostRepository) {}

  async getAllCosts(): Promise<Cost[]> {
    return this.repository.getAll();
  }

  async getCostById(id: number): Promise<Cost | null> {
    return this.repository.getById(id);
  }

  async createCost(cost: Omit<Cost, 'id'>): Promise<Cost> {
    return this.repository.create(cost);
  }

  async updateCost(id: number, cost: Partial<Cost>): Promise<Cost> {
    return this.repository.update(id, cost);
  }

  async deleteCost(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}