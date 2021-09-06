import router from "next/router";
import { useCallback } from "react";
import { useMutation } from "react-query";
import * as yup from "yup";

import { authenticatedRequest } from "../../supabase";
import { AddReservationFormData, UpdateReservationFormData } from "../../types";

import { ManageReservationProps, UpdateReservationPageProps } from "./types";

const useAddReservationMutation = () =>
  useMutation<void, void, AddReservationFormData>(
    async (reservation) =>
      await authenticatedRequest("/api/reservations", {
        method: "POST",
        body: reservation
      }),
    {
      onSuccess: useCallback(() => router.push("/reservations"), [])
    }
  );
const useUpdateReservationMutation = () =>
  useMutation<void, void, UpdateReservationFormData>(
    async (reservation) =>
      await authenticatedRequest("/api/reservations", {
        method: "PUT",
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
    invitations: yup
      .array()
      .of(yup.string().oneOf(["ceremony", "dinner", "reception"]).required())
      .min(1)
      .required(),
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

export const useAddReservationPage =
  (): ManageReservationProps<AddReservationFormData> => {
    const { mutate: handleSubmit, isLoading: isSubmitting } =
      useAddReservationMutation();

    return {
      handleSubmit,
      isSubmitting,
      schema,
      initialValues: {
        invitations: [],
        address: "",
        guests: [{ firstName: "", lastName: "", status: "pending" }]
      },
      pageTitle: "Add reservation"
    };
  };

export const useUpdateReservationPage = ({
  reservation
}: UpdateReservationPageProps): ManageReservationProps<UpdateReservationFormData> => {
  const { mutate: handleSubmit, isLoading: isSubmitting } =
    useUpdateReservationMutation();

  return {
    handleSubmit,
    isSubmitting,
    schema,
    initialValues: {
      id: reservation.id,
      invitations: reservation.invitations,
      address: reservation.address ?? "",
      guests: reservation.guests
    },
    pageTitle: "Update reservation"
  };
};
