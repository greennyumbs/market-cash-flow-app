import { supabase } from "@/infrastructure/database/supabase";
import { SummaryTransactionRepository } from "@/core/use-cases/summaryTransactionUseCases";
import { RawSummaryTransaction } from "@/core/interface";
import { Expense } from "@/core/entities";

export class SupabaseSummaryTransactionRepository
  implements SummaryTransactionRepository
{
  async getSummaryTransaction(): Promise<any> {

    try {
      const { data, error } = await supabase.from("DailyTransactionMarket").select("created_at, Market(name), Transaction(income, rent_price, TransactionExpenseMapping(expense_name, amount))")
      if (error) throw error;
      return {
        data: data,
      }
    } catch (error) {
      console.log("error", error);
      throw new Error("Failed to get summary transaction.");
    }
  }
}
