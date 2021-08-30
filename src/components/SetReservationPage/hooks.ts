import { useMutation } from "react-query";
import * as yup from "yup";
import type { AnyObjectSchema } from "yup";

import { authenticatedRequest } from "../../supabase";
import { ReservationDto } from "../../types";

import { SetReservationFormData, SetReservationPageProps } from "./types";

type UseSetReservationPageInstance<TData> = {
  schema: AnyObjectSchema;
  isSubmitting: boolean;
  initialValues: TData;
  handleSubmit: (reservation: TData) => void;
};

type UseSetReservationMutation = Pick<ReservationDto, "id">;

const useSetReservationMutation = ({ id }: UseSetReservationMutation) =>
  useMutation<void, void, SetReservationFormData>(
    async (body) =>
      await authenticatedRequest(`/api/reservations/${id}`, {
        method: "PUT",
        body
      })
  );

const schema = yup
  .object()
  .shape({
    guests: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            status: yup
              .string()
              .oneOf(["attending", "not attending"])
              .required(),
            meal: yup.string().required(),
            song: yup.string().notRequired()
          })
          .required()
      )
      .required()
  })
  .required();

export const useSetReservationPage = ({
  reservation
}: SetReservationPageProps): UseSetReservationPageInstance<SetReservationFormData> => {
  const { mutate: handleSubmit, isLoading: isSubmitting } =
    useSetReservationMutation({
      id: reservation.id
    });

  return {
    schema,
    isSubmitting,
    handleSubmit,
    initialValues: {
      guests: reservation.guests.map((guest) => ({
        firstName: guest.firstName,
        lastName: guest.lastName,
        meal: guest.meal ?? "",
        song: guest.song ?? "",
        status: guest.status
      }))
    }
  };
};
