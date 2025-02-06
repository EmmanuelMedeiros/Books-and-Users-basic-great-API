import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBooks } from './entity/user-books.entity';
import { Repository } from 'typeorm';
import { EndMessage } from 'src/interface/EndMessage';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Book } from 'src/book/entities/book.entity';

import * as crypto from 'crypto';

@Injectable()
export class UserBooksService {
    constructor(
        @InjectRepository(UserBooks)
        private readonly userBooksRepository: Repository<UserBooks>
    ) {};

    async create(book: Book, user: User) {
        let endMessage: EndMessage = {data: '', status: HttpStatus.OK}

        try{
            const userBook: UserBooks = new UserBooks(
                book,
                user,
                crypto.randomUUID()
            )

            await this.userBooksRepository.insert(userBook)
            return endMessage = {data: userBook, status: HttpStatus.OK}
        } catch(err) {
            endMessage = {data: err.toString(), status: HttpStatus.BAD_REQUEST};
        }

        return endMessage;
    }
}
