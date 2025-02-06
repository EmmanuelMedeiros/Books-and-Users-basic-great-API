import { UserBooks } from './entity/user-books.entity';
import { Repository } from 'typeorm';
import { EndMessage } from 'src/interface/EndMessage';
import { User } from 'src/user/entity/user.entity';
import { Book } from 'src/book/entities/book.entity';
export declare class UserBooksService {
    private readonly userBooksRepository;
    constructor(userBooksRepository: Repository<UserBooks>);
    create(book: Book, user: User): Promise<EndMessage>;
}
