import { useMemo } from "react";
import * as yup from "yup";
import type { AnyObjectSchema } from "yup";

type UseAddReservationPageInstance = {
  schema: AnyObjectSchema;
};

export const useAddReservationPage = (): UseAddReservationPageInstance => {
  return {
    schema: useMemo(
      () =>
        yup
          .object()
          .shape({
            address: yup.string().required(),
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
          .required(),
      []
    )
  };
};
