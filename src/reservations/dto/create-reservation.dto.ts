import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateReservationDto {
  // TODO 1: Add the validators required by the examination. Do not convert body numbers.
  purpose!: string;
  participants!: number;
  roomId!: number;
}
