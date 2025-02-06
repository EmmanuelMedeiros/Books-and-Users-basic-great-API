import { IsNumber, Length } from "class-validator";
import { IBook } from "src/interface/IBook";
import { UserBooks } from "src/user-books/entity/user-books.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book implements IBook {

    @PrimaryColumn()
    public readonly uuid: string;

    @Column({type: 'varchar'})
    public readonly author: string;

    @Column({type: 'decimal'})
    public readonly price: number;

    @Length(2, 50)
    @Column({type: 'varchar', unique: true, length: 20})
    public readonly title: string;

    @ManyToMany(() => User, (user) => user.books, {
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'user_books',
        joinColumn: {
            name: 'bookUUID',
            referencedColumnName: 'uuid'
        },
        inverseJoinColumn: {
            name: 'userUUID',
            referencedColumnName: 'uuid'
        }
    })
    public users: User[];

	constructor(uuid: string, author: string, price: number, title: string, users: User[]) {
		this.uuid = uuid;
		this.author = author;
		this.price = price;
		this.title = title;
        this.users = users
	}

}
