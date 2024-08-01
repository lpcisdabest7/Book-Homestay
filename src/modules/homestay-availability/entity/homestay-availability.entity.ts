import { HomeStayEntity } from '../../../../src/modules/homestay/entity/homestay.entity';
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
  name: 'homestay_availability',
})
export class HomestayAvailabilityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => HomeStayEntity)
  @JoinColumn({ name: 'homestayId' })
  homestayId: HomeStayEntity;

  @Column({ type: 'date', nullable: false })
  availableFrom: Date;

  @Column({ type: 'date', nullable: false })
  availableTo: Date;

  @Column({ type: 'boolean', default: false })
  isBooking: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
