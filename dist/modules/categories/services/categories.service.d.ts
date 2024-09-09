import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from '../dto/create-category.dto';
export declare class CategoriesService {
    private readonly categoriesRepo;
    constructor(categoriesRepo: CategoriesRepository);
    create(userId: string, createCategoryDto: CreateCategoryDto): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: string;
        userId: string;
        name: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionType;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllByUserId(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string;
        name: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionType;
    }[]>;
}
