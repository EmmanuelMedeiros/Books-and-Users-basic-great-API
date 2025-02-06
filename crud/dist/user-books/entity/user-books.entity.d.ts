import { Book } from "src/book/entities/book.entity";
import { IUserBooks } from "src/interface/IUserBooks";
import { User } from "src/user/entity/user.entity";
export declare class UserBooks implements IUserBooks {
    readonly uuid: string;
    readonly book: Book;
    readonly user: User;
    constructor(book: Book, user: User, uuid: string);
}
