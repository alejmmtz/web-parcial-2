import { ConflictException, Injectable, NotImplementedException } from '@nestjs/common';
import { ReservationEntity } from './entities/reservation.entity';

@Injectable()
export class ReservationRulesService {
  ensureCanCancel(reservation: ReservationEntity): void {
    // TODO 2: Implement the cancellation rule. Do not modify or save the reservation here.
    throw new NotImplementedException('TODO 2: implement the cancellation rule');
  }
}
