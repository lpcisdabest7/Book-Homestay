import { NumberField, StringField } from '../../../decorators/field.decorators';
import {
  IsArray,
  IsString,
  ArrayNotEmpty,
  IsNumber,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CountryCode, CURRENCY } from '../enum/homestay.enum';

export class PriceDto {
  @IsNumber()
  amount: number;

  @IsEnum(CURRENCY)
  currency: CURRENCY;
}

export class CreateHomestayDto {
  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @StringField()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];

  @StringField()
  description: string;

  @NumberField()
  bedroomOption: number;

  @NumberField()
  bathroomOption: number;

  @NumberField()
  livingRoomOption: number;

  @StringField()
  @IsEnum(CountryCode)
  address: CountryCode;

  @NumberField()
  latitude: number;

  @NumberField()
  longitude: number;

  @NumberField()
  maxGuest: number;
}
