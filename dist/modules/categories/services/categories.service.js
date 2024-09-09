"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const categories_repositories_1 = require("../../../shared/database/repositories/categories.repositories");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepo) {
        this.categoriesRepo = categoriesRepo;
    }
    create(userId, createCategoryDto) {
        const { name, icon, type } = createCategoryDto;
        return this.categoriesRepo.create({
            data: {
                userId,
                name,
                icon,
                type
            }
        });
    }
    findAllByUserId(userId) {
        return this.categoriesRepo.findMany({
            where: { userId },
        });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [categories_repositories_1.CategoriesRepository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map