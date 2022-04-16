import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as yup from "yup";

import { authenticatedRequest } from "../../supabase";
import { AddTableBody, TablesDto, UnassignedGuestsDto } from "../../types";

type AddTableModalOptions = {
  onHide: () => void;
};

type AddTableMutationOptions = {
  onSuccess: () => void;
};

const useAddTableMutation = ({ onSuccess }: AddTableMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation<void, void, AddTableBody>(
    ({ name }) =>
      authenticatedRequest("/api/tables", {
        method: "POST",
        body: { name }
      }),
    {
      onSuccess: useCallback(() => {
        onSuccess?.();
        queryClient.refetchQueries(["tables"]);
      }, [])
    }
  );
};

export const useTablesQuery = () =>
  useQuery<unknown, void, TablesDto>(["tables"], () =>
    authenticatedRequest("/api/tables", {
      method: "GET"
    })
  );

export const useUnassignedGuestsQuery = () =>
  useQuery<unknown, void, UnassignedGuestsDto>(["unassignedGuests"], () =>
    authenticatedRequest("/api/guests/unassigned", {
      method: "GET"
    })
  );

const validationSchema = yup
  .object()
  .shape({ name: yup.string().required() })
  .required();

export const useAddTableModal = ({ onHide }: AddTableModalOptions) => {
  const { mutateAsync: handleSubmit, isLoading } = useAddTableMutation({
    onSuccess: onHide
  });

  return { isLoading, handleSubmit, validationSchema };
};
