import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDTO } from './recados.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMessageDTO extends PartialType(CreateMessageDTO) {
  @IsBoolean()
  @IsOptional()
  lido?: boolean;
}
