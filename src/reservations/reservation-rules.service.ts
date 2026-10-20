import {
  ConflictException,
  Injectable,
  NotImplementedException,
} from "@nestjs/common";
import { ReservationEntity } from "./entities/reservation.entity";

@Injectable()
export class ReservationRulesService {
  ensureCanCancel(reservation: ReservationEntity): void {
    // TODO 2: Implement the cancellation rule. Do not modify or save the reservation here.
    if (reservation.status == "cancelled") {
      throw new ConflictException(
        "Reservation with purpose '" +
          reservation.purpose +
          "' is already cancelled, a reservation must be active to cancel it",
      );
    }
  }
}
