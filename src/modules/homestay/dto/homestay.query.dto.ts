import { Min, MinDate } from 'class-validator';
import { PageOptionsDto } from '../../../common/dto/page-options.dto';
import {
  DateFieldOptional,
  NumberField,
  NumberFieldOptional,
  oneDayLater,
  now,
  IsDateRangeValid,
} from '../../../decorators/field.decorators';

export class QueryListHomestayDto extends PageOptionsDto {
  @NumberField({ default: 105.8296 })
  longitude: number;

  @NumberField({ default: 21.0328 })
  latitude: number;

  @NumberFieldOptional({ default: 0 })
  @Min(0, { message: 'minPrice must be a non-negative number' })
  minPrice?: number;

  @NumberFieldOptional({ default: 100 })
  @Min(0, { message: 'maxPrice must be a non-negative number' })
  maxPrice?: number;

  @NumberFieldOptional({ default: 500 })
  @Min(0, { message: 'radius must be a non-negative number' })
  radius: number;

  @NumberFieldOptional({ default: 4 })
  @Min(1, { message: 'maxGuest must be at least 1' })
  maxGuest?: number;

  @DateFieldOptional({ default: now() })
  @MinDate(new Date(), { message: 'checkInDate cannot be before today' })
  checkInDate?: Date;

  @DateFieldOptional({ default: oneDayLater() })
  @IsDateRangeValid({ message: 'checkOutDate must be after checkInDate' })
  checkOutDate?: Date;
}
