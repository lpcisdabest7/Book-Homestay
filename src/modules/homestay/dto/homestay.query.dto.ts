import { PageOptionsDto } from '../../../common/dto/page-options.dto';
import {
  NumberField,
  NumberFieldOptional,
} from '../../../decorators/field.decorators';

export class QueryListHomestayDto extends PageOptionsDto {
  @NumberField()
  longitude: number;

  @NumberField()
  latitude: number;

  @NumberFieldOptional({ default: 500 })
  radius: number;

  @NumberFieldOptional({ default: 4 })
  maxGuest?: number;
}
