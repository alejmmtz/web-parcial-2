import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { requestValidationPipe } from '../common/request-validation.pipe';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // TODO 1: Implement POST /api/reservations with a validated CreateReservationDto.

  // TODO 2: Implement PATCH /api/reservations/:id/cancel with ParseIntPipe and no body.

  // The endpoints below are completed. Do not change them.
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.findOne(id);
  }
}
