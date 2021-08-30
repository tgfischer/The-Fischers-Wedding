export type ReservationDto = {
  id: string;
  address?: string;
  guests: GuestDto[];
  createdAt: Date;
  updatedAt: Date;
};

export type GuestDto = {
  firstName: string;
  lastName: string;
  status?: "attending" | "not attending";
  meal?: string;
  song?: string;
};

export type AddReservationFormData = {
  address: string;
  guests: GuestDto[];
};

export type UpdateReservationFormData = {
  id: string;
  address: string;
  guests: GuestDto[];
};

export type EmptyResponse = Record<string, never>;

export type ErrorResponse = {
  error: string;
};
