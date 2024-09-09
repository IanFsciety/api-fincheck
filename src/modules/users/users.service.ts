
import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { UpdateUserDto } from './dto/update-plan.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserById(userId: string) {
    
    const user = await this.usersRepo.findUnique({
      where: {id: userId},
      select: {
        name: true,
        email: true,
        isPremium: true,
      }
    });

    return user;
  }

  async updateUserToPremium(userId: string, updateUserDto: UpdateUserDto) {
    const { isPremium } = updateUserDto

    const userUpdatePlan = await this.usersRepo.update({
      where: { id: userId },
      data: {
        isPremium
      }
    });

    return {
      userId: userUpdatePlan.id,
      name: userUpdatePlan.name,
      email: userUpdatePlan.email,
      isPremium: userUpdatePlan.isPremium
    };
  }
}
