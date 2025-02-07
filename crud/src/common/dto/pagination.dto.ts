import { Type } from "class-transformer";
import { IsInt, IsOptional, Length, Min,  } from "class-validator";
import { IsNull } from "typeorm";

export class PaginatioDTO {
    @Min(1)
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    public readonly limit: number;

    @Min(0)
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    public readonly offset: number;

    public readonly reqHost: string;
}