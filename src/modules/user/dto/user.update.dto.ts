import { DateField, StringField } from '../../../decorators/field.decorators';

export class UpdateUserDto {
  @StringField()
  username: string;

  @StringField()
  passport: string;

  @StringField()
  address: string;

  @DateField()
  birthday: Date;
}
