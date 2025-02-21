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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("typeorm");
const crypto = require("crypto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    ;
    async findAll() {
        const userList = await this.userRepository.find({
            relations: {
                books: true
            }
        });
        return userList;
    }
    async findOne(uuid) {
        const user = await this.userRepository.findOne({
            where: {
                uuid: uuid
            },
            relations: {
                books: true
            },
            select: {
                name: true,
                books: true,
                uuid: true
            }
        });
        return user;
    }
    async create(createUserDTO) {
        let endMessage = { data: '', status: common_1.HttpStatus.OK };
        try {
            const newUser = new user_entity_1.User(createUserDTO.name, createUserDTO.password, crypto.randomUUID(), []);
            await this.userRepository.insert(newUser);
            endMessage = { data: newUser, status: common_1.HttpStatus.CREATED };
        }
        catch (err) {
            endMessage = { data: err.toString(), status: common_1.HttpStatus.BAD_REQUEST };
        }
        return endMessage;
    }
    async update(updateUserDTO, userUUID) {
        let endMessage = { data: '', status: common_1.HttpStatus.OK };
        if (!userUUID) {
            return endMessage = { data: 'No UUID provided', status: common_1.HttpStatus.BAD_REQUEST };
        }
        ;
        try {
            const updateDTO = new update_user_dto_1.UpdateUserDTO(undefined, updateUserDTO.name?.trim(), updateUserDTO.password?.trim());
            const dbResponse = await this.userRepository.update(userUUID, updateDTO);
            if (dbResponse.affected) {
                const updatedUser = await this.userRepository.findOne({ where: { uuid: userUUID }, select: { books: true, name: true, uuid: true } });
                return endMessage = { data: updatedUser, status: common_1.HttpStatus.OK };
            }
            else {
                return endMessage = { data: `No user found for this UUID`, status: common_1.HttpStatus.NOT_FOUND };
            }
        }
        catch (err) {
            endMessage = { data: err.toString(), status: common_1.HttpStatus.BAD_REQUEST };
        }
        return endMessage;
    }
    async delete(user) {
        let endMessage = { data: '', status: common_1.HttpStatus.OK };
        try {
            await this.userRepository.delete(user.uuid);
            endMessage = { data: `user ${user.uuid} deleted`, status: common_1.HttpStatus.OK };
        }
        catch (err) {
            endMessage = { data: err.toString(), status: common_1.HttpStatus.BAD_REQUEST };
        }
        return endMessage;
    }
    async appendBook(user, book) {
        let endMessage = { data: '', status: common_1.HttpStatus.OK };
        try {
            if (user.books.find((x) => x.uuid === book.uuid)) {
                return endMessage = { data: 'This user already has this book', status: common_1.HttpStatus.BAD_REQUEST };
            }
            if (user.books === undefined) {
                user.books = [book];
            }
            else {
                user.books.push(book);
            }
            ;
            await this.userRepository.save(user);
            endMessage = { data: user, status: common_1.HttpStatus.OK };
        }
        catch (err) {
            endMessage = { data: err.toString(), status: common_1.HttpStatus.BAD_REQUEST };
        }
        return endMessage;
    }
    async removeBook(user, bookUUID) {
        let endMessage = { data: '', status: common_1.HttpStatus.OK };
        try {
            const bookToRemoveIndex = user.books.findIndex(x => x.uuid === bookUUID);
            if (bookToRemoveIndex === -1) {
                return endMessage = { data: `This user doesn't own this book`, status: common_1.HttpStatus.BAD_REQUEST };
            }
            ;
            user.books.splice(bookToRemoveIndex, 1);
            await this.userRepository.save(user);
            endMessage = { data: user, status: common_1.HttpStatus.OK };
        }
        catch (err) {
            endMessage = { data: err.toString(), status: common_1.HttpStatus.BAD_REQUEST };
        }
        return endMessage;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map