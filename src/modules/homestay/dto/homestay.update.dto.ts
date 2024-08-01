import {
  IsArray,
  IsString,
  IsOptional,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import {
  NumberFieldOptional,
  StringFieldOptional,
} from '../../../decorators/field.decorators';
import { PriceDto } from './homestay.create.dto';
import { Type } from 'class-transformer';
import { CountryCode } from '../enum/homestay-country-code.enum';

export class UpdateHomestayDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @StringFieldOptional()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @StringFieldOptional()
  description: string;

  @NumberFieldOptional()
  bedroomOption: number;

  @NumberFieldOptional()
  bathroomOption: number;

  @NumberFieldOptional()
  livingRoomOption: number;

  @StringFieldOptional()
  @IsEnum(CountryCode)
  address: CountryCode;

  @NumberFieldOptional()
  latitude: number;

  @NumberFieldOptional()
  longitude: number;

  @NumberFieldOptional()
  maxGuest: number;
}
