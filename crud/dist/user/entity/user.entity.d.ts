import { Book } from "src/book/entities/book.entity";
import { IUser } from "src/interface/IUser";
export declare class User implements IUser {
    readonly uuid: string;
    readonly name: string;
    password: string;
    books: Book[];
    constructor(name: string, password: string, uuid: string, books: Book[]);
}
