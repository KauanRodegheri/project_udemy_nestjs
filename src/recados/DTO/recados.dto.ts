import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMessageDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  texto: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  de: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  para: string;
}
