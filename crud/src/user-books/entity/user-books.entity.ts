import { Book } from "src/book/entities/book.entity";
import { IUserBooks } from "src/interface/IUserBooks";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class UserBooks implements IUserBooks{

    @PrimaryColumn()
    public readonly uuid: string;

    @ManyToOne(() => Book, (book) => book.uuid)
    public readonly book: Book;

    @ManyToOne(() => User, (user) => user.books)
    public readonly user: User;

	constructor(book: Book, user: User, uuid: string) {
		this.book = book;
		this.user = user;
		this.uuid = uuid;
	}

}