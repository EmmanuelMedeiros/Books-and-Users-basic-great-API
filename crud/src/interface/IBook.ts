import { User } from "src/user/entity/user.entity";

export interface IBook {
    uuid: string,
    title: string,
    price: number,
    author: string,
    users: User[]
}