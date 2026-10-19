import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../rooms/entities/room.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationEntity } from './entities/reservation.entity';
import { ReservationRulesService } from './reservation-rules.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationsRepository: Repository<ReservationEntity>,
    @InjectRepository(RoomEntity)
    private readonly roomsRepository: Repository<RoomEntity>,
    // TODO 2: Inject ReservationRulesService through this constructor.
  ) {}

  async cancel(id: number): Promise<ReservationEntity> {
    // TODO 2: Coordinate the operation according to the examination.
    throw new NotImplementedException('TODO 2: implement cancellation');
  }

  // The methods below are completed. Do not change them.
  async create(dto: CreateReservationDto): Promise<ReservationEntity> {
    const room = await this.roomsRepository.findOneBy({ id: dto.roomId });
    if (!room) throw new NotFoundException('Room was not found');

    const reservation = this.reservationsRepository.create({
      purpose: dto.purpose,
      participants: dto.participants,
      status: 'active',
      room,
    });
    return this.reservationsRepository.save(reservation);
  }

  findAll(): Promise<ReservationEntity[]> {
    return this.reservationsRepository.find({
      relations: { room: true },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<ReservationEntity> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
      relations: { room: true },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} was not found`);
    }
    return reservation;
  }
}
