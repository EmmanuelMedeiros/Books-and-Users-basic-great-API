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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const book_entity_1 = require("./entities/book.entity");
const typeorm_2 = require("typeorm");
const crypto = require("crypto");
const pagination_entity_1 = require("../common/entity/pagination.entity");
let BookService = class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async create(createBookDTO) {
        let endMessage = { data: '', status: common_1.HttpStatus.OK };
        try {
            const newBook = new book_entity_1.Book(crypto.randomUUID(), createBookDTO.author.trim(), createBookDTO.price, createBookDTO.title.trim(), []);
            await this.bookRepository.insert(newBook);
            endMessage = { data: newBook, status: common_1.HttpStatus.CREATED };
        }
        catch (err) {
            endMessage = { data: err.toString(), status: common_1.HttpStatus.BAD_REQUEST };
        }
        return endMessage;
    }
    async findAll(paginationDTO) {
        let endMessage = { data: '', status: common_1.HttpStatus.OK };
        try {
            const books = await this.bookRepository.findAndCount({
                take: paginationDTO.limit,
                skip: paginationDTO.offset,
                order: { title: 'DESC' }
            });
            const pagination = new pagination_entity_1.Pagination(paginationDTO.limit, paginationDTO.offset, 'book', Number(books[1]));
            const paginationObject = {
                firstPage: pagination.firstPage(),
                previousPage: pagination.previousPage(),
                nextPage: pagination.nextPage(),
                lastPage: pagination.lastPage()
            };
            if (!paginationDTO.offset || !paginationDTO.limit) {
                return endMessage = { data: books[0], status: common_1.HttpStatus.OK };
            }
            ;
            return endMessage = { data: { contentList: books[0], pagination: paginationObject }, status: common_1.HttpStatus.OK };
        }
        catch (err) {
            endMessage = { data: err.toString(), status: common_1.HttpStatus.BAD_REQUEST };
        }
        return endMessage;
    }
    async findOne(uuid) {
        const book = await this.bookRepository.findOne({
            where: {
                uuid: uuid
            }
        });
        return book;
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookService);
//# sourceMappingURL=book.service.js.map