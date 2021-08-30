import { nanoid } from "nanoid";

import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate
} from "../../src/middleware";
import { EmptyResponse, ReservationDto } from "../../src/types";

const addReservationHandler: EndpointPipelineHandler<EmptyResponse> = async ({
  req,
  res,
  supabase
}) => {
  const reservation: ReservationDto = req.body;
  const { status, statusText } = await supabase
    .from<ReservationDto>("reservations_v2")
    .insert({
      id: nanoid(10),
      address: reservation.address,
      guests: reservation.guests
    });

  if (status === 200) {
    res.status(201).json({});
    return { status: 200 };
  }

  return {
    status,
    error: statusText
  };
};

const updateReservationHandler: EndpointPipelineHandler<EmptyResponse> =
  async ({ req, res, supabase }) => {
    const reservation: ReservationDto = req.body;
    const { status, statusText } = await supabase
      .from<ReservationDto>("reservations_v2")
      .update({
        address: reservation.address,
        guests: reservation.guests
      })
      .eq("id", reservation.id);

    if (status === 200) {
      res.status(200).json({});
      return { status: 200 };
    }

    return {
      status,
      error: statusText
    };
  };

const getReservationsHandler: EndpointPipelineHandler<ReservationDto[]> =
  async ({ res, supabase }) => {
    const { data, status, statusText } = await supabase
      .from<ReservationDto>("reservations_v2")
      .select();

    if (!data) {
      return {
        status: 404,
        error: "Reservations not found"
      };
    }

    if (status !== 200) {
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

// const addReservation = async (reservation: AddReservationFormData) => {
//   const result = await supabase.from<ReservationDto>("reservations").upsert({
//     id: reservation.id ?? nanoid(10),
//     address: reservation.address
//   });

//   await supabase.from<GuestDto>("guests").insert(
//     reservation.guests.map(({ firstName, lastName }) => ({
//       firstName,
//       lastName,
//       reservationId: first(result.data)?.id
//     }))
//   );
// };

// const updateReservation = async (reservation: AddReservationFormData) => {
//   const result = await supabase
//     .from<ReservationDto>("reservations")
//     .update({
//       address: reservation.address
//     })
//     .eq("id", reservation.id);

//   const r = first(result.data);
//   const oldGuestIds = r?.guests?.map(prop("id")) ?? [];
//   const newGuestIds = reservation.guests.map(prop("id"));
//   const guestsToRemove = oldGuestIds?.filter((id) => newGuestIds.includes(id));

//   console.log(guestsToRemove);

//   for (const id of guestsToRemove) {
//     await supabase.from<GuestDto>("guests").delete().eq("id", id);
//   }

//   for (const { id, firstName, lastName } of reservation.guests) {
//     await supabase
//       .from<GuestDto>("guests")
//       .upsert({
//         firstName,
//         lastName,
//         reservationId: r?.id
//       })
//       .eq("id", id);
//   }
// };

export default handler;
