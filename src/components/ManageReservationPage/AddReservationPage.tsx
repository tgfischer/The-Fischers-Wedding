import { AddReservationFormData } from "../../types";

import { useAddReservationPage } from "./hooks";
import { ManageReservation } from "./ManageReservation";

export const AddReservationPage = (): JSX.Element => (
  <ManageReservation<AddReservationFormData> {...useAddReservationPage()} />
);
