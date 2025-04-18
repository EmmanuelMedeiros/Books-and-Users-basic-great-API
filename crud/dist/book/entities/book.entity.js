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
exports.Book = void 0;
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../user/entity/user.entity");
const typeorm_1 = require("typeorm");
let Book = class Book {
    constructor(uuid, author, price, title, users) {
        this.uuid = uuid;
        this.author = author;
        this.price = price;
        this.title = title;
        this.users = users;
    }
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Book.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Book.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.Length)(2, 50),
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, length: 20 }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.books, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'user_books',
        joinColumn: {
            name: 'bookUUID',
            referencedColumnName: 'uuid'
        },
        inverseJoinColumn: {
            name: 'userUUID',
            referencedColumnName: 'uuid'
        }
    }),
    __metadata("design:type", Array)
], Book.prototype, "users", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [String, String, Number, String, Array])
], Book);
//# sourceMappingURL=book.entity.js.map