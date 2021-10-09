import { ReservationDto } from "../../types";

export type SetReservationFormData = Pick<ReservationDto, "guests">;

export type SetReservationPageProps = {
  reservation: ReservationDto;
};

export type LocationProps = Pick<ReservationDto, "invitations">;
