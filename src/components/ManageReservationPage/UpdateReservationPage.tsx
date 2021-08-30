import { UpdateReservationFormData } from "../../types";

import { useUpdateReservationPage } from "./hooks";
import { ManageReservation } from "./ManageReservation";
import { UpdateReservationPageProps } from "./types";

export const UpdateReservationPage = (
  props: UpdateReservationPageProps
): JSX.Element => (
  <ManageReservation<UpdateReservationFormData>
    {...useUpdateReservationPage(props)}
  />
);
