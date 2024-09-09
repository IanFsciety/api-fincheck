import { TransactionType } from "../entities/Transaction";
export declare class CreateTransactionDto {
    bankAccountId: string;
    categoryId: string;
    name: string;
    value: number;
    date: string;
    type: TransactionType;
}
