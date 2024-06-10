import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories.ts';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionsRepo: TransactionsRepository) {}

  async validate( userId: string, transactionId: string ) {
    const isOwner = await this.transactionsRepo.findFirst({
      where: { id: transactionId, userId }
    });

    if (!isOwner) {
      throw new NotFoundException('Transaction Not Found')
    }
  }

}
