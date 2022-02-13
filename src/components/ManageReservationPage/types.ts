import type { User } from "@supabase/supabase-js";
import { AnyObjectSchema } from "yup";

import {
  AddReservationBody,
  UpdateReservationBody,
  ReservationDto
} from "../../types";

export type UpdateReservationPageProps = {
  user: User;
  reservation: ReservationDto;
};

export type ManageReservationProps<TData> = {
  schema: AnyObjectSchema;
  isSubmitting: boolean;
  handleSubmit: (reservation: TData) => void;
  initialValues: TData;
  pageTitle: string;
};

export type ManageReservationFormData =
  | AddReservationBody
  | UpdateReservationBody;
