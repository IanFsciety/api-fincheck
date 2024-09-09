"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./services/transactions.service");
const transactions_controller_1 = require("./transactions.controller");
const bank_accounts_module_1 = require("../bank-accounts/bank-accounts.module");
const categories_module_1 = require("../categories/categories.module");
const validate_transaction_ownership_service_1 = require("./services/validate-transaction-ownership.service");
let TransactionsModule = class TransactionsModule {
};
exports.TransactionsModule = TransactionsModule;
exports.TransactionsModule = TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [bank_accounts_module_1.BankAccountsModule, categories_module_1.CategoriesModule],
        controllers: [transactions_controller_1.TransactionsController],
        providers: [transactions_service_1.TransactionsService, validate_transaction_ownership_service_1.ValidateTransactionOwnershipService],
    })
], TransactionsModule);
//# sourceMappingURL=transactions.module.js.map