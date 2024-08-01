import { NumberField, StringField } from '../../../decorators/field.decorators';
import {
  IsArray,
  IsString,
  ArrayNotEmpty,
  IsNumber,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { CURRENCY } from '../enum/homestay-currency.enum';
import { Type } from 'class-transformer';
import { CountryCode } from '../enum/homestay-country-code.enum';

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
