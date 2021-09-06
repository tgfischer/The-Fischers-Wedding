export type Invitation = "ceremony" | "dinner" | "reception";

export type ReservationDto = {
  id: string;
  address?: string;
  guests: GuestDto[];
  invitations: Invitation[];
  createdAt: Date;
  updatedAt: Date;
};

export type GuestDto = {
  firstName: string;
  lastName: string;
  status: "pending" | "attending" | "not attending";
  meal?: string;
  song?: string;
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
