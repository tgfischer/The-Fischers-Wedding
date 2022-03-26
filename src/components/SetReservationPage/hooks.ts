import { eq } from "lodash/fp";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";
import type { AnyObjectSchema } from "yup";

import { authenticatedRequest } from "../../supabase";
import { ReservationDto, SetReservationBody } from "../../types";

import { SetReservationPageProps } from "./types";

type UseSetReservationPageInstance<TData> = {
  schema: AnyObjectSchema;
  isSuccess: boolean;
  isSubmitting: boolean;
  initialValues: TData;
  handleSubmit: (reservation: TData) => void;
};

type UseSetReservationMutation = Pick<ReservationDto, "id">;

const useSetReservationMutation = ({ id }: UseSetReservationMutation) =>
  useMutation<void, void, SetReservationBody>(
    "setReservation",
    async (body) =>
      await authenticatedRequest(`/api/reservations/${id}`, {
        method: "PUT",
        body
      }),
    {
      onSuccess: useCallback(() => {
        toast("Your reservation has been received!", {
          style: {
            backgroundColor: "#d1e7dd",
            color: "#0f5132",
            fontFamily: "'Source Serif Pro', serif",
            fontSize: "0.9rem"
          }
        });
      }, []),
      onError: useCallback(({ error }) => void toast.error(error), [])
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
            meal: yup.string().notRequired(),
            songs: yup
              .array()
              .of(
                yup
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
                  .required()
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
}: SetReservationPageProps): UseSetReservationPageInstance<SetReservationBody> => {
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
        id: guest.id,
        firstName: guest.firstName,
        lastName: guest.lastName,
        status: guest.status ?? "pending",
        meal: guest.meal ?? "",
        songs:
          guest.songs.length === 0
            ? [{ name: "", artist: "" }]
            : guest.songs.map(({ name, artist }) => ({ name, artist })),
        isVaccinated: guest.isVaccinated ?? false
      }))
    }
  };
};
