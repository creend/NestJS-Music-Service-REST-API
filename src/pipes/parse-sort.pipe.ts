import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SortTypes } from 'src/interfaces/find-query';

@Injectable()
export class ParseSortPipe implements PipeTransform {
  constructor(private defaultValue: SortTypes) {}
  transform(value: string, metadata: ArgumentMetadata): SortTypes {
    if (!value) {
      return this.defaultValue;
    }
    if (value !== SortTypes.ASCENDING && value !== SortTypes.DESCENDING) {
      return SortTypes.DESCENDING;
    }
    return value;
  }
}
