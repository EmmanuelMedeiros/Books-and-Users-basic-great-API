import { IPagination } from "src/interface/IPagination";

export class Pagination implements IPagination {
    public readonly firstPage: string | null;
    public readonly lastPage: string | null;
    public readonly nextPage: string | null;
    public readonly previousPage: string | null;

	constructor(firstPage: string|null , lastPage: string|null , nextPage: string|null , previousPage: string|null ) {
		this.firstPage = firstPage;
		this.lastPage = lastPage;
		this.nextPage = nextPage;
		this.previousPage = previousPage;
	}
    
}