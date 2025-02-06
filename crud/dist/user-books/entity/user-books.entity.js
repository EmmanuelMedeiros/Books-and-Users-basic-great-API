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
exports.UserBooks = void 0;
const book_entity_1 = require("../../book/entities/book.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const typeorm_1 = require("typeorm");
let UserBooks = class UserBooks {
    constructor(book, user, uuid) {
        this.book = book;
        this.user = user;
        this.uuid = uuid;
    }
};
exports.UserBooks = UserBooks;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], UserBooks.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book, (book) => book.uuid),
    __metadata("design:type", book_entity_1.Book)
], UserBooks.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.books),
    __metadata("design:type", user_entity_1.User)
], UserBooks.prototype, "user", void 0);
exports.UserBooks = UserBooks = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [book_entity_1.Book, user_entity_1.User, String])
], UserBooks);
//# sourceMappingURL=user-books.entity.js.map