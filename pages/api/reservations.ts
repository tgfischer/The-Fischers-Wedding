import { first, prop } from "lodash/fp";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../../src/supabase";
import {
  AddReservationFormData,
  GuestDto,
  ReservationDto
} from "../../src/types";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return res
      .status(401)
      .json({ message: "You are unauthorized to perform this action." });
  }

  if (req.method === "POST") {
    await addReservation(req.body);
    return res.status(201).json({});
  }
  if (req.method === "PUT") {
    await updateReservation(req.body);
    return res.status(200).json({});
  }

  res.status(405).json({});
};

/**
 * Transactions??
 */
const addReservation = async (reservation: AddReservationFormData) => {
  const result = await supabase.from<ReservationDto>("reservations").upsert({
    id: reservation.id ?? nanoid(10),
    address: reservation.address
  });

  await supabase.from<GuestDto>("guests").insert(
    reservation.guests.map(({ firstName, lastName }) => ({
      firstName,
      lastName,
      reservationId: first(result.data)?.id
    }))
  );
};

const updateReservation = async (reservation: AddReservationFormData) => {
  const result = await supabase
    .from<ReservationDto>("reservations")
    .update({
      address: reservation.address
    })
    .eq("id", reservation.id);

  const r = first(result.data);
  const oldGuestIds = r?.guests?.map(prop("id")) ?? [];
  const newGuestIds = reservation.guests.map(prop("id"));
  const guestsToRemove = oldGuestIds?.filter((id) => newGuestIds.includes(id));

  console.log(guestsToRemove);

  for (const id of guestsToRemove) {
    await supabase.from<GuestDto>("guests").delete().eq("id", id);
  }

  for (const { id, firstName, lastName } of reservation.guests) {
    await supabase
      .from<GuestDto>("guests")
      .upsert({
        firstName,
        lastName,
        reservationId: r?.id
      })
      .eq("id", id);
  }
};

export default handler;
