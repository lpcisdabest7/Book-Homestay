import {
  CURRENCY,
  StatusBooking,
} from '../../../../src/modules/homestay/enum/homestay.enum';
import { HomeStayEntity } from '../../../../src/modules/homestay/entity/homestay.entity';
import { UserEntity } from '../../../../src/modules/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'bookings',
})
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'userId' })
  userId: string;

  @ManyToOne(() => HomeStayEntity, { nullable: true })
  @JoinColumn({ name: 'homestayId' })
  homestayId: string;

  @Column({ type: 'timestamp', nullable: true })
  checkIn: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkOut: Date;

  @Column({ type: 'date', nullable: false })
  availableFrom: Date;

  @Column({ type: 'date', nullable: false })
  availableTo: Date;

  @Column({ type: 'int', nullable: false })
  guestCount: number;

  @Column({ type: 'jsonb', nullable: true })
  totalPrice: {
    amount: number;
    currency: CURRENCY;
  };

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: StatusBooking;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
