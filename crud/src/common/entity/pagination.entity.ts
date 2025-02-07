import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class Pagination {
        @Min(1)
        @IsInt()
        @IsOptional()
        @Type(() => Number)
        public limit: number;
    
        @Min(0)
        @IsInt()
        @IsOptional()
        @Type(() => Number)
        public offset: number;

        public reqHost: string;

        public url: string;

        public numberOfElements: number;

        constructor(limit: number, offset: number, url: string, numberOfElements: number) {
            this.limit = Number(limit),
            this.offset = Number(offset),
            this.url = url,
            this.numberOfElements = Number(numberOfElements);
        }

        firstPage(): string {
            return `${this.url}?limit=${this.limit}&offset=0`;
        }

        previousPage(): string|null {
            const previousOffset: number = this.offset - this.limit; 
            if(previousOffset < 0) {
                return null
            };
            return `http://${this.url}?limit=${this.limit}&offset=${previousOffset}`;
        };

        nextPage(): string|null {
            const nextOffset: number = this.offset + this.limit; 
            const totalNumberOfPages: number = Math.ceil(this.numberOfElements / this.limit);
            if(this.offset !== 0 && (this.offset / this.limit + 1) >= totalNumberOfPages) {
                return null;
            };

            return `http://${this.url}?limit=${this.limit}&offset=${nextOffset}`
        };

        lastPage(): string {
            const totalNumberOfPages: number = Math.ceil(this.numberOfElements / this.limit);
            const lastOffset: number = (this.limit * totalNumberOfPages) - this.limit
            return `http://${this.url}?limit=${this.limit}&offset=${lastOffset}`;
        }
}