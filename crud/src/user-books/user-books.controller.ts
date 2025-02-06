import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { UserBooksService } from './user-books.service';
import { EndMessage } from 'src/interface/EndMessage';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { BookService } from 'src/book/book.service';
import { Book } from 'src/book/entities/book.entity';

@Controller('user-books')
export class UserBooksController {
    constructor(
        private readonly userBookService: UserBooksService,
        private readonly userService: UserService,
        private readonly bookServcie: BookService
    ) {};

    @HttpCode(HttpStatus.OK)
    @Post() 
    async create(@Body() book: {bookUUID: string}, @Query('userUUID') userUUID: string) {
        const fetchedUser: User|null = await this.userService.findOne(userUUID);

        if(!fetchedUser) {
            throw new HttpException("No user found for this UUID", HttpStatus.NOT_FOUND);
        };
        console.log(fetchedUser)
        const fetchedBook: Book|null = await this.bookServcie.findOne(book.bookUUID);
        if(!fetchedBook) {
            throw new HttpException("No book found for this UUID", HttpStatus.NOT_FOUND);
        };
        const serviceResponse: EndMessage = await this.userBookService.create(fetchedBook, fetchedUser);

        if(serviceResponse.status !== HttpStatus.OK) {
            throw new HttpException(serviceResponse.data, serviceResponse.status);
        }
        return serviceResponse;
    }
}
