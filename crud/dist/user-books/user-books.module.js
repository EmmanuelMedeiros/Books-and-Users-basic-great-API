"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBooksModule = void 0;
const common_1 = require("@nestjs/common");
const user_books_controller_1 = require("./user-books.controller");
const user_books_service_1 = require("./user-books.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_books_entity_1 = require("./entity/user-books.entity");
const user_module_1 = require("../user/user.module");
const book_module_1 = require("../book/book.module");
let UserBooksModule = class UserBooksModule {
};
exports.UserBooksModule = UserBooksModule;
exports.UserBooksModule = UserBooksModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_books_controller_1.UserBooksController],
        providers: [user_books_service_1.UserBooksService],
        imports: [typeorm_1.TypeOrmModule.forFeature([user_books_entity_1.UserBooks]), user_module_1.UserModule, book_module_1.BookModule]
    })
], UserBooksModule);
//# sourceMappingURL=user-books.module.js.map