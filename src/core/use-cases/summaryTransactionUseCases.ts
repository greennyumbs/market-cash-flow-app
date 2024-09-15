import {
  RawSummaryTransaction,
  SummaryTransaction,
  Summary,
} from "../interface";

export interface SummaryTransactionRepository {
  getSummaryTransaction(): Promise<any>;
}

export class SummaryTransactionUseCases {
  constructor(private repository: SummaryTransactionRepository) {}

  async getSummaryTransaction(): Promise<any> {
    const { data } = await this.repository.getSummaryTransaction();

    const groupbyDate = data.reduce((acc: any, curr: any) => {
      const date = new Date(curr.created_at).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }

      const { Market: market, Transaction: transaction } = curr;

      // Mapping expenses to desired structure
      const formattedExpenses = transaction.TransactionExpenseMapping.map(
        (expense: any) => ({
          amount: expense.amount,
          name: expense.expense_name,
        })
      );

      // Adding formatted market and transaction details
      acc[date].push({
        market_name: market.name,
        transaction: {
          income: transaction.income,
          rent_price: transaction.rent_price,
          Expense: formattedExpenses,
        },
      });

      return acc;
    }, {});
    return groupbyDate;
  }
}
