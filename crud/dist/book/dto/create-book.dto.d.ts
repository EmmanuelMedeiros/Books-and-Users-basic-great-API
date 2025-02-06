import { IBook } from "src/interface/IBook";
export declare class CreateBookDto implements Pick<IBook, "price" | "author" | "title"> {
    readonly author: string;
    readonly price: number;
    readonly title: string;
    constructor(author: string, price: number, title: string);
}
