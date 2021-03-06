import {
  ExecutionContext,
  BadRequestException,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { Request } from 'express';

@Injectable()
export class CheckIdParamGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!isMongoId(request.params.id)) {
      throw new BadRequestException('Id must be correct id');
    }
    return true;
  }
}
