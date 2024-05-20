import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto/authenticate.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository, private readonly jwtService: JwtService) {}

  async signin(signinDto: SigninDto) {

    const user = await this.usersRepo.findUnique({
      where: { email: signinDto.email}
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials')
    }

    const isPasswordValid = await compare(signinDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials')
    }

    const acessToken = await this.generateAccesToken(user.id);

    return { acessToken };
  }

  async signup(signupDTO: SignupDto) {

    const emailTaken = await this.usersRepo.findUnique({
      where: {email: signupDTO.email},
      select: {id: true}
    });

    if(emailTaken) {
      throw new ConflictException('This email is already in use');
    }

    const hashedPassword = await hash(signupDTO.password, 10)

    const user = await this.usersRepo.create({
      data: {
        name: signupDTO.name,
        email: signupDTO.email,
        password: hashedPassword,
        Categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ]
          }
        }
      },
    });

    const acessToken = await this.generateAccesToken(user.id);

    return { acessToken };
  }

  private generateAccesToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
