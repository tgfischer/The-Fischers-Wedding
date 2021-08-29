export type ReservationDto = {
  id: string;
  address?: string;
  guests: GuestDto[];
  createdAt: Date;
  updatedAt: Date;
};

export type GuestDto = {
  id: string;
  firstName: string;
  lastName: string;
  reservationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GuestMetadataDto = {
  id: string;
  status: "pending" | "attending" | "not attending";
  meal: string;
  song?: string;
  guestId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GuestFormData = Pick<GuestDto, "firstName" | "lastName"> &
  Partial<Pick<GuestDto, "id">>;

export type AddReservationFormData = {
  id?: string;
  address: string;
  guests: GuestFormData[];
};
