import { IPaginationRequirements } from "src/interface/IPaginationRequirements";

export class PaginationRequirements implements IPaginationRequirements {
    public readonly limit: number;
    public readonly numberOfElements: number;
    public readonly offset: number;
    public readonly urlSuffix: string;

	constructor(limit: number, numberOfElements: number, offset: number, urlSuffix: string) {
		this.limit = limit;
		this.numberOfElements = numberOfElements;
		this.offset = offset;
		this.urlSuffix = urlSuffix;
	}
    
}