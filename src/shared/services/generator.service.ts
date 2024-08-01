import { Injectable, Scope } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class GeneratorService {
  public uuid(): string {
    return uuid();
  }

  public fileName(ext: string): string {
    return this.uuid() + '.' + ext;
  }
}
