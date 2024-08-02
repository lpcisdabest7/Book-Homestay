import { PageOptionsDto } from '../../../common/dto/page-options.dto';
import {
  DateFieldOptional,
  NumberField,
  NumberFieldOptional,
  oneDayLater,
  now,
} from '../../../decorators/field.decorators';

export class QueryListHomestayDto extends PageOptionsDto {
  @NumberField({ default: 105.8296 })
  longitude: number;

  @NumberField({ default: 21.0328 })
  latitude: number;

  @NumberFieldOptional({ default: 0 })
  minPrice?: number;

  @NumberFieldOptional({ default: 100 })
  maxPrice?: number;

  @NumberFieldOptional({ default: 500 })
  radius: number;

  @NumberFieldOptional({ default: 4 })
  maxGuest?: number;

  @DateFieldOptional({ default: now() })
  checkInDate?: Date;

  @DateFieldOptional({ default: oneDayLater() })
  checkOutDate?: Date;
}
