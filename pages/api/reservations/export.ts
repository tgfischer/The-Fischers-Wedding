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
  ReservationData,
  "id" | "address" | "invitations"
> & {
  guests: Pick<GuestData, "firstName" | "lastName">[];
};

const exportReservationsHandler: EndpointPipelineHandler<
  EmptyResponse
> = async ({ res }) => {
  const { data, error, status } = await serverSupabase
    .from<ExportReservationSelectResult>("reservations")
    .select("id, address, invitations, guests(firstName, lastName)")
    .order("id");

  if (error) {
    return { status, error: error.message };
  }

  console.debug("Exporting reservations to CSV");

  const parser = new Parser({
    fields: [
      { label: "Guests", value: "guests" },
      { label: "Address", value: "address" },
      { label: "Invitations", value: "invitations" },
      { label: "Url", value: "url" }
    ]
  });

  const reservations = data.map(({ id, address, invitations, guests }) => ({
    guests: guests
      .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
      .join(", "),
    address,
    invitations: invitations.map(startCase).join(", "),
    url: `https://thefischers.wedding/${id}`
  }));

  const csv = parser.parse(reservations);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment;filename=reservations.csv");
  res.status(200).send(Buffer.from(csv));

  return { status: 200 };
};

const handler = apiPipeline({
  GET: [authenticate, exportReservationsHandler]
});

export default handler;
