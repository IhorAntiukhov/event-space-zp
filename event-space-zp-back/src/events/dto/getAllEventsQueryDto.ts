import { IsEnum, IsOptional, IsString } from "class-validator";
import { Category } from "generated/prisma/enums";

export class GetAllEventsQueryDto {
  @IsString()
  @IsEnum(Category)
  @IsOptional()
  category: Category;
}
