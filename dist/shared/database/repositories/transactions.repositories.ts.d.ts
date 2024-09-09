import { type Prisma } from '@prisma/client';
import { PrismaService } from "../prisma.service";
export declare class TransactionsRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findMany(findManyDto: Prisma.TransactionFindManyArgs): Prisma.PrismaPromise<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }[]>;
    findFirst(findFirstDto: Prisma.TransactionFindFirstArgs): Prisma.Prisma__TransactionClient<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    create(createDto: Prisma.TransactionCreateArgs): Prisma.Prisma__TransactionClient<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(updateDto: Prisma.TransactionUpdateArgs): Prisma.Prisma__TransactionClient<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(deleteDto: Prisma.TransactionDeleteArgs): Prisma.Prisma__TransactionClient<{
        id: string;
        userId: string;
        bankAccountId: string;
        categoryId: string;
        name: string;
        value: number;
        date: Date;
        type: import(".prisma/client").$Enums.TransactionType;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
