import { UserBooksService } from './user-books.service';
import { EndMessage } from 'src/interface/EndMessage';
import { UserService } from 'src/user/user.service';
import { BookService } from 'src/book/book.service';
export declare class UserBooksController {
    private readonly userBookService;
    private readonly userService;
    private readonly bookServcie;
    constructor(userBookService: UserBooksService, userService: UserService, bookServcie: BookService);
    create(book: {
        bookUUID: string;
    }, userUUID: string): Promise<EndMessage>;
}
