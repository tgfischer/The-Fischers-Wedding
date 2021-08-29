import router from "next/router";
import { useCallback, useMemo } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import type { AnyObjectSchema } from "yup";

import { authenticatedRequest } from "../../supabase";
import { AddReservationFormData } from "../../types";

import { ManageReservationPageProps } from "./types";

type UseManageReservationPageInstance = {
  schema: AnyObjectSchema;
  isSubmitting: boolean;
  handleSubmit: (reservation: AddReservationFormData) => void;
  initialValues: AddReservationFormData;
};

const useManageReservationMutation = () =>
  useMutation<void, void, AddReservationFormData>(
    async (reservation) =>
      await authenticatedRequest("/api/reservations", {
        method: reservation.id ? "PUT" : "POST",
        body: reservation
      }),
    {
      onSuccess: useCallback(() => router.push("/reservations"), [])
    }
  );

const schema = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    address: yup.string().notRequired(),
    guests: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            id: yup.string().notRequired(),
            firstName: yup.string().required(),
            lastName: yup.string().required()
          })
          .required()
      )
      .min(1)
      .required()
  })
  .required();

export const useManageReservationPage = ({
  reservation
}: ManageReservationPageProps): UseManageReservationPageInstance => {
  const { mutate: handleSubmit, isLoading: isSubmitting } =
    useManageReservationMutation();

  return {
    handleSubmit,
    isSubmitting,
    schema,
    initialValues: useMemo(
      () =>
        reservation
          ? {
              id: reservation.id,
              address: reservation.address ?? "",
              guests: reservation.guests.map((guest) => ({
                id: guest.id,
                firstName: guest.firstName,
                lastName: guest.lastName
              }))
            }
          : {
              address: "",
              guests: [{ firstName: "", lastName: "" }]
            },
      [reservation]
    )
  };
};
