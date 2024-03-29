import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate
} from "../../../src/middleware";
import {
  EmptyResponse,
  GuestData,
  SetReservationBody
} from "../../../src/types";

const setReservationHandler: EndpointPipelineHandler<EmptyResponse> = async ({
  req,
  res,
  supabase
}) => {
  const { guests }: SetReservationBody = req.body;
  const reservationId = req.query.reservationId as string;

  for (const guest of guests) {
    console.debug(`Setting reservation for ${JSON.stringify(guest)}`);

    const updateGuestResult = await supabase
      .from<GuestData>("guests")
      .update({
        meal: guest.meal?.trim(),
        status: guest.status
      })
      .eq("id", guest.id)
      .eq("reservationId", reservationId);

    if (updateGuestResult.error) {
      return {
        status: updateGuestResult.status,
        error: `${updateGuestResult.error.message} (${updateGuestResult.error.hint})`
      };
    }

    const deleteSongsResult = await supabase
      .from("songs")
      .delete()
      .eq("guestId", guest.id);

    if (deleteSongsResult.error) {
      return {
        status: deleteSongsResult.status,
        error: `${deleteSongsResult.error.message} (${deleteSongsResult.error.hint})`
      };
    }

    const insertSongsResult = await supabase.from("songs").insert(
      guest.songs
        .filter(({ name }) => name?.trim())
        .map(({ name, artist }) => ({
          name: name.trim(),
          artist: artist.trim(),
          guestId: guest.id
        }))
    );

    if (insertSongsResult.error) {
      return {
        status: insertSongsResult.status,
        error: `${insertSongsResult.error.message} (${insertSongsResult.error.hint})`
      };
    }
  }

  res.status(200).json({});
  return { status: 200 };
};

const deleteReservationHandler: EndpointPipelineHandler<
  EmptyResponse
> = async ({ req, res, supabase }) => {
  const reservationId = req.query.reservationId as string;

  console.debug(`Deleting reservation ${reservationId}`);

  const { error, status } = await supabase
    .from("reservations")
    .delete()
    .eq("id", reservationId);

  if (error) {
    return { status: status, error: `${error.message} (${error.hint})` };
  }

  res.status(200).json({});
  return { status: 200 };
};

const handler = apiPipeline({
  PUT: [setReservationHandler],
  DELETE: [authenticate, deleteReservationHandler]
});

export default handler;
