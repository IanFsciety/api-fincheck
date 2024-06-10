import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories.ts';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { TransactionType } from '../entities/Transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly TransactionsRepo: TransactionsRepository, 
    private readonly ValidateBankAccountOwnershipService: ValidateBankAccountOwnershipService, 
    private readonly ValidateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly ValidateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } = createTransactionDto
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId
    })


    return this.TransactionsRepo.create({
      data: {
        userId,
        bankAccountId, 
        categoryId,
        date, 
        name, 
        type, 
        value
      }
    })
  }

  findAllByUserId(userId: string, filters: { month: number; year: number; bankAccountId?: string; type?: TransactionType}) {
    return this.TransactionsRepo.findMany({
      where: { 
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
       }
    });
  }

  async update(userId: string, transactionId: string,  updateTransactionDto: UpdateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } = updateTransactionDto

    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId
    })
    return this.TransactionsRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId, 
        categoryId, 
        date, 
        name, 
        type, 
        value
      }
    })
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({
      userId,
      transactionId,
    })

    await this.TransactionsRepo.delete({
      where: { id: transactionId}
    });

    return null
  }

  private async validateEntitiesOwnership({
    userId, bankAccountId, categoryId, transactionId
  }: { 
    userId: string; bankAccountId?: string; categoryId?: string, transactionId?: string;
  }
) {
    await Promise.all([
      transactionId && this.ValidateTransactionOwnershipService.validate(userId, transactionId),
      bankAccountId && this.ValidateBankAccountOwnershipService.validate(userId, bankAccountId),
      categoryId && this.ValidateCategoryOwnershipService.validate(userId, categoryId)
    ])
  }
}
