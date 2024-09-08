import { Body, Controller, Get, Put } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UpdateUserDto } from './dto/update-plan.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Put('/me')
  async updateUserToPremium(
    @ActiveUserId() userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateUserToPremium(userId, updateUserDto);
  }
    
  
}
