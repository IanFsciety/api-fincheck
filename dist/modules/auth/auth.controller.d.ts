import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto/authenticate.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(signinDto: SigninDto): Promise<{
        accessToken: string;
    }>;
    create(signupDto: SignupDto): Promise<{
        accessToken: string;
    }>;
}
