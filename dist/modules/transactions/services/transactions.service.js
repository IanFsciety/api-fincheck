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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const transactions_repositories_ts_1 = require("../../../shared/database/repositories/transactions.repositories.ts");
const validate_bank_account_ownership_service_1 = require("../../bank-accounts/services/validate-bank-account-ownership.service");
const validate_category_ownership_service_1 = require("../../categories/services/validate-category-ownership.service");
const validate_transaction_ownership_service_1 = require("./validate-transaction-ownership.service");
let TransactionsService = class TransactionsService {
    constructor(TransactionsRepo, ValidateBankAccountOwnershipService, ValidateCategoryOwnershipService, ValidateTransactionOwnershipService) {
        this.TransactionsRepo = TransactionsRepo;
        this.ValidateBankAccountOwnershipService = ValidateBankAccountOwnershipService;
        this.ValidateCategoryOwnershipService = ValidateCategoryOwnershipService;
        this.ValidateTransactionOwnershipService = ValidateTransactionOwnershipService;
    }
    async create(userId, createTransactionDto) {
        const { bankAccountId, categoryId, date, name, type, value } = createTransactionDto;
        await this.validateEntitiesOwnership({
            userId,
            bankAccountId,
            categoryId
        });
        return this.TransactionsRepo.create({
            data: {
                userId,
                bankAccountId,
                categoryId,
                date,
                name,
                type,
                value
            }
        });
    }
    findAllByUserId(userId, filters) {
        return this.TransactionsRepo.findMany({
            where: {
                userId,
                bankAccountId: filters.bankAccountId,
                type: filters.type,
                date: {
                    gte: new Date(Date.UTC(filters.year, filters.month)),
                    lt: new Date(Date.UTC(filters.year, filters.month + 1)),
                },
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        icon: true,
                    }
                }
            },
        });
    }
    async update(userId, transactionId, updateTransactionDto) {
        const { bankAccountId, categoryId, date, name, type, value } = updateTransactionDto;
        await this.validateEntitiesOwnership({
            userId,
            bankAccountId,
            categoryId,
            transactionId
        });
        return this.TransactionsRepo.update({
            where: { id: transactionId },
            data: {
                bankAccountId,
                categoryId,
                date,
                name,
                type,
                value
            }
        });
    }
    async remove(userId, transactionId) {
        await this.validateEntitiesOwnership({
            userId,
            transactionId,
        });
        await this.TransactionsRepo.delete({
            where: { id: transactionId }
        });
        return null;
    }
    async validateEntitiesOwnership({ userId, bankAccountId, categoryId, transactionId }) {
        await Promise.all([
            transactionId && this.ValidateTransactionOwnershipService.validate(userId, transactionId),
            bankAccountId && this.ValidateBankAccountOwnershipService.validate(userId, bankAccountId),
            categoryId && this.ValidateCategoryOwnershipService.validate(userId, categoryId)
        ]);
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transactions_repositories_ts_1.TransactionsRepository,
        validate_bank_account_ownership_service_1.ValidateBankAccountOwnershipService,
        validate_category_ownership_service_1.ValidateCategoryOwnershipService,
        validate_transaction_ownership_service_1.ValidateTransactionOwnershipService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map