import { Book } from "src/book/entities/book.entity";
export declare class UpdateUserDTO {
    readonly books?: Book[];
    readonly name?: string;
    readonly password?: string;
    constructor(books?: Book[], name?: string, password?: string);
}
