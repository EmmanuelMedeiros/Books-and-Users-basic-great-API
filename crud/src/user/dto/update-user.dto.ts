import { Book } from "src/book/entities/book.entity";
import { IUser } from "src/interface/IUser";

export class UpdateUserDTO {
    public readonly books?: Book[];
    public readonly name?: string;
    public readonly password?: string;

	constructor(books?: Book[], name?: string, password?: string) {
		this.books = books;
		this.name = name;
		this.password = password;
	}

}