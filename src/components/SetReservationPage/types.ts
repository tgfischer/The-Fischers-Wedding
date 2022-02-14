import { ReservationDto } from "../../types";

export type SetReservationPageProps = {
  reservation: ReservationDto;
};

export type LocationProps = Pick<ReservationDto, "invitations">;
