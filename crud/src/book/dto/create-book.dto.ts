import { IsBoolean, IsNumber, length, Length, MaxLength, MinLength } from "class-validator";
import { IBook } from "src/interface/IBook";

export class CreateBookDto implements Pick<IBook, "price"|"author"|"title">{

	@MinLength(5)
	@MaxLength(30)
    public readonly author: string;

	@IsNumber()
    public readonly price: number;

	@MaxLength(100)
    public readonly title: string;

	constructor(author: string, price: number, title: string) {
		this.author = author;
		this.price = price;
		this.title = title;
	}
    
}
