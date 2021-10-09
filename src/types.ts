export type Invitation = "ceremony" | "dinner" | "reception";

export type MealDto = {
  notes?: string;
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
  status: "pending" | "attending" | "not attending";
  meal?: MealDto;
  song?: string;
  isVaccinated?: boolean;
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
