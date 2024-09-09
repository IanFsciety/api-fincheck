import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './services/categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    createCategory(userId: string, createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        userId: string;
        name: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionType;
    }>;
    findAll(userId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        userId: string;
        name: string;
        icon: string;
        type: import(".prisma/client").$Enums.TransactionType;
    }[]>;
}
