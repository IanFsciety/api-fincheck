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
exports.BankAccountsService = void 0;
const common_1 = require("@nestjs/common");
const bank_accounts_repositories_1 = require("../../../shared/database/repositories/bank-accounts.repositories");
const validate_bank_account_ownership_service_1 = require("./validate-bank-account-ownership.service");
let BankAccountsService = class BankAccountsService {
    constructor(bankAccountsRepo, ValidateBankAccountOwnershipService) {
        this.bankAccountsRepo = bankAccountsRepo;
        this.ValidateBankAccountOwnershipService = ValidateBankAccountOwnershipService;
    }
    create(userId, createBankAccountDto) {
        const { color, initialBalance, name, type } = createBankAccountDto;
        return this.bankAccountsRepo.create({
            data: {
                userId,
                color,
                initialBalance,
                name,
                type
            }
        });
    }
    async findAllByUserId(userId) {
        const bankAccounts = await this.bankAccountsRepo.findMany({
            where: { userId },
            include: {
                Transactions: {
                    select: {
                        type: true,
                        value: true
                    }
                },
            },
        });
        return bankAccounts.map(({ Transactions, ...bankAccount }) => {
            const totalTransactions = Transactions.reduce((acc, transaction) => acc + (transaction.type === 'INCOME' ? transaction.value : -transaction.value), 0);
            const currentBalance = bankAccount.initialBalance + totalTransactions;
            return {
                ...bankAccount,
                currentBalance,
            };
        });
    }
    async update(userId, bankAccountId, updateBankAccountDto) {
        const { color, initialBalance, name, type } = updateBankAccountDto;
        await this.ValidateBankAccountOwnershipService.validate(userId, bankAccountId);
        return this.bankAccountsRepo.update({
            where: { id: bankAccountId },
            data: {
                color, initialBalance, name, type
            }
        });
    }
    async delete(userId, bankAccountId) {
        await this.ValidateBankAccountOwnershipService.validate(userId, bankAccountId);
        await this.bankAccountsRepo.delete({
            where: { id: bankAccountId }
        });
        return null;
    }
};
exports.BankAccountsService = BankAccountsService;
exports.BankAccountsService = BankAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bank_accounts_repositories_1.BankAccountsRepository, validate_bank_account_ownership_service_1.ValidateBankAccountOwnershipService])
], BankAccountsService);
//# sourceMappingURL=bank-accounts.service.js.map