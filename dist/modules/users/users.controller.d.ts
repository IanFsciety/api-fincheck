import { UpdateUserDto } from './dto/update-plan.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(userId: string): Promise<{
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
