import { Book } from "src/book/entities/book.entity";
import { UserBooks } from "src/user-books/entity/user-books.entity";

export interface IUser {
    uuid: string,
    name: string,
    password: string,
    books: Book[]
}