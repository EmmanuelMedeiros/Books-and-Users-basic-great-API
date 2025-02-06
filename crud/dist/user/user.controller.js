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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const book_service_1 = require("../book/book.service");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserController = class UserController {
    constructor(userService, bookService) {
        this.userService = userService;
        this.bookService = bookService;
    }
    async findAll() {
        const userList = await this.userService.findAll();
        if (!userList || userList.length < 1) {
            throw new common_1.HttpException("No user found", common_1.HttpStatus.NOT_FOUND);
        }
        return userList;
    }
    async findOne(uuid) {
        const user = await this.userService.findOne(uuid);
        if (!user) {
            throw new common_1.HttpException("No user found for this UUID", common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async create(createUserDTO) {
        const serviceResponse = await this.userService.create(createUserDTO);
        if (serviceResponse.status !== common_1.HttpStatus.CREATED) {
            throw new common_1.HttpException(serviceResponse.data, common_1.HttpStatus.BAD_REQUEST);
        }
        return serviceResponse;
    }
    async update(updateUserDTO, userUUID) {
        const updatedUser = await this.userService.update(updateUserDTO, userUUID);
        if (updatedUser.status !== common_1.HttpStatus.OK) {
            throw new common_1.HttpException(updatedUser.data, updatedUser.status);
        }
        return updatedUser;
    }
    async delete(userUUID) {
        const fetchedUser = await this.userService.findOne(userUUID);
        if (!fetchedUser) {
            throw new common_1.HttpException("No user found for this UUID", common_1.HttpStatus.NOT_FOUND);
        }
        ;
        const serviceResponse = await this.userService.delete(fetchedUser);
        if (serviceResponse.status !== common_1.HttpStatus.OK) {
            throw new common_1.HttpException(serviceResponse.data, serviceResponse.status);
        }
        return serviceResponse;
    }
    async appendBook(book, userUUID) {
        const fetchedUser = await this.userService.findOne(userUUID);
        if (!fetchedUser) {
            throw new common_1.HttpException("No user found for this UUID", common_1.HttpStatus.NOT_FOUND);
        }
        ;
        const fetchedBook = await this.bookService.findOne(book.bookUUID);
        if (!fetchedBook) {
            throw new common_1.HttpException("No book found for this UUID", common_1.HttpStatus.NOT_FOUND);
        }
        ;
        const serviceResponse = await this.userService.appendBook(fetchedUser, fetchedBook);
        if (serviceResponse.status !== common_1.HttpStatus.OK) {
            throw new common_1.HttpException(serviceResponse.data, serviceResponse.status);
        }
        return serviceResponse;
    }
    async removeBook(book, userUUID) {
        const fetchedUser = await this.userService.findOne(userUUID);
        if (!fetchedUser) {
            throw new common_1.HttpException("No user found for this UUID", common_1.HttpStatus.NOT_FOUND);
        }
        ;
        const fetchedBook = await this.bookService.findOne(book.bookUUID);
        if (!fetchedBook) {
            throw new common_1.HttpException("No book found for this UUID", common_1.HttpStatus.NOT_FOUND);
        }
        ;
        const serviceResponse = await this.userService.removeBook(fetchedUser, book.bookUUID);
        if (serviceResponse.status !== common_1.HttpStatus.OK) {
            throw new common_1.HttpException(serviceResponse.data, serviceResponse.status);
        }
        return serviceResponse;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('/:uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('userUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDTO, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('userUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/append-book'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('userUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "appendBook", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)('/remove-book'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('userUUID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "removeBook", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        book_service_1.BookService])
], UserController);
//# sourceMappingURL=user.controller.js.map