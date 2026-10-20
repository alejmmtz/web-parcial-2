import { ConflictException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { RoomEntity } from "../rooms/entities/room.entity";
import { ReservationEntity } from "./entities/reservation.entity";
import { ReservationRulesService } from "./reservation-rules.service";
import { ReservationsService } from "./reservations.service";
import { describe, it, expect, beforeEach, jest } from "@jest/globals";

describe("ReservationsService", () => {
  let service: ReservationsService;
  let reservationsRepositoryMock = {
    findOne: jest.fn<(options: any) => Promise<ReservationEntity | null>>(),
    find: jest.fn<(options: any) => Promise<ReservationEntity | null>>(),
    create: jest.fn(),
    save: jest.fn<(options: any) => Promise<ReservationEntity | null>>(),
  };
  let roomsRepositoryMock = { findOneBy: jest.fn() };
  let reservationRulesServiceMock = {
    ensureCanCancel: jest.fn<(options: any) => ConflictException | null>(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(ReservationEntity),
          useValue: reservationsRepositoryMock,
        },
        {
          provide: getRepositoryToken(RoomEntity),
          useValue: roomsRepositoryMock,
        },
        {
          provide: ReservationRulesService,
          useValue: reservationRulesServiceMock,
        },
      ],
    }).compile();
    service = moduleRef.get(ReservationsService);
  });

  it("cancels an active reservation and returns the saved result", async () => {
    const reservation = {
      id: 7,
      purpose: "Project planning",
      participants: 6,
      status: "active",
      room: { id: 1, name: "Room A" },
    } as ReservationEntity;
    const savedReservation = {
      ...reservation,
      status: "cancelled",
    } as ReservationEntity;

    // TODO TEST 2: Arrange dependencies, call cancel(7), and check the required behavior.
    reservationsRepositoryMock.findOne.mockResolvedValue(reservation);
    reservationsRepositoryMock.save.mockResolvedValue(savedReservation);

    const result = await service.cancel(7);
    expect(result).toBe(savedReservation);
    expect(reservationRulesServiceMock.ensureCanCancel(reservation))
      .toHaveBeenCalled;

    expect(reservationsRepositoryMock.save).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "cancelled",
      }),
    );
  });

  it("does not change or save a reservation when the rule rejects cancellation", async () => {
    const reservation = {
      id: 9,
      purpose: "Team review",
      participants: 4,
      status: "active",
      room: { id: 2, name: "Room B" },
    } as ReservationEntity;

    // TODO TEST 3: Make the mock rule reject this ACTIVE reservation, as requested.
    reservationRulesServiceMock.ensureCanCancel.mockImplementation(() => {
      throw new ConflictException("Reservation must be active to cancel it");
    });

    reservationsRepositoryMock.findOne.mockResolvedValue(reservation);

    // Check the exception, the unchanged state, and the absence of a save() call.
    expect(() => service.cancel(9)).rejects.toBeInstanceOf(ConflictException);
    expect((await service.findOne(9)).status).toBe("active");
    expect(reservationsRepositoryMock.save).not.toHaveBeenCalled();
  });
});
