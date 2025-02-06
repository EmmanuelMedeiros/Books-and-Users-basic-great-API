import { IBook } from "src/interface/IBook";
import { User } from "src/user/entity/user.entity";
export declare class Book implements IBook {
    readonly uuid: string;
    readonly author: string;
    readonly price: number;
    readonly title: string;
    users: User[];
    constructor(uuid: string, author: string, price: number, title: string, users: User[]);
}
