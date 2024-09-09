import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
export declare class ValidateCategoryOwnershipService {
    private readonly categoriesRepo;
    constructor(categoriesRepo: CategoriesRepository);
    validate(userId: string, categoryId: string): Promise<void>;
}
