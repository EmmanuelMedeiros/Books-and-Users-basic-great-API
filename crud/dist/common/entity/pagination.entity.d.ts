export declare class Pagination {
    limit: number;
    offset: number;
    urlSuffix: string;
    numberOfElements: number;
    constructor(limit: number, offset: number, urlSuffix: string, numberOfElements: number);
    firstPage(): string;
    previousPage(): string | null;
    nextPage(): string | null;
    lastPage(): string;
}
