import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
export declare class ValidateBankAccountOwnershipService {
    private readonly bankAccountsRepo;
    constructor(bankAccountsRepo: BankAccountsRepository);
    validate(userId: string, bankAccountId: string): Promise<void>;
}
