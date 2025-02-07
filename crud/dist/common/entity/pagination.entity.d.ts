export declare class Pagination {
    limit: number;
    offset: number;
    reqHost: string;
    url: string;
    numberOfElements: number;
    constructor(limit: number, offset: number, url: string, numberOfElements: number);
    firstPage(): string;
    previousPage(): string | null;
    nextPage(): string | null;
    lastPage(): string;
}
