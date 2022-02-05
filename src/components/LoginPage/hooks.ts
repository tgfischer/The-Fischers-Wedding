import router from "next/router";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as yup from "yup";

import { useAnonymousComponent } from "../../hooks";
import { supabase } from "../../supabase";
import { ErrorResponse, LoginDto } from "../../types";

const useLoginMutation = () =>
  useMutation<void, ErrorResponse, LoginDto>(
    async ({ email, password }) => {
      const { error } = await supabase.auth.signIn({ email, password });

      if (error) {
        throw { status: error.status, error: error.message };
      }
    },
    {
      onSuccess: useCallback(() => router.push("/"), []),
      onError: useCallback(({ error }) => void toast.error(error), [])
    }
  );

export const validationSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
  .required();

export const useLoginPage = () => {
  const { mutate, isLoading: isSubmitting } = useLoginMutation();

  useAnonymousComponent();

  return {
    validationSchema,
    handleSubmit: useCallback((values) => mutate(values), [mutate]),
    isSubmitting
  };
};
