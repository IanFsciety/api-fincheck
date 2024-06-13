import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository, private readonly ValidateBankAccountOwnershipService: ValidateBankAccountOwnershipService) {}

  create(userId: string,  createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto

    return this.bankAccountsRepo.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type
      }
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        Transactions: {
          select: {
            type: true,
            value: true
          }
        },
      },
    });
    
    return bankAccounts.map(({ Transactions, ...bankAccount }) => {
 
      const totalTransactions = Transactions.reduce((acc, transaction) => 
        acc + (transaction.type === 'INCOME' ? transaction.value : -transaction.value), 0);

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
      }
    })
  }


  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {

    const { color, initialBalance, name, type } = updateBankAccountDto

    await this.ValidateBankAccountOwnershipService.validate(userId, bankAccountId);

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        color, initialBalance, name, type
      }
    })
  }

  async delete(userId: string, bankAccountId: string) {

    await this.ValidateBankAccountOwnershipService.validate(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId }
    });

    return null;
    
  }


}
