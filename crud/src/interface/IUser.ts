import { Book } from "src/book/entities/book.entity";

export interface IUser {
    uuid: string,
    name: string,
    password: string,
    books: Book[]
}