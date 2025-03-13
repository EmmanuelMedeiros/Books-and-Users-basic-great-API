import { Injectable } from "@nestjs/common";
import { Pagination } from "../entity/pagination.entity";
import { PaginationRequirements } from "../entity/paginationRequirements.entity";

@Injectable()
export class PaginationService {

    
    paginate(paginationRequirements: PaginationRequirements): Pagination {
        const pagination: Pagination = new Pagination(
            this.firstPage(paginationRequirements),
            this.lastPage(paginationRequirements),
            this.nextPage(paginationRequirements),
            this.previousPage(paginationRequirements)
        )
        return pagination;
    }

    private firstPage(paginationRequirements): string|null {
        return `http://localhost:3000/${paginationRequirements.urlSuffix}?limit=${paginationRequirements.limit}&offset=0`;
    }

    private previousPage(paginationRequirements): string|null {
        const previousOffset: number = Number(paginationRequirements.offset) - Number(paginationRequirements.limit); 
        if(previousOffset < 0) {
            return null
        };
        return `http://localhost:3000/${paginationRequirements.urlSuffix}?limit=${paginationRequirements.limit}&offset=${previousOffset}`;
    };

    private nextPage(paginationRequirements): string|null {
        const nextOffset: number = Number(paginationRequirements.offset) + Number(paginationRequirements.limit); 
        const totalNumberOfPages: number = Math.ceil(paginationRequirements.numberOfElements / paginationRequirements.limit);
        if(paginationRequirements.offset !== 0 && (paginationRequirements.offset / paginationRequirements.limit + 1) >= totalNumberOfPages) {
            return null;
        };

        return `http://localhost:3000/${paginationRequirements.urlSuffix}?limit=${paginationRequirements.limit}&offset=${nextOffset}`
    };

    private lastPage(paginationRequirements): string|null {
        const totalNumberOfPages: number = Math.ceil(Number(paginationRequirements.numberOfElements) / Number(paginationRequirements.limit));
        const lastOffset: number = (paginationRequirements.limit * totalNumberOfPages) - paginationRequirements.limit
        return `http://localhost:3000/${paginationRequirements.urlSuffix}?limit=${paginationRequirements.limit}&offset=${lastOffset}`;
    }

}