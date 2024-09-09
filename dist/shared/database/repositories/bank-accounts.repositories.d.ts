import { type Prisma } from '@prisma/client';
import { PrismaService } from "../prisma.service";
export declare class BankAccountsRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findMany<T extends Prisma.BankAccountFindManyArgs>(findManyDto: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>): Prisma.PrismaPromise<import("@prisma/client/runtime/library").GetFindResult<Prisma.$BankAccountPayload<import("@prisma/client/runtime/library").DefaultArgs>, T>[]>;
    findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs): Prisma.Prisma__BankAccountClient<{
        id: string;
        userId: string;
        name: string;
        initialBalance: number;
        type: import(".prisma/client").$Enums.BankAccountType;
        color: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(createDto: Prisma.BankAccountCreateArgs): Prisma.Prisma__BankAccountClient<{
        id: string;
        userId: string;
        name: string;
        initialBalance: number;
        type: import(".prisma/client").$Enums.BankAccountType;
        color: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(updateDto: Prisma.BankAccountUpdateArgs): Prisma.Prisma__BankAccountClient<{
        id: string;
        userId: string;
        name: string;
        initialBalance: number;
        type: import(".prisma/client").$Enums.BankAccountType;
        color: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(deleteDto: Prisma.BankAccountDeleteArgs): Prisma.Prisma__BankAccountClient<{
        id: string;
        userId: string;
        name: string;
        initialBalance: number;
        type: import(".prisma/client").$Enums.BankAccountType;
        color: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
