import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { UpdateUserDto } from './dto/update-plan.dto';
export declare class UsersService {
    private readonly usersRepo;
    constructor(usersRepo: UsersRepository);
    getUserById(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        isPremium: boolean;
    }>;
    updateUserToPremium(userId: string, updateUserDto: UpdateUserDto): Promise<{
        userId: string;
        name: string;
        email: string;
        isPremium: boolean;
    }>;
}
