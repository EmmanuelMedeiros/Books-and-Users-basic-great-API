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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const cacheInterceptor_1 = require("../common/interceptor/cacheInterceptor");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async findAll(paginationDTO, req) {
        const pagination = {
            limit: paginationDTO.limit,
            offset: paginationDTO.offset,
            reqHost: req.host
        };
        const serviceResponse = await this.bookService.findAll(pagination);
        if (serviceResponse.status !== common_1.HttpStatus.OK) {
            throw new common_1.HttpException(serviceResponse.data, common_1.HttpStatus.BAD_REQUEST);
        }
        return serviceResponse;
    }
    async findOne(uuid) {
        const book = await this.bookService.findOne(uuid);
        if (!book) {
            throw new common_1.HttpException("No book found for this UUID", common_1.HttpStatus.NOT_FOUND);
        }
        return book;
    }
    async create(createBookDTO) {
        const serviceResponse = await this.bookService.create(createBookDTO);
        if (serviceResponse.status !== common_1.HttpStatus.CREATED) {
            throw new common_1.HttpException(serviceResponse.data, common_1.HttpStatus.BAD_REQUEST);
        }
        return serviceResponse;
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.UseInterceptors)(cacheInterceptor_1.CacheInterceptor),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginatioDTO, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "create", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)('book'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map