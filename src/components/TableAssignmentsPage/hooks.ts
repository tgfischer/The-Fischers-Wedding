import { ChangeEvent, useCallback } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useIsFetching
} from "react-query";
import * as yup from "yup";

import { authenticatedRequest } from "../../supabase";
import {
  AddTableAssignmentBody,
  AddTableBody,
  TablesDto,
  UnassignedGuestDto,
  UnassignedGuestsDto
} from "../../types";

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
        queryClient.refetchQueries();
      }, [])
    }
  );
};

const useAddTableAssignmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, void, AddTableAssignmentBody>(
    ({ guestId, tableId }) =>
      authenticatedRequest("/api/tables/assignments", {
        method: "POST",
        body: { guestId, tableId }
      }),
    { onSuccess: useCallback(() => queryClient.refetchQueries(), []) }
  );
};

export const useTablesQuery = () =>
  useQuery<unknown, void, TablesDto>(["tables"], () =>
    authenticatedRequest("/api/tables", { method: "GET" })
  );

export const useUnassignedGuestsQuery = () =>
  useQuery<unknown, void, UnassignedGuestsDto>(["unassignedGuests"], () =>
    authenticatedRequest("/api/guests/unassigned", { method: "GET" })
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

export const useUnassignedGuest = ({ id }: UnassignedGuestDto) => {
  const queryClient = useQueryClient();

  const { mutate: handleTableAssignment, isLoading: isSubmitting } =
    useAddTableAssignmentMutation();

  const data = queryClient.getQueryData<TablesDto>(["tables"]);
  const isFetchingTables = useIsFetching(["tables"]);
  return {
    isSubmitting,
    isFetchingTables,
    tables: data?.tables ?? [],
    handleTableAssignment: useCallback((e: ChangeEvent<HTMLSelectElement>) => {
      handleTableAssignment({
        guestId: id,
        tableId: Number.parseInt(e.target.value)
      });
    }, [])
  };
};
