import { supabase } from "@/infrastructure/database/supabase";
import { DailyTransactionRepository } from "@/core/use-cases/dailyTransactionUseCases";
import { DailyTransactionMarket } from "@/core/interface/create-daily-transaction.interface";

export class SupabaseDailyTransactionRepository
  implements DailyTransactionRepository
{
  async create(dailyTransactionMarket: DailyTransactionMarket): Promise<any> {
    const { transactionId, marketId, createdAt } = dailyTransactionMarket;
    try {
      const { data, error } = await supabase
        .from("DailyTransactionMarket")
        .upsert([
          {
            transaction_id: transactionId,
            market_id: marketId,
            created_at: createdAt,
          },
        ])
        .select("*");
      if (error) throw error;
      return {
        dailyTransactionData: data,
      };
    } catch (error) {
      console.log("error", error);
      throw new Error("Failed to create daily transaction.");
    }
  }
}
