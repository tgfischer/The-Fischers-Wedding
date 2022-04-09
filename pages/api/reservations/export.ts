import { Parser } from "json2csv";
import { startCase } from "lodash/fp";

import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate,
  serverSupabase
} from "../../../src/middleware";
import type {
  EmptyResponse,
  GuestData,
  ReservationData
} from "../../../src/types";

type ExportReservationSelectResult = Pick<
  GuestData,
  "firstName" | "lastName" | "status"
> & {
  reservation: Pick<ReservationData, "address" | "invitations">;
};

const exportReservationsHandler: EndpointPipelineHandler<
  EmptyResponse
> = async ({ res }) => {
  const { data, error, status } = await serverSupabase
    .from<ExportReservationSelectResult>("guests")
    .select(
      `
      firstName,
      lastName,
      status,
      reservation:reservationId (
        address,
        invitations
      )
    `
    )
    .order("firstName")
    .order("lastName");

  if (error) {
    console.error(error);
    return { status, error: error.message };
  }

  console.debug("Exporting reservations to CSV");

  const parser = new Parser({
    fields: [
      { label: "First name", value: "firstName" },
      { label: "Last name", value: "lastName" },
      { label: "Address", value: "address" },
      { label: "Invitations", value: "invitations" },
      { label: "Status", value: "status" }
    ]
  });

  const guests = data.map(({ reservation, ...guest }) => ({
    ...guest,
    address: reservation.address,
    invitations: reservation.invitations.map(startCase).join(", "),
    status: startCase(guest.status)
  }));

  const csv = parser.parse(guests);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment;filename=reservations.csv");
  res.status(200).send(Buffer.from(csv));

  return { status: 200 };
};

const handler = apiPipeline({
  GET: [authenticate, exportReservationsHandler]
});

export default handler;
