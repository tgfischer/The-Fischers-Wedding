import { useCallback } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions
} from "react-query";
import * as yup from "yup";

import { authenticatedRequest } from "../../supabase";
import { GiftDto } from "../../types";

import type {
  AddGiftFormData,
  AddGiftModalOptions,
  AddGiftMutationOptions
} from "./types";

export const useGiftsQuery = (
  options: UseQueryOptions<unknown, void, GiftDto[]>
) =>
  useQuery<unknown, void, GiftDto[]>(
    ["gifts"],
    () => authenticatedRequest("/api/gifts", { method: "GET" }),
    options
  );

const useAddGiftMutation = ({ onSuccess }: AddGiftMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation<void, void, AddGiftFormData>(
    ({ description, guests }) => {
      return authenticatedRequest("/api/gifts", {
        method: "POST",
        body: {
          description,
          guests: guests.map(({ value }) => Number.parseInt(value))
        }
      });
    },
    {
      onSuccess: useCallback(() => {
        onSuccess?.();
        queryClient.refetchQueries();
      }, [])
    }
  );
};

const validationSchema = yup
  .object()
  .shape({
    description: yup.string().required(),
    guests: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            label: yup.string().required(),
            value: yup.string().required()
          })
          .required()
      )
      .min(1)
      .required()
  })
  .required();

export const useAddGiftModal = ({ onHide }: AddGiftModalOptions) => {
  const { mutateAsync: handleSubmit, isLoading } = useAddGiftMutation({
    onSuccess: onHide
  });

  return { isLoading, handleSubmit, validationSchema };
};
