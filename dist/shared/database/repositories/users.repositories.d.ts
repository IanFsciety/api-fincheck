import { type Prisma } from '@prisma/client';
import { PrismaService } from "../prisma.service";
export declare class UsersRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createDto: Prisma.UserCreateArgs): Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        isPremium: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findUnique(findUnique: Prisma.UserFindUniqueArgs): Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        isPremium: boolean;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(updateDto: Prisma.UserUpdateArgs): Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        password: string;
        isPremium: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
