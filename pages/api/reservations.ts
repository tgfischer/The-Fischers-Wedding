import { isNil } from "lodash/fp";
import { nanoid } from "nanoid";

import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate
} from "../../src/middleware";
import {
  AddReservationBody,
  EmptyResponse,
  GuestData,
  GuestDto,
  ReservationData,
  ReservationDto,
  UpdateReservationBody
} from "../../src/types";

const addReservationHandler: EndpointPipelineHandler<EmptyResponse> = async ({
  req,
  res,
  supabase
}) => {
  const reservation: AddReservationBody = req.body;

  const insertReservationResult = await supabase
    .from<ReservationData>("reservations")
    .insert({
      id: nanoid(10),
      invitations: reservation.invitations,
      address: reservation.address
    });

  if (insertReservationResult.error) {
    console.error(insertReservationResult.error);
    return {
      status: insertReservationResult.status,
      error: `${insertReservationResult.error.message} (${insertReservationResult.error.hint})`
    };
  }

  const insertGuestResult = await supabase.from<GuestData>("guests").insert(
    reservation.guests.map((guest) => ({
      firstName: guest.firstName,
      lastName: guest.lastName,
      reservationId: insertReservationResult.data?.[0].id
    }))
  );

  if (insertGuestResult.error) {
    console.error(insertGuestResult.error);
    return {
      status: insertGuestResult.status,
      error: `${insertGuestResult.error.message} (${insertGuestResult.error.hint})`
    };
  }

  res.status(201).json({});
  return { status: 200 };
};

const updateReservationHandler: EndpointPipelineHandler<
  EmptyResponse
> = async ({ req, res, supabase }) => {
  const reservation: UpdateReservationBody = req.body;

  const existingGuestsResult = await supabase
    .from<GuestData>("guests")
    .select()
    .eq("reservationId", reservation.id);

  if (existingGuestsResult.error) {
    return {
      status: existingGuestsResult.status,
      error: `${existingGuestsResult.error.message} (${existingGuestsResult.error.hint})`
    };
  }

  if (!existingGuestsResult.data) {
    return {
      status: 500,
      error: "Unable to get existing guests"
    };
  }

  const updateReservationResult = await supabase
    .from<ReservationDto>("reservations")
    .update({
      invitations: reservation.invitations,
      address: reservation.address,
      updatedAt: new Date()
    })
    .eq("id", reservation.id);

  if (updateReservationResult.error) {
    console.error(updateReservationResult.error);
    return {
      status: updateReservationResult.status,
      error: `${updateReservationResult.error.message} (${updateReservationResult.error.hint})`
    };
  }

  const guestsToInsert = reservation.guests
    .filter(({ id }) => isNil(id))
    .map((guest) => ({
      firstName: guest.firstName,
      lastName: guest.lastName,
      reservationId: updateReservationResult.data[0].id
    }));

  console.debug(
    `Inserting the following guests: ${JSON.stringify(guestsToInsert)}`
  );

  const insertGuestsResult = await supabase
    .from("guests")
    .insert(guestsToInsert, { returning: "minimal" });

  if (insertGuestsResult.error) {
    console.error(insertGuestsResult.error);
    return {
      status: insertGuestsResult.status,
      error: `${insertGuestsResult.error.message} (${insertGuestsResult.error.hint})`
    };
  }

  const guestsToUpdate = reservation.guests
    .filter(({ id }) => !isNil(id))
    .map((guest) => ({
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName
    }));

  console.info(
    `Updating the following guests: ${JSON.stringify(guestsToUpdate)}`
  );

  for (const guestToUpdate of guestsToUpdate) {
    const updateGuestsResult = await supabase
      .from("guests")
      .update(guestToUpdate, { returning: "minimal" })
      .eq("id", guestToUpdate.id);

    if (updateGuestsResult.error) {
      console.error(updateGuestsResult.error);
      return {
        status: updateGuestsResult.status,
        error: `${updateGuestsResult.error.message} (${updateGuestsResult.error.hint})`
      };
    }
  }

  const guestsToDelete = existingGuestsResult.data
    .filter((guest) => !reservation.guests.some(({ id }) => id === guest.id))
    .map(({ id }) => id);

  console.debug(`Deleting the following guests: ${guestsToDelete}`);

  const deleteGuestsResult = await supabase
    .from<GuestDto>("guests")
    .delete({ returning: "minimal" })
    .in("id", guestsToDelete);

  if (deleteGuestsResult.error) {
    console.error(deleteGuestsResult.error);
    return {
      status: deleteGuestsResult.status,
      error: `${deleteGuestsResult.error.message} (${deleteGuestsResult.error.hint})`
    };
  }

  res.status(200).json({});
  return { status: 200 };
};

const getReservationsHandler: EndpointPipelineHandler<
  ReservationDto[]
> = async ({ res, supabase }) => {
  const { data, status, statusText, error } = await supabase
    .from<ReservationDto>(
      `
      reservations(
        id,
        address,
        guests (
          id,
          firstName,
          lastName,
          songs (
            id,
            name,
            artist
          ),
          meal,
          status
        ),
        invitations,
        createdAt,
        updatedAt
        )
      `
    )
    .select();

  if (error) {
    console.error(error);
    return { status, error: `${error.message} (${error.hint})` };
  }

  if (!data) {
    const message = "Reservations not found";
    console.error(message);
    return { status: 404, error: message };
  }

  if (status !== 200) {
    console.error(statusText);
    return { status, error: statusText };
  }

  res.status(200).json(data);
  return { status: 200 };
};

const handler = apiPipeline({
  GET: [authenticate, getReservationsHandler],
  POST: [authenticate, addReservationHandler],
  PUT: [authenticate, updateReservationHandler]
});

export default handler;
