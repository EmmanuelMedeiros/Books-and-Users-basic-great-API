import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { EndMessage } from 'src/interface/EndMessage';
import { CreateUserDTO } from './dto/create-user.dto';

import * as crypto from 'crypto';
import { Book } from 'src/book/entities/book.entity';
import { UpdateBookDto } from 'src/book/dto/update-book.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {};

    async findAll(): Promise<User[]|null> {
        const userList: User[] = await this.userRepository.find(
            {
                relations: {
                    books: true
                }
            }
        );
        return userList;
    }

    async findOne(uuid: string): Promise<User|null> {
        const user: User|null = await this.userRepository.findOne({
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
        })
        return user;
    }

    async create(createUserDTO: CreateUserDTO): Promise<EndMessage> {
        let endMessage: EndMessage = {data: '', status: HttpStatus.OK}
        try {
            const newUser: User = new User(
                createUserDTO.name,
                createUserDTO.password,
                crypto.randomUUID(),
                []
            )
            await this.userRepository.insert(newUser);
            endMessage = {data: newUser, status: HttpStatus.CREATED};
        }catch(err) {
            endMessage = {data: err.toString(), status: HttpStatus.BAD_REQUEST};
        }
        return endMessage;
    }

    async update(updateUserDTO: UpdateUserDTO, userUUID: string): Promise<EndMessage> {
        let endMessage: EndMessage = {data: '', status: HttpStatus.OK}

        if(!userUUID) {
            return endMessage = {data: 'No UUID provided', status: HttpStatus.BAD_REQUEST};
        };
        try {
            const updateDTO: UpdateUserDTO = new UpdateUserDTO(
                undefined,
                updateUserDTO.name?.trim(),
                updateUserDTO.password?.trim()
            )
            const dbResponse: UpdateResult = await this.userRepository.update(userUUID, updateDTO)
            if(dbResponse.affected) {
                const updatedUser: User|null = await this.userRepository.findOne({where: {uuid: userUUID}, select: {books: true, name: true, uuid: true}});
                return endMessage = {data: updatedUser, status: HttpStatus.OK};
            } else {
                return endMessage = {data: `No user found for this UUID`, status: HttpStatus.NOT_FOUND}
            }
        }catch(err) {
            endMessage = {data: err.toString(), status: HttpStatus.BAD_REQUEST};
        }
        return endMessage;
    }

    async delete(user: User) {
        let endMessage: EndMessage = {data: '', status: HttpStatus.OK}
        try {
            await this.userRepository.delete(user.uuid);
            endMessage = {data: `user ${user.uuid} deleted`, status: HttpStatus.OK};
        }catch(err) {
            endMessage = {data: err.toString(), status: HttpStatus.BAD_REQUEST};
        }
        return endMessage;
    }

    async appendBook(user: User, book: Book) {
        let endMessage: EndMessage = {data: '', status: HttpStatus.OK};
        try {
            if(user.books.find((x) => x.uuid === book.uuid)) {
                return endMessage = {data: 'This user already has this book', status: HttpStatus.BAD_REQUEST}
            }
            if(user.books === undefined) {
                user.books = [book]
            } else {
                user.books.push(book)
            };
            await this.userRepository.save(user)
            endMessage = {data: user, status: HttpStatus.OK};
        }catch(err) {
            endMessage = {data: err.toString(), status: HttpStatus.BAD_REQUEST};
        }
        return endMessage;
    }

    async removeBook(user: User, bookUUID: string) {
        let endMessage: EndMessage = {data: '', status: HttpStatus.OK};
        try {
            const bookToRemoveIndex: number = user.books.findIndex(x => x.uuid === bookUUID);
            if(bookToRemoveIndex === -1) {
                return endMessage = {data: `This user doesn't own this book`, status: HttpStatus.BAD_REQUEST};
            };
            user.books.splice(bookToRemoveIndex, 1);
            await this.userRepository.save(user);
            endMessage = {data: user, status: HttpStatus.OK};
        }catch(err) {
            endMessage = {data: err.toString(), status: HttpStatus.BAD_REQUEST};
        }
        return endMessage;
    }
}
