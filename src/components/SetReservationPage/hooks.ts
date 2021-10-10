import { eq } from "lodash/fp";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";
import type { AnyObjectSchema } from "yup";

import { authenticatedRequest } from "../../supabase";
import { ReservationDto } from "../../types";

import { SetReservationFormData, SetReservationPageProps } from "./types";

type UseSetReservationPageInstance<TData> = {
  schema: AnyObjectSchema;
  isSuccess: boolean;
  isSubmitting: boolean;
  initialValues: TData;
  handleSubmit: (reservation: TData) => void;
};

type UseSetReservationMutation = Pick<ReservationDto, "id">;

const useSetReservationMutation = ({ id }: UseSetReservationMutation) =>
  useMutation<void, void, SetReservationFormData>(
    "setReservation",
    async (body) =>
      await authenticatedRequest(`/api/reservations/${id}`, {
        method: "PUT",
        body
      }),
    {
      onSuccess: () => {
        toast("Your reservation has been received!");
      }
    }
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
            meal: yup
              .object()
              .shape({ notes: yup.string().notRequired() })
              .notRequired(),
            song: yup
              .object()
              .shape({
                name: yup.string().notRequired(),
                artist: yup.string().when("name", {
                  is: (name: string) => Boolean(name),
                  then: yup.string().required(),
                  otherwise: yup.string().notRequired()
                })
              })
              .test(
                "song",
                ({ name, artist }) =>
                  (Boolean(name) && Boolean(artist)) || (!name && !artist)
              )
              .required(),
            isVaccinated: yup.boolean().when("status", {
              is: eq("attending"),
              then: yup.boolean().isTrue().required(),
              otherwise: yup.boolean().notRequired()
            })
          })
          .required()
      )
      .required()
  })
  .required();

export const useSetReservationPage = ({
  reservation
}: SetReservationPageProps): UseSetReservationPageInstance<SetReservationFormData> => {
  const {
    mutate: handleSubmit,
    isLoading: isSubmitting,
    isSuccess
  } = useSetReservationMutation({
    id: reservation.id
  });

  return {
    schema,
    isSuccess,
    isSubmitting,
    handleSubmit,
    initialValues: {
      guests: reservation.guests.map((guest) => ({
        firstName: guest.firstName,
        lastName: guest.lastName,
        status: guest.status ?? "pending",
        meal: guest.meal ?? { notes: "" },
        song: guest.song ?? { name: "", artist: "" },
        isVaccinated: guest.isVaccinated ?? false
      }))
    }
  };
};
