import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from '../../rooms/entities/room.entity';

export type ReservationStatus = 'active' | 'cancelled';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 80 })
  purpose!: string;

  @Column({ type: 'int' })
  participants!: number;

  @Column({ type: 'varchar', length: 12, default: 'active' })
  status!: ReservationStatus;

  @ManyToOne(() => RoomEntity, (room) => room.reservations, { nullable: false })
  @JoinColumn({ name: 'room_id' })
  room!: RoomEntity;
}
