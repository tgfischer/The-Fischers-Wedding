import router from "next/router";
import { useCallback } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";
import type { AnyObjectSchema } from "yup";

import { authenticatedRequest } from "../../supabase";
import { AddReservationFormData } from "../../types";

type UseAddReservationPageInstance = {
  schema: AnyObjectSchema;
  isSubmitting: boolean;
  handleSubmit: (reservation: AddReservationFormData) => void;
};

const useAddReservationMutation = () =>
  useMutation<void, void, AddReservationFormData>(
    async (reservation) =>
      await authenticatedRequest("/api/reservations", {
        method: "POST",
        body: reservation
      }),
    {
      onSuccess: useCallback(() => router.push("/dashboard"), [])
    }
  );

const schema = yup
  .object()
  .shape({
    address: yup.string().notRequired(),
    guests: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            firstName: yup.string().required(),
            lastName: yup.string().required()
          })
          .required()
      )
      .min(1)
      .required()
  })
  .required();

export const useAddReservationPage = (): UseAddReservationPageInstance => {
  const { mutate: handleSubmit, isLoading: isSubmitting } =
    useAddReservationMutation();

  return {
    handleSubmit,
    isSubmitting,
    schema
  };
};
