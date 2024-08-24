import { Billing } from '../entities/Billing';

export interface BillingRepository {
  getAll(): Promise<Billing[]>;
  getById(id: number): Promise<Billing | null>;
  create(billing: Omit<Billing, 'id'>): Promise<Billing>;
  update(id: number, billing: Partial<Billing>): Promise<Billing>;
  delete(id: number): Promise<void>;
}

export class BillingUseCases {
  constructor(private repository: BillingRepository) {}

  async getAllBillings(): Promise<Billing[]> {
    return this.repository.getAll();
  }

  async getBillingById(id: number): Promise<Billing | null> {
    return this.repository.getById(id);
  }

  async createBilling(billing: Omit<Billing, 'id'>): Promise<Billing> {
    return this.repository.create(billing);
  }

  async updateBilling(id: number, billing: Partial<Billing>): Promise<Billing> {
    return this.repository.update(id, billing);
  }

  async deleteBilling(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}