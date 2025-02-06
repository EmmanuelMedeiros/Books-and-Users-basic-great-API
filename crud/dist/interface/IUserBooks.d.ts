import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entity/user.entity";
export interface IUserBooks {
    uuid: string;
    user: User;
    book: Book;
}
