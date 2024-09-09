import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories.ts';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { TransactionType } from '../entities/Transaction';
export declare class TransactionsService {
    private readonly TransactionsRepo;
    private readonly ValidateBankAccountOwnershipService;
    private readonly ValidateCategoryOwnershipService;
    private readonly ValidateTransactionOwnershipService;
    constructor(TransactionsRepo: TransactionsRepository, ValidateBankAccountOwnershipService: ValidateBankAccountOwnershipService, ValidateCategoryOwnershipService: ValidateCategoryOwnershipService, ValidateTransactionOwnershipService: ValidateTransactionOwnershipService);
    create(userId: string, createTransactionDto: CreateTransactionDto): Promise<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }>;
    findAllByUserId(userId: string, filters: {
        month: number;
        year: number;
        bankAccountId?: string;
        type?: TransactionType;
    }): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }[]>;
    update(userId: string, transactionId: string, updateTransactionDto: UpdateTransactionDto): Promise<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }>;
    remove(userId: string, transactionId: string): Promise<any>;
    private validateEntitiesOwnership;
}
