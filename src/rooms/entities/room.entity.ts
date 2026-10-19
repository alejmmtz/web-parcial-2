import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReservationEntity } from '../../reservations/entities/reservation.entity';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 80 })
  name!: string;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.room)
  reservations!: ReservationEntity[];
}
