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
    .from<ReservationDto>("reservations")
    .insert({
      id: nanoid(10),
      invitations: reservation.invitations,
      address: reservation.address,
      guests: reservation.guests.map((guest) => ({
        ...guest,
        song: { name: "", artist: "" },
        status: "pending"
      }))
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
      .from<ReservationDto>("reservations")
      .update({
        invitations: reservation.invitations,
        address: reservation.address,
        guests: reservation.guests.map((guest) => ({
          ...guest,
          status: guest.status ?? "pending",
          song: guest.song ?? { name: "", artist: "" },
          meal: guest.meal ?? { notes: "" },
          isVaccinated: guest.isVaccinated ?? false
        })),
        updatedAt: new Date()
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
      .from<ReservationDto>("reservations")
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

export default handler;
