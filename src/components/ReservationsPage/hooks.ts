import { startCase, sum } from "lodash";
import { useMemo } from "react";
import {
  TableInstance,
  useTable,
  useExpanded,
  usePagination,
  CellProps
} from "react-table";

import type { ReservationDto, GuestDto } from "../../types";

import {
  EditReservationCell,
  ExpandableButtonCell,
  SetReservationLinkCell
} from "./Cells";

type UseReservationsTableOptions = {
  reservations: ReservationDto[];
};

type UseGuestsTableOptions = {
  guests: GuestDto[];
};

export const useReservationsTable = ({
  reservations
}: UseReservationsTableOptions): TableInstance<ReservationDto> => {
  return useTable<ReservationDto>(
    {
      columns: useMemo(
        () => [
          {
            id: "expander",
            Cell: ExpandableButtonCell
          },
          {
            accessor: "id",
            Header: `ID (${reservations.length})`
          },
          {
            id: "guests",
            Header: `Guests (${sum(
              reservations.map(({ guests }) => guests.length)
            )})`,
            Cell: ({ row }: CellProps<ReservationDto>) =>
              row.original.guests
                .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
                .join(", ")
          },
          {
            accessor: "address",
            Header: "Address"
          },
          {
            id: "status",
            Header: "Status",
            Cell: ({ row }: CellProps<ReservationDto>) =>
              row.original.guests.some(({ status }) => status === "pending")
                ? "Pending"
                : "Completed"
          },
          {
            id: "edit",
            Cell: EditReservationCell
          },
          {
            id: "link",
            Cell: SetReservationLinkCell
          }
        ],
        [reservations]
      ),
      data: reservations
    },
    useExpanded,
    usePagination
  );
};

export const useGuestsTable = ({
  guests
}: UseGuestsTableOptions): TableInstance<GuestDto> => {
  return useTable<GuestDto>({
    columns: useMemo(
      () => [
        {
          id: "name",
          Header: "Full name",
          Cell: ({ row }: CellProps<GuestDto>) =>
            `${row.original.firstName} ${row.original.lastName}`
        },
        {
          accessor: "meal",
          Header: "Meal preference",
          Cell: ({ value }: CellProps<GuestDto>) => startCase(value)
        },
        {
          accessor: "song",
          Header: "Song"
        },
        {
          accessor: "status",
          Header: "Status",
          Cell: ({ value }: CellProps<GuestDto>) =>
            value ? startCase(value) : "Pending"
        }
      ],
      []
    ),
    data: guests
  });
};
