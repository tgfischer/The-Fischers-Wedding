import type { User } from "@supabase/supabase-js";

import { ReservationDto } from "../../types";

export type ManageReservationPageProps = {
  user: User;
  reservation?: ReservationDto;
};
