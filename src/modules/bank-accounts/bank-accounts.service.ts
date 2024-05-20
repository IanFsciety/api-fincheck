import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountsRepo: BankAccountsRepository) {}

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

  findAllByUserId(userId: string) {
    return this.bankAccountsRepo.findMany({
      where: { userId }
    })
  }


  async update(userId: string, bankAccountId: string, updateBankAccountDto: UpdateBankAccountDto) {

    const { color, initialBalance, name, type } = updateBankAccountDto
    
    await this.validateBankAccountOwnership(userId, bankAccountId);

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        color, initialBalance, name, type
      }
    })
  }

  async delete(userId: string, bankAccountId: string) {

    await this.validateBankAccountOwnership(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId }
    });

    return null;
    
  }

  private async validateBankAccountOwnership( userId: string, bankAccountId: string ) {
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: { id: bankAccountId, userId }
    });

    if (!isOwner) {
      throw new NotFoundException('Bank Account Not Found')
    }
  }
}
