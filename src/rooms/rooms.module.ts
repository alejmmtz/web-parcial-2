import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
