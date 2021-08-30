import { SetReservationFormData, SetReservationPageProps } from "./types";

type UseSetReservationPageInstance<TData> = {
  initialValues: TData;
  handleSubmit: (reservation: TData) => void;
};

export const useSetReservationPage = ({
  reservation
}: SetReservationPageProps): UseSetReservationPageInstance<SetReservationFormData> => {
  return {
    initialValues: {
      guests: reservation.guests
    },
    handleSubmit: () => {}
  };
};
