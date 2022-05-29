import { User } from "@supabase/supabase-js";

import { ReservationDto } from "../../types";

export type SetReservationPageProps = {
  reservation: ReservationDto;
  user: User | null;
};

export type LocationProps = Pick<ReservationDto, "invitations">;
