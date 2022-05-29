import router from "next/router";
import { useCallback } from "react";
import { Button } from "react-bootstrap";
import { useMutation } from "react-query";
import * as yup from "yup";

import { authenticatedRequest } from "../../supabase";
import {
  AddReservationBody,
  DeleteReservationMutationOptions,
  UpdateReservationBody
} from "../../types";

import {
  AddReservationPageProps,
  ManageReservationProps,
  UpdateReservationPageProps
} from "./types";

const useAddReservationMutation = () =>
  useMutation<void, void, AddReservationBody>(
    async (reservation) =>
      await authenticatedRequest("/api/reservations", {
        method: "POST",
        body: reservation
      }),
    { onSuccess: useCallback(() => router.push("/reservations"), []) }
  );

const useDeleteReservationMutation = ({
  reservationId
}: DeleteReservationMutationOptions) =>
  useMutation(
    async () =>
      await authenticatedRequest(`/api/reservations/${reservationId}`, {
        method: "DELETE"
      }),
    { onSuccess: useCallback(() => router.replace("/reservations"), []) }
  );

const useUpdateReservationMutation = () =>
  useMutation<void, void, UpdateReservationBody>(
    async (reservation) =>
      await authenticatedRequest("/api/reservations", {
        method: "PUT",
        body: reservation
      }),
    { onSuccess: useCallback(() => router.push("/reservations"), []) }
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

export const useAddReservationPage = ({
  user
}: AddReservationPageProps): ManageReservationProps<AddReservationBody> => {
  const { mutate: handleSubmit, isLoading: isSubmitting } =
    useAddReservationMutation();

  return {
    user,
    handleSubmit,
    isSubmitting,
    schema,
    initialValues: {
      invitations: [],
      address: "",
      guests: [{ firstName: "", lastName: "" }]
    },
    pageTitle: "Add reservation"
  };
};

export const useUpdateReservationPage = ({
  reservation,
  user
}: UpdateReservationPageProps): ManageReservationProps<UpdateReservationBody> => {
  const { mutate: handleSubmit, isLoading: isSubmitting } =
    useUpdateReservationMutation();

  const { mutate: handleDelete, isLoading: isDeleting } =
    useDeleteReservationMutation({ reservationId: reservation.id });

  return {
    user,
    handleSubmit,
    isSubmitting,
    schema,
    initialValues: {
      id: reservation.id,
      invitations: reservation.invitations,
      address: reservation.address,
      guests: reservation.guests
    },
    pageTitle: "Update reservation",
    actions: (
      <Button
        className="me-3 mb-3"
        onClick={() => handleDelete()}
        disabled={isDeleting}
      >
        Delete reservation
      </Button>
    )
  };
};
