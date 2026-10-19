import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class CreateReservationDto {
  // TODO 1: Add the validators required by the examination. Do not convert body numbers.
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  purpose!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(20)
  participants!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  roomId!: number;
}
