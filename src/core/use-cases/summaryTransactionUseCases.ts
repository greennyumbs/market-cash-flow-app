import { RawSummaryTransaction, SummaryTransaction } from "../interface";

export interface SummaryTransactionRepository {
    getSummaryTransaction(): Promise<RawSummaryTransaction[]>;
}

export class SummaryTransactionUseCases {
    constructor(private repository: SummaryTransactionRepository) {}

    async getSummaryTransaction(): Promise<SummaryTransaction[]> {
        const rawData = await this.repository.getSummaryTransaction();

        const formattedData = rawData.map((transaction: RawSummaryTransaction) => {
            let totalExpense = transaction.rentPrice as number;
            for (const expense of transaction.transactionExpenseMapping) {
                totalExpense += expense.amount as number;
            }

            return {
                transactionId: transaction.transactionId as number,
                marketId: transaction.marketId as number,
                marketName: transaction.marketName as string,
                income: transaction.income as number,
                rentPrice: transaction.rentPrice as number,
                expense: transaction.transactionExpenseMapping,
                totalExpense: totalExpense,
                createdAt: transaction.createdAt,
            } as SummaryTransaction;
        });

        console.log('comeback to usecase');
        console.log(formattedData);

        return formattedData;
    }
}