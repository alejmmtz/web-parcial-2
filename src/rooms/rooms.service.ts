import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomsRepository: Repository<RoomEntity>,
  ) {}

  findAll(): Promise<RoomEntity[]> {
    return this.roomsRepository.find({ order: { id: 'ASC' } });
  }
}
