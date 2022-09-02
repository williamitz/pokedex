import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDTO {
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    page?: number;
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    // @Min(5)
    limit?: number;

}