import { SigninDto, SignupDto } from './dto/authenticate.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersRepo;
    private readonly jwtService;
    constructor(usersRepo: UsersRepository, jwtService: JwtService);
    signin(signinDto: SigninDto): Promise<{
        accessToken: string;
    }>;
    signup(signupDTO: SignupDto): Promise<{
        accessToken: string;
    }>;
    private generateAccesToken;
}
