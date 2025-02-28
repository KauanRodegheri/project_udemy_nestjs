import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @Min(0)
  @Max(50)
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsInt()
  @IsOptional()
  offset: number;
}
