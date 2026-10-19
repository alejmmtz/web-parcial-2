import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../rooms/entities/room.entity';
import { ReservationEntity } from './entities/reservation.entity';

@Injectable()
export class ReservationSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomsRepository: Repository<RoomEntity>,
    @InjectRepository(ReservationEntity)
    private readonly reservationsRepository: Repository<ReservationEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    // Only seed a completely empty database. Preserve existing examination work.
    const roomCount = await this.roomsRepository.count();
    const reservationCount = await this.reservationsRepository.count();
    if (roomCount > 0 || reservationCount > 0) return;

    const rooms = await this.roomsRepository.save(
      this.roomsRepository.create([{ name: 'Room A' }, { name: 'Room B' }]),
    );
    const reservations = this.reservationsRepository.create([
      { purpose: 'Sprint planning', participants: 6, status: 'active', room: rooms[0] },
      { purpose: 'Design review', participants: 4, status: 'active', room: rooms[1] },
      { purpose: 'Cancelled workshop', participants: 8, status: 'cancelled', room: rooms[0] },
    ]);
    await this.reservationsRepository.save(reservations);
  }
}
