export type ReservationDto = {
  id: string;
  address?: string;
  song?: string;
  guests: GuestDto[];
  createdAt: Date;
  updatedAt: Date;
};

export type GuestDto = {
  id: string;
  firstName: string;
  lastName: string;
  status: "pending" | "attending" | "not attending";
  meal: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GuestFormData = Pick<GuestDto, "firstName" | "lastName">;

export type AddReservationFormData = {
  address: string;
  guests: GuestFormData[];
};
