import { Length } from "class-validator";
import { IBook } from "src/interface/IBook";

export class CreateBookDto implements Pick<IBook, "price"|"author"|"title">{

    public readonly author: string;
    public readonly price: number;

    public readonly title: string;

	constructor(author: string, price: number, title: string) {
		this.author = author;
		this.price = price;
		this.title = title;
	}
    
}
