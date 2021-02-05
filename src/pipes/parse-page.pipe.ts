import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParsePagePipe implements PipeTransform {
  constructor(private defaultValue: number) {}
  transform(value: any, metadata: ArgumentMetadata): number {
    if (!value) {
      return this.defaultValue;
    }
    const page = parseInt(value);
    if (isNaN(page)) {
      throw new BadRequestException('Page must be an inteeger');
    }
    if (page <= 0) {
      return this.defaultValue;
    }
    return page;
  }
}
