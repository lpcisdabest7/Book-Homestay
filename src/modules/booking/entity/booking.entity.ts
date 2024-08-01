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
  id: number;

  @ManyToOne(() => UserEntity, { nullable: false })
  @JoinColumn({ name: 'userId' })
  userId: UserEntity;

  @ManyToOne(() => HomeStayEntity, { nullable: false })
  @JoinColumn({ name: 'homestayId' })
  homestayId: HomeStayEntity;

  @Column({ type: 'timestamp', nullable: false })
  checkIn: Date;

  @Column({ type: 'timestamp', nullable: false })
  checkOut: Date;

  @Column({ type: 'int', nullable: false })
  guestCount: number;

  @Column({ type: 'float', nullable: false })
  totalPrice: number;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: string; // Options: 'pending', 'success', 'cancel'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
