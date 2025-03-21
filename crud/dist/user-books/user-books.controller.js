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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBooksController = void 0;
const common_1 = require("@nestjs/common");
const user_books_service_1 = require("./user-books.service");
const user_service_1 = require("../user/user.service");
const book_service_1 = require("../book/book.service");
let UserBooksController = class UserBooksController {
    constructor(userBookService, userService, bookServcie) {
        this.userBookService = userBookService;
        this.userService = userService;
        this.bookServcie = bookServcie;
    }
    ;
    async create(book, userUUID) {
        const fetchedUser = await this.userService.findOne(userUUID);
        if (!fetchedUser) {
            throw new common_1.HttpException("No user found for this UUID", common_1.HttpStatus.NOT_FOUND);
        }
        ;
        console.log(fetchedUser);
        const fetchedBook = await this.bookServcie.findOne(book.bookUUID);
        if (!fetchedBook) {
            throw new common_1.HttpException("No book found for this UUID", common_1.HttpStatus.NOT_FOUND);
        }
        ;
        const serviceResponse = await this.userBookService.create(fetchedBook, fetchedUser);
        if (serviceResponse.status !== common_1.HttpStatus.OK) {
            throw new common_1.HttpException(serviceResponse.data, serviceResponse.status);
        }
        return serviceResponse;
    }
};
exports.UserBooksController = UserBooksController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('userUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserBooksController.prototype, "create", null);
exports.UserBooksController = UserBooksController = __decorate([
    (0, common_1.Controller)('user-books'),
    __metadata("design:paramtypes", [user_books_service_1.UserBooksService,
        user_service_1.UserService,
        book_service_1.BookService])
], UserBooksController);
//# sourceMappingURL=user-books.controller.js.map