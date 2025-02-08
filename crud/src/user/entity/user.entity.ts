import { Book } from "src/book/entities/book.entity";
import { IUser } from "src/interface/IUser";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User implements IUser {

    @PrimaryColumn()
    public readonly uuid: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    public readonly name: string;   

    @Column({type: 'varchar', nullable: false})
    password: string;

    @ManyToMany(() => Book, (book) => book.users, {
        onDelete: "CASCADE"
    })
    @JoinTable({
        name: 'user_books',
        joinColumn: {
            name: 'userUUID',
            referencedColumnName: 'uuid'
        },
        inverseJoinColumn: {
            name: 'bookUUID',
            referencedColumnName: 'uuid'
        }
    })
    public books: Book[]

	constructor(name: string, password: string, uuid: string, books: Book[]) {
		this.name = name;
		this.password = password;
		this.uuid = uuid;
        this.books = books
	}
    
    
}