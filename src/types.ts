export type Invitation = "ceremony" | "dinner" | "reception";

export type Status = "pending" | "attending" | "not attending";

export type MealDto = {
  notes?: string;
};

export type SongDto = {
  name: string;
  artist: string;
};

export type ReservationDto = {
  id: string;
  address?: string;
  guests: GuestDto[];
  invitations: Invitation[];
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type GuestDto = {
  firstName: string;
  lastName: string;
  status: Status;
  meal?: MealDto;
  song?: SongDto;
  isVaccinated?: boolean;
};

export type SongRequestDto = {
  song: SongDto;
  requester: Pick<GuestDto, "firstName" | "lastName">;
};

export type MealRestrictionDto = {
  restriction: Required<MealDto["notes"]>;
  name: string;
};

export type AddReservationFormData = Required<
  Pick<ReservationDto, "invitations" | "address" | "guests">
>;
export type UpdateReservationFormData = Required<
  Pick<ReservationDto, "id" | "invitations" | "address" | "guests">
>;

export type EmptyResponse = Record<string, never>;

export type ErrorResponse = {
  error: string;
};
