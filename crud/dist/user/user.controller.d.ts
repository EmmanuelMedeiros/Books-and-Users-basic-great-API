import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { EndMessage } from 'src/interface/EndMessage';
import { BookService } from 'src/book/book.service';
import { UpdateUserDTO } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    private readonly bookService;
    constructor(userService: UserService, bookService: BookService);
    findAll(): Promise<User[]>;
    findOne(uuid: string): Promise<User>;
    create(createUserDTO: CreateUserDTO): Promise<EndMessage>;
    update(updateUserDTO: UpdateUserDTO, userUUID: string): Promise<EndMessage>;
    delete(userUUID: string): Promise<EndMessage>;
    appendBook(book: {
        bookUUID: string;
    }, userUUID: string): Promise<EndMessage>;
    removeBook(book: {
        bookUUID: string;
    }, userUUID: string): Promise<EndMessage>;
}
