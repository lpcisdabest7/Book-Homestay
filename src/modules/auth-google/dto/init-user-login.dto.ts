import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InitUserLoginDto {
  @ApiProperty({ example: 'abc' })
  @IsNotEmpty()
  sessionId: string;
}
