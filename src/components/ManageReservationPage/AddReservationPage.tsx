import { AddReservationBody } from "../../types";

import { useAddReservationPage } from "./hooks";
import { ManageReservation } from "./ManageReservation";
import { AddReservationPageProps } from "./types";

export const AddReservationPage = (
  props: AddReservationPageProps
): JSX.Element => (
  <ManageReservation<AddReservationBody> {...useAddReservationPage(props)} />
);
