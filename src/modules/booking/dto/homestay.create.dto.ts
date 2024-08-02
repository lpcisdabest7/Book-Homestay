import {
  DateField,
  NumberField,
  now,
  oneDayLater,
  StringField,
} from '../../../decorators/field.decorators';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PriceDto } from '../../../../src/modules/homestay/dto/homestay.create.dto';

export class CreateBookingDto {
  @ValidateNested()
  @Type(() => PriceDto)
  totalPrice: PriceDto;

  @DateField({ default: now() })
  availableFrom: Date;

  @DateField({ default: oneDayLater() })
  availableTo: Date;

  @NumberField({ default: 1 })
  guestCount: number;

  @StringField()
  homestayId: string;
}
