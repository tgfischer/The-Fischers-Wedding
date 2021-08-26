import { first } from "lodash";
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
  if (req.method === "POST") {
    await addReservation(req.body);
    return res.status(201).end();
  }

  res.status(405).end();
};

/**
 * Transactions??
 */
const addReservation = async (reservation: AddReservationFormData) => {
  const result = await supabase.from<ReservationDto>("reservations").insert({
    id: nanoid(10),
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

export default handler;
