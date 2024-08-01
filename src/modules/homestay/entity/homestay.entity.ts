import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Geometry,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CURRENCY } from '../enum/homestay-currency.enum';
import { CountryCode } from '../enum/homestay-country-code.enum';

@Entity({
  name: 'homestays',
})
export class HomeStayEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb', nullable: false })
  price: {
    amount: number;
    currency: CURRENCY;
  };

  @Column({ nullable: true, type: 'text' })
  name: string;

  @Column({ nullable: true, type: 'int' })
  bedroomOption: number;

  @Column({ nullable: true, type: 'int' })
  bathroomOption: number;

  @Column({ nullable: true, type: 'int' })
  livingRoomOption: number;

  @Column({ nullable: true, type: 'simple-array' })
  images: string[];

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'text' })
  address: CountryCode;

  @Column({ type: 'real', nullable: false })
  latitude: number;

  @Column({ type: 'real', nullable: false })
  longitude: number;

  @Column({ type: 'int', nullable: false })
  maxGuest: number;

  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 3857,
  })
  geog: Geometry;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setGeography() {
    if (this.latitude !== undefined && this.longitude !== undefined) {
      this.geog = {
        type: 'Point',
        coordinates: [this.longitude, this.latitude],
      } as Geometry;
    }
  }
}
