export type InvitationDto = "ceremony" | "dinner" | "reception";

export type Status = "pending" | "attending" | "not attending";

export type ReservationData = {
  id: string;
  address?: string;
  invitations: InvitationDto[];
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type GuestData = {
  id: number;
  firstName: string;
  lastName: string;
  status: Status;
  meal?: string;
  isVaccinated: boolean;
  reservationId: string;
};

export type SongData = {
  id: number;
  name: string;
  artist: string;
  guestId: number;
};

export type ReservationDto = ReservationData & {
  guests: GuestDto[];
};

export type GuestDto = Omit<GuestData, "reservationId"> & {
  songs: SongDto[];
};

export type SongDto = Omit<SongData, "guestId"> & {
  requester: Pick<GuestData, "firstName" | "lastName">;
};

export type MealRestrictionDto = Pick<
  GuestData,
  "id" | "firstName" | "lastName" | "meal"
>;

export type AddReservationBody = Pick<
  ReservationDto,
  "address" | "invitations"
> & {
  guests: Pick<GuestDto, "firstName" | "lastName">[];
};

export type UpdateReservationBody = Pick<
  ReservationDto,
  "id" | "address" | "invitations"
> & {
  guests: Pick<GuestDto, "id" | "firstName" | "lastName">[];
};

export type EmptyResponse = Record<string, never>;

export type ErrorResponse = {
  error: string;
};

export type LoginDto = {
  email: string;
  password: string;
};
