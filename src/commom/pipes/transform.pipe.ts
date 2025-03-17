import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PipeNumericID implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const valueTransformed = Number(value);

    if (isNaN(valueTransformed)) {
      throw new BadRequestException('valor deve ser uma string numerica');
    }

    if (valueTransformed < 0) {
      throw new BadRequestException('valor deve ser positivo');
    }

    return valueTransformed;
  }
}
