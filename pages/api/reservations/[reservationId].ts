import { EndpointPipelineHandler, apiPipeline } from "../../../src/middleware";
import { EmptyResponse, GuestDto, ReservationDto } from "../../../src/types";

const setReservationHandler: EndpointPipelineHandler<EmptyResponse> = async ({
  req,
  res,
  supabase
}) => {
  const reservationId = req.query.reservationId as string;
  const { data: reservation } = await supabase
    .from<ReservationDto>("reservations")
    .select()
    .eq("id", reservationId)
    .maybeSingle();

  if (!reservation?.id) {
    return {
      status: 404,
      error: `The reservation with ID '${reservationId}' could not be found`
    };
  }

  const updatedGuests: GuestDto[] = req.body.guests;

  const { status, statusText } = await supabase
    .from<ReservationDto>("reservations")
    .update({
      guests: reservation?.guests.map((currentGuest) => {
        const updatedGuest = updatedGuests.find(
          (updatedGuest) =>
            updatedGuest.firstName === currentGuest.firstName &&
            updatedGuest.lastName === currentGuest.lastName
        );
        return updatedGuest
          ? {
              ...currentGuest,
              song: updatedGuest.song,
              meal: updatedGuest.meal,
              status: updatedGuest.status
            }
          : currentGuest;
      }),
      updatedAt: new Date()
    })
    .eq("id", reservation?.id);

  if (status === 200) {
    res.status(200).json({});
    return { status: 200 };
  }

  return {
    status,
    error: statusText
  };
};

const handler = apiPipeline({
  PUT: [setReservationHandler]
});

export default handler;
